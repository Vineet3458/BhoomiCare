import { useState }       from 'react'
import { useLang }         from '../../context/LangContext.jsx'
import { useSoilData }     from '../../hooks/useSoilData.js'
import NutrientBar         from './NutrientBar.jsx'
import TrendChart          from './TrendChart.jsx'
import CropRecommendations from './CropRecommendations.jsx'
import Card                from '../ui/Card.jsx'
import {
  BarChart, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

function ViewToggle({ view, setView, t }) {
  return (
    <div className="flex gap-1 bg-earth-100 rounded-xl p-1">
      {[
        { k: 'bars',  l: t.nutrients.barsTab || 'Bars' },
        { k: 'trend', l: t.nutrients.trendTab || 'Trend' },
        { k: 'crops', l: 'Crops' },
      ].map(v => (
        <button
          key={v.k}
          onClick={() => setView(v.k)}
          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all
            ${view === v.k
              ? 'bg-white text-earth-800 shadow-sm'
              : 'text-earth-400 hover:text-earth-700'}`}
        >
          {v.l}
        </button>
      ))}
    </div>
  )
}

export default function NutrientViz() {
  const { t }             = useLang()
  const { data, loading } = useSoilData()
  const [view, setView]   = useState('bars')
  const nt                = t.nutrients

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64 text-earth-400 font-semibold">
        Loading…
      </div>
    )
  }

  const allNutrients = [...data.macro, ...data.micro]
  const overviewData = allNutrients.map(n => ({
    name: n.sym, value: n.val, fill: n.color,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-earth-900">
            {nt.title}
          </h1>
          <p className="text-earth-500 text-sm mt-1">{nt.subtitle}</p>
        </div>
        <ViewToggle view={view} setView={setView} t={t} />
      </div>

      {/* Status legend */}
      <div className="flex gap-4 mb-6">
        {[
          { k: 'optimal',   lbl: nt.optimal,   cls: 'bg-moss-500'  },
          { k: 'deficient', lbl: nt.deficient,  cls: 'bg-clay-500'  },
          { k: 'excess',    lbl: nt.excess,     cls: 'bg-amber-400' },
        ].map(l => (
          <div key={l.k} className="flex items-center gap-1.5 text-xs font-bold text-earth-600">
            <span className={`w-2.5 h-2.5 rounded-full ${l.cls}`} />
            {l.lbl}
          </div>
        ))}
      </div>

      {view === 'bars' ? (
        <>
          {/* Macro */}
          <p className="text-[11px] font-bold text-earth-400 uppercase tracking-widest mb-3">
            {nt.macro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
            {data.macro.map(n => (
              <NutrientBar key={n.sym} nutrient={n} t={t} />
            ))}
          </div>

          {/* Micro */}
          <p className="text-[11px] font-bold text-earth-400 uppercase tracking-widest mb-3">
            {nt.micro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
            {data.micro.map(n => (
              <NutrientBar key={n.sym} nutrient={n} t={t} maxOverride={n.max * 1.5} />
            ))}
          </div>

          {/* Overview bar chart */}
          <Card className="p-5">
            <p className="text-[11px] font-bold text-earth-500 uppercase tracking-wider mb-4">
              All Nutrients Overview
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={overviewData} barSize={30}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2d9b0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#9e5912', fontFamily: 'Nunito, sans-serif' }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#c4a882', fontFamily: 'Nunito, sans-serif' }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #f2d9b0', fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {overviewData.map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </>
      ) : view === 'trend' ? (
        <TrendChart data={data.trend} title={nt.trendTitle} />
      ) : (
        <CropRecommendations data={data} />
      )}
    </div>
  )
}
