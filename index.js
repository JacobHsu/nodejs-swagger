import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import indexRouter from "./src/routes/index.js";
import postRouter from "./src/routes/posts.js";

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// 取得當前模組的目錄
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/", indexRouter);
app.use("/posts", postRouter);

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      description: "A simple Express Library API",
      version: "1.0.0",
    },
  },
  apis: ["src/**/*.js"], // files containing annotations as above
};

const specs = swaggerJsDoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { customCssUrl: CSS_URL })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
