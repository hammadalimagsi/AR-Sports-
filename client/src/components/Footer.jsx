import React from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Shield,
  CreditCard,
  Truck,
  ArrowRight,
  Smartphone,
  Building2,
  Landmark,
  PackageCheck,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { CATEGORIES } from '../data/products';

// ─── Sport discipline icons (emoji + name) ──────────────────────────────────
const DISCIPLINE_META = {
  cricket:          { emoji: '🏏', color: 'text-amber-400',   border: 'border-amber-500/30',  bg: 'hover:bg-amber-500/10' },
  'cricket-kits':   { emoji: '👕', color: 'text-amber-300',   border: 'border-amber-400/30',  bg: 'hover:bg-amber-400/10' },
  football:         { emoji: '⚽', color: 'text-green-400',   border: 'border-green-500/30',  bg: 'hover:bg-green-500/10' },
  badminton:        { emoji: '🏸', color: 'text-cyan-400',    border: 'border-cyan-500/30',   bg: 'hover:bg-cyan-500/10'  },
  shoes:            { emoji: '👟', color: 'text-purple-400',  border: 'border-purple-500/30', bg: 'hover:bg-purple-500/10'},
  nets:             { emoji: '🥅', color: 'text-lime-400',    border: 'border-lime-500/30',   bg: 'hover:bg-lime-500/10'  },
  accessories:      { emoji: '🎒', color: 'text-orange-400',  border: 'border-orange-500/30', bg: 'hover:bg-orange-500/10'},
};

// ─── Quick links config ──────────────────────────────────────────────────────
const QUICK_LINKS = [
  { label: 'Home Page',                 page: 'home',       cat: null,  accent: false },
  { label: 'Equipment Catalog',         page: 'catalog',    cat: 'all', accent: false },
  { label: '3D Custom Jersey Hub',      page: 'customizer', cat: null,  accent: true  },
  { label: 'About Owners & Brand',      page: 'about',      cat: null,  accent: false },
  { label: 'Payment Accounts',          page: 'payments',   cat: null,  accent: false },
  { label: 'Showroom & Contact',        page: 'contact',    cat: null,  accent: false },
];

// ─── Payment method cards ────────────────────────────────────────────────────
const PAYMENT_CARDS = [
  {
    name: 'Easypaisa',
    icon: Smartphone,
    badge: 'EP',
    badgeClass: 'bg-green-600 text-white',
    borderClass: 'border-green-700/40',
    hoverClass: 'hover:border-green-500/60 hover:bg-green-900/20',
    detail: '0344 624 1008',
    sub: 'Riaz Hussain Khan',
  },
  {
    name: 'JazzCash',
    icon: Smartphone,
    badge: 'JC',
    badgeClass: 'bg-red-600 text-white',
    borderClass: 'border-red-700/40',
    hoverClass: 'hover:border-red-500/60 hover:bg-red-900/20',
    detail: '0344 624 1008',
    sub: 'Riaz Hussain Khan',
  },
  {
    name: 'Faysal Bank',
    icon: Building2,
    badge: 'FB',
    badgeClass: 'bg-blue-700 text-white',
    borderClass: 'border-blue-700/40',
    hoverClass: 'hover:border-blue-500/60 hover:bg-blue-900/20',
    detail: '3389301000007988',
    sub: 'Account No.',
  },
  {
    name: 'Mashreq / IBAN',
    icon: Landmark,
    badge: 'MQ',
    badgeClass: 'bg-orange-600 text-white',
    borderClass: 'border-orange-700/40',
    hoverClass: 'hover:border-orange-500/60 hover:bg-orange-900/20',
    detail: 'PK06MSHQ…4079',
    sub: 'IBAN Transfer',
  },
  {
    name: 'Cash on Delivery',
    icon: PackageCheck,
    badge: 'COD',
    badgeClass: 'bg-lime-600 text-white',
    borderClass: 'border-lime-700/40',
    hoverClass: 'hover:border-lime-500/60 hover:bg-lime-900/20',
    detail: 'All major cities',
    sub: 'Nationwide',
  },
];

// ─── Value banner items ───────────────────────────────────────────────────────
const VALUE_ITEMS = [
  {
    icon: Truck,
    iconClass: 'text-sports-orange',
    bgClass: 'bg-orange-500/10 border-orange-500/20',
    title: 'Nationwide Delivery',
    sub: 'Direct courier to all cities',
  },
  {
    icon: Sparkles,
    iconClass: 'text-lime-400',
    bgClass: 'bg-lime-500/10 border-lime-500/20',
    title: 'Sublimation Studio',
    sub: 'Custom names, numbers & crests',
  },
  {
    icon: CreditCard,
    iconClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10 border-cyan-500/20',
    title: 'Cash on Delivery',
    sub: 'Available on in-stock equipment',
  },
  {
    icon: Shield,
    iconClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10 border-amber-500/20',
    title: 'Authentic Guarantee',
    sub: 'Grade 1 willow & pro balls',
  },
];

export default function Footer({ setActivePage, setSelectedCategory }) {
  const currentYear = new Date().getFullYear();

  const navigate = (page, cat) => {
    setActivePage(page);
    if (cat !== null) setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04070E] text-gray-400 text-xs sm:text-sm border-t border-gray-800/60 transition-colors duration-200">

      {/* ── Value Banner ─────────────────────────────────────────────────── */}
      <div className="border-b border-gray-800/50 py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {VALUE_ITEMS.map(({ icon: Icon, iconClass, bgClass, title, sub }) => (
            <div
              key={title}
              className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 rounded-2xl border px-4 py-3.5 ${bgClass} transition-transform hover:-translate-y-0.5`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bgClass} border`}>
                <Icon className={`w-5 h-5 ${iconClass}`} />
              </div>
              <div className="text-center sm:text-left">
                <div className="font-black text-white text-xs sm:text-sm leading-tight">{title}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Grid ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand Column (span 4) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-black p-1 border border-white/10 flex-shrink-0">
                <img
                  src={BUSINESS_CONFIG.logo}
                  alt={BUSINESS_CONFIG.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-black text-2xl tracking-wide text-white leading-none">
                <span className="text-sports-orange">AR</span>{' '}
                <span className="text-lime-400">SPORTS</span>{' '}
                <span className="text-gray-300">ISLAMABAD</span>
              </span>
            </div>

            <p className="text-[12px] text-gray-500 max-w-xs leading-relaxed">
              Rawalpindi &amp; Islamabad's dedicated sublimation sports-kits hub and championship equipment provider.
              Grade 1 English Willow cricket bats, custom team jerseys, court shoes, and pro-grade practice nets.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              {[
                { Icon: MapPin,        color: 'text-sports-orange', text: BUSINESS_CONFIG.address },
                { Icon: MessageSquare, color: 'text-lime-400',       text: `WhatsApp: ${BUSINESS_CONFIG.whatsappDisplay}` },
                { Icon: Mail,          color: 'text-cyan-400',       text: BUSINESS_CONFIG.email },
              ].map(({ Icon, color, text }) => (
                <div key={text} className="flex items-start gap-2.5 text-[12px] text-gray-400">
                  <Icon className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} />
                  <span className="leading-snug">{text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-lime-600/20 hover:bg-lime-600/30 border border-lime-600/40 hover:border-lime-500 text-lime-300 hover:text-lime-200 font-bold rounded-xl px-4 py-2.5 text-[12px] transition-all duration-200 group"
            >
              <MessageSquare className="w-4 h-4" />
              Order on WhatsApp
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </a>
          </div>

          {/* Quick Links (span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-black text-xl uppercase tracking-widest text-lime-400 flex items-center gap-2">
              <span className="w-1 h-5 bg-lime-400 rounded-full inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ label, page, cat, accent }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(page, cat)}
                    className={`
                      w-full flex items-center justify-between gap-2
                      rounded-xl border border-gray-800/60 bg-[#0C1220]
                      hover:bg-[#131e32] hover:border-lime-700/50
                      px-3 py-2.5 text-left text-[12px] font-medium
                      transition-all duration-200 group
                      ${accent ? 'text-lime-400 font-bold' : 'text-gray-400 hover:text-white'}
                    `}
                  >
                    <span>{label}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${accent ? 'text-lime-400' : 'text-gray-500'}`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines (span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-black text-xl uppercase tracking-widest text-sports-orange flex items-center gap-2">
              <span className="w-1 h-5 bg-sports-orange rounded-full inline-block" />
              Sports
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                const meta = DISCIPLINE_META[cat.id] || { emoji: '🏅', color: 'text-gray-400', border: 'border-gray-700/40', bg: 'hover:bg-gray-700/20' };
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => navigate('catalog', cat.id)}
                      className={`
                        w-full flex items-center gap-2.5 rounded-xl border
                        ${meta.border} bg-[#0C1220] ${meta.bg}
                        px-3 py-2 text-[12px] font-medium text-gray-400 hover:text-white
                        transition-all duration-200
                      `}
                    >
                      <span className="text-base leading-none">{meta.emoji}</span>
                      <span className="capitalize">{cat.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Payment Options (span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-black text-xl uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="w-1 h-5 bg-cyan-400 rounded-full inline-block" />
              Payment
            </h4>
            <div className="space-y-2">
              {PAYMENT_CARDS.map(({ name, icon: Icon, badge, badgeClass, borderClass, hoverClass, detail, sub }) => (
                <div
                  key={name}
                  className={`flex items-center gap-3 rounded-xl border ${borderClass} ${hoverClass} bg-[#0C1220] px-3 py-2.5 transition-all duration-200 cursor-default`}
                >
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-[10px] font-black flex-shrink-0 ${badgeClass}`}>
                    {badge}
                  </span>
                  <div className="min-w-0">
                    <div className="text-white font-bold text-[12px] truncate">{name}</div>
                    <div className="text-gray-500 text-[11px] truncate">{detail} · {sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────────────── */}
      <div className="border-t-2 border-lime-600/30 bg-[#020508]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600">
          <div className="text-center sm:text-left">
            &copy; {currentYear}{' '}
            <span className="text-gray-400 font-bold">AR Sports Islamabad</span>.
            {' '}All rights reserved.{' '}
            <span className="text-gray-600">Co-Founders: Riaz Hussain Khan &amp; Adnan Wahab.</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button
              onClick={() => navigate('payments', null)}
              className="hover:text-gray-300 transition-colors"
            >
              Payment Terms
            </button>
            <span className="text-gray-700">&bull;</span>
            <button
              onClick={() => navigate('contact', null)}
              className="hover:text-gray-300 transition-colors"
            >
              Support Desk
            </button>
            <span className="text-gray-700">&bull;</span>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="text-lime-400 hover:text-lime-300 font-black transition-colors flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
