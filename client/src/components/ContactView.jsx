import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export default function ContactView() {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSport, setFormSport] = useState('Cricket Bats & Equipment');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Salam AR Sports!\n\nWebsite Inquiry:\n• Name: ${formName}\n• Phone: ${formPhone}\n• Interest/Sport: ${formSport}\n• Message: ${formMessage}\n\nPlease get back to me.`;
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 transition-colors duration-200">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-black uppercase text-lime-400 dark:text-lime-400 light:text-lime-700 tracking-wider">
          Direct Customer Service
        </span>
        <h1 className="text-3xl sm:text-6xl font-heading font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          VISIT SHOWROOM OR CHAT
        </h1>
        <p className="text-sm sm:text-base text-gray-300 dark:text-gray-300 light:text-slate-600">
          Get in touch with our showroom desk for hard-ball cricket bat selection, team kit bulk orders, or custom sublimation previews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contacts & Store Details */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#101623] dark:bg-[#101623] light:bg-white rounded-3xl p-6 sm:p-8 border border-gray-800 dark:border-gray-800 light:border-slate-200 space-y-6 shadow-2xl">
            <h3 className="text-xl font-heading font-black text-white dark:text-white light:text-slate-900 border-b border-gray-800 dark:border-gray-800 light:border-slate-200 pb-4">
              SHOWROOM & WORKSHOP
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-sports-orange/15 border border-sports-orange/30 text-sports-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white dark:text-white light:text-slate-900 font-bold">Physical Address:</strong>
                  <p className="text-gray-300 dark:text-gray-300 light:text-slate-600 leading-relaxed mt-0.5">{BUSINESS_CONFIG.address}</p>
                  <a
                    href="https://maps.google.com/?q=Car+Chowk+Rawalpindi"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-sports-orange font-bold hover:underline mt-1.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-lime-500/15 border border-lime-500/30 text-lime-400 dark:text-lime-400 light:text-lime-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white dark:text-white light:text-slate-900 font-bold">Official WhatsApp Lines:</strong>
                  <p className="text-gray-300 dark:text-gray-300 light:text-slate-700 font-mono mt-0.5">{BUSINESS_CONFIG.whatsappDisplay}</p>
                  <p className="text-gray-400 dark:text-gray-400 light:text-slate-500 font-mono text-xs">{BUSINESS_CONFIG.whatsappAlternate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white dark:text-white light:text-slate-900 font-bold">Official Email:</strong>
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-gray-300 dark:text-gray-300 light:text-slate-700 hover:text-white underline block mt-0.5">
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white dark:text-white light:text-slate-900 font-bold">Opening Hours:</strong>
                  <p className="text-gray-300 dark:text-gray-300 light:text-slate-700 mt-0.5">{BUSINESS_CONFIG.openingHours}</p>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam AR Sports! I want to visit your showroom / inquire about products.")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-black rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message on WhatsApp Now</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Google Maps & Direct Message Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Contact Form */}
          <div className="bg-[#101623] dark:bg-[#101623] light:bg-white rounded-3xl p-6 sm:p-8 border border-gray-800 dark:border-gray-800 light:border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-xl font-heading font-black text-white dark:text-white light:text-slate-900">
              SEND DIRECT INQUIRY
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500">
              Submit your inquiry and it will generate an instant pre-filled WhatsApp message to our sales desk.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-gray-300 dark:text-gray-300 light:text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Ullah"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-sports-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-300 dark:text-gray-300 light:text-slate-700 block mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0300 1234567"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-sports-orange"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-300 dark:text-gray-300 light:text-slate-700 block mb-1">Sport / Product Category</label>
                <select
                  value={formSport}
                  onChange={(e) => setFormSport(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none"
                >
                  <option>Hard-Ball Cricket Bats & Equipment</option>
                  <option>Cricket Clothing & Practice Nets</option>
                  <option>Custom Sublimation Team Kits (Football / Cricket)</option>
                  <option>Badminton Rackets & Shuttles</option>
                  <option>Sports Footwear & Studs</option>
                  <option>Bulk Club Kit Orders</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-gray-300 dark:text-gray-300 light:text-slate-700 block mb-1">Your Requirements / Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us what items or quantities you need..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-sports-orange"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-sports-orange hover:bg-sports-orangeHover text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry via WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Google Maps Container */}
          <div className="bg-[#101623] dark:bg-[#101623] light:bg-white rounded-3xl p-4 border border-gray-800 dark:border-gray-800 light:border-slate-200 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-3 px-2">
              <span className="text-xs font-bold text-gray-300 dark:text-gray-300 light:text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sports-orange" />
                Car Chowk, High Court Road, Rawalpindi
              </span>
              <a
                href="https://maps.google.com/?q=Car+Chowk+Rawalpindi"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-sports-orange font-bold hover:underline"
              >
                Open Full Map &rarr;
              </a>
            </div>

            <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-gray-700">
              <iframe
                title="AR Sports Store Location"
                src={BUSINESS_CONFIG.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
