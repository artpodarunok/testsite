import { useEffect, useState } from 'react';
import { supabase, Product, ProductFormat } from '../lib/supabase';
import { Check, ArrowRight } from 'lucide-react';

interface ProductWithFormats extends Product {
  formats?: ProductFormat[];
}

interface ProductCatalogProps {
  onSelectProduct: (product: Product, format: ProductFormat) => void;
}

export function ProductCatalog({ onSelectProduct }: ProductCatalogProps) {
  const [products, setProducts] = useState<ProductWithFormats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (productsError) throw productsError;

      const { data: formatsData, error: formatsError } = await supabase
        .from('product_formats')
        .select('*')
        .order('sort_order');

      if (formatsError) throw formatsError;

      const productsWithFormats = productsData?.map((product) => ({
        ...product,
        formats: formatsData?.filter((format) => format.product_id === product.id) || [],
      })) || [];

      setProducts(productsWithFormats);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наші продукти
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Оберіть ідеальний варіант для вашого подарунка
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-rose-100 to-amber-100 relative overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name_uk}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt={product.name_uk}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.name_uk}
                </h3>
                <p className="text-gray-600 mb-6">
                  {product.description_uk}
                </p>

                <div className="space-y-3 mb-6">
                  {product.slug === 'custom-paint-by-numbers' && (
                    <>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Полотно з номерами на підрамнику</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">3 якісні пензлі різних розмірів</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Акрилові фарби в контейнерах</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Лак для закріплення результату</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Подарункова упаковка</span>
                      </div>
                    </>
                  )}
                  {product.slug === 'custom-canvas-print' && (
                    <>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Високоякісний друк на натуральному полотні</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Натягнуто на дерев'яний підрамник</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Готово до підвішування на стіну</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Стійкі до вигорання чорнила</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t pt-6">
                  <div className="text-sm font-semibold text-gray-500 mb-3">
                    Доступні формати:
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {product.formats?.slice(0, 4).map((format) => (
                      <button
                        key={format.id}
                        onClick={() => onSelectProduct(product, format)}
                        className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-rose-600 hover:bg-rose-50 transition-all duration-200 group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-rose-600">
                          {format.size}
                        </span>
                        <span className="text-sm font-bold text-rose-600">
                          {format.price}₴
                        </span>
                      </button>
                    ))}
                  </div>
                  {product.formats && product.formats.length > 4 && (
                    <div className="mt-3 text-center">
                      <button className="text-sm text-rose-600 hover:text-rose-700 font-medium inline-flex items-center">
                        Показати всі формати
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
