import * as FormData from "form-data";
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
        const formData = new FormData();
        formData.append("wavfile", file.buffer);
        formData.append("format", "json");
        const APIRequest = https.request({
            method: 'post',
            host: "api.aiforthai.in.th",
            path: "partii-webapi",
            headers: formData.getHeaders(),
        });
        formData.pipe(APIRequest);
        const bufferResponse = await new Promise<any>(resolve => APIRequest.on('response', (resp) => resolve(resp)));
        console.log('[bufferResponse]', bufferResponse);
        const responseData = await new Promise<any>(resolve => bufferResponse.on('data', (d: any) => resolve(d)));
        console.log('[responseData]', responseData);
        if (responseData.status !== "success") {
            res.status(500).send("Unsuccessful API processing");
            console.error("[ERROR]", responseData.status);
            return;
        }
        res.status(200).send(responseData.result);
    } catch (e) {
        console.error("[ERROR]", e);
        res.status(500).send("Unexpected error");
    }
};
export default word;
