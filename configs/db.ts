import mongoose from "mongoose";
import { DB_URI } from "../helpers/environment";

const db = async () =>
    await mongoose.connect(DB_URI, {
        autoIndex: true,
    });

export default db;
