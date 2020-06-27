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
            <Heading fontFamily="Lato, sans-serif" fontSize="20px">{header}</Heading>
            <Text padding="5px 0px" fontFamily="Quark, sans-serif" fontSize="16px">{content}</Text>
        </Box>
    </Box>;
}

const Cards = () => {
    return <Stack isInline>
        <Box padding="0px 8vmin" rounded="lg"><Card imageSrc="https://sites.google.com/site/indochinappk/_/rsrc/1468738929801/manu3/101451241.jpg" header="Learn through real situation" content="To understand more about Thai language, we present you Thai article in your language for understanding Thai's basic."/></Box>
        <Box padding="0px 8vmin" rounded="lg"><Card imageSrc="https://cdn-cms.pgimgs.com/static/2020/04/Learn-online.jpg" header="Listen Thai's speech from native AI" content="We introduce you new normal of learning Thai by reading Thai's article to speech."/></Box>
        <Box padding="0px 8vmin" rounded="lg"><Card imageSrc="https://www.omothailand.com/upload/images/59001c222df45.png" header="Speak Thai instead of Tai" content="Don't know how to speech Thai correctly?
        Don't worry, we have evaluation system for you."/></Box>
    </Stack>
}

const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Home" />
        <Cards />
    </Layout>
);

export default IndexPage;
