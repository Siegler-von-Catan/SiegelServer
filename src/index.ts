import env from "dotenv";
import express from "express";

env.config();

const port = process.env.PORT || 8080;
const staticFiles = process.env.STATIC_FILES || "static";

const app = express();
app.use(express.static(staticFiles));

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`)
});