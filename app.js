const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { raffleApp } = require("./routes/raffles");
const { dataApp } = require("./routes/data");

app.use("/raffles", raffleApp);
app.use("/data", dataApp);

module.exports = app;
