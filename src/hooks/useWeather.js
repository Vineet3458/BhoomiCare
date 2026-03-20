import { useState, useEffect } from 'react'

// WMO weather interpretation codes → label + emoji
export const WMO = {
  0:{ label:'Clear sky',         icon:'☀️' }, 1:{ label:'Mainly clear',      icon:'🌤️' },
  2:{ label:'Partly cloudy',     icon:'⛅' }, 3:{ label:'Overcast',          icon:'☁️' },
  45:{ label:'Foggy',            icon:'🌫️' }, 48:{ label:'Icy fog',          icon:'🌫️' },
  51:{ label:'Light drizzle',    icon:'🌦️' }, 53:{ label:'Drizzle',          icon:'🌦️' },
  55:{ label:'Heavy drizzle',    icon:'🌧️' }, 61:{ label:'Light rain',       icon:'🌧️' },
  63:{ label:'Rain',             icon:'🌧️' }, 65:{ label:'Heavy rain',       icon:'🌧️' },
  71:{ label:'Light snow',       icon:'🌨️' }, 73:{ label:'Snow',             icon:'❄️'  },
  75:{ label:'Heavy snow',       icon:'❄️'  }, 80:{ label:'Showers',         icon:'🌦️' },
  81:{ label:'Rain showers',     icon:'🌦️' }, 82:{ label:'Violent showers',  icon:'⛈️' },
  95:{ label:'Thunderstorm',     icon:'⛈️' }, 96:{ label:'Storm + hail',     icon:'⛈️' },
  99:{ label:'Storm + hail',     icon:'⛈️' },
}
export const getWMO = (code) => WMO[code] ?? { label:'Unknown', icon:'🌡️' }

export function windDir(deg) {
  return ['N','NE','E','SE','S','SW','W','NW'][Math.round((deg ?? 0) / 45) % 8]
}

export function fmtTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true })
}

export function pickAdvisory(cur, daily, advisories) {
  const raining   = (cur?.precipitation        ?? 0) > 0.5
  const rainSoon  = (daily?.precipitation_probability_max?.[0] ?? 0) > 60
  const hot       = (cur?.temperature_2m       ?? 0) > 38
  const windy     = (cur?.wind_speed_10m        ?? 0) > 30
  const highUV    = (cur?.uv_index              ?? 0) > 8
  const cold      = (cur?.temperature_2m        ?? 25) < 8
  if (raining)    return advisories.rain
  if (rainSoon)   return advisories.rainSoon
  if (cold)       return advisories.cold
  if (hot)        return advisories.hot
  if (windy)      return advisories.wind
  if (highUV)     return advisories.uv
  return                 advisories.good
}

export function useWeather(lat = 20.0, lon = 73.78) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError  ] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const url = new URL('https://api.open-meteo.com/v1/forecast')
        const currentVars = [
          'temperature_2m','relative_humidity_2m','apparent_temperature',
          'precipitation','weather_code','wind_speed_10m','wind_direction_10m',
          'uv_index','surface_pressure','visibility','dew_point_2m','cloud_cover',
        ].join(',')
        const dailyVars = [
          'weather_code','temperature_2m_max','temperature_2m_min',
          'precipitation_sum','precipitation_probability_max',
          'wind_speed_10m_max','sunrise','sunset',
        ].join(',')
        url.searchParams.set('latitude',       lat)
        url.searchParams.set('longitude',      lon)
        url.searchParams.set('current',        currentVars)
        url.searchParams.set('daily',          dailyVars)
        url.searchParams.set('timezone',       'Asia/Kolkata')
        url.searchParams.set('forecast_days',  '7')
        url.searchParams.set('wind_speed_unit','kmh')
        const res  = await fetch(url.toString())
        const data = await res.json()
        if (!cancelled) setWeather(data)
      } catch (e) {
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [lat, lon])

  return { weather, loading, error }
}
