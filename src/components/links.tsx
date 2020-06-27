import React from "react";
import { Link } from "gatsby";
import {Box, List,ListItem,Button,Text} from "@chakra-ui/core";
const ItemRender = (props:any) => {
    return <ListItem display="inline-block" padding="0 10px">
        <Link to={props.to}>{props.children}</Link>
        </ListItem>
}

const Links = () => {
    return (
        <>
            <Box as="nav" margin="20px">
                <List textAlign="end">
                    <ListItem float="left" padding="0 10px" fontSize="2em">Learn Thai Style</ListItem>
                    <ItemRender to="/tests">Test</ItemRender>
                    <ItemRender to="/learn">Learn</ItemRender>
                    <ItemRender to="/login">Login</ItemRender>
                    <ItemRender to="/about">
                        <Button variantColor="teal" >About</Button>
                    </ItemRender>
                </List>
            </Box>
        </>
    );
};
export default Links;
