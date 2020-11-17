import * as React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Flex, Text } from '@chakra-ui/core'
import styled from 'styled-components'
import { customTheme } from '../index'

export const Header: React.FC = () => {
    const LinkText = styled(Text)`
        padding-left: 20px;
        &:hover {
            text-decoration: underline;
            color: ${customTheme.colors.brand[500]};
        }
    `

    const GET_USER = gql`
        query getUser {
            user {
                id
            }
        }
    `
    const { client, loading, data } = useQuery(GET_USER)
    return (
        <Flex
            bg="#4ECDC4"
            width="100%"
            py={1}
            justifyContent="space-between"
            alignItems="center"
        >
            <Text color="brand.500" fontSize="4xl">
                Fundsy
            </Text>
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
        </Flex>
    )
}
