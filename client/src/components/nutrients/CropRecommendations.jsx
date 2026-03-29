import React from 'react'
import Card from '../ui/Card.jsx'

export default function CropRecommendations({ data }) {
  // Logic to determine suitable crops based on NPK, pH, EC, etc.
  const getSuitableCrops = () => {
    let crops = [
      { name: 'Wheat', reqPh: [6.0, 7.5], nReq: 'High', pReq: 'Medium', kReq: 'Medium', desc: 'Needs adequate Nitrogen for tillering.', icon: '🌾' },
      { name: 'Rice', reqPh: [5.5, 6.5], nReq: 'High', pReq: 'Medium', kReq: 'Medium', desc: 'Thrives in slightly acidic soil.', icon: '🍚' },
      { name: 'Cotton', reqPh: [5.8, 8.0], nReq: 'High', pReq: 'Medium', kReq: 'High', desc: 'Requires good Potassium for boll development.', icon: '🧶' },
      { name: 'Sugarcane', reqPh: [6.5, 7.5], nReq: 'High', pReq: 'High', kReq: 'High', desc: 'Heavy nutrient feeder.', icon: '🎋' },
      { name: 'Chickpea', reqPh: [6.0, 7.0], nReq: 'Low', pReq: 'High', kReq: 'Low', desc: 'Legume, requires less Nitrogen.', icon: '🧆' },
      { name: 'Soybean', reqPh: [6.0, 6.8], nReq: 'Low', pReq: 'Medium', kReq: 'Medium', desc: 'Good for moderate soils.', icon: '🫘' },
      { name: 'Potato', reqPh: [5.0, 6.5], nReq: 'High', pReq: 'High', kReq: 'High', desc: 'Requires loose, highly fertile soil.', icon: '🥔' },
    ]

    const ph = data.pH || 6.5;
    
    // N, P, K vals
    const n = data.macro.find(m => m.sym === 'N')?.val || 0;
    const p = data.macro.find(m => m.sym === 'P')?.val || 0;
    const k = data.macro.find(m => m.sym === 'K')?.val || 0;

    return crops.map(crop => {
      let score = 100;

      // pH penalty
      if (ph < crop.reqPh[0]) score -= (crop.reqPh[0] - ph) * 20;
      if (ph > crop.reqPh[1]) score -= (ph - crop.reqPh[1]) * 20;

      // NPK basic matching (very simplified heuristic)
      if (crop.nReq === 'High' && n < 40) score -= 15;
      if (crop.pReq === 'High' && p < 20) score -= 15;
      if (crop.kReq === 'High' && k < 150) score -= 15;

      return { ...crop, matchScore: Math.max(0, Math.round(score)) };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const recommendations = getSuitableCrops();

  return (
    <div className="animate-fade-in pb-8">
      <Card className="p-6">
        <h2 className="text-xl font-display font-bold text-earth-900 mb-2">Suitable Crops for Your Soil</h2>
        <p className="text-sm text-earth-600 mb-6">Based on your current soil nutrient levels (pH: {data.pH}, NPK), here are the crops that would thrive best.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.slice(0, 4).map(crop => (
            <div key={crop.name} className="flex items-start gap-4 p-4 border border-earth-100 rounded-xl bg-earth-50 hover:bg-earth-100 transition-colors">
              <div className="text-4xl bg-white p-2 rounded-xl shadow-sm">{crop.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-earth-900 text-lg">{crop.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${crop.matchScore > 80 ? 'bg-moss-100 text-moss-700' : 'bg-amber-100 text-amber-700'}`}>
                    {crop.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-earth-500 mb-2">Ideal pH: {crop.reqPh[0]} - {crop.reqPh[1]}</p>
                <p className="text-sm text-earth-700">{crop.desc}</p>
                
                {crop.matchScore < 100 && crop.matchScore >= 40 && (
                   <p className="text-[10px] text-earth-500 mt-2 bg-white px-2 py-1 rounded">
                     * Fertilizer adjustments recommended to achieve optimal yield.
                   </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
