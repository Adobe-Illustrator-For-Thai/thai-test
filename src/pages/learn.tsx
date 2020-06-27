import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Links from "../components/links";
import {Box,Text,Image,Link,Icon} from "@chakra-ui/core";
const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Learn" />
        <Box margin="50px 10px">
            <Text fontFamily="Mitr, sans-serif"fontSize="24px" color="#A3A3A3">Learning</Text>
            <Text padding="10px 0px" fontFamily="Mitr, sans-serif" fontSize="42px">Today, there is no corona virus patient. Returned home 13 more.</Text>
            <Image src="https://www.thairath.co.th/media/dFQROr7oWzulq5FZUEj8doZ4k64UQfDgsAh9ikImF69u02SMSkaFh3VbsEtc6aRBVct.webp" alt="Covid" height="60vmin"/>
            <Text padding="10px 0px" fontFamily="Lato, sans-serif" fontSize="20px">
            The COVID-19 data center reports that Thailand has not found any income, resulting in the nationwide infection being "0"

At 11:30 am on June 27, 2020, Facebook Fanpage, the data center of COVID-19, reports on the problem of the coronary virus infection 2019 or Covid-19 in Thailand.
            </Text>
            <Text padding="10px 0px" fontFamily="Lato, sans-serif" fontSize="20px">However, the infection has not been reported in the country or is "0" for 33 consecutive days.</Text>
            <Link href="https://www.thairath.co.th/news/politic/1877587" isExternal> References from Thairath <Icon name="external-link" mx="2px" /></Link>
        </Box>
    </Layout>
);

export default IndexPage;