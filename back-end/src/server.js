import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

let db;

async function connectToDb() {
    const uri = 'mongodb://localhost:27017';

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        db = client.db('full-stack-react-db');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }

}

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const articles = db.collection('articles');

    const article = await articles.findOne({ name });
    res.json(article);

});

app.post("/api/articles/:name/upvote", async (req, res) => {
    const { name } = req.params;
    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $inc: { upvotes: 1 }
    }, {
        returnDocument: 'after',
    });
    res.json(updatedArticle);
});

app.post("/api/articles/:name/comments", async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $push: { comments: newComment }
    }, {
        returnDocument: 'after',
    });

    res.json(updatedArticle);
});

app.get("/api/articles/:name/comments", async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });
    res.json(article.comments);
});

async function start() {
    await connectToDb();
    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });
}

start();


