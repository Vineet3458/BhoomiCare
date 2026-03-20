// NPK trend line chart using Recharts.
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts'
import Card from '../ui/Card.jsx'

export default function TrendChart({ data, title }) {
  return (
    <Card className="p-5">
      <p className="text-[11px] font-bold text-earth-500 uppercase tracking-wider mb-4">
        {title}
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f2d9b0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9e5912', fontFamily: 'Nunito, sans-serif' }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#c4a882', fontFamily: 'Nunito, sans-serif' }}
            width={32}
          />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #f2d9b0', fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {/* Min-N reference line — visual alert */}
          <ReferenceLine y={40} stroke="#55ae3a" strokeDasharray="4 4" />
          <Line
            type="monotone" dataKey="N" name="Nitrogen"
            stroke="#55ae3a" strokeWidth={2.5}
            dot={{ r: 4, fill: '#55ae3a' }}
          />
          <Line
            type="monotone" dataKey="P" name="Phosphorus"
            stroke="#0ea5e9" strokeWidth={2.5}
            dot={{ r: 4, fill: '#0ea5e9' }}
          />
          <Line
            type="monotone" dataKey="K" name="Potassium"
            stroke="#e8ac58" strokeWidth={2.5}
            dot={{ r: 4, fill: '#e8ac58' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
