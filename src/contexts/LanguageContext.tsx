import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'uk' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Переводы
const translations = {
  uk: {
    // Header
    'nav.home': 'Головна',
    'nav.catalog': 'Каталог',
    'nav.how-it-works': 'Як замовити',
    'nav.reviews': 'Відгуки',
    'nav.faq': 'FAQ',
    'header.phone': '+380 12 345 67 89',
    
    // Hero
    'hero.title': 'Перетворіть фото на унікальний подарунок',
    'hero.subtitle': 'Створюємо персоналізовані картини за номерами та фотокартини на полотні. Безкоштовний ескіз, швидка доставка по Україні.',
    'hero.order-button': 'Завантажити фото',
    'hero.catalog-button': 'Переглянути каталог',
    'hero.prepayment': 'Передоплата',
    'hero.delivery-days': 'Дні доставки',
    'hero.quality-guarantee': 'Гарантія якості',
    'hero.clients-count': '1000+ клієнтів',
    'hero.clients-text': 'вже замовили',
    
    // How it works
    'how-it-works.title': 'Як це працює?',
    'how-it-works.subtitle': 'Всього 4 простих кроки до вашого унікального подарунка',
    'how-it-works.step1.title': 'Завантажте фото',
    'how-it-works.step1.description': 'Оберіть якісне фото, яке хочете перетворити на картину або полотно',
    'how-it-works.step2.title': 'Виберіть формат',
    'how-it-works.step2.description': 'Оберіть розмір та тип продукту з нашого каталогу',
    'how-it-works.step3.title': 'Оплатіть передоплату',
    'how-it-works.step3.description': 'Внесіть передоплату 170₴, решту оплатіть при отриманні',
    'how-it-works.step4.title': 'Отримайте замовлення',
    'how-it-works.step4.description': 'Доставка Новою Поштою протягом 1-3 днів по всій Україні',
    'how-it-works.bonus.title': 'Безкоштовний ескіз перед виробництвом!',
    'how-it-works.bonus.description': 'Ми надішлемо вам макет майбутньої картини для підтвердження перед початком роботи',
    
    // Product catalog
    'catalog.title': 'Наші продукти',
    'catalog.subtitle': 'Оберіть ідеальний варіант для вашого подарунка',
    'catalog.select-button': 'Обрати',
    'catalog.available-formats': 'Доступні формати:',
    'catalog.show-all-formats': 'Показати всі формати',
    
    // Reviews
    'reviews.title': 'Відгуки наших клієнтів',
    'reviews.subtitle': 'Щастя наших клієнтів - найкраща нагорода для нас',
    
    // FAQ
    'faq.title': 'Часті питання',
    'faq.subtitle': 'Знайдіть відповіді на найпопулярніші питання',
    'faq.question1': 'Скільки коштує доставка?',
    'faq.answer1': 'Доставка Новою Поштою оплачується отримувачем при отриманні посилки. Вартість залежить від міста призначення та ваги замовлення.',
    'faq.question2': 'Які вимоги до фото?',
    'faq.answer2': 'Фото має бути чітким, у високій роздільності (мінімум 1000x1000 пікселів). Підходять формати JPG та PNG. Обличчя на фото повинні бути добре освітлені та не розмиті.',
    'faq.question3': 'Скільки часу займає виготовлення?',
    'faq.answer3': 'Виготовлення займає 1-2 дні після підтвердження ескізу. Доставка Новою Поштою зазвичай займає 1-2 дні по Україні.',
    'faq.question4': 'Що таке безкоштовний ескіз?',
    'faq.answer4': 'Після оформлення замовлення ми створюємо макет вашої майбутньої картини та надсилаємо його вам на погодження перед виробництвом. Ви можете попросити внести корективи.',
    'faq.question5': 'Як оплатити замовлення?',
    'faq.answer5': 'Для підтвердження замовлення потрібна передоплата 170₴. Решту суми ви оплачуєте при отриманні товару в Новій Пошті. Передоплату можна зробити онлайн через LiqPay.',
    'faq.question6': 'Чи можна повернути товар?',
    'faq.answer6': 'Так, ви можете повернути товар протягом 14 днів, якщо він не підійшов. Товар має бути у вихідному стані та упаковці. Кошти повертаються протягом 5 робочих днів.',
    'faq.question7': 'Яка якість друку на полотні?',
    'faq.answer7': 'Ми використовуємо професійне обладнання та якісні чорнила, стійкі до вигорання. Друк виконується на натуральному полотні, натягнутому на дерев\'яний підрамник.',
    'faq.question8': 'Чи можна замовити нестандартний розмір?',
    'faq.answer8': 'Так, ми можемо виготовити картину або полотно нестандартного розміру. Зв\'яжіться з нами за телефоном або через форму зворотного зв\'язку для уточнення вартості.',
    
    // Footer
    'footer.description': 'PodarunokPro - ваш надійний партнер у виборі подарунків',
    'footer.description-text': 'Персоналізовані подарунки, створені з любов\'ю. Перетворюємо ваші фото на унікальні картини та полотна.',
    'footer.navigation': 'Навігація',
    'footer.information': 'Інформація',
    'footer.contact': 'Контакти',
    'footer.phone': 'Телефон',
    'footer.email': 'Email',
    'footer.address': 'Адреса',
    'footer.about': 'Про нас',
    'footer.delivery': 'Доставка та оплата',
    'footer.guarantee': 'Гарантія та повернення',
    'footer.privacy': 'Політика конфіденційності',
    'footer.terms': 'Договір оферти',
    'footer.working-hours': 'Пн-Нд: 9:00 - 20:00',
    
    // Order modal
    'order.title': 'Оформити замовлення',
    'order.name': 'Ваше ім\'я',
    'order.phone': 'Телефон',
    'order.email': 'Email',
    'order.address': 'Адреса доставки',
    'order.message': 'Повідомлення для одержувача',
    'order.submit': 'Замовити',
    'order.cancel': 'Скасувати',
    'order.upload-photo': 'Завантажити фото',
    'order.select-product': 'Оберіть продукт',
    'order.preview': 'Попередній перегляд',
    'order.checkout': 'Оформлення замовлення',
    'order.success': 'Замовлення оформлено',
    'order.file-error': 'Будь ласка, оберіть файл зображення (JPG або PNG)',
    'order.file-size-error': 'Розмір файлу не повинен перевищувати 10 МБ',
  },
  ru: {
    // Header
    'nav.home': 'Главная',
    'nav.catalog': 'Каталог',
    'nav.how-it-works': 'Как заказать',
    'nav.reviews': 'Отзывы',
    'nav.faq': 'FAQ',
    'header.phone': '+380 12 345 67 89',
    
    // Hero
    'hero.title': 'Превратите фото в уникальный подарок',
    'hero.subtitle': 'Создаем персонализированные картины по номерам и фотокартины на холсте. Бесплатный эскиз, быстрая доставка по Украине.',
    'hero.order-button': 'Загрузить фото',
    'hero.catalog-button': 'Посмотреть каталог',
    'hero.prepayment': 'Предоплата',
    'hero.delivery-days': 'Дни доставки',
    'hero.quality-guarantee': 'Гарантия качества',
    'hero.clients-count': '1000+ клиентов',
    'hero.clients-text': 'уже заказали',
    
    // How it works
    'how-it-works.title': 'Как это работает?',
    'how-it-works.subtitle': 'Всего 4 простых шага до вашего уникального подарка',
    'how-it-works.step1.title': 'Загрузите фото',
    'how-it-works.step1.description': 'Выберите качественное фото, которое хотите превратить в картину или холст',
    'how-it-works.step2.title': 'Выберите формат',
    'how-it-works.step2.description': 'Выберите размер и тип продукта из нашего каталога',
    'how-it-works.step3.title': 'Оплатите предоплату',
    'how-it-works.step3.description': 'Внесите предоплату 170₴, остальное оплатите при получении',
    'how-it-works.step4.title': 'Получите заказ',
    'how-it-works.step4.description': 'Доставка Новой Почтой в течение 1-3 дней по всей Украине',
    'how-it-works.bonus.title': 'Бесплатный эскиз перед производством!',
    'how-it-works.bonus.description': 'Мы отправим вам макет будущей картины для подтверждения перед началом работы',
    
    // Product catalog
    'catalog.title': 'Наши продукты',
    'catalog.subtitle': 'Выберите идеальный вариант для вашего подарка',
    'catalog.select-button': 'Выбрать',
    'catalog.available-formats': 'Доступные форматы:',
    'catalog.show-all-formats': 'Показать все форматы',
    
    // Reviews
    'reviews.title': 'Отзывы наших клиентов',
    'reviews.subtitle': 'Счастье наших клиентов - лучшая награда для нас',
    
    // FAQ
    'faq.title': 'Частые вопросы',
    'faq.subtitle': 'Найдите ответы на самые популярные вопросы',
    'faq.question1': 'Сколько стоит доставка?',
    'faq.answer1': 'Доставка Новой Почтой оплачивается получателем при получении посылки. Стоимость зависит от города назначения и веса заказа.',
    'faq.question2': 'Какие требования к фото?',
    'faq.answer2': 'Фото должно быть четким, в высоком разрешении (минимум 1000x1000 пикселей). Подходят форматы JPG и PNG. Лица на фото должны быть хорошо освещены и не размыты.',
    'faq.question3': 'Сколько времени занимает изготовление?',
    'faq.answer3': 'Изготовление занимает 1-2 дня после подтверждения эскиза. Доставка Новой Почтой обычно занимает 1-2 дня по Украине.',
    'faq.question4': 'Что такое бесплатный эскиз?',
    'faq.answer4': 'После оформления заказа мы создаем макет вашей будущей картины и отправляем его вам на согласование перед производством. Вы можете попросить внести корректировки.',
    'faq.question5': 'Как оплатить заказ?',
    'faq.answer5': 'Для подтверждения заказа нужна предоплата 170₴. Остальную сумму вы оплачиваете при получении товара в Новой Почте. Предоплату можно сделать онлайн через LiqPay.',
    'faq.question6': 'Можно ли вернуть товар?',
    'faq.answer6': 'Да, вы можете вернуть товар в течение 14 дней, если он не подошел. Товар должен быть в исходном состоянии и упаковке. Деньги возвращаются в течение 5 рабочих дней.',
    'faq.question7': 'Какое качество печати на холсте?',
    'faq.answer7': 'Мы используем профессиональное оборудование и качественные чернила, стойкие к выгоранию. Печать выполняется на натуральном холсте, натянутом на деревянный подрамник.',
    'faq.question8': 'Можно ли заказать нестандартный размер?',
    'faq.answer8': 'Да, мы можем изготовить картину или холст нестандартного размера. Свяжитесь с нами по телефону или через форму обратной связи для уточнения стоимости.',
    
    // Footer
    'footer.description': 'PodarunokPro - ваш надежный партнер в выборе подарков',
    'footer.description-text': 'Персонализированные подарки, созданные с любовью. Превращаем ваши фото в уникальные картины и холсты.',
    'footer.navigation': 'Навигация',
    'footer.information': 'Информация',
    'footer.contact': 'Контакты',
    'footer.phone': 'Телефон',
    'footer.email': 'Email',
    'footer.address': 'Адрес',
    'footer.about': 'О нас',
    'footer.delivery': 'Доставка и оплата',
    'footer.guarantee': 'Гарантия и возврат',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Договор оферты',
    'footer.working-hours': 'Пн-Вс: 9:00 - 20:00',
    
    // Order modal
    'order.title': 'Оформить заказ',
    'order.name': 'Ваше имя',
    'order.phone': 'Телефон',
    'order.email': 'Email',
    'order.address': 'Адрес доставки',
    'order.message': 'Сообщение для получателя',
    'order.submit': 'Заказать',
    'order.cancel': 'Отменить',
    'order.upload-photo': 'Загрузить фото',
    'order.select-product': 'Выберите продукт',
    'order.preview': 'Предварительный просмотр',
    'order.checkout': 'Оформление заказа',
    'order.success': 'Заказ оформлен',
    'order.file-error': 'Пожалуйста, выберите файл изображения (JPG или PNG)',
    'order.file-size-error': 'Размер файла не должен превышать 10 МБ',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('uk');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
