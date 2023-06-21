const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const jwt= require("jsonwebtoken");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const ObjectId= require("mongodb").ObjectId;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yyhry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(uri);

async function run() {
  try {
    await client.connect();
    // declaring the database collection
    const database = client.db("E-Commerce_database");
    const ProductList = database.collection("EcommerceProduct");
    const BlogList= database.collection("Bloging");
    const Comments= database.collection("All-Comments");
    const Sizes = database.collection("Sizes");
    const Catagories= database.collection("Catagory-List")
    const CityApi= database.collection("All-City");
    const Orders= database.collection("all-Orders");
    const Colors= database.collection("Colors");
    const Users= database.collection("Users");
    // --------------Products API------------------

    app.post("/add-product", async (req, res) => {
      const add = req.body;
      const products = await ProductList.insertOne(add);
      console.log("getting a Product", products);
      res.json(products);
      console.log(products);
    });
    app.get("/products", async (req, res) => {
      const cursor = ProductList.find({});
      const getProductList = await cursor.toArray();
      res.send(getProductList);
      console.log(getProductList);
    });
    app.get("/products/:id", async(req, res)=>{
      const productId= req.params.id;
      const query = {_id: new ObjectId(productId)};
      const getSingleProduct= await ProductList.findOne(query);
      console.log("getting a single product", getSingleProduct);
      res.send(getSingleProduct);
    })
   // **************Product API Finished*************************


    // --------------City API------------------
    app.get("/cityApi", async (req, res) => {
      const cursor = CityApi.find({});
      const getApi = await cursor.toArray();
      res.send(getApi);
      console.log(getApi);
    });
    // --------------City API finish------------------



    // --------------Order API------------------
    app.post("/add-order", async (req, res) => {
      const add = req.body;
      const orders = await Orders.insertOne(add);
      console.log("getting a Product", orders);
      res.json(orders);
      console.log(orders);
    });

    app.get("/orders", async (req, res) => {
      let query= {}
      const email=req.query.email;
      if(email){
      query= {email: email}
      }
      const cursor = Orders.find(query);
      const getOrders = await cursor.toArray();
      res.send(getOrders);
      console.log(getOrders);
    });


// --------------Order API finish------------------

// --------------Blog API------------------
app.post("/add-blog", async(req, res)=>{
  const addBlog= req.body;
  const blogs= await BlogList.insertOne(addBlog);
  console.log("adding a blog", blogs)
  res.json(blogs)
})
app.get("/blogs", async(req, res)=>{
  const cursor= BlogList.find({});
  const getBlogs= await cursor.toArray();
  res.send(getBlogs)
})
    app.get("/blogs/:id", async (req, res) => {
      const blogId = req.params.id;
      const query = { _id: new ObjectId(blogId)};
      const getblog = await BlogList.findOne(query);
      console.log("getting single Blogs", getblog);
      res.send(getblog);
    });


    // delete product from manage products
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ProductList.deleteOne(query);
      console.log("deleting product", result);
      res.json(result);
    });
// comment section
app.post("/add-comment", async(req, res)=>{
  const add = req.body;
  const comments = await Comments.insertOne(add);
  console.log("getting a Comment", comments);
  res.json(comments,);
  console.log(comments);
});
app.get("/comments", async(req, res)=>{
  const cursor = Comments.find({});
  const getComments = await cursor.toArray();
  res.send(getComments);
  console.log(getComments);
})
    // working on admin panel catagories and other categories
    app.post("/catagory", async (req, res) => {
      const catagories = req.body;
      const getCatagory = await Catagories.insertOne(catagories);
      res.json(getCatagory);
    });   
    app.get("/allCatagory", async(req, res)=>{
      const cursor = Catagories.find({});
      const getCatagories = await cursor.toArray();
      res.send(getCatagories);
      console.log(getCatagories); 
    })
    app.post("/add-size", async (req, res) => {
      const size = req.body;
      const getSize = await Sizes.insertOne(size);
      res.json(getSize);
    });   
    app.get("/getSize", async(req, res)=>{
      const cursor = Sizes.find({});
      const showSize = await cursor.toArray();
      res.send(showSize);
      console.log(showSize); 
    })
    app.post("/add-color", async (req, res) => {
      const color = req.body;
      const getColor = await Colors.insertOne(color);
      res.json(getColor);
    });   
    app.get("/getColor", async(req, res)=>{
      const cursor = Colors.find({});
      const showColor = await cursor.toArray();
      res.send(showColor);
      console.log(showColor); 
    })



// finish the work of admin panel catagories and categories

  } finally {
    // client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Project Server Is Running");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

