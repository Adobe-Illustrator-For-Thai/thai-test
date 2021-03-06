import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import { Box, Button, ButtonGroup, Input } from "@chakra-ui/core";
import * as WavFileEncoder from "wav-file-encoder";
const LISTENING_API_URL = "https://api.aiforthai.in.th/vaja?mode=st&text=";

const IndexPage = () => {
    const [result, setResult] = useState<string>();

    const wavData = (
        channels: number,
        length: number,
        sampleRate: number,
        file: any
    ): AudioBuffer => {
        const audioBuffer: AudioBuffer = new AudioBuffer({
            length,
            numberOfChannels: channels,
            sampleRate,
        });
        const channelData = audioBuffer.getChannelData(0);
        file.forEach((data, i) => {
            channelData[i] = data;
        });
        return audioBuffer;
    };

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
        console.log("send");
        const newUrl = LISTENING_API_URL + encodeURIComponent(word);
        const res = await fetch(newUrl, {
            method: "POST",
            mode: "cors",
            headers: { Apikey: "E6XUGhTP29Tm1Tepcy4fWbZ1CyzMOVxY" },
        });
        if (!res.ok) {
            setResult("Not Okay");
            return;
        }
        setResult("Okay");
        const rjson = await res.json();
        console.log(rjson);
        const { result, numChannels, validBits, sizeSample, sampleRate } = rjson.output.audio;
        console.log(
            numChannels,
            result,
            sampleRate,
            sizeSample,
            validBits
        );
        getBufferCallback(numChannels, result.length, sampleRate, result.map(x => Number(x)));
    };
    return (
        <Layout>
            <SEO title="Learn Thai as Thai style | Listening" />
            <Box padding="23vmin 30%">
                <Box border="1px" padding="10px" rounded="lg">
                    Listen to This Word
                    <br />
                    "Some Player"
                    <br />
                    Answer the Word that you hear
                    <br />
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
                    <Button variantColor="gray" variant="link">
                        {" "}
                        previous question{" "}
                    </Button>
                    <Button variantColor="teal" variant="solid">
                        {" "}
                        Next{" "}
                    </Button>
                    <Button
                        variantColor="teal"
                        variant="solid"
                        onClick={() => {
                            getSound("ลอง");
                        }}
                    >
                        {" "}
                        Test{" "}
                    </Button>
                </ButtonGroup>
            </Box>
        </Layout>
    );
};

export default IndexPage;
