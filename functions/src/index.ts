import * as functions from "firebase-functions";
import speakingRouter from "./speaking";
export const speaking = functions.region("asia-east2").https.onRequest(speakingRouter);
