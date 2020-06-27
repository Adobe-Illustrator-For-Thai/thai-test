/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Links from "./links";
import "./fonts.css"

import {
    ThemeProvider,
    CSSReset,
    theme,
    Box,
    Text,
    Icon,
    List,
    ListItem,
    Flex
} from "@chakra-ui/core";

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <Flex minHeight="100vh" flexDirection="column">
            <ThemeProvider theme={theme}>
                <CSSReset />
                <Links />
                <main
                    style={{
                        margin: `0 auto`,
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        display: "flex"
                    }}
                >
                    {children}
                </main>
                <footer style={{bottom: 0}}>
                    <Box
                        bg="#DCDCDC"
                        paddingTop="5px"
                        overflow="auto"
                        marginBottom="0"
                    >
                        <Text padding="10px" fontWeight="600" marginLeft="5px">Learn Thai Style</Text>
                        <hr
                            style={{
                                margin: `0 10px`,
                                backgroundColor: "#000",
                                height: "1px",
                            }}
                        />
                        <List>
                            <ListItem
                                display="inline-block"
                                float="left"
                                margin="10px"
                            >
                                <Icon name="edit" size="28px" marginRight="10px" marginLeft="5px"/>Language
                            </ListItem>
                            <ListItem
                                display="inline-block"
                                float="right"
                                marginX="15px"
                                marginY="10px"
                            >
                                Contact Us
                            </ListItem>
                        </List>
                    </Box>
                </footer>
            </ThemeProvider>
        </Flex>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
                           