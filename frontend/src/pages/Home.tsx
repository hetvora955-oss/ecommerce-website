import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import {
  fetchCategories,
  fetchProducts,
  type Product,
} from "../services/productService";
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() =>
        setError(
          "Could not load product categories. Check that the backend is running.",
        ),
      );
  }, []);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    const timer = setTimeout(() => {
      fetchProducts(search, category === "All" ? "" : category)
        .then((data) => {
          if (active) setProducts(data);
        })
        .catch(() => {
          if (active)
            setError(
              "Unable to connect to the server. Start the backend and refresh this page.",
            );
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [search, category]);
  const countText = useMemo(
    () =>
      `${products.length} ${products.length === 1 ? "product" : "products"}`,
    [products.length],
  );
  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">THE EVERYDAY EDIT · 2026</span>
            <h1>
              Find your next
              <br />
              <em>favourite thing.</em>
            </h1>
            <p>Thoughtful picks for work, play and everything in between.</p>
            <a href="#catalogue" className="hero-cta">
              Explore collection <span>↓</span>
            </a>
          </div>
          <div className="hero-art">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-sticker">
              GOOD
              <br />
              FINDS
              <br />
              ONLY ✳
            </div>
            <span className="hero-big-type">D.</span>
          </div>
        </section>
        <section id="catalogue" className="catalogue">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CURATED FOR YOU</span>
              <h2>
                Shop the collection<span className="heading-dot">.</span>
              </h2>
            </div>
            <span className="result-count">{countText}</span>
          </div>
          <div className="toolbar">
            <label className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
              />
            </label>
            <label className="filter-box">
              <SlidersHorizontal size={17} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Filter by category"
              >
                <option>All</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          {loading ? (
            <div className="message-state">Loading products...</div>
          ) : error ? (
            <div className="message-state error-state">{error}</div>
          ) : products.length ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="message-state">
              No products found. Try another search or category.
            </div>
          )}
        </section>
      </main>
      <footer className="footer">
        <Link className="brand" to="/">
          <span className="brand-mark">d.</span>
          <span>DAUJI</span>
        </Link>
        <span>Made for the everyday. © 2026</span>
      </footer>
    </>
  );
}
