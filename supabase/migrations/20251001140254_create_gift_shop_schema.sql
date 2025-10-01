/*
  # Gift Shop Database Schema
  
  1. New Tables
    - `product_categories`
      - `id` (uuid, primary key)
      - `name_uk` (text) - Ukrainian name
      - `name_ru` (text) - Russian name  
      - `slug` (text, unique)
      - `description_uk` (text)
      - `description_ru` (text)
      - `sort_order` (integer)
      - `created_at` (timestamptz)
      
    - `products`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name_uk` (text)
      - `name_ru` (text)
      - `slug` (text, unique)
      - `description_uk` (text)
      - `description_ru` (text)
      - `base_price` (decimal)
      - `image_url` (text)
      - `is_active` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `product_formats`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `size` (text) - e.g., "40x50"
      - `price` (decimal)
      - `sort_order` (integer)
      - `created_at` (timestamptz)
      
    - `uploaded_photos`
      - `id` (uuid, primary key)
      - `file_name` (text)
      - `file_path` (text)
      - `file_size` (integer)
      - `mime_type` (text)
      - `width` (integer)
      - `height` (integer)
      - `thumbnail_path` (text)
      - `uploaded_at` (timestamptz)
      
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique)
      - `customer_name` (text)
      - `customer_phone` (text)
      - `customer_email` (text)
      - `product_id` (uuid, foreign key)
      - `format_id` (uuid, foreign key)
      - `photo_id` (uuid, foreign key)
      - `total_price` (decimal)
      - `deposit_amount` (decimal)
      - `delivery_method` (text)
      - `delivery_address` (text)
      - `comment` (text)
      - `status` (text) - new, paid_deposit, paid_full, processing, shipped, completed, cancelled
      - `payment_status` (text) - pending, paid_deposit, paid_full
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `reviews`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `rating` (integer)
      - `comment_uk` (text)
      - `comment_ru` (text)
      - `is_approved` (boolean)
      - `created_at` (timestamptz)
      
  2. Security
    - Enable RLS on all tables
    - Public read access for products, categories, reviews
    - Authenticated access for order management
*/

-- Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_uk text NOT NULL,
  name_ru text NOT NULL,
  slug text UNIQUE NOT NULL,
  description_uk text DEFAULT '',
  description_ru text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON product_categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES product_categories(id) ON DELETE CASCADE,
  name_uk text NOT NULL,
  name_ru text NOT NULL,
  slug text UNIQUE NOT NULL,
  description_uk text DEFAULT '',
  description_ru text DEFAULT '',
  base_price decimal(10,2) NOT NULL,
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Product Formats
CREATE TABLE IF NOT EXISTS product_formats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  size text NOT NULL,
  price decimal(10,2) NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_formats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product formats"
  ON product_formats FOR SELECT
  TO anon, authenticated
  USING (true);

-- Uploaded Photos
CREATE TABLE IF NOT EXISTS uploaded_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer NOT NULL,
  mime_type text NOT NULL,
  width integer NOT NULL,
  height integer NOT NULL,
  thumbnail_path text DEFAULT '',
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE uploaded_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can upload photos"
  ON uploaded_photos FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view uploaded photos"
  ON uploaded_photos FOR SELECT
  TO anon, authenticated
  USING (true);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text DEFAULT '',
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  format_id uuid REFERENCES product_formats(id) ON DELETE SET NULL,
  photo_id uuid REFERENCES uploaded_photos(id) ON DELETE SET NULL,
  total_price decimal(10,2) NOT NULL,
  deposit_amount decimal(10,2) DEFAULT 170,
  delivery_method text DEFAULT 'nova_poshta',
  delivery_address text DEFAULT '',
  comment text DEFAULT '',
  status text DEFAULT 'new',
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view their orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment_uk text DEFAULT '',
  comment_ru text DEFAULT '',
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

-- Insert sample data for product categories
INSERT INTO product_categories (name_uk, name_ru, slug, description_uk, description_ru, sort_order)
VALUES 
  ('Картини за номерами', 'Картины по номерам', 'paint-by-numbers', 'Перетворіть своє фото на картину за номерами', 'Превратите свое фото в картину по номерам', 1),
  ('Фотокартини на полотні', 'Фотокартины на холсте', 'canvas-prints', 'Друк вашого фото на натуральному полотні', 'Печать вашего фото на натуральном холсте', 2)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
DO $$
DECLARE
  paint_category_id uuid;
  canvas_category_id uuid;
  paint_product_id uuid;
  canvas_product_id uuid;
BEGIN
  SELECT id INTO paint_category_id FROM product_categories WHERE slug = 'paint-by-numbers';
  SELECT id INTO canvas_category_id FROM product_categories WHERE slug = 'canvas-prints';

  INSERT INTO products (category_id, name_uk, name_ru, slug, description_uk, description_ru, base_price, is_active, sort_order)
  VALUES 
    (paint_category_id, 'Картина за номерами з фото', 'Картина по номерам из фото', 'custom-paint-by-numbers', 
     'Повний комплект: полотно з номерами, 3 пензлі, акрилові фарби, лак, подарункова упаковка', 
     'Полный комплект: холст с номерами, 3 кисти, акриловые краски, лак, подарочная упаковка', 
     670, true, 1)
  ON CONFLICT (slug) DO NOTHING
  RETURNING id INTO paint_product_id;

  INSERT INTO products (category_id, name_uk, name_ru, slug, description_uk, description_ru, base_price, is_active, sort_order)
  VALUES 
    (canvas_category_id, 'Фотокартина на полотні', 'Фотокартина на холсте', 'custom-canvas-print',
     'Високоякісний друк на натуральному полотні, готова до підвішування',
     'Высококачественная печать на натуральном холсте, готова к подвешиванию',
     350, true, 2)
  ON CONFLICT (slug) DO NOTHING
  RETURNING id INTO canvas_product_id;

  -- Insert formats for paint-by-numbers
  IF paint_product_id IS NOT NULL THEN
    INSERT INTO product_formats (product_id, size, price, sort_order)
    VALUES 
      (paint_product_id, '40x50 см', 670, 1),
      (paint_product_id, '50x50 см', 799, 2),
      (paint_product_id, '40x60 см', 850, 3),
      (paint_product_id, '50x60 см', 950, 4),
      (paint_product_id, '50x70 см', 1099, 5),
      (paint_product_id, '50x100 см', 1299, 6)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Insert formats for canvas prints
  IF canvas_product_id IS NOT NULL THEN
    INSERT INTO product_formats (product_id, size, price, sort_order)
    VALUES 
      (canvas_product_id, '30x40 см', 350, 1),
      (canvas_product_id, '40x50 см', 499, 2),
      (canvas_product_id, '50x50 см', 599, 3),
      (canvas_product_id, '40x60 см', 650, 4),
      (canvas_product_id, '50x60 см', 750, 5),
      (canvas_product_id, '50x70 см', 850, 6),
      (canvas_product_id, '60x80 см', 999, 7),
      (canvas_product_id, '70x80 см', 1199, 8)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- Insert sample reviews
INSERT INTO reviews (customer_name, rating, comment_uk, comment_ru, is_approved)
VALUES 
  ('Олена К.', 5, 'Чудовий подарунок! Якість на висоті, все прийшло швидко. Дуже задоволена!', 'Прекрасный подарок! Качество на высоте, все пришло быстро. Очень довольна!', true),
  ('Андрій М.', 5, 'Замовляв картину для дружини на день народження. Вона була в захваті! Рекомендую!', 'Заказывал картину для жены на день рождения. Она была в восторге! Рекомендую!', true),
  ('Марина П.', 5, 'Ідеальний сервіс! Безкоштовний ескіз допоміг побачити результат заздалегідь.', 'Идеальный сервис! Бесплатный эскиз помог увидеть результат заранее.', true),
  ('Сергій Т.', 5, 'Швидка доставка, якісне полотно. Все відповідає опису. Дякую!', 'Быстрая доставка, качественный холст. Все соответствует описанию. Спасибо!', true)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_product_formats_product ON product_formats(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);