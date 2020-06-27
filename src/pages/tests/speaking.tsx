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
    Heading
} from "@chakra-ui/core";

const SPEAKING_API_URL = "https://api.aiforthai.in.th/partii-webapi";
const SOUNDEX_API_URL = "https://api.aiforthai.in.th/soundex";

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
                accept="audio/wav;capture=microphone"
                capture
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

const questions = ["สวัสดี", "ไก่", "กา", "ไข่", "กิน", "ข้าว", "มือ", "เท้า", "งู", "วัว", "ไทย", "จบ", "ขอบคุณ", "ศศิธร", "จัตุรัส", "จุติ", "กรุงเทพมหานคร", ""]

enum SpeakingResult {
    LOADING,
    ACCEPTED,
    PARTIAL,
    WRONG,
    ERROR,
    NONE
}

const SpeakingPage = () => {
    const [file, setFile] = useState<File>();
    const [result, setResult] = useState<SpeakingResult>(SpeakingResult.NONE);
    const [text, setText] = useState<string>("");
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const nextQuestion = () => {
        if(questionIndex === questions.length-1) return;
        setText(questions[questionIndex+1]);
        setQuestionIndex(questionIndex + 1);
    }
    const submitFile = async () => {
        const formData = new FormData();
        formData.append("format", "json");
        formData.append("wavfile", file);
        setResult(SpeakingResult.LOADING);
        console.log("Submitting");
        const res = await fetch(SPEAKING_API_URL, {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: { Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY" }
        });
        if (!res.ok) {
            setResult(SpeakingResult.ERROR);
            return;
        }
        const rjson = await res.json();
        const word : string = rjson.result.split(" ").join("");
        if(word === questions[questionIndex]){
            setResult(SpeakingResult.ACCEPTED);
        }else{
            const soundexRes = await fetch(SOUNDEX_API_URL + `?word=${encodeURIComponent(word)}&model=royin`, {
                method: "GET",
                mode: "cors",
                headers: { 
                    Apikey : "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            if(!soundexRes.ok){
                console.log("soundex fail");
                setResult(SpeakingResult.WRONG);
                return;
            }
            const soundexJson = await soundexRes.json();
            if(soundexJson.words.filter(targetWord => targetWord.word === word).length > 0){
                setResult(SpeakingResult.PARTIAL);
            }else{
                setResult(SpeakingResult.WRONG);
            }
        }
    };
    return (
        <Layout>
            <SEO title="Learn Thai as Thai style | Speaking Test" />
            <Heading>คำถาม</Heading>
            <Text>{questions[questionIndex]}</Text>
            <FileInput file={file} setFile={setFile} />
            <Button onClick={submitFile}>Submit</Button>
        </Layout>
    );
};

export default SpeakingPage;