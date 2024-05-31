const app = require('./application/app')
require('dotenv').config();
const db = require('./config/db');

db();

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});