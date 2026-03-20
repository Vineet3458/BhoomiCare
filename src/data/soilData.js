// Static soil sample data.
// In production, replace with an API call (see hooks/useSoilData.js).

export const SOIL_SAMPLE = {
  id: 'sample-001',
  field: 'Survey No. 47/2, Nashik District',
  season: 'Rabi 2024–25',
  testDate: '14 Nov 2024',
  score: 72,
  pH: 6.8,
  ec: 0.42,
  oc: 0.68,

  macro: [
    {
      sym: 'N', name: 'Nitrogen', val: 38, unit: 'kg/ha',
      min: 40, max: 80, status: 'deficient', color: '#55ae3a',
      recommendation: 'Apply 45 kg/ha Urea before sowing',
    },
    {
      sym: 'P', name: 'Phosphorus', val: 22, unit: 'kg/ha',
      min: 15, max: 30, status: 'optimal', color: '#0ea5e9',
      recommendation: 'Levels adequate — no action needed',
    },
    {
      sym: 'K', name: 'Potassium', val: 185, unit: 'kg/ha',
      min: 120, max: 200, status: 'optimal', color: '#e8ac58',
      recommendation: 'Good potassium levels maintained',
    },
    {
      sym: 'S', name: 'Sulphur', val: 8, unit: 'ppm',
      min: 10, max: 20, status: 'deficient', color: '#a78bfa',
      recommendation: 'Apply Gypsum 200 kg/ha',
    },
  ],

  micro: [
    { sym: 'Zn', name: 'Zinc',       val: 0.45, unit: 'ppm', min: 0.6, max: 2.0, status: 'deficient', color: '#f87171' },
    { sym: 'Fe', name: 'Iron',       val: 4.8,  unit: 'ppm', min: 4.5, max: 8.0, status: 'optimal',   color: '#fb923c' },
    { sym: 'Mn', name: 'Manganese',  val: 3.2,  unit: 'ppm', min: 2.0, max: 5.0, status: 'optimal',   color: '#34d399' },
    { sym: 'B',  name: 'Boron',      val: 0.38, unit: 'ppm', min: 0.5, max: 1.5, status: 'deficient', color: '#818cf8' },
    { sym: 'Cu', name: 'Copper',     val: 1.8,  unit: 'ppm', min: 1.0, max: 3.0, status: 'optimal',   color: '#f472b6' },
    { sym: 'Mo', name: 'Molybdenum', val: 0.12, unit: 'ppm', min: 0.1, max: 0.3, status: 'optimal',   color: '#94a3b8' },
  ],

  trend: [
    { month: 'Jun', N: 35, P: 20, K: 170 },
    { month: 'Jul', N: 33, P: 21, K: 175 },
    { month: 'Aug', N: 30, P: 22, K: 178 },
    { month: 'Sep', N: 32, P: 22, K: 180 },
    { month: 'Oct', N: 36, P: 22, K: 182 },
    { month: 'Nov', N: 38, P: 22, K: 185 },
  ],

  radar: [
    { subject: 'Nitrogen',   value: 48 },
    { subject: 'Phosphorus', value: 73 },
    { subject: 'Potassium',  value: 92 },
    { subject: 'Sulphur',    value: 40 },
    { subject: 'Zinc',       value: 30 },
    { subject: 'Organic C',  value: 56 },
  ],
}
