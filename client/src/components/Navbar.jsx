import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  Sun,
  Moon,
  MessageSquare,
  Sparkles,
  Search,
  Phone,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { GAMES, GAME_MENU } from '../data/products';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import MegaMenu from './MegaMenu';

export default function Navbar({ activePage, setActivePage, openCart, onGameSelect }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaGame, setActiveMegaGame] = useState(null); // desktop mega menu
  const [mobileGameOpen, setMobileGameOpen] = useState(null); // mobile game accordion
  const { totalItems } = useCart();
  const { toggleTheme, isDark } = useTheme();
  const hoverTimer = useRef(null);
  const headerRef = useRef(null);

  // ── Standard page nav links ─────────────────────────────────────────────
  const navLinks = [
    { id: 'home',      label: 'Home'                               },
    { id: 'customizer',label: 'Custom Jersey Hub', badge: '3D'    },
    { id: 'about',     label: 'About Owners'                       },
    { id: 'payments',  label: 'Payment Accounts'                   },
    { id: 'contact',   label: 'Store & Location'                   },
  ];

  // ── Close mega menu on click outside ───────────────────────────────────
  const handleOutsideClick = useCallback((e) => {
    if (headerRef.current && !headerRef.current.contains(e.target)) {
      setActiveMegaGame(null);
    }
  }, []);

  useEffect(() => {
    if (activeMegaGame) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [activeMegaGame, handleOutsideClick]);

  // ── Hover intent helpers ────────────────────────────────────────────────
  const openMega = (gameId) => {
    clearTimeout(hoverTimer.current);
    if (gameId === 'all') {
      // "All Games" goes straight to catalog
      handleGameNavigate('all', null, null);
    } else {
      setActiveMegaGame(gameId);
    }
  };

  const closeMegaDelayed = () => {
    hoverTimer.current = setTimeout(() => setActiveMegaGame(null), 200);
  };

  const cancelClose = () => clearTimeout(hoverTimer.current);

  // ── Navigation from mega menu ───────────────────────────────────────────
  const handleGameNavigate = (gameId, subcategoryId, product) => {
    setActiveMegaGame(null);
    setMobileMenuOpen(false);
    if (product) {
      // Go directly to product detail
      onGameSelect({ game: gameId, subcategory: subcategoryId, product });
    } else {
      onGameSelect({ game: gameId, subcategory: subcategoryId, product: null });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id) => {
    setActivePage(id);
    setActiveMegaGame(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isGameActive = activePage === 'catalog';

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 transition-colors duration-200 border-b backdrop-blur-xl bg-[#080C14]/95 dark:bg-[#080C14]/95 border-gray-800/80 light:bg-white/95 light:border-slate-200/90 text-gray-100 dark:text-gray-100"
    >

      {/* ── Announcement Bar ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-sports-orange via-sports-red to-sports-lime text-black text-[11px] sm:text-xs font-black py-1.5 px-4 text-center tracking-wider flex justify-center items-center gap-3 shadow-sm">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-black" />
          AR SPORTS ISLAMABAD &bull; SUBLIMATIONS HUB &amp; HARD-BALL CRICKET EQUIPMENT
        </span>
        <span className="hidden md:inline text-black/50">|</span>
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Salam AR Sports! I want to inquire about custom sportswear kits.')}`}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80"
        >
          <Phone className="w-3 h-3" /> WhatsApp: {BUSINESS_CONFIG.whatsappDisplay}
        </a>
      </div>

      {/* ── Main Bar ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] lg:h-[68px]">

          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-black to-gray-900 dark:from-black dark:to-gray-900 p-1 border border-sports-borderDark dark:border-sports-borderDark light:border-slate-200 shadow-xl group-hover:border-lime-500/80 transition-all">
              <img
                src={BUSINESS_CONFIG.logo}
                alt={BUSINESS_CONFIG.name}
                className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="font-heading font-black text-xl tracking-wide flex items-center gap-1.5 leading-none text-white dark:text-white light:text-slate-900">
                <span className="text-sports-orange">AR</span>
                <span>SPORTS</span>
                <span className="text-[9px] bg-lime-500/20 text-lime-400 dark:text-lime-400 light:text-lime-700 font-extrabold px-1.5 py-0.5 rounded-full border border-lime-500/30">
                  ISB
                </span>
              </div>
              <p className="text-[9px] text-gray-400 dark:text-gray-400 light:text-slate-500 font-bold tracking-wider uppercase mt-0.5">
                Championship Gear & Kits
              </p>
            </div>
          </div>

          {/* ── Desktop Navigation ──────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">

            {/* Shop by Game trigger */}
            <div className="relative" onMouseLeave={closeMegaDelayed} onMouseEnter={cancelClose}>
              <button
                onMouseEnter={() => openMega(activeMegaGame || 'cricket')}
                onClick={() => setActiveMegaGame(activeMegaGame ? null : 'cricket')}
                aria-haspopup="true"
                aria-expanded={!!activeMegaGame}
                className={`
                  flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all
                  ${isGameActive || activeMegaGame
                    ? 'bg-sports-orange/15 text-sports-orange font-black'
                    : 'text-gray-300 dark:text-gray-300 light:text-slate-600 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                🏅 Shop by Game
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaGame ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Game pill row (appears on hover near the button) */}
              {activeMegaGame && (
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMegaDelayed}
                  className="absolute top-full left-0 pt-2 z-50"
                >
                  <div className="flex flex-col gap-0.5 bg-[#06090F] border border-gray-800/80 rounded-xl shadow-2xl p-1.5 min-w-[160px]">
                    {GAMES.map((g) => (
                      <button
                        key={g.id}
                        onMouseEnter={() => g.id !== 'all' && setActiveMegaGame(g.id)}
                        onClick={() => {
                          if (g.id === 'all') {
                            handleGameNavigate('all', null, null);
                          } else {
                            setActiveMegaGame(g.id);
                          }
                        }}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-bold text-left transition-all
                          ${activeMegaGame === g.id
                            ? 'bg-white/8 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        <span>{g.emoji}</span>
                        <span>{g.label}</span>
                        {g.id !== 'all' && <ChevronRight className="w-3 h-3 ml-auto opacity-40" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Standard nav links */}
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sports-orange/15 text-sports-orange font-black'
                      : 'text-gray-300 dark:text-gray-300 light:text-slate-600 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-lime-500 text-black shadow">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Right Icons ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-gray-800 dark:border-gray-800 light:border-slate-300 bg-gray-900/80 dark:bg-gray-900/80 light:bg-slate-100 text-gray-200 dark:text-gray-200 light:text-slate-800 hover:text-lime-400 transition-all shadow-md group"
              aria-label="Toggle Theme"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Search */}
            <button
              onClick={() => handleNavClick('catalog')}
              className="p-2 rounded-xl border border-gray-800 dark:border-gray-800 light:border-slate-300 bg-gray-900/80 dark:bg-gray-900/80 light:bg-slate-100 text-gray-200 dark:text-gray-200 light:text-slate-800 hover:text-white transition-all shadow-md hidden sm:flex items-center"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Salam AR Sports! I want to order sports equipment.')}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-lime-500/15 text-lime-400 dark:text-lime-400 light:text-lime-800 border border-lime-500/30 hover:bg-lime-500 hover:text-black font-extrabold text-xs transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-sports-orange to-red-600 hover:from-sports-orangeHover hover:to-red-700 text-white font-bold transition-all shadow-lg shadow-orange-600/25 group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-lime-400 text-black font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black shadow animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-gray-800 dark:border-gray-800 light:border-slate-300 bg-gray-900 dark:bg-gray-900 light:bg-slate-100 text-gray-200 dark:text-gray-200 light:text-slate-800"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop Mega Menu Panel ─────────────────────────────────────── */}
      {activeMegaGame && GAME_MENU[activeMegaGame] && (
        <div onMouseEnter={cancelClose} onMouseLeave={closeMegaDelayed}>
          <MegaMenu
            activeGame={activeMegaGame}
            onNavigate={handleGameNavigate}
            onClose={() => setActiveMegaGame(null)}
          />
        </div>
      )}

      {/* ── Mobile Drawer ───────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060A12] dark:bg-[#060A12] light:bg-white border-b border-gray-800 dark:border-gray-800 light:border-slate-200 px-4 pt-3 pb-6 shadow-2xl max-h-[80vh] overflow-y-auto">

          {/* Shop by Game accordion */}
          <div className="mb-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-2 mb-2">
              Shop by Game
            </div>
            {GAMES.map((g) => (
              <div key={g.id} className="mb-0.5">
                <button
                  onClick={() => {
                    if (g.id === 'all') {
                      handleGameNavigate('all', null, null);
                    } else {
                      setMobileGameOpen(mobileGameOpen === g.id ? null : g.id);
                    }
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    mobileGameOpen === g.id
                      ? 'bg-sports-orange/15 text-sports-orange border-l-4 border-sports-orange'
                      : 'text-gray-300 dark:text-gray-300 light:text-slate-700 hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-slate-100'
                  }`}
                >
                  <span>{g.emoji} {g.label}</span>
                  {g.id !== 'all' && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileGameOpen === g.id ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Subcategories */}
                {mobileGameOpen === g.id && GAME_MENU[g.id] && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-gray-800 pl-3 pb-2">
                    <button
                      onClick={() => handleGameNavigate(g.id, null, null)}
                      className="w-full text-left px-3 py-2 rounded-lg text-[12px] font-black text-lime-400 hover:bg-lime-500/10 transition-colors"
                    >
                      → Shop All {GAME_MENU[g.id].label}
                    </button>
                    {GAME_MENU[g.id].subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleGameNavigate(g.id, sub.id, null)}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-[12px] text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors"
                      >
                        {sub.emoji} {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800/60 my-3" />

          {/* Standard links */}
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-2 mb-2">
            Pages
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all mb-0.5 ${
                activePage === link.id
                  ? 'bg-sports-orange/20 text-sports-orange border-l-4 border-sports-orange'
                  : 'text-gray-300 dark:text-gray-300 light:text-slate-700 hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-slate-100'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-lime-400 text-black">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          {/* WhatsApp CTA */}
          <div className="pt-4 border-t border-gray-800 dark:border-gray-800 light:border-slate-200 mt-3">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-lime-500 hover:bg-lime-400 text-black rounded-xl font-black text-xs shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Chat ({BUSINESS_CONFIG.whatsappDisplay})
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
