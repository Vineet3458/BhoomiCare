import { useState, useMemo } from 'react'
import { SCHEMES } from '../data/schemes.js'

// Filter + eligibility logic for schemes page.
// Keeps filter state and derived list co-located; no state scattered in the page component.
export function useSchemes() {
  const [category, setCategory]   = useState('All')
  const [eligOnly, setEligOnly]   = useState(false)
  const [expanded, setExpanded]   = useState({})

  const filtered = useMemo(
    () =>
      SCHEMES.filter(s =>
        (category === 'All' || s.category === category) &&
        (!eligOnly || s.eligible)
      ),
    [category, eligOnly]
  )

  function toggleExpand(id) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function toggleEligOnly() {
    setEligOnly(prev => !prev)
  }

  return {
    schemes: filtered,
    category, setCategory,
    eligOnly, toggleEligOnly,
    expanded, toggleExpand,
  }
}
