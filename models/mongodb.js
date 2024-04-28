
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

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
let fname , uname , em , pass,phno;

async function registerUser(req, res) {
    try {
        
        console.log('Received signup request:', req.body);
        const { fname_Signup, username_Signup, emailsignup, signupPass, pn } = req.body;
        const { database } = await connectToMongoDB();          // Connect to MongoDB
        const collection = database.collection('users');          // Access the Users collection
        const user = await collection.findOne({ emailsignup: req.body.emailsignup });
        if (user) {
            // User already exists, send response with error message
            return res.status(400).send('User already exists');
        } else {
            // User does not exist, insert data into the database
            const hashedPassword = await bcrypt.hash(signupPass, 10); // Hash the password

            console.log('Account data inserted successfully');
            fname=fname_Signup;
            uname=username_Signup;
            em=emailsignup;
            pass=hashedPassword;
            phno=pn;
        }
    }
    catch (error) {
        console.error('Error inserting user data:', error);
        res.status(500).send('Error inserting user data');
    }
}


async function verifyOtp(req, res) {
    try {
        const { database } = await connectToMongoDB(); // Connect to MongoDB
        const collection = database.collection('users'); // Access the Users collection
        // Inserting the extracted values into the databas
         await collection.insertOne({ fname, uname, em, pass, phno });

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
        const user = await collection.findOne({ em: req.body.emaillogin });
        console.log(user);

        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not Found');
        }
        const passwordMatch = await bcrypt.compare(req.body.loginPass, user.pass);
        if (passwordMatch) {
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

async function changePass(req, res) {
    try {
        const { database } = await connectToMongoDB();
        const collection = database.collection('users');

        const user = await collection.findOne({ em: req.body.emailForgot });

        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not Found');
        }
        else {
            const hashedPassword = await bcrypt.hash(req.body.newPass, 10); // Hash the password

            await collection.updateOne({ _id: user._id }, { $set: { pass: hashedPassword } });
            console.log("Password Reset Successfully");
            res.status(200).send('Success: Request completed successfully');
        }
    }
    catch (error) {
        console.error('Error in Reset Password Request', error);
        return res.status(500).send('Error handling /forgotPass Post request');
    }
}


module.exports = { connectToMongoDB, verifyOtp, confirmLogin, registerUser, changePass };
