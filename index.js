const express = require("express");
var path = require("path");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

var indexRouter = require("./routes/index");
var postRouter = require("./routes/posts");

const app = express();
const port = 3000;



// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use("/", indexRouter);
app.use("/posts", postRouter);


const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      description: "A simple Express Library API",
      version: "1.0.0",
    },
  },
  // This is to call all the file
  apis: ["/**/*.js"],
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
