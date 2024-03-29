
//this file will handle the requests related to my pages

// controllers/pageController.js
const path = require('path');

// Render landing page
exports.getLayoutPage = (req, res) => {
    res.render(path.join(__dirname, '../views/layout'));   //.. means exit 2 steps back in the path
};

// Render forms page
exports.getIndexPage = (req, res) => {
    res.render(path.join(__dirname, '../views/index'));
};

// Render forms page
exports.getHomePage = (req, res) => {
    res.render(path.join(__dirname, '../views/home'));
};