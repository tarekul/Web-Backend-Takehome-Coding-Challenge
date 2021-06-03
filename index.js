const express = require("express");
const app = express();
const port = process.env.PORT || 5004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { raffleApp } = require("./routes/raffles");

app.use("/raffles", raffleApp);

app.listen(port, () => console.log(`listening on port number ${port}`));
