import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { fetchProduct, type Product } from "../services/productService";
export default function ProductDetails() {
  const { id = "" } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch((e: unknown) =>
        setError(
          e &&
            typeof e === "object" &&
            "response" in e &&
            (e as { response?: { status?: number } }).response?.status === 404
            ? "This product could not be found."
            : "Unable to load this product. Check that the backend is running.",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);
  return (
    <>
      <Navbar />
      <main className="detail-main">
        <Link to="/" className="back-link">
          <ArrowLeft size={17} /> Back to collection
        </Link>
        {loading ? (
          <div className="message-state">Loading product...</div>
        ) : error ? (
          <div className="message-state error-state">{error}</div>
        ) : (
          product && (
            <div className="detail-layout">
              <div className="detail-image">
                <img
                  src={product.image_url}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/900x900/f0eee9/555?text=Product";
                  }}
                />
              </div>
              <div className="detail-info">
                <span className="eyebrow">
                  {product.category.toUpperCase()}
                </span>
                <h1>
                  {product.name}
                  <span className="heading-dot">.</span>
                </h1>
                <div className="detail-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>
                <div className="detail-divider" />
                <h3>About this product</h3>
                <p>{product.description}</p>
                <p className="detail-extra">
                  A considered pick from the Dauji collection. Product
                  information is provided by our catalogue.
                </p>
                <Link to="/" className="detail-cta">
                  Continue browsing <ArrowUpRight size={18} />
                </Link>
                <div className="detail-footnote">
                  PRODUCT ID{" "}
                  <strong>#{product.id.toString().padStart(4, "0")}</strong>
                </div>
              </div>
            </div>
          )
        )}
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
