import { Request, Response, NextFunction } from "express";
import db from "../config/database";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
}
const productColumns =
  "id, name, description, price, image_url, category, created_at";

export function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";
    const category =
      typeof req.query.category === "string" ? req.query.category.trim() : "";
    if (search.length > 100 || category.length > 50)
      return res
        .status(400)
        .json({ message: "Search or category parameter is too long." });
    const conditions: string[] = [];
    const params: string[] = [];
    if (search) {
      conditions.push("(name LIKE ? OR description LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category && category.toLowerCase() !== "all") {
      conditions.push("category = ? COLLATE NOCASE");
      params.push(category);
    }
    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const products = db
      .prepare(
        `SELECT ${productColumns} FROM products ${where} ORDER BY id ASC`,
      )
      .all(...params) as Product[];
    res.json({ data: products, count: products.length });
  } catch (error) {
    next(error);
  }
}

export function getProductById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0)
      return res
        .status(400)
        .json({ message: "Product ID must be a positive integer." });
    const product = db
      .prepare(`SELECT ${productColumns} FROM products WHERE id = ?`)
      .get(id) as Product | undefined;
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}

export function getCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rows = db
      .prepare("SELECT DISTINCT category FROM products ORDER BY category")
      .all() as { category: string }[];
    res.json({ data: rows.map((row) => row.category) });
  } catch (error) {
    next(error);
  }
}
