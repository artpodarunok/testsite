import { useState, useRef } from 'react';
import { X, Upload, Check, ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Product, ProductFormat, supabase } from '../lib/supabase';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product;
  selectedFormat?: ProductFormat;
}

type Step = 'upload' | 'select-product' | 'preview' | 'checkout' | 'success';

export function OrderModal({ isOpen, onClose, selectedProduct, selectedFormat }: OrderModalProps) {
  const [step, setStep] = useState<Step>(selectedProduct ? 'upload' : 'upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [formats, setFormats] = useState<ProductFormat[]>([]);
  const [selectedProd, setSelectedProd] = useState<Product | undefined>(selectedProduct);
  const [selectedFmt, setSelectedFmt] = useState<ProductFormat | undefined>(selectedFormat);
  const [uploading, setUploading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    delivery: 'nova_poshta',
    address: '',
    comment: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Будь ласка, оберіть файл зображення (JPG або PNG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Розмір файлу не повинен перевищувати 10 МБ');
      return;
    }

    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleContinueFromUpload = async () => {
    if (!uploadedFile) return;

    if (selectedProd && selectedFmt) {
      setStep('preview');
    } else {
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      setProducts(productsData || []);
      setStep('select-product');
    }
  };

  const handleSelectProduct = async (product: Product) => {
    setSelectedProd(product);

    const { data: formatsData } = await supabase
      .from('product_formats')
      .select('*')
      .eq('product_id', product.id)
      .order('sort_order');

    setFormats(formatsData || []);
  };

  const handleSelectFormat = (format: ProductFormat) => {
    setSelectedFmt(format);
    setStep('preview');
  };

  const handleSubmitOrder = async () => {
    if (!formData.name || !formData.phone || !uploadedFile || !selectedProd || !selectedFmt) {
      alert('Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }

    setUploading(true);

    try {
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const photoData = {
        file_name: uploadedFile.name,
        file_path: previewUrl,
        file_size: uploadedFile.size,
        mime_type: uploadedFile.type,
        width: img.width,
        height: img.height,
        thumbnail_path: previewUrl,
      };

      const { data: photoRecord, error: photoError } = await supabase
        .from('uploaded_photos')
        .insert(photoData)
        .select()
        .single();

      if (photoError) throw photoError;

      const orderNum = 'ORD-' + Date.now();

      const orderData = {
        order_number: orderNum,
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        product_id: selectedProd.id,
        format_id: selectedFmt.id,
        photo_id: photoRecord.id,
        total_price: selectedFmt.price,
        deposit_amount: 170,
        delivery_method: formData.delivery,
        delivery_address: formData.address,
        comment: formData.comment,
        status: 'new',
        payment_status: 'pending',
      };

      const { error: orderError } = await supabase
        .from('orders')
        .insert(orderData);

      if (orderError) throw orderError;

      setOrderNumber(orderNum);
      setStep('success');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Виникла помилка при створенні замовлення. Спробуйте ще раз.');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setStep('upload');
    setUploadedFile(null);
    setPreviewUrl('');
    setSelectedProd(selectedProduct);
    setSelectedFmt(selectedFormat);
    setFormData({
      name: '',
      phone: '',
      email: '',
      delivery: 'nova_poshta',
      address: '',
      comment: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={handleClose}></div>

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>

          <div className="p-8">
            {step === 'upload' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Завантажте ваше фото
                </h2>
                <p className="text-gray-600 mb-8">
                  Оберіть якісне фото у високій роздільності
                </p>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <span className="font-semibold text-gray-900">Завантаження фото</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm">
                        2
                      </div>
                      <span className="text-sm">Перегляд</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm">
                        3
                      </div>
                      <span className="text-sm">Оформлення</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 w-1/3 transition-all duration-300"></div>
                  </div>
                </div>

                {!uploadedFile ? (
                  <div
                    onClick={handleUploadClick}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                  >
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Натисніть, щоб завантажити фото
                    </p>
                    <p className="text-sm text-gray-500">
                      JPG або PNG, максимум 10 МБ
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative rounded-xl overflow-hidden border-2 border-rose-600">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-96 object-contain bg-gray-50"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center text-sm font-semibold">
                        <Check className="h-4 w-4 mr-1" />
                        Завантажено
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleUploadClick}
                        className="flex-1 px-6 py-3 border-2 border-rose-600 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors font-semibold"
                      >
                        Обрати інше фото
                      </button>
                      <button
                        onClick={handleContinueFromUpload}
                        className="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-semibold inline-flex items-center justify-center"
                      >
                        Продовжити
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-900 mb-2 flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Рекомендації щодо фото:
                  </h3>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Мінімальна роздільність: 1000x1000 пікселів</li>
                    <li>• Обличчя мають бути чіткими та добре освітленими</li>
                    <li>• Уникайте розмитих або темних знімків</li>
                    <li>• Формат: JPG або PNG</li>
                  </ul>
                </div>
              </div>
            )}

            {step === 'select-product' && (
              <div>
                <button
                  onClick={() => setStep('upload')}
                  className="mb-4 flex items-center text-gray-600 hover:text-rose-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  Назад
                </button>

                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {!selectedProd ? 'Оберіть продукт' : 'Оберіть формат'}
                </h2>

                {!selectedProd ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="text-left border-2 border-gray-200 rounded-xl p-6 hover:border-rose-600 hover:shadow-lg transition-all"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {product.name_uk}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {product.description_uk}
                        </p>
                        <div className="text-rose-600 font-bold">
                          Від {product.base_price}₴
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => handleSelectFormat(format)}
                        className="border-2 border-gray-200 rounded-xl p-6 hover:border-rose-600 hover:shadow-lg transition-all text-center"
                      >
                        <div className="text-lg font-bold text-gray-900 mb-2">
                          {format.size}
                        </div>
                        <div className="text-2xl font-bold text-rose-600">
                          {format.price}₴
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 'preview' && selectedProd && selectedFmt && (
              <div>
                <button
                  onClick={() => selectedProduct ? setStep('upload') : setStep('select-product')}
                  className="mb-4 flex items-center text-gray-600 hover:text-rose-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  Назад
                </button>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Перегляд замовлення
                </h2>
                <p className="text-gray-600 mb-8">
                  Перевірте деталі перед оформленням
                </p>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-sm">Завантаження</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <span className="font-semibold text-gray-900">Перегляд</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm">
                        3
                      </div>
                      <span className="text-sm">Оформлення</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 w-2/3 transition-all duration-300"></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Ваше фото:</h3>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full rounded-xl border-2 border-gray-200"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Деталі замовлення:</h3>
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div>
                        <div className="text-sm text-gray-500">Продукт:</div>
                        <div className="font-semibold text-gray-900">{selectedProd.name_uk}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Формат:</div>
                        <div className="font-semibold text-gray-900">{selectedFmt.size}</div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Вартість:</span>
                          <span className="text-2xl font-bold text-rose-600">{selectedFmt.price}₴</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Передоплата:</span>
                          <span className="font-semibold text-gray-900">170₴</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">При отриманні:</span>
                          <span className="font-semibold text-gray-900">{selectedFmt.price - 170}₴</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('checkout')}
                  className="w-full px-6 py-4 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-semibold text-lg inline-flex items-center justify-center"
                >
                  Оформити замовлення
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}

            {step === 'checkout' && (
              <div>
                <button
                  onClick={() => setStep('preview')}
                  className="mb-4 flex items-center text-gray-600 hover:text-rose-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  Назад
                </button>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Контактні дані
                </h2>
                <p className="text-gray-600 mb-8">
                  Заповніть форму для завершення замовлення
                </p>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-sm">Завантаження</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-sm">Перегляд</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <span className="font-semibold text-gray-900">Оформлення</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 w-full transition-all duration-300"></div>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ім'я та прізвище *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-600 focus:outline-none transition-colors"
                      placeholder="Введіть ваше ім'я"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-600 focus:outline-none transition-colors"
                      placeholder="+380 XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-600 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Спосіб доставки *
                    </label>
                    <select
                      value={formData.delivery}
                      onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-600 focus:outline-none transition-colors"
                    >
                      <option value="nova_poshta">Нова Пошта</option>
                      <option value="ukrposhta">Укрпошта</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Адреса відділення
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-600 focus:outline-none transition-colors"
                      placeholder="Місто, відділення №"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Коментар до замовлення
                    </label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-600 focus:outline-none transition-colors resize-none"
                      placeholder="Додаткові побажання..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full px-6 py-4 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Обробка...' : 'Підтвердити замовлення'}
                  </button>
                </form>

                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    Після підтвердження замовлення ми надішлемо вам безкоштовний ескіз для погодження перед виробництвом.
                  </p>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Замовлення оформлено!
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ваше замовлення <span className="font-bold text-rose-600">{orderNumber}</span> успішно створено.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold text-amber-900 mb-3">Що далі?</h3>
                  <ol className="space-y-2 text-sm text-amber-800">
                    <li>1. Ми зв'яжемося з вами протягом години для уточнення деталей</li>
                    <li>2. Підготуємо безкоштовний ескіз для вашого підтвердження</li>
                    <li>3. Після погодження розпочнемо виготовлення (1-2 дні)</li>
                    <li>4. Відправимо замовлення Новою Поштою</li>
                  </ol>
                </div>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-semibold"
                >
                  Готово
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
