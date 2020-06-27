import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Links from "../components/links";
import {Box,Text,Image} from "@chakra-ui/core";
const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Learn" />
        <Links />
        <Box margin="50px 10px">
            <Text fontSize="0.9em">Learning</Text>
            <Text fontSize="2em">How to Read Thai Letter</Text>
            <Image src="https://i.imgur.com/kT3Eu05.jpg" alt="Hololive" height="200px"/>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
        </Box>
    </Layout>
);

export default IndexPage;