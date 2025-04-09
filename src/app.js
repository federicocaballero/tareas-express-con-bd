const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const morgan = require("morgan");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const { default: helmet } = require("helmet");
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/tasks", taskRoutes); // Define la ruta base para las tareas
app.use(errorHandler);
app.use(helmet());
const pool = require("./config/db");

const PORT = process.env.DB_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.stack);
    return;
  }
  console.log("✅ Conexión exitosa a la base de datos");
  release();
});
