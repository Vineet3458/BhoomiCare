// Recharts radar chart for the nutrient spider overview.
import {
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

export default function RadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReRadarChart data={data} outerRadius={72}>
        <PolarGrid stroke="#f2d9b0" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 9, fill: '#9e5912', fontFamily: 'Nunito, sans-serif' }}
        />
        <Radar
          dataKey="value"
          stroke="#c47318"
          fill="#c47318"
          fillOpacity={0.22}
          strokeWidth={2}
        />
        <Tooltip
          formatter={v => [`${v}%`, 'Score']}
          contentStyle={{ borderRadius: 10, border: '1px solid #f2d9b0', fontSize: 12 }}
        />
      </ReRadarChart>
    </ResponsiveContainer>
  )
}
