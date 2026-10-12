import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import CustomJerseyDesigner from './components/CustomJerseyDesigner';
import PaymentMethodsView from './components/PaymentMethodsView';
import AboutUsView from './components/AboutUsView';
import ContactView from './components/ContactView';
import CartModal from './components/CartModal';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  // Legacy category filter (used by HeroBanner / footer quick-links)
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Game-based navigation (from mega menu)
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  // Product detail
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Cart
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ── Navigate to a product detail page ─────────────────────────────────
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setActivePage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Handle mega-menu game selection ────────────────────────────────────
  // Called by Navbar with { game, subcategory, product }
  const handleGameSelect = ({ game, subcategory, product }) => {
    if (product) {
      // Direct product navigation from featured card
      handleSelectProduct(product);
      return;
    }
    setSelectedGame(game || null);
    setSelectedSubcategory(subcategory || null);
    setSelectedCategory('all'); // reset legacy filter
    setSelectedProduct(null);
    setActivePage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Handle subcategory change from inside catalog ───────────────────────
  const handleCatalogGameSelect = (game, subcategory) => {
    setSelectedGame(game || null);
    setSelectedSubcategory(subcategory || null);
  };

  // ── Helper to clear game filter from Footer / HeroBanner ───────────────
  const navigateToCatalog = (page) => {
    setSelectedProduct(null);
    if (page === 'catalog') {
      setSelectedGame(null);
      setSelectedSubcategory(null);
    }
    setActivePage(page);
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#080C14] dark:bg-[#080C14] light:bg-[#F8FAFC] text-gray-100 dark:text-gray-100 light:text-slate-900 font-sans selection:bg-sports-orange selection:text-white transition-colors duration-200">

          {/* Navigation Bar */}
          <Navbar
            activePage={activePage === 'product-detail' ? 'catalog' : activePage}
            setActivePage={(page) => {
              setSelectedProduct(null);
              setActivePage(page);
            }}
            openCart={() => setIsCartOpen(true)}
            onGameSelect={handleGameSelect}
          />

          {/* Main View */}
          <main className="flex-1">
            {activePage === 'home' && (
              <HeroBanner
                setActivePage={setActivePage}
                setSelectedCategory={(cat) => {
                  setSelectedCategory(cat);
                  setSelectedGame(null);
                  setSelectedSubcategory(null);
                }}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {activePage === 'catalog' && (
              <ProductCatalog
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onSelectProduct={handleSelectProduct}
                selectedGame={selectedGame}
                selectedSubcategory={selectedSubcategory}
                onSelectGame={handleCatalogGameSelect}
              />
            )}

            {activePage === 'product-detail' && selectedProduct && (
              <ProductDetail
                product={selectedProduct}
                onBack={handleBackToCatalog}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenCustomizer={() => {
                  setSelectedProduct(null);
                  setActivePage('customizer');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activePage === 'customizer' && (
              <CustomJerseyDesigner onOpenCart={() => setIsCartOpen(true)} />
            )}

            {activePage === 'payments' && <PaymentMethodsView />}

            {activePage === 'about' && (
              <AboutUsView setActivePage={setActivePage} />
            )}

            {activePage === 'contact' && <ContactView />}
          </main>

          {/* Cart Modal */}
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onNavigateToPayments={() => {
              setIsCartOpen(false);
              setActivePage('payments');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Footer */}
          <Footer
            setActivePage={navigateToCatalog}
            setSelectedCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedGame(null);
              setSelectedSubcategory(null);
            }}
          />

        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
