import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-react'

const BADGE_STYLES = {
  'Best Seller':      'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  'Popular':          'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
  'Organic':          'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
  'Recommended':      'bg-gradient-to-r from-sky-500 to-cyan-500 text-white',
  'Certified':        'bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
  'New':              'bg-gradient-to-r from-rose-500 to-pink-500 text-white',
  'Subsidy Available':'bg-gradient-to-r from-purple-600 to-violet-600 text-white',
  'New Listing':      'bg-gradient-to-r from-earth-400 to-earth-500 text-white',
  'Hot Deal':         'bg-gradient-to-r from-red-500 to-orange-600 text-white',
}

const CATEGORY_ICONS = {
  'Fertilizers':       '🌿',
  'Organic Manure':    '🪱',
  'Pesticides':        '🧴',
  'Seeds':             '🌱',
  'Soil Amendments':   '⚗️',
  'Irrigation':        '💧',
  'Tools & Equipment': '🔧',
  'Testing Kits':      '🧪',
}

export default function ProductCard({ product, onAdd, onWishlist, wishlisted, onView, m }) {
  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0

  const categoryIcon = CATEGORY_ICONS[product.category] || '📦'

  return (
    <div
      className="bg-white rounded-2xl border border-earth-100 shadow-sm lift overflow-hidden flex flex-col group cursor-pointer"
      onClick={() => onView(product)}
    >
      {/* Product image area */}
      <div className="relative bg-gradient-to-br from-earth-50 to-stone-100 flex items-center justify-center h-36 overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #c47318 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />
        <span className="text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
          {product.image}
        </span>

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-sm ${BADGE_STYLES[product.badge] ?? 'bg-earth-200 text-earth-700'}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); onWishlist(product.id) }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110
            ${wishlisted ? 'bg-clay-50 border border-clay-200' : 'bg-white/90 backdrop-blur-sm'}`}
        >
          <Heart size={12} className={wishlisted ? 'fill-clay-500 text-clay-500' : 'text-earth-300'} />
        </button>

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute bottom-2 left-2 text-[9px] font-extrabold bg-moss-500 text-white px-1.5 py-0.5 rounded-full">
            {discount}% OFF
          </span>
        )}

        {/* Verified tag */}
        {product.seller?.verified && (
          <span className="absolute bottom-2 right-2 text-[9px] bg-white/90 text-moss-700 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            ✓ Verified
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[9px]">{categoryIcon}</span>
          <p className="text-[9px] text-earth-400 font-bold uppercase tracking-wider">{product.brand}</p>
        </div>
        <h3 className="font-bold text-earth-900 text-sm leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-[10px] text-earth-400 mb-2">{product.weight}</p>

        {/* Rating */}
        {product.reviews > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5 bg-moss-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              <Star size={7} className="fill-white" /> {product.rating}
            </div>
            <span className="text-[9px] text-earth-400">({product.reviews.toLocaleString()})</span>
          </div>
        )}

        {/* Region */}
        <p className="text-[10px] text-earth-400 mb-2 truncate">📍 {product.seller?.region}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-3 mt-auto">
          <span className="font-display font-bold text-earth-900 text-lg leading-none">₹{product.price.toLocaleString()}</span>
          {discount > 0 && (
            <span className="text-[10px] text-earth-400 line-through">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1.5">
          <button
            onClick={e => { e.stopPropagation(); onAdd(product) }}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-bold transition-all active:scale-95
              bg-earth-500 hover:bg-earth-600 disabled:bg-earth-200 text-white shadow-sm"
          >
            {product.stock === 0
              ? <span>Out of Stock</span>
              : <><ShoppingCart size={11} /> {m.addCart}</>}
          </button>
          <button
            onClick={e => { e.stopPropagation(); onView(product) }}
            className="w-8 h-8 flex items-center justify-center bg-earth-50 hover:bg-earth-100 border border-earth-200 rounded-xl transition-colors"
          >
            <Eye size={12} className="text-earth-500" />
          </button>
        </div>
      </div>
    </div>
  )
}
