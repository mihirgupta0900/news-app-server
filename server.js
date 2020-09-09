const express = require("express");
require("dotenv").config();
const cors = require('cors')
const app = express();
const apiRouter = require("./routes");
const helmet = require('helmet')
const middlewares = require('./middlewares');

app.use(helmet())
app.use(cors())
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api", apiRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));
