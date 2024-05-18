import app from './application/app';
require('dotenv').config();
import db from './config/db';


db();

app.listen(8000, () => {
  console.log('Server is running on http://localhost:3000');
});