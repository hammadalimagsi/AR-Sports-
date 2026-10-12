import React from 'react';
import {
  Sparkles,
  Shirt,
  Shield,
  ArrowRight,
  MessageSquare,
  Truck,
  CheckCircle2,
  Award,
  Zap,
  RotateCw,
  Flame,
  Layers,
  Star
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { CATEGORIES, PRODUCTS } from '../data/products';

export default function HeroBanner({ setActivePage, setSelectedCategory, onSelectProduct }) {
  const featuredKits = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="relative overflow-hidden transition-colors duration-200">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sports-orange/10 dark:bg-sports-orange/10 light:bg-sports-orange/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-lime-500/10 dark:bg-lime-500/10 light:bg-lime-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sports-orange/15 border border-sports-orange/30 text-sports-orange text-xs sm:text-sm font-black tracking-wider uppercase">
              <Flame className="w-4 h-4 fill-sports-orange" />
              <span>RAWALPINDI & ISLAMABAD PREMIER SPORTS GEAR</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white dark:text-white light:text-slate-900 leading-[0.95]">
              ENGINEERED FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sports-orange via-red-500 to-lime-400">
                CHAMPIONSHIP
              </span> PERFORMANCE
            </h1>

            <p className="text-base sm:text-lg text-gray-300 dark:text-gray-300 light:text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Equip your club with Grade 1 English Willow hard-ball cricket bats, custom sublimated team kits, FIFA match footballs, and tournament practice cages. Handcrafted perfection with direct WhatsApp ordering.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  setActivePage('catalog');
                  setSelectedCategory('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-sports-orange to-red-600 hover:from-sports-orangeHover hover:to-red-700 text-white font-black text-sm tracking-wide shadow-xl shadow-orange-600/30 transform hover:-translate-y-0.5 transition-all"
              >
                <span>Shop All Equipment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActivePage('customizer');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-black text-sm tracking-wide shadow-lg shadow-lime-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                <Shirt className="w-4 h-4" />
                <span>3D Custom Jersey Hub</span>
              </button>

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam AR Sports! I want to discuss a customized kit or equipment order.")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-4 rounded-xl border border-gray-800 dark:border-gray-800 light:border-slate-300 bg-gray-900/60 dark:bg-gray-900/60 light:bg-white text-gray-200 dark:text-gray-200 light:text-slate-800 hover:text-white font-bold text-xs transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800 dark:border-gray-800 light:border-slate-200 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-white dark:text-white light:text-slate-900">100%</div>
                <div className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 font-semibold">Sublimation Quality</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-lime-400 dark:text-lime-400 light:text-lime-600">Grade 1</div>
                <div className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 font-semibold">English Willow Bats</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-sports-orange dark:text-sports-orange light:text-sports-orange">COD</div>
                <div className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 font-semibold">Nationwide Delivery</div>
              </div>
            </div>

          </div>

          {/* Right Visual Banner Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 light:border-slate-200 bg-gradient-to-b from-[#131926] to-[#0A0E18] dark:from-[#131926] dark:to-[#0A0E18] light:from-slate-50 light:to-white p-3 shadow-2xl">
              
              {/* Client Official Showroom Banner */}
              <div className="relative rounded-2xl overflow-hidden group aspect-square sm:aspect-auto">
                <img
                  src={BUSINESS_CONFIG.banner}
                  alt="AR Sports Sublimations Hub Showroom"
                  className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/20 text-lime-400 text-xs font-black w-fit mb-1 border border-lime-500/40">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>RAWALPINDI SHOWROOM</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                    AR SPORTS ISLAMABAD
                  </h3>
                  <p className="text-xs text-gray-300">
                    Jmal Plaza, High Court Road, Near Car Chowk (Near Allied Bank)
                  </p>
                </div>
              </div>

              {/* Float Quality Badge */}
              <div className="absolute -bottom-3 -left-3 bg-[#0F1626] dark:bg-[#0F1626] light:bg-white border border-gray-700 dark:border-gray-700 light:border-slate-300 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sports-orange/20 border border-sports-orange/40 flex items-center justify-center text-sports-orange">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white dark:text-white light:text-slate-900">Direct From Manufacturer</div>
                  <div className="text-[11px] text-gray-400 dark:text-gray-400 light:text-slate-500">Unmatched Quality & Prices</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. VISUALLY RICH SPORTS CATEGORY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-800 dark:border-gray-800 light:border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-lime-400 dark:text-lime-400 light:text-lime-600 tracking-wider">
              Browse by Discipline
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white dark:text-white light:text-slate-900 mt-1">
              CHAMPIONSHIP SPORTS DISCIPLINES
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActivePage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-sports-orange hover:text-orange-400 inline-flex items-center gap-1.5"
          >
            <span>Explore Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActivePage('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer rounded-2xl p-5 border border-gray-800 dark:border-gray-800 light:border-slate-200 bg-[#101623] dark:bg-[#101623] light:bg-white hover:border-lime-500/70 transition-all duration-300 shadow-lg hover:shadow-lime-500/10 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-sports-orange/10 dark:bg-sports-orange/10 light:bg-orange-50 border border-sports-orange/30 text-sports-orange flex items-center justify-center group-hover:scale-110 group-hover:bg-lime-500 group-hover:text-black group-hover:border-lime-500 transition-all">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white dark:text-white light:text-slate-900 group-hover:text-lime-400 dark:group-hover:text-lime-400 light:group-hover:text-lime-700 transition-colors">
                  {cat.name}
                </h4>
                <span className="text-[11px] text-gray-400 dark:text-gray-400 light:text-slate-500 font-medium">
                  {cat.count} Items
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HARD-BALL CRICKET EQUIPMENT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-[#171F32] via-[#0D1321] to-[#080C14] dark:from-[#171F32] dark:via-[#0D1321] dark:to-[#080C14] light:from-slate-100 light:to-white rounded-3xl p-6 sm:p-10 border border-gray-800 dark:border-gray-800 light:border-slate-300 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sports-orange/20 text-sports-orange text-xs font-black">
                <Shield className="w-3.5 h-3.5" />
                <span>AUTHENTIC HARD-BALL SPECIALTY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white dark:text-white light:text-slate-900 leading-tight">
                CRICKET BATS, PADS & PRACTICE NETS
              </h2>
              <p className="text-sm text-gray-300 dark:text-gray-300 light:text-slate-600 leading-relaxed">
                Hand-picked air-dried Grade 1 English Willow bats with massive 40mm power edges, 4-piece alum-tanned match leather balls, titanium helmets, and UV-resistant practice cages.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('cricket');
                    setActivePage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-sports-orange hover:bg-sports-orangeHover text-white font-black text-xs shadow-lg shadow-orange-600/30"
                >
                  Shop Hard-Ball Gear &rarr;
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('nets');
                    setActivePage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-gray-800 dark:bg-gray-800 light:bg-slate-200 text-white dark:text-white light:text-slate-800 font-bold text-xs hover:bg-gray-700"
                >
                  View Cricket Practice Nets
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div
                onClick={() => onSelectProduct(PRODUCTS.find(p => p.id === 'CRIC-BAT-PRO'))}
                className="cursor-pointer group rounded-2xl overflow-hidden bg-black/60 border border-gray-800 dark:border-gray-800 light:border-slate-200 p-3 shadow-xl"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-950 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1531415074868-036b1c5f53ec?auto=format&fit=crop&w=800&q=80"
                    alt="English Willow Cricket Bat"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
                <span className="text-[10px] text-lime-400 font-black uppercase">Grade 1 Willow (3D Ready)</span>
                <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900 truncate">AR Reserve Pro Bat</h4>
                <div className="text-sm font-black text-white dark:text-white light:text-slate-900 mt-1">PKR 24,500</div>
              </div>

              <div
                onClick={() => onSelectProduct(PRODUCTS.find(p => p.id === 'NET-CRIC-CAGE'))}
                className="cursor-pointer group rounded-2xl overflow-hidden bg-black/60 border border-gray-800 dark:border-gray-800 light:border-slate-200 p-3 shadow-xl"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-950 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80"
                    alt="Cricket Practice Net Cage"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
                <span className="text-[10px] text-sports-orange font-black uppercase">Practice Cage</span>
                <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900 truncate">Heavy Duty Batting Net</h4>
                <div className="text-sm font-black text-white dark:text-white light:text-slate-900 mt-1">PKR 18,500</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS & BEST SELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sports-orange text-xs font-black uppercase tracking-wider">
              <Star className="w-4 h-4 fill-sports-orange" />
              <span>Championship Collection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white dark:text-white light:text-slate-900 mt-1">
              BEST SELLING SPORTS PRODUCTS
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActivePage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-sports-orange hover:text-orange-400"
          >
            <span>View All {PRODUCTS.length} Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-[#101623] dark:bg-[#101623] light:bg-white rounded-2xl overflow-hidden border border-gray-800 dark:border-gray-800 light:border-slate-200 hover:border-sports-orange/70 transition-all duration-300 hover:shadow-2xl cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-950">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                
                {product.has3D && (
                  <span className="absolute top-3 left-3 bg-sports-orange text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md tracking-wider">
                    3D View
                  </span>
                )}
                {product.customizable && (
                  <span className="absolute top-3 right-3 bg-lime-500 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-md">
                    Custom Name & No.
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase text-lime-400 dark:text-lime-400 light:text-lime-700 font-extrabold tracking-wider">
                    {product.subcategory}
                  </span>
                  <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 mt-1 group-hover:text-sports-orange transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-800 dark:border-gray-800 light:border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-white dark:text-white light:text-slate-900">
                      PKR {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        PKR {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-sports-orange flex items-center gap-1">
                    Details &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CUSTOM JERSEY SHOWCASE INTERACTIVE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-black via-[#0D1524] to-[#121B2F] border border-gray-800 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <span className="text-xs font-black uppercase text-lime-400 tracking-wider">
              3D Sublimation Studio
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              DESIGN YOUR CUSTOM SQUAD KIT WITH LIVE 3D PREVIEW
            </h2>
            <p className="text-sm text-gray-300">
              Customize player name, jersey number, team colorway, and collar style in real-time 3D before placing your order via WhatsApp.
            </p>
            <button
              onClick={() => {
                setActivePage('customizer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-lime-500/20"
            >
              Open 3D Jersey Designer &rarr;
            </button>
          </div>

          <div className="w-full lg:w-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80"
              alt="Custom Team Jersey"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
