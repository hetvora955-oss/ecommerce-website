# Dauji — Part 1: Product Listing Website

A full-stack product catalogue built with React + TypeScript, Express + TypeScript, and SQLite. The frontend only communicates with the backend REST API; it never reads the SQLite database directly.

## Features
- Responsive product catalogue with product name, description, price and image
- Product details page at `/products/:id`
- Search by product name or description
- Filter by category
- SQLite relational database, schema and sample seed data
- Input validation, JSON error responses, HTTP 400/404/500 handling
- Health endpoint to check API/database connectivity

## Prerequisites
- Node.js 20 or newer (LTS recommended)
- npm (included with Node.js)
- Git (optional, for cloning)

## Project structure
```text
ecommerce-part1/
├── backend/
│   ├── database/              # schema.sql, seed.sql, generated SQLite DB
│   ├── src/
│   │   ├── config/            # SQLite connection and initialization
│   │   ├── controllers/       # Product API logic
│   │   ├── middleware/        # 404 and error handling
│   │   ├── routes/            # API routes
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/          # Axios API client
│   └── package.json
└── README.md
```

## Run locally (macOS, Linux or Windows)
Open two terminal windows from the project root.

### 1. Start the backend
```bash
cd backend
npm install
cp .env.example .env
npm run db:init
npm run dev
```
The API runs at `http://localhost:5000`. The database file is created at `backend/database/ecommerce.sqlite`. The initialization command creates the schema and inserts sample records only if the products table is empty.

### 2. Start the frontend
In a second terminal, from the project root:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Verify the backend
Open `http://localhost:5000/api/health`. Expected response:
```json
{"status":"ok","database":"connected"}
```

## API documentation
Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Success |
|---|---|---|---|
| GET | `/health` | API and database health (outside `/api` product router) | 200 |
| GET | `/products` | Return all products | 200 |
| GET | `/products?search=headphones` | Search name and description | 200 |
| GET | `/products?category=Electronics` | Filter by category | 200 |
| GET | `/products/categories` | Return distinct categories | 200 |
| GET | `/products/1` | Return one product | 200 |

Error behavior:
- `400 Bad Request`: invalid/non-positive product ID or overlong query parameter.
- `404 Not Found`: valid product ID that does not exist, or unknown API route.
- `500 Internal Server Error`: unexpected server/database error.

Example product response:
```json
{
  "data": {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "Comfortable over-ear headphones...",
    "price": 2499,
    "image_url": "https://images.unsplash.com/...",
    "category": "Electronics",
    "created_at": "2026-11-02 08:00:00"
  }
}
```

## Database schema
`backend/database/schema.sql` defines the `products` table:
- `id`: integer primary key, auto-increment
- `name`: required text
- `description`: required text
- `price`: required non-negative numeric value
- `image_url`: required text
- `category`: required text
- `created_at`: timestamp defaulting to the current time

`backend/database/seed.sql` contains sample catalogue rows. Images are remote Unsplash URLs, so an internet connection is needed to load those images. The application itself and SQLite database run locally.

To reset the local database, stop the backend, delete `backend/database/ecommerce.sqlite` (and its `-wal`/`-shm` files if present), then run `npm run db:init` again from `backend`.

## Architecture
1. React pages and components render the catalogue and product details.
2. `productService.ts` uses Axios to call the REST API.
3. Express routes map HTTP requests to product controllers.
4. Controllers validate query parameters and product IDs, then run parameterized SQL queries through `better-sqlite3`.
5. SQLite stores product records. The frontend has no direct database access.

## Build checks
From `backend/`: `npm run build`
From `frontend/`: `npm run build`

## Submission screenshots
After starting both servers, capture and include:
1. Product listing: `http://localhost:5173/`
2. Product details: open any product card, e.g. `http://localhost:5173/products/1`

Save the screenshots in a `screenshots/` folder in the repository before submitting to GitHub. Screenshots are intentionally captured from the running app rather than fabricated mockups.

## Push to GitHub
Create an empty GitHub repository, then run from this project root:
```bash
git init
git add .
git commit -m "Build Part 1 product listing website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
Do not commit `node_modules/`, `.env`, or the generated SQLite database. Add a `.gitignore` before pushing if you want to exclude these local files.
