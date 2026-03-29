import { useState, useMemo, useCallback } from 'react'
import { PRODUCTS } from '../data/marketplace.js'

export function useMarketplace() {
  const [category,   setCategory  ] = useState('All')
  const [search,     setSearch    ] = useState('')
  const [sortBy,     setSortBy    ] = useState('popular')  // popular | price-asc | price-desc | rating
  const [cart,       setCart      ] = useState([])         // [{ product, qty }]
  const [wishlist,   setWishlist  ] = useState([])         // [productId]
  const [myListings, setMyListings] = useState([])         // seller's own listings
  const [selectedProduct, setSelectedProduct] = useState(null) // for detail view

  // ── Filtered + sorted products ──────────────────────────
  const products = useMemo(() => {
    let list = [...PRODUCTS, ...myListings]

    if (category !== 'All') {
      list = list.filter(p => p.category === category)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break
      default:           list.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0))
    }

    return list
  }, [category, search, sortBy, myListings])

  // ── Cart ────────────────────────────────────────────────
  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.product.id === product.id)
      if (existing) {
        return prev.map(c => c.product.id === product.id ? { ...c, qty: c.qty + qty } : c)
      }
      return [...prev, { product, qty }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(c => c.product.id !== productId))
  }, [])

  const updateQty = useCallback((productId, qty) => {
    if (qty < 1) { removeFromCart(productId); return }
    setCart(prev => prev.map(c => c.product.id === productId ? { ...c, qty } : c))
  }, [removeFromCart])

  const cartTotal = useMemo(
    () => cart.reduce((sum, c) => sum + c.product.price * c.qty, 0),
    [cart]
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty, 0),
    [cart]
  )

  // ── Wishlist ────────────────────────────────────────────
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }, [])

  // ── Sell listing ────────────────────────────────────────
  const addListing = useCallback((listing, sellerName, sellerRegion) => {
    const newProduct = {
      id:       Date.now(),
      category: listing.category,
      name:     listing.name,
      brand:    sellerName,
      weight:   `${listing.qty} ${listing.unit}`,
      price:    Number(listing.price),
      mrp:      Number(listing.price),
      unit:     listing.unit,
      rating:   0,
      reviews:  0,
      stock:    Number(listing.qty),
      seller:   { name: sellerName, region: sellerRegion, verified: false },
      badge:    'New Listing',
      tags:     [listing.category],
      description: listing.description || 'Listed by a verified farmer on Bhoomi Care.',
      image:    '🌾',
      sku:      `USER-${Date.now()}`,
      isUserListing: true,
    }
    setMyListings(prev => [newProduct, ...prev])
    return newProduct
  }, [])

  return {
    products, category, setCategory,
    search, setSearch,
    sortBy, setSortBy,
    cart, addToCart, removeFromCart, updateQty, cartTotal, cartCount,
    wishlist, toggleWishlist,
    myListings, addListing,
    selectedProduct, setSelectedProduct,
  }
}
