import React, { useRef, useState, useEffect } from "react";

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
    Heading,
    Box,
    useTheme
} from "@chakra-ui/core";

const SPEAKING_API_URL = "https://api.aiforthai.in.th/partii-webapi";
const SOUNDEX_API_URL = "https://api.aiforthai.in.th/soundex";

interface FileInputProps {
    file: File;
    setFile: (file: File) => void;
}
const FileInput = (props: FileInputProps) => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);
    const [recordedChunks, setRecordedChunks] = useState<Array<Blob>>([]);
    const [stream, setStream] = useState<MediaStream>(null);
    const [progress, setProgress] = useState<number>(-1);
    const startRecording = () => {
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                return devices.filter((d) => d.kind === "audioinput")[0]
                    .deviceId;
            })
            .then((deviceId) =>
                navigator.mediaDevices.getUserMedia({ audio: { deviceId } })
            )
            .then((currentStream) => {
                const options = { mimeType: "audio/webm" };
                const currentMediaRecorder = new MediaRecorder(currentStream, options);
                setMediaRecorder(currentMediaRecorder);
                currentMediaRecorder.start();
                setStream(currentStream);
                setTimeout(() => currentMediaRecorder.stop(), 5000);
                setProgress(0);
            });
    };

    useEffect(() => {
        if(!mediaRecorder) return;
        const listener = (e) => {
            if (e.data.size > 0) {
                setRecordedChunks([...recordedChunks, e.data]);
            }
        }
        mediaRecorder.addEventListener("dataavailable", listener);
        return () => mediaRecorder.removeEventListener("dataavailable", listener);
    }, [mediaRecorder]);

    useEffect(() => {
        if(!mediaRecorder) return;
        const listener = () => {
            const recordedBlob: any = new Blob(recordedChunks);
            recordedBlob.lastModifiedDate = new Date();
            recordedBlob.name = "submission.webm";
            props.setFile(recordedBlob);
            stream.getTracks().forEach(track => track.stop());
        }
        mediaRecorder.addEventListener("stop", listener);
        return () => mediaRecorder.removeEventListener("stop", listener);
    }, [mediaRecorder, stream]);

    useEffect(() => {
        if(progress !== -1 && progress < 100){
            setTimeout(() => {
                setProgress(progress+0.3);
            }, 8);
        }
    }, [progress]);

    const theme = useTheme();
    return (
        <FormControl>
            <br />
            <Input as="div" p="0.5rem" height="auto">
                <Box position="absolute" left="0" w={Math.max(progress, 0)+"%"} h="100%" bg={theme.colors.black} rounded="md" textAlign="right" color={theme.colors.red[400]}>
                    <Box h="100%" display="inline-block">
                        <CenterFlex h="100%" marginX="0.5rem">
                            <Text fontWeight="700" marginY="auto">{props.file?.name ? "Complete" : "Recording"}</Text>
                        </CenterFlex>
                    </Box> 
                </Box>
                <Button onClick={startRecording} height="2rem">
                    Start Recording
                </Button>
            </Input>
            <FormHelperText>Please allow us to use your microphone to record your audio.</FormHelperText>
        </FormControl>
    );
};

const questions = [
    "สวัสดี",
    "ไก่",
    "กา",
    "ไข่",
    "กิน",
    "ข้าว",
    "มือ",
    "เท้า",
    "งู",
    "วัว",
    "ไทย",
    "จบ",
    "ขอบคุณ",
    "ศศิธร",
    "จัตุรัส",
    "จุติ",
    "กรุงเทพมหานคร",
    "",
];

enum SpeakingResult {
    LOADING,
    ACCEPTED,
    PARTIAL,
    WRONG,
    ERROR,
    NONE,
}

const SpeakingPage = () => {
    const [file, setFile] = useState<File>();
    const [result, setResult] = useState<SpeakingResult>(SpeakingResult.NONE);
    const [text, setText] = useState<string>("");
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const nextQuestion = () => {
        if (questionIndex === questions.length - 1) return;
        setText(questions[questionIndex + 1]);
        setQuestionIndex(questionIndex + 1);
    };
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
            headers: { Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY" },
        });
        if (!res.ok) {
            setResult(SpeakingResult.ERROR);
            return;
        }
        const rjson = await res.json();
        const word: string = rjson.result.split(" ").join("");
        if (word === questions[questionIndex]) {
            setResult(SpeakingResult.ACCEPTED);
        } else {
            const soundexRes = await fetch(
                SOUNDEX_API_URL +
                    `?word=${encodeURIComponent(word)}&model=royin`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            if (!soundexRes.ok) {
                console.log("soundex fail");
                setResult(SpeakingResult.WRONG);
                return;
            }
            const soundexJson = await soundexRes.json();
            if (
                soundexJson.words.filter(
                    (targetWord) => targetWord.word === word
                ).length > 0
            ) {
                setResult(SpeakingResult.PARTIAL);
            } else {
                setResult(SpeakingResult.WRONG);
            }
        }
    };
    return (
        <Layout>
            <SEO title="Learn Thai as Thai style | Speaking Test" />
            <CenterFlex>
                <Box width={["90vw", "90vw", "50vw"]}>
                    <Heading>Pronouce this:</Heading>
                    <Text>{questions[questionIndex]}</Text>
                    <FileInput file={file} setFile={setFile} />
                    <br />
                    <Button onClick={submitFile}>Submit</Button>
                </Box>
            </CenterFlex>
        </Layout>
    );
};

export default SpeakingPage;
