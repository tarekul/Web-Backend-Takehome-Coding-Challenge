const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { raffleApp } = require("./routes/raffles");

app.use("/raffles", raffleApp);

module.exports = app;
