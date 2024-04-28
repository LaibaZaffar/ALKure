const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//app.use is used to add middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pageController = require('./controllers/pageController');
const { connectToMongoDB, verifyOtp, confirmLogin, registerUser, changePass } = require('./models/mongodb.js');

// Set the view engine and create the server
app.set('view engine', 'ejs');
const http = require('http').Server(app);

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', pageController.getLayoutPage);
app.get('/index', pageController.getIndexPage);
app.get('/home', pageController.getHomePage);

app.post('/signup', async (req, res) => {
    await registerUser(req, res);
});

app.post('/otp',async(req,res) => {
    await verifyOtp(req,res);
});

app.post('/login',async(req,res) => {
    await confirmLogin(req,res);
});

app.post('/forgotPass',async(req,res) => {
    await changePass(req,res);
});


// Start the server
const server = http.listen(3000, () => {
    console.log("Server is running");
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});
