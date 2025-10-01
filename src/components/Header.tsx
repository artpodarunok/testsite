import { ShoppingBag, Phone, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
              {t('nav.home')}
            </a>
            <a href="#catalog" className="text-gray-700 hover:text-rose-600 transition-colors">
              {t('nav.catalog')}
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-rose-600 transition-colors">
              {t('nav.how-it-works')}
            </a>
            <a href="#reviews" className="text-gray-700 hover:text-rose-600 transition-colors">
              {t('nav.reviews')}
            </a>
            <a href="#faq" className="text-gray-700 hover:text-rose-600 transition-colors">
              {t('nav.faq')}
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center text-gray-700 hover:text-rose-600 transition-colors"
              >
                <Globe className="h-5 w-5 mr-1" />
                <span className="font-semibold">{language.toUpperCase()}</span>
              </button>
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      setLanguage('uk');
                      setLanguageMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      language === 'uk' ? 'text-rose-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    UK
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ru');
                      setLanguageMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      language === 'ru' ? 'text-rose-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    RU
                  </button>
                </div>
              )}
            </div>
            
            <a href="tel:+380123456789" className="flex items-center text-gray-700 hover:text-rose-600 transition-colors">
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-semibold">{t('header.phone')}</span>
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
              {t('nav.home')}
            </a>
            <a
              href="#catalog"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.catalog')}
            </a>
            <a
              href="#how-it-works"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.how-it-works')}
            </a>
            <a
              href="#reviews"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.reviews')}
            </a>
            <a
              href="#faq"
              className="block text-gray-700 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.faq')}
            </a>
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-4 pt-2 border-t">
              <span className="text-sm text-gray-500">Мова:</span>
              <button
                onClick={() => {
                  setLanguage('uk');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-sm rounded ${
                  language === 'uk' ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                UK
              </button>
              <button
                onClick={() => {
                  setLanguage('ru');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-sm rounded ${
                  language === 'ru' ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                RU
              </button>
            </div>
            
            <a
              href="tel:+380123456789"
              className="flex items-center text-rose-600 font-semibold"
            >
              <Phone className="h-5 w-5 mr-2" />
              {t('header.phone')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
