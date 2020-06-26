import * as express from "express";
const router = express.Router();
import word from "./word";
router.post("/word", word);
const app = express();
//@ts-ignore
import * as fileMiddleware from "express-multipart-file-parser";
import * as cors from "cors";
app.use(cors({ origin: true }));
app.use(fileMiddleware);
app.use(router);
export default app;