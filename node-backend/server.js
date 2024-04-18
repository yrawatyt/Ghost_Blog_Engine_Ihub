const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const axios = require('axios');
const blogRoutes = require('./routes/blogRoutes'); // Import your API routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', blogRoutes); // Mount your blog API routes under '/api' prefix

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
