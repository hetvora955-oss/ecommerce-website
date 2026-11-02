import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '../services/productService';
export default function ProductCard({ product }: { product: Product }) {
  return <Link to={`/products/${product.id}`} className="product-card"><div className="product-image-wrap"><img src={product.image_url} alt={product.name} loading="lazy" onError={e => { e.currentTarget.src = 'https://placehold.co/700x600/f0eee9/555?text=Product'; }}/><span className="image-arrow"><ArrowUpRight size={18}/></span></div><div className="product-meta"><span className="category-label">{product.category}</span><span className="product-price">₹{product.price.toLocaleString('en-IN')}</span></div><h3>{product.name}</h3><p>{product.description}</p></Link>;
}
