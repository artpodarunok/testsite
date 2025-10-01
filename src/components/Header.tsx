import { ShoppingBag, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-rose-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">PodarunokPro</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-rose-600 transition-colors">
              Головна
            </a>
            <a href="#catalog" className="text-gray-700 hover:text-rose-600 transition-colors">
              Каталог
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-rose-600 transition-colors">
              Як замовити
            </a>
            <a href="#reviews" className="text-gray-700 hover:text-rose-600 transition-colors">
              Відгуки
            </a>
            <a href="#faq" className="text-gray-700 hover:text-rose-600 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+380123456789" className="flex items-center text-gray-700 hover:text-rose-600 transition-colors">
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-semibold">+380 12 345 67 89</span>
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-3">
            <a
              href="#home"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Головна
            </a>
            <a
              href="#catalog"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Каталог
            </a>
            <a
              href="#how-it-works"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Як замовити
            </a>
            <a
              href="#reviews"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Відгуки
            </a>
            <a
              href="#faq"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="tel:+380123456789"
              className="flex items-center text-rose-600 font-semibold"
            >
              <Phone className="h-5 w-5 mr-2" />
              +380 12 345 67 89
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
