import React from "react";
import CenterFlex from "./CenterFlex";
import { Box, Image, Heading, Text } from "@chakra-ui/core";
interface CardProps {
    imageSrc: string;
    header: string;
    content: string;
}
const Card = ({ imageSrc, header, content }: CardProps) => {
    return (
        <Box
            width={["80vw", "80vw", "80vw", "25vw"]}
            height={["auto", "auto", "auto", "65vmin"]}
            shadow="md"
            rounded="lg"
        >
            <CenterFlex
                width="100%"
                height={["auto", "auto", "auto", "25vw"]}
                overflow="hidden"
            >
                <Image
                    roundedTop="lg"
                    mb="0"
                    src={imageSrc}
                    width={["100%", "100%", "100%", "auto"]}
                    height={["auto", "auto", "auto", "100%"]}
                    objectFit="cover"
                ></Image>
            </CenterFlex>
            <Box m="15px">
                <Heading fontFamily="Lato, sans-serif" fontSize="20px">
                    {header}
                </Heading>
                <Text
                    padding="5px 0px"
                    fontFamily="Quark, sans-serif"
                    fontSize="16px"
                >
                    {content}
                </Text>
            </Box>
        </Box>
    );
};
export default Card;
