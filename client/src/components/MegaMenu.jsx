import React, { useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ArrowRight, X } from 'lucide-react';
import { GAME_MENU, PRODUCTS } from '../data/products';

// ─── Thumbnail image for a subcategory — picks first matching product image ──
function SubcategoryThumb({ subId, gameId }) {
  const match = PRODUCTS.find(
    (p) => p.game === gameId && p.subcategory === subId
  );
  if (!match) return null;
  return (
    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-gray-800">
      <img
        src={match.images[0]}
        alt={subId}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
  );
}

// ─── Featured product card (3 cards inside the mega menu) ───────────────────
function FeaturedCard({ productId, onNavigate }) {
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) return null;
  return (
    <button
      onClick={() => onNavigate(p.game, null, p)}
      className="flex items-start gap-3 p-3 rounded-xl border border-gray-800/70 bg-[#0C1220] hover:border-lime-500/50 hover:bg-[#131e32] transition-all duration-200 group text-left w-full"
    >
      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-white/5">
        <img
          src={p.images[0]}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-black uppercase text-lime-400 tracking-wider mb-0.5">
          {p.subcategory}
        </div>
        <div className="text-white text-[12px] font-bold leading-snug line-clamp-2 group-hover:text-lime-300 transition-colors">
          {p.name}
        </div>
        <div className="text-sports-orange text-[11px] font-black mt-1">
          PKR {p.price.toLocaleString()}
        </div>
      </div>
    </button>
  );
}

// ─── The mega menu panel for one game ───────────────────────────────────────
export default function MegaMenu({ activeGame, onNavigate, onClose }) {
  const panelRef = useRef(null);
  const gameData = GAME_MENU[activeGame];

  // Close on Escape key
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!gameData) return null;

  const subcols = [
    gameData.subcategories.slice(0, Math.ceil(gameData.subcategories.length / 2)),
    gameData.subcategories.slice(Math.ceil(gameData.subcategories.length / 2)),
  ];

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${gameData.label} categories`}
      className="
        absolute top-full left-0 right-0 z-40
        bg-[#06090F]/98 backdrop-blur-2xl
        border-b border-gray-800/80
        shadow-2xl shadow-black/60
        animate-in fade-in slide-in-from-top-2 duration-200
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">

          {/* ── Left header ────────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className={`font-heading font-black text-4xl leading-none ${gameData.accentClass}`}>
                {gameData.emoji}
              </div>
              <h2 className={`font-heading font-black text-3xl uppercase mt-2 ${gameData.accentClass}`}>
                {gameData.label}
              </h2>
              <p className="text-gray-500 text-[11px] mt-1 leading-relaxed">
                Browse all {gameData.label.toLowerCase()} equipment,<br />
                apparel & accessories
              </p>
            </div>

            <button
              onClick={() => onNavigate(activeGame, null, null)}
              className={`
                mt-6 flex items-center gap-2 text-[12px] font-black uppercase tracking-wider
                border ${gameData.borderClass} rounded-xl px-4 py-2.5 
                ${gameData.accentClass} hover:bg-white/5 transition-all group
              `}
            >
              Shop All {gameData.label}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* ── Subcategory columns ─────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4">
              Categories
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {subcols.map((col, ci) => (
                <div key={ci} className="space-y-1">
                  {col.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => onNavigate(activeGame, sub.id, null)}
                      className="
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                        text-gray-400 hover:text-white
                        hover:bg-[#0F1826] border border-transparent hover:border-gray-800/70
                        transition-all duration-150 group text-left
                      "
                    >
                      <SubcategoryThumb subId={sub.id} gameId={activeGame} />
                      <div className="flex-1 min-w-0">
                        <span className="text-[12px] font-semibold leading-tight block truncate">
                          {sub.emoji} {sub.label}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 flex-shrink-0 transition-opacity" />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── Featured products ───────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4">
              Featured Picks
            </div>
            <div className="space-y-2">
              {gameData.featuredProducts.map((pid) => (
                <FeaturedCard key={pid} productId={pid} onNavigate={onNavigate} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Close strip */}
      <div className="border-t border-gray-800/50 bg-[#040710]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6 text-[11px] text-gray-600">
            <button
              onClick={() => onNavigate('all', null, null)}
              className="hover:text-lime-400 transition-colors font-bold"
            >
              🏅 All Games
            </button>
            {Object.keys(GAME_MENU).filter((g) => g !== activeGame).map((g) => (
              <button
                key={g}
                onClick={() => onNavigate(g, null, null)}
                className="hover:text-white transition-colors capitalize"
              >
                {GAME_MENU[g].emoji} {GAME_MENU[g].label}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center gap-1 text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Close
          </button>
        </div>
      </div>
    </div>
  );
}
