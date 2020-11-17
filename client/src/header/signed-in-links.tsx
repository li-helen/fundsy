import * as React from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
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
type SignedInLinksProps = {
    client: ApolloClient<NormalizedCacheObject>
}

export const SignedInLinks: React.FC<SignedInLinksProps> = ({ client }) => {
    return (
        <Flex justifyContent="space-between">
            <LinkText onClick={() => (window.location.href = '/dashboard')}>
                Dashboard
            </LinkText>
            <LinkText
                onClick={() => (window.location.href = '/account-settings')}
            >
                Account Settings
            </LinkText>
            <LinkText
                onClick={() => {
                    client.clearStore()
                    document.cookie =
                        'token' +
                        '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                    window.location.href = '/'
                }}
            >
                Sign out
            </LinkText>
        </Flex>
    )
}
