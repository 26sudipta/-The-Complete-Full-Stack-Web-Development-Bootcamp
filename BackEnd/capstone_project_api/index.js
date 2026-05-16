import express from "express";
import axios from "axios";

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const port = 5000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any");
        res.render("index.ejs", { joke: result.data });
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).send("Failed to fetch a joke.");
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port} `);
});