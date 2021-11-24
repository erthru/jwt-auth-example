import express from "express";
import cors from "cors";
import { PORT } from "./helpers/environment";
import db from "./configs/db";
import { createServer } from "http";
import routes from "./routes";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());
app.use(routes);

server.listen(PORT, async () => {
    await db();
    console.log(`Server run on port: ${PORT}`);
});
