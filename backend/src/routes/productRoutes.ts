import { Router } from 'express';
import { getCategories, getProductById, getProducts } from '../controllers/productController';
const router = Router();
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
export default router;
