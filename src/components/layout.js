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
                <div
                    style={{
                        margin: `0 auto`,
                        padding: `0 1.0875rem 1.45rem`,
                        flex: 1,
                        width: "100%"
                    }}
                >
                    <main>{children}</main>
                </div>
                <footer style={{bottom: 0}}>
                    <Box
                        bg="#DCDCDC"
                        paddingTop="10px"
                        overflow="auto"
                        marginBottom="0"
                    >
                        <Text padding="10px">Learn Thai Style</Text>
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
                                <Icon name="edit" size="32px"></Icon>Language
                            </ListItem>
                            <ListItem
                                display="inline-block"
                                float="right"
                                margin="10px"
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
                           