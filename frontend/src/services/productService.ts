import axios from 'axios';
export interface Product { id: number; name: string; description: string; price: number; image_url: string; category: string; created_at: string }
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', timeout: 10000 });
export async function fetchProducts(search = '', category = ''): Promise<Product[]> {
  const response = await api.get<{ data: Product[] }>('/products', { params: { search: search || undefined, category: category || undefined } });
  return response.data.data;
}
export async function fetchProduct(id: string): Promise<Product> {
  const response = await api.get<{ data: Product }>(`/products/${id}`);
  return response.data.data;
}
export async function fetchCategories(): Promise<string[]> {
  const response = await api.get<{ data: string[] }>('/products/categories');
  return response.data.data;
}
