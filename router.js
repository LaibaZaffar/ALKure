const express = require('express')
const router = express.Router()

const pageController = require('./controllers/pageController');
const { verifyOtp, confirmLogin, registerUser, changePass } = require('./models/mongodb.js');

const isAuthenticated = (req, res, next) => {
    let currentUrl = req.url;  //my current url in the request
    let protectedPages = ['/home'];   //an array for storing the protected pages(not exactly the names of the routes)
    if(req.session.isLoggedIn && protectedPages.includes(currentUrl))  //if the user is logged in and the request he is making includes my protected pages
    {
        next();  //then complete the actions u intended to
    }
    else{
        res.redirect('/login');  //redirect to the login page
    }
}

// Routes

router.get('/', pageController.getLandingPage);   //landing page
router.get('/login', pageController.getLoginPage);  //login form 
router.get('/home', isAuthenticated, pageController.getHomePage);   // first execute the isAuthenticated function 

router.post('/signup', async (req, res) => {
    await registerUser(req, res);
});

router.post('/otp',async(req,res) => {
    await verifyOtp(req,res);
});

router.post('/login',async(req,res) => {
    await confirmLogin(req,res);
});

router.post('/forgotPass',async(req,res) => {
    await changePass(req,res);
});

router.get('/logout',async(req,res) => {
    req.session.user = null;
    req.session.isLoggedIn = false;
    res.redirect('/');
    // delete req.session.user;
});

module.exports = router