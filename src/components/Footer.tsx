import { ShoppingBag, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-8 w-8 text-rose-500" />
              <span className="ml-2 text-xl font-bold text-white">PodarunokPro</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Персоналізовані подарунки, створені з любов'ю. Перетворюємо ваші фото на унікальні картини та полотна.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Навігація</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-sm hover:text-rose-500 transition-colors">
                  Головна
                </a>
              </li>
              <li>
                <a href="#catalog" className="text-sm hover:text-rose-500 transition-colors">
                  Каталог
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm hover:text-rose-500 transition-colors">
                  Як замовити
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-sm hover:text-rose-500 transition-colors">
                  Відгуки
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm hover:text-rose-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Інформація</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-rose-500 transition-colors">
                  Про нас
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-rose-500 transition-colors">
                  Доставка та оплата
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-rose-500 transition-colors">
                  Гарантія та повернення
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-rose-500 transition-colors">
                  Політика конфіденційності
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-rose-500 transition-colors">
                  Договір оферти
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-rose-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+380123456789" className="text-sm hover:text-rose-500 transition-colors">
                    +380 12 345 67 89
                  </a>
                  <div className="text-xs text-gray-400">Пн-Нд: 9:00 - 20:00</div>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-rose-500 mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@podarunokpro.site" className="text-sm hover:text-rose-500 transition-colors">
                  info@podarunokpro.site
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-rose-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Київ, Україна
                </span>
              </li>
            </ul>

            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-rose-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-rose-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PodarunokPro. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
