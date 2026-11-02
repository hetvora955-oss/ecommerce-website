import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import './styles.css';
export default function App() { return <BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/products/:id" element={<ProductDetails/>}/><Route path="*" element={<Home/>}/></Routes></BrowserRouter>; }
