import React from "react";
import { Link } from "gatsby";
import { Box, List, ListItem, Button, Text, Stack, Grid } from "@chakra-ui/core";
const ItemRender = (props: any) => {
    return (
        <Box paddingX="10px" paddingY={["5px", "2px", "2px", "0px"]} marginRight={props.marginRight} width={["100%", "100%", "auto", "auto"]}>
            <Link to={props.to}>{props.children}</Link>
        </Box>
    );
};

const Links = () => {
    return (
        <>
            <Box as="nav" margin="20px">
                <Grid gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr">
                    <Box
                        float="left"
                        padding="0 10px"
                        fontFamily="Lora"
                        fontSize="2em"
                    >
                        <Link to="/">Learn Thai Style</Link>
                    </Box>
                    <Stack textAlign="right" flexDir={["column","column","row","row"]} justifySelf="right" alignItems="center" flexShrink={1}>
                        <ItemRender to="/tests" marginRight={["20px", "20px", "0px", "0px"]}>Test</ItemRender>
                        <ItemRender to="/learn" marginRight={["20px", "20px", "0px", "0px"]}>Learn</ItemRender>
                        <ItemRender to="/about" marginRight={["20px", "20px", "0px", "0px"]}>About Us</ItemRender>
                        <ItemRender to="/login">
                            <Button variantColor="teal" borderRadius="16px">
                                Get Started
                            </Button>
                        </ItemRender>
                    </Stack>
                </Grid>
            </Box>
        </>
    );
};
export default Links;
