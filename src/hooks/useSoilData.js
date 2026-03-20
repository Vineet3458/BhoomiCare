import { useState, useEffect } from 'react'
import { SOIL_SAMPLE } from '../data/soilData.js'

// Encapsulates soil data fetching.
// Currently returns static data — swap the useEffect body for a real API call
// (e.g. fetch('/api/soil-samples/latest')) without changing any consumer component.
export function useSoilData() {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    // Simulate async fetch delay
    const id = setTimeout(() => {
      try {
        setData(SOIL_SAMPLE)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(id)
  }, [])

  return { data, loading, error }
}
