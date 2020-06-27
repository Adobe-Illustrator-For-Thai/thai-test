import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { Link } from "gatsby";
import CenterFlex from '../../components/CenterFlex';
import { 
    Box,
    Button,
    Heading,
    Text,
    Stack,
    useTheme
} from '@chakra-ui/core';

const Card = ({header, content,to}: CardProps) => {
    const theme = useTheme();   
    return <>
    <Box padding="16px" width="100%" shadow="xl" rounded="lg">
        <Box m="15px">
            <Heading padding="10px" fontFamily="Lato, sans-serif" fontSize="24px">{header}</Heading>
            <Text padding="10px" fontFamily="Quark, sans-serif" fontSize="18px">{content}</Text>
        </Box>
        <Box m="15px" textAlign="right">
            <Link to={to}>
                <Button fontSize="20px" margin="0 1% 1%" bg="#4FD1C5" color="#fff" rounded="lg">Start Your Test</Button>
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
        <Stack padding="16px" align="center" width="80vw">
            <Card header="Beginner : Speak daily life sentences in Thai." content="In this test, you will meet basic sentences such as greeting, ask direction, even order food in restaurant.
Feel free to start your test." to="/tests/speaking"/>
            <Card header="Intermediate : Listen modern poem as native." content="After study a lot about Thai poetry. Maybe you have to listen about it! This will help you understand how beautiful of Thai language is!" to="/tests/listening"/>
            <Card header="Challenge : Mixed challenge for you!" content="Challenge yourself is not bad at all. It'll provide you how good in Thai of you. A lot of people challenge themselves to find out their mistake in each topics. " to="/question/question-1"/>
        </Stack>
    </CenterFlex>
}
const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Test" />
        <Box flex="1">
            <Cards/>
        </Box>
    </Layout>
);

export default IndexPage