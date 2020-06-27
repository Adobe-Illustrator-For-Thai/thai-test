import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Links from "../../components/links";
import { Link } from "gatsby";
import {VisuallyHidden,Box,Button,ButtonGroup,ControlBox,Input,Text,Image,ListItem,Stack} from "@chakra-ui/core";

const ChoiceBox = ({header}) => {
    return <Box padding="10px">
    <label>
  {/* This is the sibling input, it's visually hidden */}
  {// @ts-ignore
    }<VisuallyHidden type="radio" as="input" name="choice"/>
  {/* This is the control box with a circle as children */}
  <ControlBox
    size="24px"
    bg="white"
    border="2px"
    rounded="full"
    type="radio"
    borderColor="inherit"
    _focus={{ boxShadow: "outline" }}
    _hover={{ borderColor: "gray.300" }}
    _disabled={{ opacity: 40 }}
    _checked={{ bg: "green.500", borderColor: "green.500" }}
  >
    <Box size="50%" bg="white" rounded="full" />
  </ControlBox>

  {/* You can pass additional text */}
  <Box as="span" ml={2} verticalAlign="center" userSelect="none">
    {header}
  </Box>
</label>
    </Box>
}

const IndexPage = () => (
    <Layout>
        <SEO title="Learn Thai as Thai style | Listening" />
        <Box padding="10vmin 20%" boxShadow="0 0">
            <Text fontFamily="Mitr, sans-serif" fontSize="md">Question 3/3</Text>
            <Stack isInline border="1px" padding="10px" rounded="lg">
                <Box>
                    <Text fontFamily="Mitr, sans-serif" fontSize="md">Listen to the sentence and answer the question</Text>
                    <Image size="200px" objectFit="cover" src="https://www.silpa-mag.com/wp-content/uploads/2017/06/Sunthorn-Phu.jpg" alt="Sunthorn Phu" rounded="lg"/>
                </Box>
                <Box border="10px" padding="10px" rounded="lg">
                    <ListItem display="inline-block" padding="0 10px">
                        
                        <Box width="100%">
                            <ChoiceBox header="I don't know."/>
                            <ChoiceBox header="I don't do."/>
                            <ChoiceBox header="I don't want."/>
                            <ChoiceBox header="I don't mind."/>
                        </Box>
                    
                        
                    </ListItem>
                    
                </Box>

            </Stack>

            <ButtonGroup spacing={4} height="1vmin" width="100%" textAlign="right">
                <Link to="../question-2">
                    <Button  padding="10px" variantColor="gray" variant="link">  previous question </Button>
                </Link>
                
                
                <Button variantColor="teal" variant="solid"> Submit </Button>
            </ButtonGroup>

        </Box>
        
    </Layout>
);

export default IndexPage;