import * as dotEnv from "dotenv";

dotEnv.config();

export const PORT = parseInt(process.env.PORT as unknown as string);
export const TOKEN_SECRET = process.env.TOKEN_SECRET as unknown as string;
export const DB_URI = process.env.DB_URI as unknown as string;
