import express from "express";
import cors from "cors";

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

app.get("/hello", (req, res) => {
    res.send("Hello from a GET endpoint");
});

app.post("/hello", (req, res) => {
    res.send("Hello " + req.body.name + " from a POST endpoint");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
