import React from 'react';
import { Flex } from "@chakra-ui/core";

const CenterFlex = (props: any) => {
    return <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        {...props}
    >
        {props.children}
    </Flex>
}

export default CenterFlex;