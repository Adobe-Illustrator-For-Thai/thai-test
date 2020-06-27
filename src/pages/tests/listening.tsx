import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import {Box,Button,Input} from "@chakra-ui/core";

const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Listening" />
        <Links />
        <Box padding="23vmin 30%">
            <Box border="1px" padding="10px" textAlign="center" >
                Listen to This Word<br/>
                "Some Player"<br/>
                Answer the Word that you hear<br/>
                <Box padding="0 20px" borderColor="#000" display="inline-block">
                    <Input placeholder="answer"/><Button >Enter</Button>
                </Box>
            </Box>
        </Box>
    </Layout>
);

export default IndexPage;