const express = require("express");
require("dotenv").config();
const cors = require('cors')
const app = express();
const apiRouter = require("./routes");

const PORT = process.env.PORT || 8000;
app.use(cors())
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));
