import { Upload, Palette, CreditCard, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: Upload,
      titleKey: 'how-it-works.step1.title',
      descriptionKey: 'how-it-works.step1.description',
    },
    {
      icon: Palette,
      titleKey: 'how-it-works.step2.title',
      descriptionKey: 'how-it-works.step2.description',
    },
    {
      icon: CreditCard,
      titleKey: 'how-it-works.step3.title',
      descriptionKey: 'how-it-works.step3.description',
    },
    {
      icon: Package,
      titleKey: 'how-it-works.step4.title',
      descriptionKey: 'how-it-works.step4.description',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('how-it-works.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('how-it-works.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-600 mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10 hidden lg:block last:hidden"></div>
                  <div className="absolute top-2 -left-2 w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-gray-600">
                    {t(step.descriptionKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('how-it-works.bonus.title')}
              </h3>
              <p className="text-gray-600">
                {t('how-it-works.bonus.description')}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white px-8 py-4 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-rose-600">100%</div>
                <div className="text-sm text-gray-600">Гарантія якості</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
