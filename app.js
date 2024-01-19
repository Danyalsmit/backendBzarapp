const express = require('express');
const mong = require('./db/mongo');
const cors = require("cors");

const userRoutes = require('./routes/index');

const app = express();
const port = 8000; 
app.use(cors());

app.use(express.json());
app.use('/api', userRoutes);








app.listen(port, () => {
  console.log(`Server is running at http://localhost:${8000}`);
});
