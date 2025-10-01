import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ProductCatalog } from './components/ProductCatalog';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { Product, ProductFormat } from './lib/supabase';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [selectedFormat, setSelectedFormat] = useState<ProductFormat | undefined>();

  const handleOrderClick = () => {
    setSelectedProduct(undefined);
    setSelectedFormat(undefined);
    setIsOrderModalOpen(true);
  };

  const handleSelectProduct = (product: Product, format: ProductFormat) => {
    setSelectedProduct(product);
    setSelectedFormat(format);
    setIsOrderModalOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero onOrderClick={handleOrderClick} />
        <HowItWorks />
        <ProductCatalog onSelectProduct={handleSelectProduct} />
        <Reviews />
        <FAQ />
        <Footer />
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          selectedProduct={selectedProduct}
          selectedFormat={selectedFormat}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
