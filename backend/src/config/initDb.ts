import fs from "node:fs";
import path from "node:path";
import db from "./database";

const schema = fs.readFileSync(
  path.resolve(process.cwd(), "database/schema.sql"),
  "utf8",
);
const seed = fs.readFileSync(
  path.resolve(process.cwd(), "database/seed.sql"),
  "utf8",
);
db.exec(schema);
const count = (
  db.prepare("SELECT COUNT(*) AS count FROM products").get() as {
    count: number;
  }
).count;
if (count === 0) db.exec(seed);
console.log(
  `Database initialized. Product count: ${(db.prepare("SELECT COUNT(*) AS count FROM products").get() as { count: number }).count}`,
);
db.close();
