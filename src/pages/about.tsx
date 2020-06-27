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
            <Heading fontFamily="Mitr, sans-serif" fontSize="24px">{header}</Heading>
            <Text fontFamily="Quark, sans-serif" fontSize="16px">{content}</Text>
        </Box>
    </Box>;
}

const Cards = () => {
    return <Stack isInline>
        <Box padding="0px 8vmin" rounded="lg"><Card imageSrc="https://scontent.fhdy2-1.fna.fbcdn.net/v/t1.0-9/s960x960/33083036_1015244835292055_4783984897863712768_o.jpg?_nc_cat=110&_nc_sid=7aed08&_nc_eui2=AeH27w7_Oprd-PTt7a3xPY0eJfnJ6j8IeGol-cnqPwh4ar4mo3sIEG9e0_IozFHUGof9SrkTmsBHMFlOIIefzNvO&_nc_ohc=OkvNOiOn2rwAX8cYEOl&_nc_ht=scontent.fhdy2-1.fna&_nc_tp=7&oh=04c406008e00b1d8c8494edd011a082f&oe=5F1C8AB3" header="Sirawit Phongnakarin" content="Experience coder of our group who is IOI Thailand's
candidate. Hope you enjoy this website."/></Box>
        <Box padding="0px 8vmin" rounded="lg"><Card imageSrc="https://scontent.fhdy2-1.fna.fbcdn.net/v/t1.0-9/1915419_10203807061095566_140487910208109571_n.jpg?_nc_cat=102&_nc_sid=e007fa&_nc_eui2=AeEUZQgDutnz58TQa46ImIgRENJV44vGnpAQ0lXji8aekLn7uFGR-_Wo64XOnWWei5bGxVMvsQJOsoLOrXKgTsxs&_nc_ohc=dADgjx9pl40AX8PdbdF&_nc_ht=scontent.fhdy2-1.fna&oh=e2827a8cafb73d48e85aac87a697c04b&oe=5F1E38B2" header="Tanadol Ra-ngabpit" content="Initiator of this website who lead the idea about Thai's
language practice platform for everyone."/></Box>
        <Box padding="0px 8vmin" rounded="lg"><Card imageSrc="https://scontent.fhdy2-1.fna.fbcdn.net/v/t31.0-8/s960x960/28619657_1667391020014458_8179488691201844705_o.jpg?_nc_cat=107&_nc_sid=7aed08&_nc_eui2=AeHnzbiJp8eMwjeFgmbfBgSaQ_nX8we1vf1D-dfzB7W9_XiWvayB1bOWV3v6tzgtnsxpWFhi_aFSuZIaBq3bZ0jp&_nc_ohc=8MERX-DlxRkAX9vCCNu&_nc_ht=scontent.fhdy2-1.fna&_nc_tp=7&oh=296cc06722b30e16eb05c2baba2a8444&oe=5F1B32AA" header="Krittiphong Manachamni" content="Coder who interest and practice in AI project.
        "/></Box>
    </Stack>
}
const AboutPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | About" />
        <Cards />
    </Layout>
);
export default AboutPage;