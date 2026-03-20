import { useLang }     from '../../context/LangContext.jsx'
import { useWeather, getWMO, windDir, fmtTime, pickAdvisory } from '../../hooks/useWeather.js'
import Card from '../ui/Card.jsx'

function fmt(n, dec = 0) { return n == null ? '—' : Number(n).toFixed(dec) }

function StatBox({ label, value, sub, accent }) {
  return (
    <div className={`rounded-xl p-3 text-center ${accent ? 'bg-white border border-earth-100' : 'bg-earth-700/50'}`}>
      <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${accent ? 'text-earth-500' : 'text-earth-300'}`}>{label}</div>
      <div className={`font-display font-bold text-lg leading-none ${accent ? 'text-earth-900' : 'text-white'}`}>{value}</div>
      {sub && <div className={`text-[10px] mt-0.5 ${accent ? 'text-earth-400' : 'text-earth-400'}`}>{sub}</div>}
    </div>
  )
}

function DayCard({ day }) {
  const wmo      = getWMO(day.weather_code)
  const rainPct  = day.precipitation_probability_max ?? 0
  const rainMm   = day.precipitation_sum ?? 0
  const isToday  = day.idx === 0
  return (
    <div className={`rounded-xl border p-3 text-center lift ${isToday ? 'border-earth-400 bg-earth-50' : 'bg-white border-earth-100'} shadow-sm`}>
      <div className={`text-[11px] font-bold mb-1 ${isToday ? 'text-earth-600' : 'text-earth-400'}`}>
        {isToday ? 'Today' : new Date(day.date).toLocaleDateString('en-IN', { weekday:'short', day:'numeric' })}
      </div>
      <div className="text-2xl my-1">{wmo.icon}</div>
      <div className="text-[10px] text-earth-400 leading-tight mb-2">{wmo.label}</div>
      <div className="font-bold text-earth-900 text-sm">
        {fmt(day.temperature_2m_max)}°
        <span className="text-earth-400 font-normal text-[11px]"> / {fmt(day.temperature_2m_min)}°</span>
      </div>
      {rainPct > 0 && (
        <div className="text-[10px] text-sky-600 font-bold mt-1">💧 {rainPct}%</div>
      )}
      {rainMm > 0.1 && (
        <div className="text-[10px] text-sky-500 mt-0.5">{fmt(rainMm, 1)}mm</div>
      )}
    </div>
  )
}

export default function WeatherPage() {
  const { t }                       = useLang()
  const wt                          = t.weather
  const { weather, loading, error } = useWeather(20.0, 73.78)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-72 gap-4 text-earth-400 animate-fade-in">
        <div className="text-5xl animate-bounce">🌤️</div>
        <p className="font-semibold text-sm">{wt.loadingText}</p>
      </div>
    )
  }

  if (error || !weather?.current) {
    return (
      <div className="flex flex-col items-center justify-center h-72 gap-3 text-clay-500 animate-fade-in">
        <div className="text-4xl">⚠️</div>
        <p className="font-semibold text-sm">{wt.errorText}</p>
      </div>
    )
  }

  const cur  = weather.current
  const dai  = weather.daily
  const wmo  = getWMO(cur.weather_code)
  const adv  = pickAdvisory(cur, dai, wt.advisories)

  const uvColor = (uv) => {
    if (uv <= 2) return 'text-moss-600'
    if (uv <= 5) return 'text-earth-500'
    if (uv <= 7) return 'text-amber-500'
    return 'text-clay-600'
  }

  const days = (dai?.time ?? []).map((date, i) => ({
    idx: i, date,
    weather_code:                  dai.weather_code[i],
    temperature_2m_max:            dai.temperature_2m_max[i],
    temperature_2m_min:            dai.temperature_2m_min[i],
    precipitation_sum:             dai.precipitation_sum[i],
    precipitation_probability_max: dai.precipitation_probability_max[i],
    sunrise:                       dai.sunrise[i],
    sunset:                        dai.sunset[i],
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-earth-900">{wt.title}</h1>
        <p className="text-earth-500 text-sm mt-1">📍 {wt.location} · {wt.subtitle}</p>
      </div>

      {/* Current conditions hero card */}
      <div className="hero-pattern bg-earth-800 rounded-3xl p-5 sm:p-7 mb-6 overflow-hidden">
        <p className="text-earth-400 text-xs font-bold uppercase tracking-widest mb-4">{wt.current}</p>
        <div className="flex flex-wrap items-start justify-between gap-6">
          {/* Temp + condition */}
          <div className="flex items-center gap-5">
            <div className="text-6xl sm:text-7xl">{wmo.icon}</div>
            <div>
              <div className="font-display font-bold text-white leading-none" style={{ fontSize:'3.5rem' }}>
                {fmt(cur.temperature_2m)}°<span className="text-2xl text-earth-300">C</span>
              </div>
              <div className="text-earth-300 text-sm mt-1 font-medium">{wmo.label}</div>
              <div className="text-earth-400 text-xs mt-1">
                {wt.feelsLike} {fmt(cur.apparent_temperature)}°C
              </div>
            </div>
          </div>
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 min-w-[260px]">
            <StatBox label={wt.humidity}  value={`${fmt(cur.relative_humidity_2m)}%`} />
            <StatBox label={wt.wind}      value={`${fmt(cur.wind_speed_10m)}`} sub={`km/h ${windDir(cur.wind_direction_10m)}`} />
            <StatBox label={wt.uvIndex}   value={fmt(cur.uv_index ?? 0)}         sub={<span className={uvColor(cur.uv_index)}>{(cur.uv_index??0) <= 2 ? 'Low' : (cur.uv_index??0) <= 5 ? 'Moderate' : (cur.uv_index??0) <= 7 ? 'High' : 'Very High'}</span>} />
            <StatBox label={wt.rain}      value={`${fmt(cur.precipitation,1)}`}  sub="mm" />
          </div>
        </div>

        {/* Extra detail row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          <StatBox label={wt.pressure}    value={`${fmt(cur.surface_pressure)}`}  sub="hPa" />
          <StatBox label={wt.visibility}  value={`${fmt((cur.visibility??0)/1000,1)}`} sub="km" />
          <StatBox label={wt.dewpoint}    value={`${fmt(cur.dew_point_2m)}°`}     sub="C" />
          <StatBox label={wt.cloudcover}  value={`${fmt(cur.cloud_cover)}`}       sub="%" />
        </div>

        {/* Sunrise / sunset */}
        <div className="flex items-center justify-center gap-8 mt-5 pt-4 border-t border-earth-700">
          <span className="text-sm text-earth-300 font-medium">🌅 {wt.sunrise}: <strong className="text-white">{fmtTime(days[0]?.sunrise)}</strong></span>
          <span className="w-px h-4 bg-earth-700" />
          <span className="text-sm text-earth-300 font-medium">🌇 {wt.sunset}: <strong className="text-white">{fmtTime(days[0]?.sunset)}</strong></span>
        </div>
      </div>

      {/* Crop advisory */}
      <Card className="mb-6 p-4">
        <div className="flex items-start gap-3">
          <div className="text-3xl flex-shrink-0">🌾</div>
          <div>
            <p className="text-[11px] font-bold text-earth-500 uppercase tracking-wider mb-1">{wt.cropAdvisory}</p>
            <p className="text-sm font-semibold text-earth-800 leading-relaxed">{adv}</p>
          </div>
        </div>
      </Card>

      {/* 7-day forecast */}
      <div className="mb-6">
        <p className="text-[11px] font-bold text-earth-400 uppercase tracking-widest mb-3">{wt.weekAhead}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {days.map((d, i) => <DayCard key={i} day={d} />)}
        </div>
      </div>

      {/* Rain probability bar chart */}
      <Card className="p-5">
        <p className="text-[11px] font-bold text-earth-500 uppercase tracking-wider mb-4">{wt.rainChance}</p>
        <div className="space-y-3">
          {days.map((day, i) => {
            const pct = day.precipitation_probability_max ?? 0
            const barColor = pct > 70 ? '#0284c7' : pct > 40 ? '#38bdf8' : '#bae6fd'
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="text-[11px] text-earth-500 font-medium w-20 flex-shrink-0">
                  {i === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-IN', { weekday:'short', day:'numeric' })}
                </div>
                <div className="flex-1 h-5 bg-earth-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width:`${pct}%`, background: barColor }} />
                </div>
                <div className="text-[11px] font-bold text-sky-600 w-10 text-right">{pct}%</div>
                <div className="text-[11px] text-earth-400 w-14 text-right">
                  {(day.precipitation_sum ?? 0) > 0.1 ? `${fmt(day.precipitation_sum,1)}mm` : ''}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <p className="text-[11px] text-earth-300 text-center mt-4">
        Live data via Open-Meteo API · Free, no key required · Updates hourly
      </p>
    </div>
  )
}
