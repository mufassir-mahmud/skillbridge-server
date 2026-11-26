
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGO_DB_URI);

async function connectToMongoDB() {
  try {
    await client.connect();

    const database = client.db('skillbridge_db');
    const projectCollection = database.collection('projects');
    const userCollection = database.collection('user');
    // USER API

 app.get('/api/user', async (req, res) => {
  try {
    const result = await userCollection.find().toArray();

    res.status(200).send(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
});

app.get('/api/user/:id', async(req,res)=>{
  const id = req.params.id;
  const query = {
    _id: new ObjectId(id)
  }
  const result = await userCollection.findOne(query);
  res.send(result)
})

    // Project API
    app.get('/api/projects', async(req,res)=>{
        const query = {};
        const {category} = req.query;
        if(req.query.clientId){
            query.clientId = req.query.clientId
        }
        if(category){
        query.category = category
      }
        if(req.query.status){
            query.status = req.query.status
        }
        const cursor = projectCollection.find(query);
        const result = await cursor.toArray();
        res.send(result)
    })
    app.get('/api/projects/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      };
      const result = await projectCollection.findOne(query);
      res.send(result)
    })
    // app.get('/api/projects' , async(req,res)=>{
    //   const {category} = req.query;
    //   console.log("Selected Category:", category);
    //   const query = {};
    //   if(category){
    //     query.category = category
    //   }
    //   const result = await projectCollection.find(query).toArray();
    //   res.send(result)
    // })
    app.post('/api/projects', async(req,res) =>{
        const project = req.body
        const result = await projectCollection.insertOne(project)
        res.send(result)
    })

    console.log('Successfully connected to MongoDB!');

    return projectCollection;
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
}

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
async function startServer() {
  try {
    await connectToMongoDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
