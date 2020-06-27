import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Links from "../components/links";
import CenterFlex from "../components/CenterFlex";
import { Box } from '@chakra-ui/core';
import Card from "../components/Card";

const Cards = () => {
    return <Box flex="1">
        <CenterFlex flexDir={["column", "column", "column", "row"]} width="100%" height="100%">
        <Box paddingX="15px" paddingY="20px" rounded="lg"><Card imageSrc="https://sites.google.com/site/indochinappk/_/rsrc/1468738929801/manu3/101451241.jpg" header="Learn through real situation" content="To understand more about Thai language, we present you Thai article in your language for understanding Thai's basic."/></Box>
        <Box paddingX="15px" paddingY="20px" rounded="lg"><Card imageSrc="https://cdn-cms.pgimgs.com/static/2020/04/Learn-online.jpg" header="Listen Thai's speech from native AI" content="We introduce you new normal of learning Thai by reading Thai's article to speech."/></Box>
        <Box paddingX="15px" paddingY="20px" rounded="lg"><Card imageSrc="https://www.omothailand.com/upload/images/59001c222df45.png" header="Speak Thai instead of Tai" content="Don't know how to speech Thai correctly? Don't worry, we have evaluation system for you."/></Box>
    </CenterFlex>
    </Box>
}

const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Home" />
        <Cards />
    </Layout>
);

export default IndexPage;