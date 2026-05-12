import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const currentDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentWeekDay = days[currentDate.getDay()];

    if (currentWeekDay === 'Friday') {
        res.render("index", {
            title: 'Home Page',
            message: `Today is ${currentWeekDay}. It's the weekend!`
        });
    } else {
        res.render("index", {
            title: 'Home Page',
            message: `Today is ${currentWeekDay}. It's time to work!`
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});