import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import {Box,Button,ButtonGroup,Input} from "@chakra-ui/core";

const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Listening" />
        <Box padding="23vmin 30%">
            <Box border="1px" padding="10px" rounded="lg">
                Listen to This Word<br/>
                "Some Player"<br/>
                Answer the Word that you hear<br/>
                <Box padding="0 20px" borderColor="#000" display="inline-block">
                </Box>
            </Box>
            <ButtonGroup spacing={4} padding="1vmin" width="100%" textAlign="right">
                <Button variantColor="gray" variant="link">  previous question </Button>
                <Button variantColor="teal" variant="solid"> Next </Button>
            </ButtonGroup>
        </Box>
        
    </Layout>
);

export default IndexPage;