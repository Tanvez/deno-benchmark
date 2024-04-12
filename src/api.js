import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { DataTypes, Sequelize } from "npm:sequelize";
import pg from "npm:pg";
import hstore from "npm:pg-hstore";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import express from "npm:express@4.18.2";

await config({ export: true });

const db = "deno";

const sequelize = new Sequelize(
  db,
  Deno.env.get("POSTGRES_USER"),
  Deno.env.get("POSTGRES_PASSWORD"),
  {
    host: "db",
    dialect: "postgres",
  }
);

const Book = sequelize.define("book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNUll: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNUll: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNUll: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNUll: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNUll: false,
  },
});

const port = Deno.env.get("PORT") || 8000;

sequelize
  .sync({ force: true })
  .then(async () => {
    const books = await Book.findAll();

    if (!books.length) {
      await Book.bulkCreate([
        { title: "Book 1", author: "Author 1" },
        { title: "Book 2", author: "Author 2" },
        { title: "Book 3", author: "Author 3" },
      ]);

      console.log("created some mock data");
    }

    console.log("Database connected and synced");
  })
  .catch((err) => {
    console.log("Failed to sync models", err);
  });

const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to the Dinosaur API!");
});

app.get("/books", async (req, res) => {
    const books = await Book.findAll();
    return res.json(books);
  })
//   .get("/book/:id", async (context) => {
//     if (context?.params?.id) {
//       const foundBooks = await Book.findAll({
//         where: {
//           id: context?.params?.id,
//         },
//       });
//       context.response.body = foundBooks;
//     }
//   });

await app.listen({ port });
