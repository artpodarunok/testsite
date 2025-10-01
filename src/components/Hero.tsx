import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onOrderClick: () => void;
}

export function Hero({ onOrderClick }: HeroProps) {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="relative bg-gradient-to-br from-rose-50 via-white to-amber-50 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ImageIcon className="mr-2 h-5 w-5" />
                {t('hero.order-button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-rose-600 bg-white border-2 border-rose-600 rounded-lg hover:bg-rose-50 transition-all duration-200"
              >
                {t('hero.catalog-button')}
              </a>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-rose-600">170₴</div>
                <div className="text-sm text-gray-600 mt-1">{t('hero.prepayment')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-rose-600">1-3</div>
                <div className="text-sm text-gray-600 mt-1">{t('hero.delivery-days')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-rose-600">100%</div>
                <div className="text-sm text-gray-600 mt-1">{t('hero.quality-guarantee')}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Приклад картини"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-rose-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-amber-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-sky-500 border-2 border-white"></div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t('hero.clients-count')}</div>
                  <div className="text-xs text-gray-500">{t('hero.clients-text')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
