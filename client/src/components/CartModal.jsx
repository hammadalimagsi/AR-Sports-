import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export default function CartModal({ isOpen, onClose, onNavigateToPayments }) {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Rawalpindi / Islamabad');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentChoice, setPaymentChoice] = useState('Cash on Delivery (COD)');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let itemsText = cart.map((item, idx) => {
      let customInfo = '';
      if (item.customName || item.customNumber) {
        customInfo = `\n   [Customization: ${item.customName ? `Name: ${item.customName}` : ''} ${item.customNumber ? `| No: ${item.customNumber}` : ''}]`;
      }
      return `${idx + 1}. *${item.name}*\n   Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}\n   Subtotal: PKR ${(item.price * item.quantity).toLocaleString()}${customInfo}`;
    }).join('\n\n');

    const message = `*NEW ORDER - AR SPORTS WEBSITE*\n------------------------------\n*Customer Details:*\n• Name: ${customerName || 'Customer'}\n• Phone: ${customerPhone || 'Not provided'}\n• City: ${deliveryCity}\n• Delivery Address: ${deliveryAddress || 'To be shared'}\n• Preferred Payment: ${paymentChoice}\n\n*Ordered Items:* (${totalItems} items)\n${itemsText}\n\n------------------------------\n*TOTAL ORDER VALUE: PKR ${totalPrice.toLocaleString()}*\n------------------------------\n${orderNotes ? `\n*Special Instructions:* ${orderNotes}\n` : ''}\nPlease confirm my order and share invoice/tracking details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#090D16] dark:bg-[#090D16] light:bg-white border-l border-gray-800 dark:border-gray-800 light:border-slate-200 h-full flex flex-col shadow-2xl transition-colors">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 dark:border-gray-800 light:border-slate-200 flex items-center justify-between bg-[#101623] dark:bg-[#101623] light:bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sports-orange/20 border border-sports-orange/30 text-sports-orange flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-black text-white dark:text-white light:text-slate-900 tracking-wide">
                YOUR SHOPPING CART
              </h2>
              <span className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 font-bold">
                {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gray-800 dark:bg-gray-800 light:bg-slate-100 flex items-center justify-center mx-auto text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-gray-300 dark:text-gray-300 light:text-slate-800">Your shopping cart is empty</p>
              <p className="text-xs text-gray-500">
                Browse our equipment catalog or design your custom team jersey.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-sports-orange text-white rounded-xl text-xs font-bold shadow-md"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-2xl bg-[#101623] dark:bg-[#101623] light:bg-slate-50 border border-gray-800 dark:border-gray-800 light:border-slate-200 flex gap-4 items-start shadow-md"
                >
                  <img
                    src={item.image || '/assets/branding/logo.png'}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-900 border border-gray-700/60 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 truncate">{item.name}</h3>
                    
                    <div className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 mt-0.5 space-x-2">
                      <span>Size: <strong className="text-gray-200 dark:text-gray-200 light:text-slate-800">{item.size}</strong></span>
                      <span>&bull;</span>
                      <span>Color: <strong className="text-gray-200 dark:text-gray-200 light:text-slate-800">{item.color}</strong></span>
                    </div>

                    {(item.customName || item.customNumber) && (
                      <div className="mt-1 px-2 py-0.5 rounded bg-lime-500/20 border border-lime-500/30 text-[11px] text-lime-400 dark:text-lime-400 light:text-lime-700 font-black w-fit">
                        Name: {item.customName} | #{item.customNumber}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-gray-900 dark:bg-gray-900 light:bg-white rounded-lg border border-gray-700 dark:border-gray-700 light:border-slate-300">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white dark:text-white light:text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-white dark:text-white light:text-slate-900">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Customer Checkout Details Form */}
              <div className="pt-4 border-t border-gray-800 dark:border-gray-800 light:border-slate-200 space-y-3">
                <span className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 light:text-slate-600 tracking-wider block">
                  Delivery Details for WhatsApp Order:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 placeholder-gray-500 focus:outline-none focus:border-sports-orange"
                  />
                  <input
                    type="text"
                    placeholder="Phone / WhatsApp Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 placeholder-gray-500 focus:outline-none focus:border-sports-orange"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none"
                  >
                    <option>Rawalpindi / Islamabad</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Peshawar</option>
                    <option>Faisalabad</option>
                    <option>Multan</option>
                    <option>Sialkot</option>
                    <option>Quetta</option>
                    <option>Other City (Nationwide)</option>
                  </select>

                  <select
                    value={paymentChoice}
                    onChange={(e) => setPaymentChoice(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none"
                  >
                    <option>Cash on Delivery (COD)</option>
                    <option>Easypaisa (03446241008)</option>
                    <option>JazzCash (03446241008)</option>
                    <option>Bank Transfer (Faysal / Mashreq)</option>
                  </select>
                </div>

                <textarea
                  rows={2}
                  placeholder="Complete Delivery Address & Landmark *"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-white dark:text-white light:text-slate-900 placeholder-gray-500 focus:outline-none focus:border-sports-orange"
                />

                <div className="bg-lime-950/30 dark:bg-lime-950/30 light:bg-lime-50 border border-lime-500/30 p-3 rounded-xl text-[11px] text-lime-300 dark:text-lime-300 light:text-lime-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-lime-400" />
                  <span>
                    Direct WhatsApp order summary will be sent to <strong>+92 318 5052449</strong> for verification and order confirmation.
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-800 dark:border-gray-800 light:border-slate-200 bg-[#101623] dark:bg-[#101623] light:bg-slate-50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 font-bold">Total Order Amount:</span>
                <div className="text-2xl font-heading font-black text-white dark:text-white light:text-slate-900">
                  PKR {totalPrice.toLocaleString()}
                </div>
              </div>
              <button
                onClick={clearCart}
                className="text-xs text-gray-500 hover:text-red-400 underline"
              >
                Clear Cart
              </button>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm tracking-wide shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Place Order on WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
