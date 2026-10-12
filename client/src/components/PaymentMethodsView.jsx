import React, { useState } from 'react';
import {
  CreditCard,
  Building,
  Smartphone,
  Wallet,
  Copy,
  Check,
  ShieldCheck,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export default function PaymentMethodsView() {
  const [copiedKey, setCopiedKey] = useState(null);
  const payment = BUSINESS_CONFIG.paymentAccounts;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-colors duration-200">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-black uppercase text-sports-orange tracking-wider">
          Official Business Payment Accounts
        </span>
        <h1 className="text-3xl sm:text-6xl font-heading font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          PAYMENT METHODS & VERIFICATION
        </h1>
        <p className="text-sm sm:text-base text-gray-300 dark:text-gray-300 light:text-slate-600">
          AR Sports operates dedicated, verified payment channels for customer convenience. Choose your preferred method below to finalize orders or advance deposits.
        </p>
      </div>

      {/* Grid of Accounts & Phone Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Accounts List */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-[#101623] dark:bg-[#101623] light:bg-white rounded-3xl p-6 sm:p-8 border border-gray-800 dark:border-gray-800 light:border-slate-200 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-800 dark:border-gray-800 light:border-slate-200 pb-4">
              <div>
                <span className="text-xs uppercase text-gray-400 dark:text-gray-400 light:text-slate-500 font-bold">Authorized Account Title:</span>
                <h3 className="text-xl sm:text-2xl font-black text-white dark:text-white light:text-slate-900">{payment.accountHolder}</h3>
              </div>
              <span className="px-3 py-1 bg-lime-500/15 text-lime-400 dark:text-lime-400 light:text-lime-700 border border-lime-500/30 text-xs font-black rounded-full">
                Verified Business
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {payment.methods.map((method, idx) => {
                const isCopied = copiedKey === idx;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#090D16] dark:bg-[#090D16] light:bg-slate-50 border border-gray-800 dark:border-gray-800 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-md border ${method.badgeColor}`}>
                          {method.provider}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 font-bold">{method.type}</span>
                      </div>

                      <div className="text-lg font-mono font-bold text-white dark:text-white light:text-slate-900 tracking-wider pt-1">
                        {method.accountNumber}
                      </div>

                      <div className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500">
                        Title: <strong className="text-gray-200 dark:text-gray-200 light:text-slate-800">{method.accountTitle}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(method.accountNumber, idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 flex-shrink-0 ${
                        isCopied
                          ? 'bg-lime-500 text-black'
                          : 'bg-gray-800 dark:bg-gray-800 light:bg-white text-gray-200 dark:text-gray-200 light:text-slate-800 border border-gray-700 dark:border-gray-700 light:border-slate-300 hover:text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Account</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cash on Delivery Notice */}
          <div className="p-5 rounded-2xl bg-[#101623] dark:bg-[#101623] light:bg-slate-50 border border-gray-800 dark:border-gray-800 light:border-slate-200 flex items-start gap-3 text-xs text-gray-300 dark:text-gray-300 light:text-slate-700 shadow-md">
            <ShieldCheck className="w-5 h-5 text-sports-orange flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white dark:text-white light:text-slate-900 text-sm mb-0.5 font-black">Cash on Delivery (COD) Rules</strong>
              {payment.codNote}
            </div>
          </div>

          {/* WhatsApp Verification */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-lime-950/30 to-[#101623] dark:from-lime-950/30 dark:to-[#101623] light:from-lime-50 light:to-white border border-lime-500/30 flex items-start gap-3 text-xs text-lime-300 dark:text-lime-300 light:text-lime-900 shadow-md">
            <MessageSquare className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white dark:text-white light:text-slate-900 text-sm mb-0.5 font-black">Payment Receipt Verification</strong>
              {payment.verificationNote}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Accounts Graphic Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#101623] dark:bg-[#101623] light:bg-white rounded-3xl p-6 sm:p-8 border border-gray-800 dark:border-gray-800 light:border-slate-200 space-y-4 shadow-2xl">
            <span className="text-xs uppercase text-sports-orange font-black tracking-wider block">
              Official Accounts Graphic Card
            </span>
            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-black shadow-lg">
              <img
                src={BUSINESS_CONFIG.accountCard}
                alt="AR Sports Official Accounts Detail Card"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="text-center pt-2">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam AR Sports! I want to share my payment transaction receipt screenshot.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Share Receipt on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
