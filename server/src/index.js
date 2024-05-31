const app = require('./application/app')
require('dotenv').config();
const db = require('./config/db');

db();

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  
  // Send a generic error response
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred. Please try again later.'
  });
});