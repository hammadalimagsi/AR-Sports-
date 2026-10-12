import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  ShoppingCart,
  Sparkles,
  Check,
  ChevronDown,
  Layers,
  Box,
  Home,
  ChevronRight as CrumbArrow,
  SlidersHorizontal,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, GAMES, GAME_MENU } from '../data/products';
import { useCart } from '../context/CartContext';

// ── Breadcrumb bar ──────────────────────────────────────────────────────────
function Breadcrumb({ game, subcategory, onSelectGame, onClearAll }) {
  const gameData = game && game !== 'all' ? GAME_MENU[game] : null;
  const subLabel = subcategory
    ? gameData?.subcategories?.find((s) => s.id === subcategory)?.label || subcategory
    : null;

  if (!game || game === 'all') return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-6 flex-wrap"
    >
      <button
        onClick={onClearAll}
        className="flex items-center gap-1 hover:text-gray-300 transition-colors"
      >
        <Home className="w-3 h-3" /> All Sports
      </button>
      {gameData && (
        <>
          <CrumbArrow className="w-3 h-3 text-gray-700" />
          <button
            onClick={() => onSelectGame(game, null)}
            className={`font-bold ${subLabel ? 'hover:text-gray-300 transition-colors' : 'text-white'}`}
          >
            {gameData.emoji} {gameData.label}
          </button>
        </>
      )}
      {subLabel && (
        <>
          <CrumbArrow className="w-3 h-3 text-gray-700" />
          <span className="text-white font-bold">{subLabel}</span>
        </>
      )}
    </nav>
  );
}

export default function ProductCatalog({
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  selectedGame,
  selectedSubcategory,
  onSelectGame,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [only3D, setOnly3D] = useState(false);
  const [onlyCustomizable, setOnlyCustomizable] = useState(false);
  const { addToCart } = useCart();
  const [addedNotice, setAddedNotice] = useState(null);

  // Reset local search when game/subcategory changes
  useEffect(() => {
    setSearchQuery('');
  }, [selectedGame, selectedSubcategory, selectedCategory]);

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Game filter (from mega menu)
      if (selectedGame && selectedGame !== 'all') {
        if (p.game !== selectedGame) return false;
      }

      // Subcategory filter (from mega menu)
      if (selectedSubcategory) {
        if (p.subcategory !== selectedSubcategory) return false;
      }

      // Legacy category filter (from category pills)
      if (!selectedGame || selectedGame === 'all') {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hits =
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          (p.game && p.game.toLowerCase().includes(q));
        if (!hits) return false;
      }

      if (only3D && !p.has3D) return false;
      if (onlyCustomizable && !p.customizable) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedGame, selectedSubcategory, selectedCategory, searchQuery, only3D, onlyCustomizable, sortBy]);

  // ── Quick-add ─────────────────────────────────────────────────────────────
  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product, {
      quantity: 1,
      size: product.sizes?.[0] || 'Standard',
      color: product.colors?.[0] || 'Standard',
    });
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  // ── Heading text ──────────────────────────────────────────────────────────
  const pageTitle = useMemo(() => {
    if (selectedGame && selectedGame !== 'all') {
      const gameData = GAME_MENU[selectedGame];
      if (selectedSubcategory) {
        const sub = gameData?.subcategories?.find((s) => s.id === selectedSubcategory);
        return sub?.label || selectedSubcategory;
      }
      return `${gameData?.emoji || ''} ${gameData?.label || selectedGame} Collection`;
    }
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find((c) => c.id === selectedCategory);
      return cat?.name || 'Products';
    }
    return 'SPORTS GEAR & APPAREL';
  }, [selectedGame, selectedSubcategory, selectedCategory]);

  const clearAll = () => {
    setSelectedCategory('all');
    onSelectGame && onSelectGame(null, null);
    setSearchQuery('');
    setOnly3D(false);
    setOnlyCustomizable(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-colors duration-200">

      {/* Breadcrumb */}
      <Breadcrumb
        game={selectedGame}
        subcategory={selectedSubcategory}
        onSelectGame={onSelectGame}
        onClearAll={clearAll}
      />

      {/* ── Title & Search ───────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black uppercase text-sports-orange tracking-wider">
            {selectedGame && selectedGame !== 'all'
              ? `${GAME_MENU[selectedGame]?.label} — AR Sports Catalog`
              : 'AR Sports Catalog & Equipment'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-white dark:text-white light:text-slate-900 mt-1 uppercase">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-slate-500 mt-0.5">
            Showing {filteredProducts.length} authentic sports items ready for instant courier dispatch
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bats, balls, jerseys, nets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-white border border-gray-700 dark:border-gray-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-sports-orange shadow-inner transition-all"
          />
        </div>
      </div>

      {/* ── Filter Toolbar ────────────────────────────────────────────────── */}
      <div className="bg-[#101623] dark:bg-[#101623] light:bg-white rounded-2xl p-4 border border-gray-800 dark:border-gray-800 light:border-slate-200 mb-8 space-y-4 shadow-xl">

        {/* Game pills (shown when not already in a game context) */}
        {(!selectedGame || selectedGame === 'all') && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-600 flex-shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Sport:
            </span>
            <button
              onClick={() => onSelectGame && onSelectGame('all', null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                !selectedGame || selectedGame === 'all'
                  ? 'bg-lime-500 text-black shadow-md'
                  : 'bg-gray-800/80 dark:bg-gray-800/80 light:bg-slate-100 text-gray-300 hover:text-white'
              }`}
            >
              🏅 All Games
            </button>
            {GAMES.filter((g) => g.id !== 'all').map((g) => (
              <button
                key={g.id}
                onClick={() => onSelectGame && onSelectGame(g.id, null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedGame === g.id
                    ? 'bg-sports-orange text-white shadow-md'
                    : 'bg-gray-800/80 dark:bg-gray-800/80 light:bg-slate-100 text-gray-300 hover:text-white'
                }`}
              >
                {g.emoji} {g.label}
              </button>
            ))}
          </div>
        )}

        {/* Subcategory pills (shown when inside a game) */}
        {selectedGame && selectedGame !== 'all' && GAME_MENU[selectedGame] && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-600 flex-shrink-0 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Category:
            </span>
            <button
              onClick={() => onSelectGame(selectedGame, null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                !selectedSubcategory
                  ? 'bg-sports-orange text-white shadow-md'
                  : 'bg-gray-800/80 text-gray-300 hover:text-white'
              }`}
            >
              All {GAME_MENU[selectedGame].label}
            </button>
            {GAME_MENU[selectedGame].subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSelectGame(selectedGame, sub.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedSubcategory === sub.id
                    ? 'bg-sports-orange text-white shadow-md'
                    : 'bg-gray-800/80 text-gray-300 hover:text-white'
                }`}
              >
                {sub.emoji} {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* Category pills (fallback when no game selected) */}
        {(!selectedGame || selectedGame === 'all') && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-600 flex-shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    isSelected
                      ? 'bg-sports-orange text-white shadow-md'
                      : 'bg-gray-800/80 dark:bg-gray-800/80 light:bg-slate-100 text-gray-300 dark:text-gray-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Toggles & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-800 dark:border-gray-800 light:border-slate-200 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-slate-700">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={only3D}
                onChange={(e) => setOnly3D(e.target.checked)}
                className="rounded border-gray-700 bg-gray-900 text-sports-orange focus:ring-sports-orange"
              />
              <span className="font-bold flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-lime-400" />
                Interactive 3D Only
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyCustomizable}
                onChange={(e) => setOnlyCustomizable(e.target.checked)}
                className="rounded border-gray-700 bg-gray-900 text-lime-500 focus:ring-lime-500"
              />
              <span className="font-bold text-lime-400">Custom Sublimation Only</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 dark:text-gray-400 light:text-slate-500 font-bold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-900 dark:bg-gray-900 light:bg-slate-100 text-white dark:text-white light:text-slate-900 rounded-lg px-3 py-1.5 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-sports-orange"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#101623] dark:bg-[#101623] light:bg-white rounded-3xl border border-gray-800 dark:border-gray-800 light:border-slate-200">
          <div className="text-4xl mb-4">🏅</div>
          <p className="text-lg font-bold text-gray-300 dark:text-gray-300 light:text-slate-800">
            No items match your criteria
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Try selecting a different game or resetting search keywords
          </p>
          <button
            onClick={clearAll}
            className="mt-4 px-5 py-2.5 bg-sports-orange text-white text-xs font-bold rounded-xl hover:bg-sports-orangeHover transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isJustAdded = addedNotice === product.id;
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-[#101623] dark:bg-[#101623] light:bg-white rounded-2xl overflow-hidden border border-gray-800 dark:border-gray-800 light:border-slate-200 hover:border-sports-orange/70 transition-all duration-300 hover:shadow-2xl flex flex-col cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-950">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.has3D && (
                      <span className="bg-sports-orange text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md tracking-wider">
                        3D View
                      </span>
                    )}
                    {product.customizable && (
                      <span className="bg-lime-500 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-md">
                        Customizable
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm text-gray-200 text-[10px] font-bold px-2.5 py-1 rounded-md border border-white/10">
                    {product.subcategory}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-400 light:text-slate-500">
                      <span className="uppercase text-lime-400 dark:text-lime-400 light:text-lime-700 font-black tracking-wider">
                        {product.game || product.category}
                      </span>
                      <span>★ {product.rating} ({product.reviewsCount})</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white dark:text-white light:text-slate-900 mt-1 group-hover:text-sports-orange transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-800 dark:border-gray-800 light:border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-lg font-black text-white dark:text-white light:text-slate-900">
                          PKR {product.price.toLocaleString()}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            PKR {product.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="text-xs font-bold text-gray-400 group-hover:text-sports-orange flex items-center gap-1">
                        Inspect &rarr;
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                        className="w-full py-2 bg-gray-800 dark:bg-gray-800 light:bg-slate-100 hover:bg-gray-700 text-gray-200 dark:text-gray-200 light:text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`w-full py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
                          isJustAdded
                            ? 'bg-lime-500 text-black'
                            : 'bg-sports-orange hover:bg-sports-orangeHover text-white shadow-md shadow-orange-600/20'
                        }`}
                      >
                        {isJustAdded ? (
                          <><Check className="w-3.5 h-3.5" /><span>Added!</span></>
                        ) : (
                          <><ShoppingCart className="w-3.5 h-3.5" /><span>Quick Add</span></>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
