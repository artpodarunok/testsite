import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProductCategory {
  id: string;
  name_uk: string;
  name_ru: string;
  slug: string;
  description_uk: string;
  description_ru: string;
  sort_order: number;
}

export interface Product {
  id: string;
  category_id: string;
  name_uk: string;
  name_ru: string;
  slug: string;
  description_uk: string;
  description_ru: string;
  base_price: number;
  image_url: string;
  is_active: boolean;
  sort_order: number;
}

export interface ProductFormat {
  id: string;
  product_id: string;
  size: string;
  price: number;
  sort_order: number;
}

export interface UploadedPhoto {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  width: number;
  height: number;
  thumbnail_path: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  product_id: string;
  format_id: string;
  photo_id: string;
  total_price: number;
  deposit_amount: number;
  delivery_method: string;
  delivery_address: string;
  comment: string;
  status: string;
  payment_status: string;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment_uk: string;
  comment_ru: string;
  is_approved: boolean;
  created_at: string;
}
