

const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://kamlasafdar23:enDOlvrKMvUnKezo@cluster0.nx1mnrv.mongodb.net/';

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();          // Connect to the MongoDB cluster
        console.log('Connected to MongoDB Atlas');

        return { client, database: client.db('Alkure') };       // Return the connected client and database
    } 
    catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

async function registerUser(req, res) {
    try {
        console.log('Received signup request:', req.body);
        const { fname_Signup, username_Signup, emailsignup, signupPass, pn } = req.body;
        console.log('Extracted firstName:', fname_Signup);
        console.log('Extracted username:', username_Signup);
        console.log('Extracted email:', emailsignup);
        console.log('Extracted password:', signupPass);
        console.log('Extracted phone Number:', pn);

        const { database } = await connectToMongoDB();          // Connect to MongoDB
        const collection = database.collection('users');          // Access the Users collection
        await collection.insertOne({ fname_Signup, username_Signup, emailsignup, signupPass, pn });
        console.log('Account data inserted successfully');
       
    }
    catch (error) {
        console.error('Error inserting user data:', error);
        res.status(500).send('Error inserting user data');
    }
}

async function verifyOtp(req, res) {
    try {
        res.redirect('/home');
    }
    catch (error) {
        console.error('Error in redirecting to Home Page from Verification Form', error);
        res.status(500).send('Error handling /otp Post request');
    }
}

async function confirmLogin(req, res) {
    try {
        const { database } = await connectToMongoDB();          // Connect to MongoDB
        const collection = database.collection('users');          // Access the Users collection

        console.log('Extracted body:', req.body);

        const user = await collection.findOne({ emailsignup: req.body.emaillogin });

        console.log('User:', user);
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not Found');
        }

        if (user.signupPass === req.body.loginPass) {
            console.log("Login Successful");
            res.redirect('/home');
        } else {
            console.log("Invalid password");
            res.status(401).send('Invalid password');
        }
    } catch (error) {
        console.error('Error in Confirm Login Request', error);
        res.status(500).send('Error handling /login Post request');
    }
}

async function changePass(req,res){

}


module.exports = { connectToMongoDB,verifyOtp,confirmLogin,registerUser };
