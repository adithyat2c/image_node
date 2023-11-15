2// const { MongoClient } = require('mongodb');

// // Connection URI
// const uri = 'mongodb+srv://adiurst2c:adiurs123@cluster1.zqmrdvl.mongodb.net'; // Replace with your MongoDB Atlas connection URI

// // Create a new MongoClient
// const client = new MongoClient(uri, { useUnifiedTopology: true });

// async function fetchPublicUrls() {
//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     // Access your database and collection
//     const database = client.db('Url_db'); // Replace with your database name
//     const collection = database.collection('gcloud_urls'); // Replace with your collection name

//     // Fetch documents where publicUrl exists
//     const query = { url: { $exists: true } };
//     const projection = { url: 1, _id: 0 }; // Project only the publicUrl field

//     const cursor = collection.find(query).project(projection);

//     // Iterate over the cursor to get the documents
//     await cursor.forEach(doc => {
//       console.log('Public URL:', doc.publicUrl);
//     });

//   } catch (err) {
//     console.error('Error: ', err);
//   } finally {
//     // Close the connection
//     await client.close();
//   }
// }

// // Call the function to fetch publicUrls
// fetchPublicUrls();


// const { MongoClient } = require('mongodb');

// // Replace the connection string with your MongoDB Atlas connection string
// const uri = 'mongodb+srv://adiurst2c:adiurs123@cluster1.zqmrdvl.mongodb.net';

// // Replace 'YourDatabase' with your actual database name and 'YourCollection' with your collection name
// const databaseName = 'Url_db';
// const collectionName = 'gcloud_urls';

// async function fetchUrls(req,res) {
//   const client = new MongoClient(uri, { useUnifiedTopology: true });

//   try {
//     await client.connect();

//     const database = client.db(databaseName);
//     const collection = database.collection(collectionName);

//     // Query the database to find documents with the 'url' field
//     const cursor = collection.find({ url: { $exists: true } });

//     // Iterate through the documents and extract the 'url' key and value
//     await cursor.forEach(document => {
//       console.log('url:', document.url);
//     });
//   } finally {
//     // Close the connection when done
//     client.close();
//   }
// }

// fetchUrls().catch(console.error);


// module.exports={
//   fetchUrls
// }
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3002;

// Replace the connection string with your MongoDB Atlas connection string
const uri = 'mongodb+srv://adiurst2c:adiurs123@cluster1.zqmrdvl.mongodb.net';

// Replace 'YourDatabase' with your actual database name and 'YourCollection' with your collection name
const databaseName = 'Url_db';
const collectionName = 'gcloud_urls';

app.get('/api/url/:id', async (req, res) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Retrieve one document based on the provided ID
    const document = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Respond with the 'url' value from the document
    res.json({ url: document.url });
  } finally {
    // Close the connection when done
    client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
