import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import CenterFlex from "../../components/CenterFlex"
import { Box, Button, ButtonGroup, Input, Heading, Stack} from "@chakra-ui/core";
const LISTENING_API_URL = "https://api.aiforthai.in.th/vaja?mode=st&text=";

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

enum ListenResult {
    LOADING,
    ACCEPTED,
    PARTIAL,
    WRONG,
    ERROR,
    NONE,
}

const getPrettyResult = (result) => {
    switch (result) {
        case ListenResult.LOADING:
            return "Loading";
        case ListenResult.ACCEPTED:
            return "Correct Answer";
        case ListenResult.PARTIAL:
            return "Partially Correct";
        case ListenResult.WRONG:
            return "Wrong Answer";
        case ListenResult.ERROR:
            return "Unexpected Error";
        case ListenResult.NONE:
            return "";
    }
};

const IndexPage = () => {
    const [result, setResult] = useState<ListenResult>(ListenResult.NONE);
    const [text, setText] = useState<string>("");
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [disableNext, setDisableNext] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    function getBufferCallback(
        channels: number,
        length: number,
        sampleRate: number,
        file: any[]
    ) {
        var audioContext = new AudioContext();
        var newSource = audioContext.createBufferSource();
        var newBuffer = audioContext.createBuffer(1, length, sampleRate);
        newBuffer.getChannelData(0).set(file.map(x => (x + 32768) / 32768.0));
        newSource.buffer = newBuffer;
        newSource.connect(audioContext.destination);
        newSource.start(0);
    }
    const getSound = async (word: string) => {
        setResult(ListenResult.LOADING);
        const newUrl = LISTENING_API_URL + encodeURIComponent(word);
        const res = await fetch(newUrl, {
            method: "POST",
            mode: "cors",
            headers: { Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY" },
        });
        if (!res.ok) {
            setResult(ListenResult.ERROR);
            return;
        }
        const rjson = await res.json();
        const { result, numChannels, validBits, sizeSample, sampleRate } = rjson.output.audio;
        setResult(ListenResult.NONE);
        getBufferCallback(numChannels, result.length, sampleRate, result.map(x => Number(x)));
    };

    const nextQuestion = () => {
        if (questionIndex === questions.length - 1) return;
        setText(questions[questionIndex + 1]);
        setQuestionIndex(questionIndex + 1);
        setAnswer("");
        setResult(ListenResult.NONE);
    };

    const checkAnswer = () => {
        if(questions[questionIndex]===answer){
            setResult(ListenResult.ACCEPTED);
        }else{
            setResult(ListenResult.WRONG);
        }
    }
    return (
        <Layout>
            <SEO title="Learn Thai as Thai style | Listening" />
            <Box flex="1">
            <Box padding="23vmin 30%">
                <Heading>Question Number {questionIndex+1}</Heading>
                <Box border="1px" padding="10px" rounded="lg">
                    Listen to This Word
                    <br />
                    <Button
                        variantColor="teal"
                        variant="solid"
                        onClick={() => {
                            getSound(questions[questionIndex]);
                        }}
                    >
                        {" "}
                        Listen{" "}
                    </Button>
                    <br />
                    Answer the Word that you hear
                    <br />
                    <Stack isInline>
                        <Input placeholder="Answer" borderColor="#999" value={answer} onInput={e => setAnswer(e.target.value)}></Input>
                        <Button onClick={checkAnswer}>Submit</Button>
                    </Stack>
                    <Box
                        padding="0 20px"
                        borderColor="#000"
                        display="inline-block"
                    ></Box>
                </Box>
                <ButtonGroup
                    spacing={4}
                    padding="1vmin"
                    width="100%"
                    textAlign="right"
                >
                    <Button variantColor="teal" variant="solid" onClick={() => nextQuestion()} isDisabled={disableNext}>
                        {" "}
                        Next{" "}
                    </Button>
                </ButtonGroup>
                <CenterFlex width="100%" >
                    <Heading>{getPrettyResult(result)}</Heading>
                </CenterFlex>
                <CenterFlex>
                    <br/>
                    {result === ListenResult.WRONG ? <Heading>Correct Answer is {questions[questionIndex]}</Heading> : ""}
                </CenterFlex>
            </Box>
            </Box>
        </Layout>
    );
};

export default IndexPage;

