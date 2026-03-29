import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

export default function CartDrawer({ cart, onClose, onUpdateQty, onRemove, cartTotal, m, onCheckout }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-earth-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-earth-500" />
            <h2 className="font-display font-bold text-earth-900">{m.cartTitle}</h2>
            <span className="bg-earth-100 text-earth-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((s, c) => s + c.qty, 0)} {m.cartItems}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-earth-50 text-earth-400">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-earth-400">
              <ShoppingBag size={40} className="mb-3 opacity-30" />
              <p className="font-semibold text-sm">{m.cartEmpty}</p>
            </div>
          ) : cart.map(({ product, qty }) => (
            <div key={product.id} className="flex items-start gap-3 bg-earth-50 rounded-2xl p-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                {product.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-earth-900 text-sm leading-snug line-clamp-1">{product.name}</p>
                <p className="text-[11px] text-earth-400">{product.weight}</p>
                <p className="font-display font-bold text-earth-800 mt-1">₹{product.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => onRemove(product.id)} className="text-earth-300 hover:text-clay-500 transition-colors">
                  <Trash2 size={13} />
                </button>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => onUpdateQty(product.id, qty - 1)}
                    className="w-6 h-6 rounded-lg bg-white border border-earth-200 flex items-center justify-center hover:bg-earth-100 transition-colors">
                    <Minus size={10} />
                  </button>
                  <span className="text-sm font-bold text-earth-800 w-5 text-center">{qty}</span>
                  <button onClick={() => onUpdateQty(product.id, qty + 1)}
                    className="w-6 h-6 rounded-lg bg-white border border-earth-200 flex items-center justify-center hover:bg-earth-100 transition-colors">
                    <Plus size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-earth-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-earth-700">{m.cartTotal}</span>
              <span className="font-display font-bold text-earth-900 text-xl">₹{cartTotal.toLocaleString()}</span>
            </div>
            <button onClick={onCheckout}
              className="w-full bg-moss-600 hover:bg-moss-700 text-white font-bold py-3 rounded-2xl text-sm transition-all active:scale-95 shadow-sm">
              {m.checkout} →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
