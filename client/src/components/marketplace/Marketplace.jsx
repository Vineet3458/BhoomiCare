import { useState }                from 'react'
import { useLang }                 from '../../context/LangContext.jsx'
import { useAuth }                 from '../../context/AuthContext.jsx'
import { useMarketplace }          from '../../hooks/useMarketplace.js'
import { MARKET_I18N, MARKET_NAV } from '../../data/i18n.js'
import { PRODUCT_CATEGORIES }      from '../../data/marketplace.js'
import ProductCard   from './ProductCard.jsx'
import CartDrawer    from './CartDrawer.jsx'
import SellForm      from './SellForm.jsx'
import {
  ShoppingCart, Search, SlidersHorizontal, Tag, ChevronDown,
  Truck, ShieldCheck, BadgePercent, Users, Star, ArrowRight, X
} from 'lucide-react'

// Category emoji map for filter pills
const CAT_EMOJI = {
  'All':             '🏪',
  'Fertilizers':     '🌿',
  'Organic Manure':  '🪱',
  'Pesticides':      '🧴',
  'Seeds':           '🌱',
  'Soil Amendments': '⚗️',
  'Irrigation':      '💧',
  'Tools & Equipment':'🔧',
  'Testing Kits':    '🧪',
  'Bio-Stimulants':  '🦠',
}

// ── Product Detail Panel ─────────────────────────────────────
function ProductDetail({ p, m, onBack, onAdd }) {
  const discount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-bold text-earth-600 hover:text-earth-900 mb-6 group">
        <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        {m.closeDetail}
      </button>

      <div className="bg-white rounded-3xl border border-earth-100 shadow-sm overflow-hidden">
        {/* Image banner */}
        <div className="bg-gradient-to-br from-earth-50 via-stone-100 to-earth-100 flex items-center justify-center h-52 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #c47318 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          />
          <span className="text-9xl drop-shadow-md">{p.image}</span>
          {p.badge && (
            <span className="absolute top-4 left-4 text-xs font-extrabold px-3 py-1 rounded-full bg-earth-500 text-white shadow">
              {p.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 right-4 text-xs font-extrabold px-3 py-1 rounded-full bg-moss-500 text-white shadow">
              {discount}% OFF
            </span>
          )}
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-xs text-earth-400 font-bold uppercase tracking-wider mb-1">{p.brand} · {p.category}</p>
              <h1 className="font-display font-bold text-earth-900 text-2xl">{p.name}</h1>
              <p className="text-sm text-earth-400 mt-1">{p.weight} · SKU: {p.sku}</p>
            </div>
            <div className="text-right">
              <div className="font-display font-bold text-4xl text-earth-900">₹{p.price.toLocaleString()}</div>
              {discount > 0 && (
                <div className="flex items-center gap-2 justify-end mt-1">
                  <span className="text-sm text-earth-400 line-through">{m.mrp} ₹{p.mrp.toLocaleString()}</span>
                  <span className="text-xs font-bold text-moss-600 bg-moss-50 border border-moss-200 px-2 py-0.5 rounded-full">
                    Save ₹{(p.mrp - p.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          {p.reviews > 0 && (
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1 bg-moss-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                <Star size={12} className="fill-white" /> {p.rating}
              </div>
              <span className="text-sm text-earth-500">{p.reviews.toLocaleString()} {m.reviews}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-earth-600 leading-relaxed mb-5">{p.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {p.tags?.map(tag => (
              <span key={tag} className="text-[11px] bg-earth-50 border border-earth-100 text-earth-600 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Seller info */}
          <div className="bg-gradient-to-br from-earth-50 to-stone-50 rounded-2xl p-4 mb-5 border border-earth-100">
            <p className="text-xs font-bold text-earth-500 uppercase tracking-wider mb-3">{m.seller}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">🏪</div>
              <div className="flex-1">
                <p className="font-bold text-earth-800 text-sm">{p.seller?.name}</p>
                <p className="text-xs text-earth-400">📍 {p.seller?.region}</p>
              </div>
              {p.seller?.verified && (
                <span className="flex items-center gap-1 text-[10px] bg-moss-50 border border-moss-200 text-moss-700 font-bold px-2 py-1 rounded-full">
                  <ShieldCheck size={11} /> Verified
                </span>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="mb-5">
            {p.stock > 0
              ? <div className="flex items-center gap-2 text-moss-700 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-moss-500 animate-pulse" />
                  {p.stock} {m.inStock}
                </div>
              : <span className="text-clay-600 font-bold text-sm">✗ {m.outOfStock}</span>
            }
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Truck size={12} />, text: 'Free delivery ₹2000+' },
              { icon: <ShieldCheck size={12} />, text: 'Quality guaranteed' },
              { icon: <BadgePercent size={12} />, text: 'Best price' },
            ].map(chip => (
              <div key={chip.text} className="flex items-center gap-1.5 bg-earth-50 border border-earth-100 px-3 py-1.5 rounded-full text-[11px] text-earth-600 font-semibold">
                {chip.icon} {chip.text}
              </div>
            ))}
          </div>

          <button onClick={() => { onAdd(p); onBack() }}
            disabled={p.stock === 0}
            className="w-full bg-earth-500 hover:bg-earth-600 disabled:bg-earth-200 text-white font-bold py-4 rounded-2xl text-sm transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
            <ShoppingCart size={16} /> {m.addCart}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Marketplace ─────────────────────────────────────────
export default function Marketplace({ onLoginRequired }) {
  const { lang }  = useLang()
  const { user }  = useAuth()
  const m = (MARKET_I18N[lang] ?? MARKET_I18N.en)

  const {
    products, category, setCategory,
    search, setSearch, sortBy, setSortBy,
    cart, addToCart, removeFromCart, updateQty, cartTotal, cartCount,
    wishlist, toggleWishlist,
    addListing, myListings,
    selectedProduct, setSelectedProduct,
  } = useMarketplace()

  const [cartOpen,  setCartOpen ] = useState(false)
  const [activeTab, setActiveTab] = useState('buy')
  const [orderDone, setOrderDone] = useState(false)

  function handleAdd(product) {
    if (!user) { onLoginRequired(); return }
    addToCart(product)
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        return resolve(true)
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  async function handleCheckout() {
    if (cart.length === 0) return

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal, currency: 'INR' })
      })
      const order = await res.json()
      
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        alert("Razorpay SDK failed to load.")
        return
      }

      const options = {
        key: 'rzp_test_dummykey',
        amount: order.amount,
        currency: order.currency,
        name: "Bhoomi Care Marketplace",
        description: "Farming Essentials & Nutrition",
        order_id: order.id.startsWith('order_mock_') ? undefined : order.id, 
        handler: function (response) {
            setCartOpen(false)
            setOrderDone(true)
            setTimeout(() => setOrderDone(false), 5000)
            // Ideally clearCart() would be called here
        },
        prefill: {
            name: user?.name || "Farmer",
            contact: "9999999999"
        },
        theme: {
            color: "#6b461c"
        }
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (err) {
      console.error(err)
      alert('Error initiating checkout.')
    }
  }

  function handleSell(form) {
    if (!user) { onLoginRequired(); return }
    addListing(form, user.name, user.region)
  }

  // Product detail panel
  if (selectedProduct) {
    return (
      <ProductDetail
        p={selectedProduct} m={m}
        onBack={() => setSelectedProduct(null)}
        onAdd={handleAdd}
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-earth-800 via-earth-700 to-earth-900 rounded-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(196,115,24,0.3) 24px, rgba(196,115,24,0.3) 25px)' }}
        />
        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-3">
                <span className="w-1.5 h-1.5 bg-moss-400 rounded-full animate-pulse" />
                <span className="text-[11px] font-bold text-white/80">Live Marketplace · {products.length + myListings.length} Products</span>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">{m.title}</h1>
              <p className="text-earth-300 text-sm">{m.subtitle}</p>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { icon: <Users size={11} />, text: '50,000+ Farmers' },
                  { icon: <ShieldCheck size={11} />, text: 'Verified Sellers' },
                  { icon: <Truck size={11} />, text: 'Free Delivery ₹2000+' },
                ].map(b => (
                  <div key={b.text} className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {b.icon} {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Cart button */}
            <button onClick={() => user ? setCartOpen(true) : onLoginRequired()}
              className="relative flex items-center gap-2 bg-white text-earth-800 hover:bg-earth-50 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-sm active:scale-95">
              <ShoppingCart size={15} /> {m.cartTitle}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-clay-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Order confirmation toast */}
      {orderDone && (
        <div className="mb-6 bg-moss-50 border border-moss-200 text-moss-800 rounded-2xl px-5 py-4 flex items-center gap-3 animate-slide-up">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold text-sm">Order Placed Successfully!</p>
            <p className="text-xs text-moss-600">{m.orderConfirm}</p>
          </div>
          <button onClick={() => setOrderDone(false)} className="ml-auto text-moss-400 hover:text-moss-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Login required notice */}
      {!user && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 px-5 py-3.5">
          <span className="text-xl">🔐</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-800">Login to buy & sell</p>
            <p className="text-xs text-amber-600">Create a free account to add items to cart or post your listings</p>
          </div>
          <button onClick={onLoginRequired}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
            Login / Register
          </button>
        </div>
      )}

      {/* Buy / Sell tabs */}
      <div className="flex gap-1 bg-earth-100 rounded-xl p-1 mb-6 w-fit">
        {[{ k: 'buy', icon: '🛒', label: 'Browse & Buy' }, { k: 'sell', icon: '📦', label: m.sellTab }].map(tb => (
          <button key={tb.k} onClick={() => setActiveTab(tb.k)}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-bold transition-all
              ${activeTab === tb.k ? 'bg-white text-earth-800 shadow-sm' : 'text-earth-400 hover:text-earth-700'}`}>
            {tb.icon} {tb.label}
          </button>
        ))}
      </div>

      {activeTab === 'sell' ? (
        <SellForm onSubmit={handleSell} sellerName={user?.name} m={m} />
      ) : (
        <>
          {/* Search + Sort row */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder={m.searchPlaceholder}
                className="w-full border border-earth-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-earth-800 bg-white focus:outline-none focus:border-earth-400 focus:ring-2 focus:ring-earth-200 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-600">
                  <X size={13} />
                </button>
              )}
            </div>
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="border border-earth-200 rounded-xl pl-9 pr-8 py-2.5 text-sm text-earth-700 bg-white focus:outline-none focus:border-earth-400 appearance-none cursor-pointer">
                <option value="popular">{m.sortOptions.popular}</option>
                <option value="price-asc">{m.sortOptions.priceAsc}</option>
                <option value="price-desc">{m.sortOptions.priceDesc}</option>
                <option value="rating">{m.sortOptions.rating}</option>
              </select>
              <SlidersHorizontal size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400 pointer-events-none" />
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 pointer-events-none" />
            </div>
          </div>

          {/* Category filter — scrollable pill row */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-5">
            {PRODUCT_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all flex-shrink-0 border
                  ${category === cat
                    ? 'bg-earth-500 text-white border-earth-500 shadow-sm'
                    : 'bg-white border-earth-200 text-earth-600 hover:bg-earth-50 hover:border-earth-300'}`}>
                <span className="text-sm leading-none">{CAT_EMOJI[cat] || '📦'}</span>
                {cat}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3 mb-6 text-[11px] text-earth-400 font-semibold bg-earth-50 border border-earth-100 rounded-xl px-4 py-2.5">
            <span className="flex items-center gap-1"><Tag size={11} /> <strong className="text-earth-700">{products.length}</strong> products</span>
            <span className="text-earth-200">·</span>
            <span className="flex items-center gap-1"><ShieldCheck size={11} /> <strong className="text-earth-700">20+</strong> verified sellers</span>
            <span className="text-earth-200">·</span>
            <span className="flex items-center gap-1"><Truck size={11} /> Free delivery on ₹2000+</span>
            <span className="text-earth-200">·</span>
            <span className="flex items-center gap-1"><Users size={11} /> <strong className="text-earth-700">50,000+</strong> farmers trust us</span>
          </div>

          {/* My Listings banner */}
          {myListings.length > 0 && (
            <div className="bg-earth-50 border border-earth-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <p className="text-sm font-bold text-earth-800">You have {myListings.length} active listing{myListings.length > 1 ? 's' : ''}</p>
                <p className="text-xs text-earth-500">Your products are visible to all buyers</p>
              </div>
            </div>
          )}

          {/* Product grid */}
          {products.length === 0 ? (
            <div className="text-center py-20 text-earth-400">
              <div className="text-6xl mb-4">🌾</div>
              <p className="font-bold text-lg mb-2">{m.emptySearch}</p>
              <p className="text-sm text-earth-300 mb-4">Try searching with different keywords</p>
              <button onClick={() => { setSearch(''); setCategory('All') }}
                className="text-sm font-bold text-earth-600 hover:text-earth-800 underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {products.map(p => (
                <ProductCard
                  key={p.id} product={p} m={m}
                  onAdd={handleAdd}
                  onWishlist={toggleWishlist}
                  wishlisted={wishlist.includes(p.id)}
                  onView={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <CartDrawer
          cart={cart} m={m}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          cartTotal={cartTotal}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  )
}
