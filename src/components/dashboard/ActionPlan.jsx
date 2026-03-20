// Renders the translated list of actionable soil recommendations.
import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react'
import Card from '../ui/Card.jsx'

export default function ActionPlan({ title, items }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-earth-500" />
        <h2 className="font-display font-bold text-earth-900 text-lg">{title}</h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-earth-50 border border-earth-100 animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                ${i % 2 === 0 ? 'bg-clay-100' : 'bg-moss-100'}`}
            >
              {i % 2 === 0
                ? <AlertTriangle size={10} className="text-clay-600" />
                : <CheckCircle2  size={10} className="text-moss-600"  />}
            </div>
            <p className="text-sm text-earth-700 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
