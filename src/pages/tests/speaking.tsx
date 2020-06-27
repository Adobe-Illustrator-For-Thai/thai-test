import React, { useRef, useState, useEffect } from "react";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import CenterFlex from "../../components/CenterFlex";
import {
    Text,
    FormControl,
    FormHelperText,
    Input,
    Button,
    Heading,
    Box,
    Grid,
    useTheme,
} from "@chakra-ui/core";

const SPEAKING_API_URL = "https://api.aiforthai.in.th/partii-webapi";
const SOUNDEX_API_URL = "https://api.aiforthai.in.th/soundex";
const SUBMIT_API_URL =
    "https://asia-east2-thai-test-67d93.cloudfunctions.net/speaking/submit";

interface FileInputProps {
    file: File;
    setFile: (file: File) => void;
    progress: number;
    setProgress: (prog: number) => void;
}
let recordedChunks = [];
const FileInput = (props: FileInputProps) => {
    const { progress, setProgress } = props;
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
        setTimeout(() => mediaRecorder.stop(), 2000);
        setProgress(0);
    };

    useEffect(() => {
        if (progress !== -1 && progress < 100) {
            setTimeout(() => {
                setProgress(progress + 1);
            }, 8);
        }
    }, [progress]);

    const theme = useTheme();
    return (
        <FormControl>
            <br />
            <Input as="div" p="0.5rem" height="auto">
                <Box
                    position="absolute"
                    left="0"
                    w={Math.max(progress, 0) + "%"}
                    h="100%"
                    bg="#68D391"
                    rounded="md"
                    textAlign="right"
                    color={theme.colors.white}
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
];

enum SpeakingResult {
    LOADING,
    ACCEPTED,
    PARTIAL,
    WRONG,
    ERROR,
    NONE,
}

interface ScoreDisplayProps {
    text: string
}
const ScoreDisplay = (props: React.PropsWithChildren<ScoreDisplayProps>) => {
    return <CenterFlex flexDirection="column">
        <Text>{props.text}</Text>
        <Heading>{props.children}</Heading>
    </CenterFlex>
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
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [disableNext, setDisableNext] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(-1);
    const [accumulatedScore, setAccumulatedScore] = useState<number>(0);
    const [currentScore, setCurrentScore] = useState<number>(0);
    const nextQuestion = () => {
        if (questionIndex === questions.length - 1) return;
        setQuestionIndex(questionIndex + 1);
        setDisableNext(true);
        setProgress(-1);
        setAccumulatedScore(accumulatedScore + currentScore);
        setResult(SpeakingResult.NONE);
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
    useEffect(() => {
        if(file) submitFile().then(() => setFile(null))
    }, [file]);
    useEffect(() => {
        if(result !== SpeakingResult.NONE && result !== SpeakingResult.LOADING) setDisableNext(false);
        if(result === SpeakingResult.ACCEPTED) setCurrentScore(1);
        else if(result === SpeakingResult.PARTIAL) setCurrentScore(0.5);
        else setCurrentScore(0);
    }, [result]);
    return (
        <Layout>
            <SEO title="Learn Thai as Thai style | Speaking Test" />
            <Box flex="1">
                <CenterFlex>
                    <Box width={["90vw", "90vw", "50vw"]}>
                        <Heading
                            padding="20px 0px"
                            fontFamily="Lato, sans-serif"
                            fontSize="40px"
                        >
                            Pronouce this:
                        </Heading>
                        <Heading
                            padding="5px"
                            fontFamily="Lato, sans-serif"
                            fontSize="36px"
                        >
                            {questions[questionIndex]}
                        </Heading>
                        <FileInput file={file} setFile={setFile} progress={progress} setProgress={setProgress} />
                        <br />
                        <Box w="100%" textAlign="right">
                            <Button
                                onClick={() => nextQuestion()}
                                isDisabled={disableNext}
                            >
                                Next
                            </Button>
                        </Box>
                        <CenterFlex width="100%">
                            <Heading>{getPrettyResult(result)}</Heading>
                        </CenterFlex>
                        <Grid templateColumns="1fr 1fr" marginTop="10vh">
                            <Box>
                                <ScoreDisplay text="Current Score">{currentScore}</ScoreDisplay>
                            </Box>
                            <Box>
                                <ScoreDisplay text="Total Score">{accumulatedScore}</ScoreDisplay>
                            </Box>
                        </Grid>
                    </Box>
                </CenterFlex>
            </Box>
        </Layout>
    );
};

export default SpeakingPage;
