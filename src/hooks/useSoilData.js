import { useState, useEffect, useCallback } from 'react'
import { SOIL_SAMPLE } from '../data/soilData.js'
import { PRODUCTS } from '../data/marketplace.js'
import { useAuth } from '../context/AuthContext.jsx'

// Helper to determine status and recommendations based on value and thresholds
function assessNutrient(sym, name, val, unit, min, max) {
  let status = 'optimal'
  let color = '#34d399' // default good green
  let recomendation = 'Levels adequate — no action needed'
  let recommendedProductIds = []

  if (val < min) {
    status = 'deficient'
    color = '#f87171' // red/orange
    if (sym === 'N') {
      recomendation = `Apply ${Math.ceil((min - val) * 1.5)} kg/ha Urea before sowing`
      recommendedProductIds = [1] // Urea
    } else if (sym === 'P') {
      recomendation = `Apply DAP ${Math.ceil((min - val) * 2)} kg/ha as basal dose`
      recommendedProductIds = [2] // DAP
    } else if (sym === 'K') {
      recomendation = `Apply MOP ${Math.ceil((min - val) * 1.2)} kg/ha`
      recommendedProductIds = [3] // MOP
    } else if (sym === 'Zn') {
      recomendation = 'Apply Zinc Sulphate 25 kg/ha'
      recommendedProductIds = [4] // Zinc Sulphate
    } else if (sym === 'S') {
      recomendation = 'Apply Gypsum 200 kg/ha'
      recommendedProductIds = [4, 5] 
    } else if (sym === 'B') {
      recomendation = 'Apply Boron 20% foliar spray'
      recommendedProductIds = [21] // Boron
    } else {
      recomendation = `Apply ${name} corrective fertilizers`
    }
  } else if (val > max * 1.5) {
    status = 'excess'
    color = '#eab308' // yellow
    recomendation = `High levels. Restrict application of ${name} this season.`
  }

  // Set specific colors for visual consistency with the design system
  if (sym === 'N' && status === 'deficient') color = '#55ae3a'
  if (sym === 'P' && status === 'optimal') color = '#0ea5e9'
  if (sym === 'K' && status === 'optimal') color = '#e8ac58'
  if (sym === 'S' && status === 'deficient') color = '#a78bfa'

  return { sym, name, val, unit, min, max, status, color, recommendation: recomendation, recommendedProductIds }
}

export function useSoilData() {
  const { user }              = useAuth()
  const [data, setData]       = useState(null)
  const [loading, setLoading]  = useState(true)
  const [error, setError]      = useState(null)
  const [marketRecs, setMarketRecs] = useState([])

  const storageKey = `bhoomicare_soil_data_${user?.id || 'guest'}`

  const generateMarketRecs = useCallback((soilData) => {
    let idsToRecommend = new Set();
    
    // Check all macros and micros for deficiencies
    [...soilData.macro, ...soilData.micro].forEach(n => {
      if (n.status === 'deficient' && n.recommendedProductIds) {
        n.recommendedProductIds.forEach(id => idsToRecommend.add(id))
      }
    })

    // Get product details from marketplace data
    const recs = PRODUCTS.filter(p => idsToRecommend.has(p.id))
    setMarketRecs(recs.slice(0, 3)) // Limit to top 3 recommendations
  }, [])

  useEffect(() => {
    setLoading(true)
    // Check localStorage first
    const id = setTimeout(() => {
      try {
        const saved = localStorage.getItem(storageKey)
        const initialData = saved ? JSON.parse(saved) : SOIL_SAMPLE
        setData(initialData)
        generateMarketRecs(initialData)
      } catch (e) {
        setError(e)
        // Fallback
        setData(SOIL_SAMPLE)
        generateMarketRecs(SOIL_SAMPLE)
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(id)
  }, [storageKey, generateMarketRecs])

  // Called when user uploads a new soil report (JSON or CSV)
  const updateSoilData = useCallback((parsedRawData) => {
    if (!parsedRawData) return

    setLoading(true)
    
    // Normalize keys from parsed data to handle varying formats (CSV vs JSON)
    const getValue = (keys) => {
      for (const k of keys) {
        if (parsedRawData[k] !== undefined) return parseFloat(parsedRawData[k])
      }
      return null
    }

    const nVal = getValue(['N', 'Nitrogen (N)', 'N (kg/ha)', 'Nitrogen']) ?? SOIL_SAMPLE.macro[0].val
    const pVal = getValue(['P', 'Phosphorus (P)', 'P (kg/ha)', 'Phosphorus']) ?? SOIL_SAMPLE.macro[1].val
    const kVal = getValue(['K', 'Potassium (K)', 'K (kg/ha)', 'Potassium']) ?? SOIL_SAMPLE.macro[2].val
    const sVal = getValue(['S', 'Sulphur (S)', 'S (ppm)', 'Sulphur']) ?? SOIL_SAMPLE.macro[3].val
    const znVal = getValue(['Zn', 'Zinc (Zn)', 'Zn (ppm)', 'Zinc']) ?? SOIL_SAMPLE.micro[0].val
    const feVal = getValue(['Fe', 'Iron (Fe)', 'Fe (ppm)', 'Iron']) ?? SOIL_SAMPLE.micro[1].val
    const bVal = getValue(['B', 'Boron (B)', 'B (ppm)', 'Boron']) ?? SOIL_SAMPLE.micro[3].val

    const phVal = getValue(['pH', 'ph']) ?? SOIL_SAMPLE.pH
    const ecVal = getValue(['EC', 'EC (dS/m)']) ?? SOIL_SAMPLE.ec
    const ocVal = getValue(['OC', 'OC (%)']) ?? SOIL_SAMPLE.oc

    // Calculate new score based roughly on optimal ranges
    let score = 100
    if (nVal < 40) score -= 15
    if (pVal < 15) score -= 10
    if (kVal < 120) score -= 10
    if (znVal < 0.6) score -= 8
    if (phVal < 6.0 || phVal > 8.0) score -= 15
    if (ocVal < 0.5) score -= 10

    // Construct the updated soil object
    const newSoil = {
      ...SOIL_SAMPLE,
      field: parsedRawData['Survey Number'] || parsedRawData['Survey No'] || 'My Farm (Uploaded)',
      testDate: parsedRawData['Test Date'] || new Date().toLocaleDateString('en-GB'),
      score: Math.max(0, score),
      pH: phVal,
      ec: ecVal,
      oc: ocVal,
      macro: [
        assessNutrient('N', 'Nitrogen', nVal, 'kg/ha', 40, 80),
        assessNutrient('P', 'Phosphorus', pVal, 'kg/ha', 15, 30),
        assessNutrient('K', 'Potassium', kVal, 'kg/ha', 120, 200),
        assessNutrient('S', 'Sulphur', sVal, 'ppm', 10, 20),
      ],
      micro: [
        assessNutrient('Zn', 'Zinc', znVal, 'ppm', 0.6, 2.0),
        assessNutrient('Fe', 'Iron', feVal, 'ppm', 4.5, 8.0),
        assessNutrient('Mn', 'Manganese', SOIL_SAMPLE.micro[2].val, 'ppm', 2.0, 5.0),
        assessNutrient('B', 'Boron', bVal, 'ppm', 0.5, 1.5),
        assessNutrient('Cu', 'Copper', SOIL_SAMPLE.micro[4].val, 'ppm', 1.0, 3.0),
        assessNutrient('Mo', 'Molybdenum', SOIL_SAMPLE.micro[5].val, 'ppm', 0.1, 0.3),
      ],
      radar: [
        { subject: 'Nitrogen', value: Math.min((nVal / 80) * 100, 100) },
        { subject: 'Phosphorus', value: Math.min((pVal / 30) * 100, 100) },
        { subject: 'Potassium', value: Math.min((kVal / 200) * 100, 100) },
        { subject: 'Sulphur', value: Math.min((sVal / 20) * 100, 100) },
        { subject: 'Zinc', value: Math.min((znVal / 2.0) * 100, 100) },
        { subject: 'Organic C', value: Math.min((ocVal / 1.0) * 100, 100) },
      ]
    }

    // Simulate short processing time to feel 'real'
    setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(newSoil))
      setData(newSoil)
      generateMarketRecs(newSoil)
      setLoading(false)
    }, 600)

  }, [storageKey, generateMarketRecs])

  return { data, loading, error, updateSoilData, marketRecs }
}
