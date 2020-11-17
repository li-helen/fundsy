import * as React from 'react'
import { Flex, Text } from '@chakra-ui/core'
import styled from 'styled-components'
import { customTheme } from '..'

const LinkText = styled(Text)`
    padding-left: 20px;
    &:hover {
        text-decoration: underline;
        color: ${customTheme.colors.brand[500]};
    }
`

export const SignedOutLinks = () => {
    return (
        <Flex>
            <LinkText>Sign up</LinkText>
            <LinkText>Sign in</LinkText>
        </Flex>
    )
}
