const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);
app.use(morgan('dev'));
const pool = require('./config/db');

const PORT = process.env.DB_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
})


pool.connect((err, client, release)=>{
  if (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos');
  release();
})

// async function testDB() {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log('✅ Conexión exitosa a la base de datos:', res.rows[0]);
//   } catch (err) {
//     console.error('❌ Error al conectar con la base de datos:', err);
//   }
// }

// testDB();
