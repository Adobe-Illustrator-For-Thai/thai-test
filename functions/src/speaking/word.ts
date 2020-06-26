const PartiiURL = "https://api.aiforthai.in.th/partii-webapi";
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
        formData.append("wavfile", file);
        formData.append("format", "json");
        const subResponse = await fetch(PartiiURL, {
            method: "POST",
            mode: "cors",
            body: formData,
        });
        if (!subResponse.ok) {
            res.status(500).send("API call failed");
            return;
        }
        const responseData = await subResponse.json();
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
