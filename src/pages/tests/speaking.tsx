import React, { useRef, useState } from "react";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import CenterFlex from "../../components/CenterFlex";
import {
    Text,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
} from "@chakra-ui/core";

const SPEAKING_API_URL = "https://api.aiforthai.in.th/partii-webapi";
//    "https://asia-east2-thai-test-67d93.cloudfunctions.net/speaking/word";

interface FileInputProps {
    file: File;
    setFile: (file: File) => void;
}
const FileInput = (props: FileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement>();
    const promptFileUpload = () => {
        fileInputRef.current?.click();
    };
    const trackFiles = (files) => {
        props.setFile(files[0]);
    };
    return (
        <FormControl>
            <FormLabel>Attach WAV</FormLabel>
            <br />
            <input
                ref={fileInputRef}
                style={{ visibility: "hidden", position: "absolute" }}
                type="file"
                id="cvfile"
                name="cvfile"
                onChange={(e) => trackFiles(e.target.files)}
                accept=".wav"
            />
            <Input as="div" p="0.5rem" height="auto">
                <Button onClick={promptFileUpload} height="2rem">
                    Select File
                </Button>
                <Text textAlign="right" width="100%" pr="0.5rem">
                    {props.file?.name}
                </Text>
            </Input>
            <FormHelperText>Only WAV formats will be accepted.</FormHelperText>
        </FormControl>
    );
};

const SpeakingPage = () => {
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const submitFile = () => {
        const formData = new FormData();
        formData.append("format", "json");
        formData.append("wavfile", file);
        setIsLoading(true);
        console.log("Submitting");
        fetch(SPEAKING_API_URL, {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: { Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY" }
        })
            .then((res) => {
                setIsLoading(false);
                if (!res.ok) {
                    alert("Fail");
                }
                return res.json();
            })
            .then((rjson) => console.log(rjson))
            .catch((e) => console.error(e));
    };
    return (
        <Layout>
            <SEO title="Learn Thai as Thai style | Speaking Test" />
            <FileInput file={file} setFile={setFile} />
            <Button onClick={submitFile}>Submit</Button>
        </Layout>
    );
};

export default SpeakingPage;
