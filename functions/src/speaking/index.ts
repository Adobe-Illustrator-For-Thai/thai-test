import * as express from "express";
const router = express.Router();
import word from "./word";
router.get("/word", word);
const app = express();
import * as cors from "cors";
app.use(cors({ origin: true }));
app.use(router);
export default app;