import { useState } from 'react'
import { SELL_CATEGORIES, UNITS } from '../../data/marketplace.js'
import { PlusCircle, CheckCircle2, Package, Truck, PhoneCall, Info } from 'lucide-react'

export default function SellForm({ onSubmit, sellerName, m }) {
  const [form, setForm] = useState({
    name: '', category: SELL_CATEGORIES[0], price: '',
    qty: '', unit: UNITS[0], description: '', contact: '',
  })
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState({})

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Product name is required'
    if (!form.price || Number(form.price) <= 0) e.price = 'Enter a valid price'
    if (!form.qty || Number(form.qty) <= 0) e.qty = 'Enter a valid quantity'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
    setDone(true)
    setTimeout(() => setDone(false), 4000)
    setForm({ name: '', category: SELL_CATEGORIES[0], price: '', qty: '', unit: UNITS[0], description: '', contact: '' })
    setErrors({})
  }

  const inputCls = (err) => `w-full border ${err ? 'border-clay-400 bg-clay-50' : 'border-earth-200'} rounded-xl px-3 py-2.5 text-sm text-earth-800 bg-white focus:outline-none focus:border-earth-400 focus:ring-2 focus:ring-earth-200 transition-all`
  const labelCls = 'block text-[11px] font-bold text-earth-600 uppercase tracking-wider mb-1.5'

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="w-20 h-20 bg-moss-50 border-2 border-moss-200 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 size={36} className="text-moss-600" />
        </div>
        <h3 className="font-display font-bold text-earth-900 text-xl mb-2">Listing Posted! 🎉</h3>
        <p className="text-earth-500 text-sm text-center max-w-xs">
          Your product is now visible to thousands of farmers on Bhoomi Care Marketplace.
        </p>
        <div className="mt-6 bg-earth-50 rounded-2xl p-4 max-w-sm text-center">
          <p className="text-xs text-earth-500">📞 Buyers will contact you on your provided number</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-earth-800 to-earth-900 rounded-2xl p-5 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 text-5xl opacity-20">🌾</div>
        <div className="relative z-10">
          <h2 className="font-display font-bold text-xl mb-1">{m.sellTitle}</h2>
          <p className="text-earth-300 text-sm">Reach thousands of farmers across India</p>
        </div>
        <div className="relative z-10 flex gap-4 mt-4">
          {[
            { icon: <Package size={14} />, label: 'Instant Listing' },
            { icon: <Truck size={14} />, label: 'Direct to Buyer' },
            { icon: <PhoneCall size={14} />, label: 'Zero Commission' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
              <span className="text-earth-300">{item.icon}</span>
              <span className="text-xs font-bold text-earth-200">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Seller badge */}
      {sellerName && (
        <div className="bg-moss-50 border border-moss-200 rounded-xl px-4 py-2.5 mb-5 flex items-center gap-2">
          <span className="text-lg">👨‍🌾</span>
          <div>
            <p className="text-xs font-bold text-moss-800">Listing as <span className="text-moss-600">{sellerName}</span></p>
            <p className="text-[10px] text-moss-600">Your contact number will be shared with buyers</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Name */}
          <div className="sm:col-span-2">
            <label className={labelCls}>{m.sellFields.name}</label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Urea 50kg bags (5 bags available)"
              className={inputCls(errors.name)}
            />
            {errors.name && <p className="text-[10px] text-clay-600 mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className={labelCls}>{m.sellFields.category}</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls()}>
              {SELL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className={labelCls}>{m.sellFields.price}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500 font-bold text-sm">₹</span>
              <input
                type="number" min="1"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="0"
                className={`${inputCls(errors.price)} pl-7`}
              />
            </div>
            {errors.price && <p className="text-[10px] text-clay-600 mt-1">{errors.price}</p>}
          </div>

          {/* Qty + Unit */}
          <div>
            <label className={labelCls}>{m.sellFields.qty}</label>
            <input
              type="number" min="1"
              value={form.qty}
              onChange={e => set('qty', e.target.value)}
              placeholder="0"
              className={inputCls(errors.qty)}
            />
            {errors.qty && <p className="text-[10px] text-clay-600 mt-1">{errors.qty}</p>}
          </div>

          <div>
            <label className={labelCls}>{m.sellFields.unit}</label>
            <select value={form.unit} onChange={e => set('unit', e.target.value)} className={inputCls()}>
              {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          {/* Contact */}
          <div>
            <label className={labelCls}>{m.sellFields.contact}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400">📱</span>
              <input
                value={form.contact}
                onChange={e => set('contact', e.target.value)}
                placeholder="9876543210"
                className={`${inputCls()} pl-9`}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>{m.sellFields.desc}</label>
            <input
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Condition, storage, expiry…"
              className={inputCls()}
            />
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2 bg-sky-50 border border-sky-200 rounded-xl p-3">
          <Info size={14} className="text-sky-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-sky-700">
            <strong>Free listing.</strong> Buyers will contact you directly via your provided number. Bhoomi Care does not handle payments or logistics.
          </p>
        </div>

        <button type="submit"
          className="flex items-center gap-2 bg-earth-500 hover:bg-earth-600 text-white font-bold px-7 py-3.5 rounded-2xl text-sm transition-all active:scale-95 shadow-sm">
          <PlusCircle size={16} /> {m.sellBtn}
        </button>
      </form>
    </div>
  )
}
