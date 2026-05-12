import express from "express";
const app = express();

app.get("/",(req,res) => {
    console.log(req.rawHeaders);
    res.send("<h2>Hello World</h2>");
});

app.get("/about",(req,res) => {
    console.log(req.rawHeaders);
    res.send("<h2>About Us</h2>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});