import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import { Link } from "gatsby";
import CenterFlex from '../../components/CenterFlex';
import { 
    Box,
    Button,
    Heading,
    Text,
    Stack,
    Flex,
    useTheme
} from '@chakra-ui/core';

const Card = ({header, content,to}: CardProps) => {
    const theme = useTheme();   
    return <>
    <Box width="100%" shadow="md" rounded="lg">
        <Box m="15px">
            <Heading fontFamily="Mitr serif">{header}</Heading>
            <Text fontFamily="Quark sans-serif">{content}</Text>
        </Box>
        <Box m="15px" textAlign="right">
            <Link to={to}>
                <Button margin="0 1% 1%" bg="#4FD1C5" color="#fff" rounded="lg">Start Your Test</Button>
            </Link>
        </Box>
    </Box>
    </>;
}
interface CardProps {
    to:string
    header: string
    content: string
}
const Cards = () => {
    return <CenterFlex>
        <Stack align="center" width="80vw">
            <Card header="Speaking" content="test content" to="/tests/speaking"/>
            <Card header="Listening" content="test content" to="/tests/listening"/>
            <Card header="Test" content="test content" to="/"/>
        </Stack>
    </CenterFlex>
}
const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Test" />
        <Links />
        <Cards/>
    </Layout>
);

export default IndexPage