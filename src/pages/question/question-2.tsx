import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import { Link } from "gatsby";
import {Box,Button,ButtonGroup,Input,Text} from "@chakra-ui/core";

const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Listening" />
        <Box padding="10vmin 20%" boxShadow="0 0">
            <Text fontFamily="Mitr, sans-serif" fontSize="md">Question 2/3</Text>
            <Box border="1px" padding="10px" rounded="lg">
                Listen to This Word<br/>
                "Some Player"<br/>
                Answer the Word that you hear<br/>
                <Box padding="0 20px" borderColor="#000" display="inline-block">
                </Box>
            </Box>
            <ButtonGroup spacing={4} height="1vmin" width="100%" textAlign="right">
                <Link to="../question-1">
                    <Button variantColor="gray" variant="link">  previous question </Button>
                </Link>

                <Link to="../question-3">
                    <Button variantColor="teal" variant="solid"> Next </Button>
                </Link>
            </ButtonGroup>
        </Box>
        
    </Layout>
);

export default IndexPage;