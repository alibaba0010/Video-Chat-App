import express from "express";
import { v4 as uuidv4, v4 } from "uuid";


import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.set("view engine", "ejs");
app.use(express.static( "public"));
app
  .get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
  })
  .get("/:room", (req, res, next) => {
    res.render("room", { roomId: req.params.room });
  });
export default app;
