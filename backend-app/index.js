const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const { knex } = require("./db/db_config");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config({ path: "./.env" });
const port = process.env.PORT;

// Require product routes
const productRoutes = require("./routes/ProductRoute");

app.use(
  bodyParser.json({
    limit: "8mb",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
  console.log(`app env = ` + process.env.NODE_ENV);
});

// using as middleware
app.use("/product", productRoutes);

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
