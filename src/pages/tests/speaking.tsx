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
    Stack,
    useTheme,
} from "@chakra-ui/core";

const SPEAKING_API_URL = "https://api.aiforthai.in.th/partii-webapi";
const SOUNDEX_API_URL = "https://api.aiforthai.in.th/soundex";
const SUBMIT_API_URL =
    "https://asia-east2-thai-test-67d93.cloudfunctions.net/speaking/submit";

interface FileInputProps {
    file: File;
    setFile: (file: File) => void;
}
let recordedChunks = [];
const FileInput = (props: FileInputProps) => {
    const playerRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState<number>(-1);
    const startRecording = async () => {
        const devices = await navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                return devices.filter((d) => d.kind === "audioinput");
            });
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: devices[0].deviceId,
            },
        });
        const options = { mimeType: "audio/webm" };
        const mediaRecorder = new MediaRecorder(stream, options);
        recordedChunks = [];
        console.log("mediaRecorder", mediaRecorder);
        const dataListener = (e: BlobEvent) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };
        mediaRecorder.ondataavailable = dataListener;
        const stopListener = () => {
            const recordedBlob: any = new Blob(recordedChunks);
            recordedBlob.lastModifiedDate = new Date();
            recordedBlob.name = "submission.wav";
            props.setFile(recordedBlob);
            stream.getTracks().forEach((track) => track.stop());
        };
        mediaRecorder.onstop = stopListener;
        mediaRecorder.start();
        console.log("mediaRecorder", mediaRecorder);
        setTimeout(() => mediaRecorder.stop(), 3000);
        setProgress(0);
    };

    useEffect(() => {
        if (progress !== -1 && progress < 100) {
            setTimeout(() => {
                setProgress(progress + 0.5);
            }, 8);
        }
    }, [progress]);

    const theme = useTheme();
    return (
        <FormControl>
            <audio id="player" ref={playerRef} controls></audio>
            <br />
            <Input as="div" p="0.5rem" height="auto">
                <Box
                    position="absolute"
                    left="0"
                    w={Math.max(progress, 0) + "%"}
                    h="100%"
                    bg={theme.colors.black}
                    rounded="md"
                    textAlign="right"
                    color={theme.colors.red[400]}
                >
                    <Box h="100%" display="inline-block">
                        <CenterFlex h="100%" marginX="0.5rem">
                            <Text fontWeight="700" marginY="auto">
                                {props.file?.name ? "Complete" : "Recording"}
                            </Text>
                        </CenterFlex>
                    </Box>
                </Box>
                <Button
                    onClick={() => startRecording()}
                    isDisabled={progress !== -1 && progress < 100}
                    height="2rem"
                >
                    Start Recording
                </Button>
            </Input>
            <FormHelperText>
                Please allow us to use your microphone to record your audio.
            </FormHelperText>
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

const getPrettyResult = (result) => {
    switch (result) {
        case SpeakingResult.LOADING:
            return "Loading";
        case SpeakingResult.ACCEPTED:
            return "Correct Answer";
        case SpeakingResult.PARTIAL:
            return "Partially Correct";
        case SpeakingResult.WRONG:
            return "Wrong Answer";
        case SpeakingResult.ERROR:
            return "Unexpected Error";
        case SpeakingResult.NONE:
            return "";
    }
};

const SpeakingPage = () => {
    const [file, setFile] = useState<File>();
    const [result, setResult] = useState<SpeakingResult>(SpeakingResult.NONE);
    const [text, setText] = useState<string>("");
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [disableNext, setDisableNext] = useState<boolean>(false);
    const nextQuestion = () => {
        if (questionIndex === questions.length - 1) return;
        setText(questions[questionIndex + 1]);
        setQuestionIndex(questionIndex + 1);
    };
    const submitFile = async () => {
        const formData = new FormData();
        formData.append("wavfile", file);
        formData.append("format", "json");
        setResult(SpeakingResult.LOADING);
        console.log("Submitting");
        const res = await fetch(SUBMIT_API_URL, {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: {
                Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY",
            },
        });
        if (!res.ok) {
            setResult(SpeakingResult.ERROR);
            return;
        }
        const rtext = await res.text();
        const word: string = rtext.split(" ").join("");
        if (word === questions[questionIndex]) {
            setResult(SpeakingResult.ACCEPTED);
        } else {
            const soundexRes = await fetch(
                SOUNDEX_API_URL +
                    `?word=${encodeURIComponent(word)}&model=royin`,
                {
                    method: "POST",
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
    const nextProblem = () => {
        setDisableNext(true);
        setTimeout(() => {
            nextQuestion();
            setDisableNext(false);
        }, 3000);
    }
    return (
        <Layout>
            <SEO title="Learn Thai as Thai style | Speaking Test" />
            <CenterFlex>
                <Box width={["90vw", "90vw", "50vw"]}>
                    <Heading>Pronouce this:</Heading>
                    <Heading>{questions[questionIndex]}</Heading>
                    <FileInput file={file} setFile={setFile} />
                    <br />
                    <Stack isInline>
                        <Button
                            onClick={() => submitFile()}
                            isDisabled={
                                result === SpeakingResult.LOADING || !file
                            }
                        >
                            Submit
                        </Button>
                        <Button onClick={() => nextProblem()} isDisabled={disableNext}>Next</Button>
                    </Stack>
                    <CenterFlex width="100%">
                        <Heading>{getPrettyResult(result)}</Heading>
                    </CenterFlex>
                </Box>
            </CenterFlex>
        </Layout>
    );
};

export default SpeakingPage;
