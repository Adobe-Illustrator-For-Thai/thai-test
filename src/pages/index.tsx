import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Links from "../components/links";
import CenterFlex from "../components/CenterFlex";
import { 
    Box,
    Image,
    Heading,
    Text,
    Stack
} from '@chakra-ui/core';

interface CardProps {
    imageSrc: string
    header: string
    content: string
}
const Card = ({imageSrc, header, content}: CardProps) => {
    return <Box width="50vmin" height="70vmin" shadow="md" rounded="lg">
        <CenterFlex width="100%" height="50vmin" overflow="hidden">
            <Image roundedTop="lg" mb="0" src={imageSrc} width="auto" height="100%" objectFit="cover"></Image>
        </CenterFlex>
        <Box m="15px">
            <Heading fontFamily="Mitr serif">{header}</Heading>
            <Text fontFamily="Quark sans-serif">{content}</Text>
        </Box>
    </Box>;
}

const Cards = () => {
    return <Stack isInline>
        <Box><Card imageSrc="https://cdn.pixabay.com/photo/2012/04/13/00/14/bar-31174_960_720.png" header="Test" content="test content"/></Box>
        <Box><Card imageSrc="http://202.28.95.5/ortho/myfile/20170216121353_Test-Computer-Key-by-Stuart-Miles.jpg" header="Test" content="test content"/></Box>
        <Box><Card imageSrc="http://202.28.95.5/ortho/myfile/20170216121353_Test-Computer-Key-by-Stuart-Miles.jpg" header="Test" content="test content"/></Box>
    </Stack>
}
const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Home" />
        <Cards />
    </Layout>
);

export default IndexPage;
