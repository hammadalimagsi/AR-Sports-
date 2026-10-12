import React, { useState } from 'react';
import {
  Shirt,
  Sparkles,
  ShoppingBag,
  MessageSquare,
  Check,
  RotateCw,
  Palette,
  Shield,
  Layers,
  Flame
} from 'lucide-react';
import Product3DViewer from './Product3DViewer';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { useCart } from '../context/CartContext';

export default function CustomJerseyDesigner({ onOpenCart }) {
  const [playerName, setPlayerName] = useState('KHAN');
  const [playerNumber, setPlayerNumber] = useState('10');
  const [kitSport, setKitSport] = useState('Cricket'); // Cricket, Football, Volleyball, Badminton
  const [selectedSize, setSelectedSize] = useState('L (42)');
  const [selectedColorHex, setSelectedColorHex] = useState('#84CC16'); // default electric lime
  const [collarStyle, setCollarStyle] = useState('V-Neck Ribbed');
  const [fabricType, setFabricType] = useState('Pro Micro-Mesh DryFit');
  const [sleeveType, setSleeveType] = useState('Short Sleeves');
  const [quantity, setQuantity] = useState(1);
  const [teamOrBulkNote, setTeamOrBulkNote] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();

  const colorPalette = [
    { name: 'Electric Lime', hex: '#84CC16', desc: 'Championship Lime Green' },
    { name: 'Flame Orange', hex: '#FF5722', desc: 'High Intensity Match Orange' },
    { name: 'Royal Blue', hex: '#2563EB', desc: 'Championship Deep Blue' },
    { name: 'Stealth Black', hex: '#111827', desc: 'Tactical Matte Black' },
    { name: 'Victory Gold', hex: '#EAB308', desc: 'Solar Tournament Gold' },
    { name: 'Pure White', hex: '#F8FAFC', desc: 'Classic Cricket Whites' },
  ];

  const sportsOptions = ['Cricket', 'Football', 'Volleyball', 'Badminton / Hockey'];
  const sizes = ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)', 'Custom Club Youth'];

  const basePricePerJersey = 2450;
  const totalPrice = basePricePerJersey * quantity;

  const handleAddToCart = () => {
    const customProduct = {
      id: `CUSTOM-${kitSport.toUpperCase()}-${Date.now().toString().slice(-4)}`,
      name: `Custom Sublimation ${kitSport} Kit (${playerName} #${playerNumber})`,
      price: basePricePerJersey,
      category: 'cricket-clothing',
      subcategory: `${kitSport} Sublimation Kits`,
      images: ['https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80'],
      description: `Custom ${kitSport} match jersey for ${playerName} #${playerNumber} with ${collarStyle}, ${sleeveType}, and ${fabricType}.`,
      sizes: [selectedSize],
      colors: [colorPalette.find(c => c.hex === selectedColorHex)?.name || 'Custom Color']
    };

    addToCart(customProduct, {
      quantity,
      size: selectedSize,
      color: colorPalette.find(c => c.hex === selectedColorHex)?.name || 'Custom',
      customName: playerName.toUpperCase(),
      customNumber: playerNumber,
      customLogo: collarStyle
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleOrderWhatsApp = () => {
    const text = `Salam AR Sports Rawalpindi!\n\nI want to place a custom sublimation team jersey order:\n- Sport: ${kitSport}\n- Player Name: ${playerName.toUpperCase()}\n- Squad Number: ${playerNumber}\n- Colorway: ${colorPalette.find(c => c.hex === selectedColorHex)?.name}\n- Collar: ${collarStyle}\n- Sleeves: ${sleeveType}\n- Fabric: ${fabricType}\n- Size: ${selectedSize}\n- Quantity: ${quantity} units\n- Total Estimated: PKR ${totalPrice.toLocaleString()}\n${teamOrBulkNote ? `- Team Roster / Notes: ${teamOrBulkNote}\n` : ''}\nPlease confirm production schedule and advance deposit details.`;

    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-colors duration-200">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 dark:text-lime-400 light:text-lime-700 text-xs font-black uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5" />
          <span>Interactive 3D Sublimation Studio</span>
        </div>
        <h1 className="text-3xl sm:text-6xl font-heading font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          CUSTOM JERSEY & SQUAD KIT DESIGNER
        </h1>
        <p className="text-sm sm:text-base text-gray-300 dark:text-gray-300 light:text-slate-600">
          Personalize player names, squad numbers, collar cuts, and colorways with real-time 3D rotation before confirming your order via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 3D Preview Frame & Live Badge */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="relative">
            {/* 3D Component with controls */}
            <Product3DViewer
              modelType={kitSport === 'Football' ? 'football-jersey' : 'cricket-jersey'}
              color={selectedColorHex}
              playerNumber={playerNumber || '00'}
              playerName={playerName || 'PLAYER'}
              heightClass="h-96 sm:h-[480px]"
            />

            {/* Live Jersey Preview Overlay Simulation */}
            <div className="absolute bottom-6 right-6 bg-black/85 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl text-right max-w-xs pointer-events-none">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Live Jersey Stamp</span>
              <div className="text-2xl font-black text-white tracking-wider">
                {playerName.toUpperCase() || 'PLAYER'}
              </div>
              <div className="text-4xl font-heading font-black text-sports-orange leading-none">
                {playerNumber || '00'}
              </div>
              <div className="text-xs text-lime-400 font-black mt-1">
                {kitSport} &bull; {selectedSize}
              </div>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="bg-[#101623] dark:bg-[#101623] light:bg-white p-4 rounded-2xl border border-gray-800 dark:border-gray-800 light:border-slate-200 text-xs text-gray-400 dark:text-gray-400 light:text-slate-600 flex items-start gap-3 shadow-md">
            <Shield className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white dark:text-white light:text-slate-900 block">Sublimation Zero-Fade Guarantee:</span>
              Dyes are vacuum-infused into performance poly fibers at 200°C. Never flakes, peels, or fades during matches or washes.
            </div>
          </div>

        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-5 bg-[#101623] dark:bg-[#101623] light:bg-white rounded-3xl p-6 sm:p-8 border border-gray-800 dark:border-gray-800 light:border-slate-200 space-y-6 shadow-2xl">
          
          {/* Sport Selector */}
          <div>
            <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 light:text-slate-500 tracking-wider block mb-2">
              1. Choose Sport Discipline:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sportsOptions.map(sport => (
                <button
                  key={sport}
                  onClick={() => setKitSport(sport)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    kitSport === sport
                      ? 'bg-sports-orange text-white shadow-md font-black'
                      : 'bg-gray-800 dark:bg-gray-800 light:bg-slate-100 text-gray-300 dark:text-gray-300 light:text-slate-700 hover:bg-gray-700'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Player Name & Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 light:text-slate-500 tracking-wider block mb-1.5">
                Player Name:
              </label>
              <input
                type="text"
                maxLength={14}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                placeholder="e.g. KHAN"
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-bold text-sm uppercase focus:outline-none focus:border-sports-orange"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 light:text-slate-500 tracking-wider block mb-1.5">
                Squad Number:
              </label>
              <input
                type="text"
                maxLength={3}
                value={playerNumber}
                onChange={(e) => setPlayerNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 10"
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-heading font-black text-lg text-center focus:outline-none focus:border-sports-orange"
              />
            </div>
          </div>

          {/* Colorway Palette */}
          <div>
            <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 light:text-slate-500 tracking-wider block mb-2 flex items-center justify-between">
              <span>2. Select Colorway:</span>
              <span className="text-lime-400 dark:text-lime-400 light:text-lime-700 font-black text-[11px]">
                {colorPalette.find(c => c.hex === selectedColorHex)?.name}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorPalette.map(color => (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColorHex(color.hex)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-bold transition-all ${
                    selectedColorHex === color.hex
                      ? 'border-sports-orange bg-sports-orange/20 text-white shadow'
                      : 'border-gray-800 dark:border-gray-800 light:border-slate-200 bg-gray-900/60 dark:bg-gray-900/60 light:bg-slate-50 text-gray-400 dark:text-gray-400 light:text-slate-600 hover:border-gray-700'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/40 flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="truncate">{color.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collar & Sleeves */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 light:text-slate-500 tracking-wider block mb-1">
                Collar Style:
              </label>
              <select
                value={collarStyle}
                onChange={(e) => setCollarStyle(e.target.value)}
                className="w-full bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 rounded-xl text-xs py-2.5 px-3 focus:outline-none"
              >
                <option>Round Neck</option>
                <option>V-Neck Ribbed</option>
                <option>Polo Button Collar</option>
                <option>Mandarin Collar</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 light:text-slate-500 tracking-wider block mb-1">
                Sleeve Cut:
              </label>
              <select
                value={sleeveType}
                onChange={(e) => setSleeveType(e.target.value)}
                className="w-full bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 rounded-xl text-xs py-2.5 px-3 focus:outline-none"
              >
                <option>Short Sleeves</option>
                <option>Full Length Sleeves</option>
                <option>Sleeveless Vest</option>
              </select>
            </div>
          </div>

          {/* Size & Quantity */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 light:text-slate-500 tracking-wider block">
              3. Select Size:
            </label>
            <div className="flex flex-wrap gap-2">
              {sizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedSize === sz
                      ? 'bg-sports-orange text-white shadow font-black'
                      : 'bg-gray-800 dark:bg-gray-800 light:bg-slate-100 text-gray-300 dark:text-gray-300 light:text-slate-700 hover:bg-gray-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Total Calculation & Quantity */}
          <div className="pt-2 border-t border-gray-800 dark:border-gray-800 light:border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 block font-bold">Units / Quantity:</span>
              <div className="flex items-center bg-gray-900 dark:bg-gray-900 light:bg-slate-100 rounded-xl border border-gray-700 dark:border-gray-700 light:border-slate-300 mt-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-400 dark:text-gray-400 light:text-slate-800 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm font-black text-white dark:text-white light:text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-400 dark:text-gray-400 light:text-slate-800 hover:text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400 dark:text-gray-400 light:text-slate-500 block font-bold">Estimated Total:</span>
              <span className="text-2xl font-heading font-black text-white dark:text-white light:text-slate-900">
                PKR {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Optional Roster Note */}
          <div>
            <label className="text-xs font-bold text-gray-400 dark:text-gray-400 light:text-slate-600 block mb-1">
              Team Roster or Sponsor Logo Notes (Optional):
            </label>
            <textarea
              rows={2}
              value={teamOrBulkNote}
              onChange={(e) => setTeamOrBulkNote(e.target.value)}
              placeholder="e.g. 15 kits with squad roster: 1-Ahmed(M), 7-Ali(L), 10-Khan(XL)..."
              className="w-full px-3 py-2 rounded-xl bg-gray-900 dark:bg-gray-900 light:bg-slate-50 border border-gray-700 dark:border-gray-700 light:border-slate-300 text-xs text-gray-200 dark:text-gray-200 light:text-slate-900 focus:outline-none focus:border-sports-orange"
            />
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-black text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 ${
                isAdded
                  ? 'bg-lime-500 text-black'
                  : 'bg-sports-orange hover:bg-sports-orangeHover text-white shadow-orange-600/30'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Custom Kit Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add Custom Kit to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleOrderWhatsApp}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm tracking-wide transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Custom Order to WhatsApp</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
