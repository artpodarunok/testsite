import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Скільки коштує доставка?',
      answer: 'Доставка Новою Поштою оплачується отримувачем при отриманні посилки. Вартість залежить від міста призначення та ваги замовлення.',
    },
    {
      question: 'Які вимоги до фото?',
      answer: 'Фото має бути чітким, у високій роздільності (мінімум 1000x1000 пікселів). Підходять формати JPG та PNG. Обличчя на фото повинні бути добре освітлені та не розмиті.',
    },
    {
      question: 'Скільки часу займає виготовлення?',
      answer: 'Виготовлення займає 1-2 дні після підтвердження ескізу. Доставка Новою Поштою зазвичай займає 1-2 дні по Україні.',
    },
    {
      question: 'Що таке безкоштовний ескіз?',
      answer: 'Після оформлення замовлення ми створюємо макет вашої майбутньої картини та надсилаємо його вам на погодження перед виробництвом. Ви можете попросити внести корективи.',
    },
    {
      question: 'Як оплатити замовлення?',
      answer: 'Для підтвердження замовлення потрібна передоплата 170₴. Решту суми ви оплачуєте при отриманні товару в Новій Пошті. Передоплату можна зробити онлайн через LiqPay.',
    },
    {
      question: 'Чи можна повернути товар?',
      answer: 'Так, ви можете повернути товар протягом 14 днів, якщо він не підійшов. Товар має бути у вихідному стані та упаковці. Кошти повертаються протягом 5 робочих днів.',
    },
    {
      question: 'Яка якість друку на полотні?',
      answer: 'Ми використовуємо професійне обладнання та якісні чорнила, стійкі до вигорання. Друк виконується на натуральному полотні, натягнутому на дерев\'яний підрамник.',
    },
    {
      question: 'Чи можна замовити нестандартний розмір?',
      answer: 'Так, ми можемо виготовити картину або полотно нестандартного розміру. Зв\'яжіться з нами за телефоном або через форму зворотного зв\'язку для уточнення вартості.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Часті питання
          </h2>
          <p className="text-lg text-gray-600">
            Знайдіть відповіді на найпопулярніші питання
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-rose-600 transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-200 ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Не знайшли відповідь на своє питання?</p>
          <a
            href="tel:+380123456789"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Зателефонуйте нам
          </a>
        </div>
      </div>
    </section>
  );
}
