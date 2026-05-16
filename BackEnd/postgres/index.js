import express from "express";
import pq from "pg";

const db = new pq.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "das420sudipta",
  port: 5432,
});

db.connect();

db.query("SELECT * FROM capitals", (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.rows);
    }
    db.end();
});