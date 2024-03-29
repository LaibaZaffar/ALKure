
const express = require('express');
const app = express();
const pageController = require('./controllers/pageController');
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', pageController.getLayoutPage);
app.get('/index', pageController.getIndexPage);
app.get('/home',pageController.getHomePage);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
