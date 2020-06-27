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
            <Heading fontFamily="Mitr serif" fontSize="20px">{header}</Heading>
            <Text fontFamily="Quark sans-serif" fontSize="16px">{content}</Text>
        </Box>
    </Box>;
}

const Cards = () => {
    return <Stack isInline>
        <Box><Card imageSrc="https://cdn.pixabay.com/photo/2012/04/13/00/14/bar-31174_960_720.png" header="Sirawit Phongnakarin" content="Experience coder of our group who is IOI Thailand's
candidate. Hope you enjoy this website."/></Box>
        <Box><Card imageSrc="http://202.28.95.5/ortho/myfile/20170216121353_Test-Computer-Key-by-Stuart-Miles.jpg" header="Tanadol Ra-ngabpit" content="Initiator of this website who lead the idea about Thai's
language practice platform for everyone."/></Box>
        <Box><Card imageSrc="http://202.28.95.5/ortho/myfile/20170216121353_Test-Computer-Key-by-Stuart-Miles.jpg" header="Krittiphong Manachamni" content="Coder who interest and practice in AI project.
        "/></Box>
    </Stack>
}
const AboutPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | About" />
        <Links />
        <Cards />
    </Layout>
);
export default AboutPage;