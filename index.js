const app = require("./app");
const port = process.env.PORT || 5004;

app.listen(port, () => console.log(`listening on port number ${port}`));
