import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Links from "../components/links";
import { 
    ThemeProvider,
    Box,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Heading,
    Text,
    Stack,
    useColorMode,
    InputLeftElement,
    Icon
} from '@chakra-ui/core';

const loginPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Login" />
        <Box padding="10vmin 20%">
        <Text fontFamily="Lato, sans-serif" fontSize="3xl">Sign in</Text>
        <Text fontFamily="Lato, sans-serif" fontSize="6xl"> </Text>
        <Stack spacing={3}>
            <Text fontFamily="Mitr, sans-serif" fontSize="lg">Email Address</Text>

            <InputGroup>
                <InputLeftElement children={<Icon name="email" color="gray.300" />} />
                <Input variant="outline" placeholder="Ex. krittiphong@hackathon.co.th" />
            </InputGroup>

            <Text fontFamily="Mitr, sans-serif" fontSize="lg">Password</Text>
            <Input variant="outline" placeholder="********" />
            <Text fontFamily="Mitr, sans-serif" fontSize="sm" color="#718096">Forget Password?</Text>
        </Stack>
        </Box>
    </Layout>
);

export default loginPage;