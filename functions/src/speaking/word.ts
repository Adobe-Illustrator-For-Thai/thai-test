import * as FormData from "form-data";
import * as https from "https";
const { Readable } = require("stream");

/**
 * @param binary Buffer
 * returns readableInstanceStream Readable
 */
const bufferToStream = (buffer: Buffer) => { 
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}
/**
 * Receives sound wav and text as payload
 * Returns score (0-1) as response
 * @param req request object
 * @param req.files array of length 1: request file
 * @param res response object
 */
const word = async (req: any, res: any) => {
    try {
        const file = req && req.files && req.files.length > 0 && req.files[0];
        if (!file) {
            res.status(400).send("File not found");
            return;
        }
        const formData = new FormData();
        formData.append("wavfile", bufferToStream(file.buffer));
        formData.append("format", "json");
        const APIRequest = https.request({
            method: "POST",
            host: "api.aiforthai.in.th",
            path: "/partii-webapi",
            port: 443,
            headers: {
                ...formData.getHeaders(),
                Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY",
            },
        });
        formData.pipe(APIRequest);
        const bufferResponse = await new Promise<any>((resolve) =>
            APIRequest.on("response", (resp) => resolve(resp))
        );
        const resStatusCode = bufferResponse.statusCode;
        console.log("[responseStatus]", resStatusCode);
        const responseString = (
            await new Promise<any>((resolve) =>
                bufferResponse.on("data", (d: any) => resolve(d))
            )
        ).toString();
        console.log("[responseString]", responseString);
        const responseData = JSON.parse(responseString);
        console.log("[responseData]", responseData);
        if (responseData.status !== "success") {
            res.status(500).send("Unsuccessful API processing");
            console.error("[ERROR]", responseData.message);
            return;
        }
        res.status(200).send(responseData.result);
    } catch (e) {
        console.error("[ERROR]", e);
        res.status(500).send("Unexpected error");
    }
};
export default word;
