import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
export default function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">d.</span>
          <span>DAUJI</span>
        </Link>
        <span className="nav-note">GOOD THINGS, EVERY DAY</span>
        <Link className="bag-link" to="/" aria-label="Home">
          <ShoppingBag size={19} />
        </Link>
      </div>
    </header>
  );
}
