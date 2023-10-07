const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection URI
const mongo_uri = 'mongodb+srv://srgec:bhanu123@cluster0.xnymxy0.mongodb.net/srgecdb?retryWrites=true&w=majority'; // Replace with your MongoDB URI

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  MongoClient.connect(mongo_uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).send('Server Error');
      return;
    }

    const db = client.db('srgec'); // Replace 'yourdb' with your database name
    const collection = db.collection('demo'); // Replace 'users' with your collection name

    // Find the user in the database
    collection.findOne({ username, password }, (err, user) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Server Error');
        client.close();
        return;
      }

      if (user) {
        // User found, you can redirect to another page
        res.send('Login successful!'); // Customize this response
      } else {
        // User not found, show an error message
        res.status(401).send('Login failed. Please try again.'); // Unauthorized
      }

      client.close();
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
