import React from 'react';
import {
  Award,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  Shield,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export default function AboutUsView({ setActivePage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 transition-colors duration-200">
      
      {/* Brand Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sports-orange/15 border border-sports-orange/30 text-sports-orange text-xs font-black uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>About AR Sports Islamabad</span>
        </div>
        <h1 className="text-3xl sm:text-6xl font-heading font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          CRAFTING GEAR FOR CHAMPIONS
        </h1>
        <p className="text-base sm:text-lg text-gray-300 dark:text-gray-300 light:text-slate-600 leading-relaxed font-medium">
          Located near Car Chowk, Rawalpindi, AR Sports has grown from a specialized sports equipment workshop to an advanced sublimation hub supplying athletic clubs, universities, and teams across Pakistan.
        </p>
      </section>

      {/* Leadership / Owners Section */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="text-xs uppercase text-lime-400 dark:text-lime-400 light:text-lime-700 font-black tracking-wider">
            Founders & Leadership
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white dark:text-white light:text-slate-900 mt-1">
            MEET THE CO-FOUNDERS
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-slate-500 mt-1">
            Driving precision craftsmanship and accessible sports gear across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {BUSINESS_CONFIG.owners.map((owner, idx) => (
            <div
              key={idx}
              className="bg-[#101623] dark:bg-[#101623] light:bg-white rounded-3xl p-6 sm:p-8 border border-gray-800 dark:border-gray-800 light:border-slate-200 flex flex-col items-center text-center space-y-4 shadow-2xl"
            >
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-sports-orange/40 p-1 bg-black">
                <img
                  src={owner.image}
                  alt={owner.name}
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>

              <div>
                <span className="px-3 py-1 bg-sports-orange/15 text-sports-orange border border-sports-orange/30 text-xs font-black rounded-full">
                  {owner.roleBadge}
                </span>
                <h3 className="text-xl font-black text-white dark:text-white light:text-slate-900 mt-2">{owner.name}</h3>
                <p className="text-xs font-bold text-lime-400 dark:text-lime-400 light:text-lime-700 mt-0.5">{owner.title}</p>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-slate-600 leading-relaxed">
                {owner.bio}
              </p>

              <div className="pt-2 w-full border-t border-gray-800 dark:border-gray-800 light:border-slate-200 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 font-bold">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>Verified Business Founder</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showroom CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-sports-orange/20 via-[#101623] to-black dark:from-sports-orange/20 dark:via-[#101623] dark:to-black light:from-orange-50 light:to-white border border-sports-orange/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <h3 className="text-2xl font-heading font-black text-white dark:text-white light:text-slate-900">
            VISIT OUR RAWALPINDI SHOWROOM
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-slate-600 mt-1">
            {BUSINESS_CONFIG.address}
          </p>
        </div>
        <button
          onClick={() => {
            setActivePage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3.5 bg-sports-orange hover:bg-sports-orangeHover text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-orange-600/30 whitespace-nowrap"
        >
          View Map & Contact Details
        </button>
      </div>

    </div>
  );
}
