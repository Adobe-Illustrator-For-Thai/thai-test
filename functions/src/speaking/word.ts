import * as https from "https";

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
        const wavfile : string = file.buffer.toString("base64");
        console.log('[DEBUG]', wavfile.slice(0, 32));
        const bufferResponse = await new Promise<any>((resolve) => {
            const APIRequest = https.request({
                method: "POST",
                host: "api.aiforthai.in.th",
                path: "/partii-webapi",
                port: 443,
                headers: {
                    Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY",
                },
            }, (resp) => resolve(resp));
            APIRequest.write(JSON.stringify({
                wavfile,
                format: "json"
            }));
            APIRequest.end();
        });
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
