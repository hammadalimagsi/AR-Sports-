import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ShoppingCart,
  MessageSquare,
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
  Box,
  ZoomIn
} from 'lucide-react';
import Product3DViewer from './Product3DViewer';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ product, onBack, onOpenCart, onOpenCustomizer }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState(product.has3D ? '3d' : 'gallery'); // '3d' or 'gallery'
  const [justAdded, setJustAdded] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, {
      quantity,
      size: selectedSize,
      color: selectedColor
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleDirectWhatsAppOrder = () => {
    const text = `Salam AR Sports!\n\nI want to order the following sports equipment:\n- Product: ${product.name} (${product.id})\n- Price: PKR ${product.price.toLocaleString()}\n- Quantity: ${quantity}\n- Size: ${selectedSize || 'Standard'}\n- Color: ${selectedColor || 'Standard'}\n- Total Value: PKR ${(product.price * quantity).toLocaleString()}\n\nPlease confirm availability and dispatch to my city.`;
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-colors duration-200">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-400 light:text-slate-600 hover:text-sports-orange transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Equipment Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Media (Gallery or 3D Viewer) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Mode Switcher */}
          {product.has3D && (
            <div className="flex items-center gap-2 bg-[#101623] dark:bg-[#101623] light:bg-slate-100 p-1.5 rounded-2xl border border-gray-800 dark:border-gray-800 light:border-slate-200 w-fit shadow-md">
              <button
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  viewMode === '3d'
                    ? 'bg-sports-orange text-white shadow'
                    : 'text-gray-400 dark:text-gray-400 light:text-slate-600 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Interactive 3D Model</span>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  viewMode === 'gallery'
                    ? 'bg-gray-800 dark:bg-gray-800 light:bg-white text-white dark:text-white light:text-slate-900 shadow'
                    : 'text-gray-400 dark:text-gray-400 light:text-slate-600 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>High-Res Photo Gallery</span>
              </button>
            </div>
          )}

          {/* Media Frame */}
          {viewMode === '3d' && product.has3D ? (
            <Product3DViewer
              modelType={product.modelType || 'jersey'}
              color="#84CC16"
              playerNumber="10"
              playerName="AR SPORTS"
            />
          ) : (
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-950 border border-gray-800 dark:border-gray-800 light:border-slate-200 shadow-2xl group">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />

              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2.5 rounded-xl border border-white/20 backdrop-blur-md text-xs font-bold flex items-center gap-1.5 transition-all shadow-xl"
                title="Zoom Product Photography"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Zoom Photo</span>
              </button>

              {product.customizable && (
                <div className="absolute top-4 left-4 bg-lime-500 text-black text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                  Sublimation Customizable
                </div>
              )}
            </div>
          )}

          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pt-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(idx);
                    setViewMode('gallery');
                  }}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === idx && viewMode === 'gallery'
                      ? 'border-sports-orange shadow-lg scale-102'
                      : 'border-gray-800 dark:border-gray-800 light:border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Pricing & Options */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <span className="text-xs font-black uppercase text-lime-400 dark:text-lime-400 light:text-lime-700 tracking-wider">
              {product.category} &bull; {product.subcategory}
            </span>
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white dark:text-white light:text-slate-900 mt-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 font-medium">
              <span className="text-amber-400 font-black">★ {product.rating}</span>
              <span>({product.reviewsCount} verified player reviews)</span>
              <span>&bull;</span>
              <span className="text-lime-400 dark:text-lime-400 light:text-lime-700 font-bold">In Stock & Verified</span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#101623] dark:bg-[#101623] light:bg-slate-50 border border-gray-800 dark:border-gray-800 light:border-slate-200 flex items-center justify-between shadow-lg">
            <div>
              <div className="text-3xl font-heading font-black text-white dark:text-white light:text-slate-900">
                PKR {product.price.toLocaleString()}
              </div>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  PKR {product.originalPrice.toLocaleString()} (Save PKR {(product.originalPrice - product.price).toLocaleString()})
                </span>
              )}
            </div>
            <span className="px-3.5 py-1.5 bg-sports-orange/15 text-sports-orange border border-sports-orange/30 text-xs font-black rounded-full">
              Cash on Delivery Eligible
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 dark:text-gray-300 light:text-slate-600 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Key Specifications Bullet List */}
          {product.features && (
            <div className="space-y-2 bg-[#101623] dark:bg-[#101623] light:bg-slate-50 p-4 rounded-2xl border border-gray-800 dark:border-gray-800 light:border-slate-200 text-xs text-gray-300 dark:text-gray-300 light:text-slate-700">
              <span className="font-black text-white dark:text-white light:text-slate-900 block uppercase tracking-wide">
                Championship Specifications:
              </span>
              <ul className="space-y-1.5 list-disc list-inside">
                {product.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-300 dark:text-gray-300 light:text-slate-700 block">
                Select Option / Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === s
                        ? 'bg-sports-orange text-white shadow-lg shadow-orange-600/30 font-black'
                        : 'bg-gray-800 dark:bg-gray-800 light:bg-slate-200 text-gray-300 dark:text-gray-300 light:text-slate-800 hover:bg-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-300 dark:text-gray-300 light:text-slate-700 block">
                Color Edition:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedColor === c
                        ? 'bg-lime-500 text-black shadow-lg shadow-lime-500/30 font-black'
                        : 'bg-gray-800 dark:bg-gray-800 light:bg-slate-200 text-gray-300 dark:text-gray-300 light:text-slate-800 hover:bg-gray-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customizer Prompt if product is customizable */}
          {product.customizable && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-lime-950/40 via-black to-[#101623] border border-lime-500/40 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-lime-400 font-black text-xs uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>Customize player name, squad number & collar?</span>
              </div>
              <p className="text-xs text-gray-300">
                Open the interactive 3D studio to design this kit with live 3D preview.
              </p>
              <button
                onClick={onOpenCustomizer}
                className="mt-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black text-xs font-black rounded-xl shadow-md transition-all inline-flex items-center gap-1.5"
              >
                Launch 3D Customizer &rarr;
              </button>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-black uppercase text-gray-300 dark:text-gray-300 light:text-slate-700">Quantity:</span>
            <div className="flex items-center bg-gray-900 dark:bg-gray-900 light:bg-slate-100 rounded-xl border border-gray-700 dark:border-gray-700 light:border-slate-300">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 text-gray-300 dark:text-gray-300 light:text-slate-800 hover:text-white font-bold"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-sm font-black text-white dark:text-white light:text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1.5 text-gray-300 dark:text-gray-300 light:text-slate-800 hover:text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-gray-800 dark:border-gray-800 light:border-slate-200">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 ${
                justAdded
                  ? 'bg-lime-500 text-black'
                  : 'bg-sports-orange hover:bg-sports-orangeHover text-white shadow-orange-600/30'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Shopping Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Shopping Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleDirectWhatsAppOrder}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm tracking-wide transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Instant Order on WhatsApp</span>
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-[11px] text-gray-400 dark:text-gray-400 light:text-slate-500 font-medium">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#101623] dark:bg-[#101623] light:bg-slate-50 border border-gray-800 dark:border-gray-800 light:border-slate-200">
              <Truck className="w-4 h-4 text-lime-400" />
              <span>Nationwide Safe Courier</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#101623] dark:bg-[#101623] light:bg-slate-50 border border-gray-800 dark:border-gray-800 light:border-slate-200">
              <ShieldCheck className="w-4 h-4 text-sports-orange" />
              <span>Authentic Handcrafted Gear</span>
            </div>
          </div>

        </div>

      </div>

      {/* High-Resolution Zoom Modal */}
      {isZoomModalOpen && (
        <div
          onClick={() => setIsZoomModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/20">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
}
