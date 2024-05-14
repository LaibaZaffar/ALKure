// controllers/pageController.js
const path = require('path');

// Render landing page
exports.getLandingPage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/landing'), { sessionInfo: sessionData }); 
};

// Render forms page
exports.getLoginPage = (req, res) => {  
    res.render(path.join(__dirname, '../views/login'));
};

// Render forms page
exports.getHomePage = (req, res) => {
    const sessionData = req.session;
    res.render(path.join(__dirname, '../views/home'), { sessionInfo: sessionData }); 
};