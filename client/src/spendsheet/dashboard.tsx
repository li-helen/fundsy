import * as React from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/core'
import { SpendingRow } from './spending-row'
import styled from 'styled-components'

type DashboardProps = {
    linkToken: string
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
    const GET_ACCESS_TOKEN = gql`
        mutation getAccessToken($token: String) {
            getAccessToken(token: $token) {
                access_token
            }
        }
    `

    const GET_TRANSACTIONS = gql`
        mutation syncTransactions($token: String) {
            syncTransactions(token: $token) {
                amount
                date
                description
            }
        }
    `

    const [getAccessToken] = useMutation(GET_ACCESS_TOKEN)
    const [getTransactions] = useMutation(GET_TRANSACTIONS)

    const onSuccess = React.useCallback(async (token) => {
        const accessToken = await getAccessToken({
            variables: { token: token },
        })
        await getTransactions({
            variables: { token: accessToken.data.getAccessToken.access_token },
        })
    }, [])

    const onEvent = React.useCallback(
        (eventName, metadata) => console.log('onEvent', eventName, metadata),
        []
    )

    const onExit = React.useCallback(
        (err, metadata) => console.log('onExit', err, metadata),
        []
    )
    const config = {
        token: props.linkToken,
        onSuccess,
        onEvent,
        onExit,
    }
    const { open } = usePlaidLink(config)

    const FETCH_TRANSACTIONS = gql`
        query fetchTransctions {
            transactions {
                id
                date
                amount
                description
                category {
                    name
                }
            }
        }
    `

    const { loading, data } = useQuery(FETCH_TRANSACTIONS)

    const ColumnHeader = styled(Text)`
        font-size: 16px;
        font-weight: 700;
        color: white;
    `

    const ColumnWrapper = styled(Box)`
        padding-left: 20px;
        background-color: #4ecdc4;
    `

    return (
        <Box width="66%" margin="auto">
            <Grid
                justifyContent="center"
                templateColumns="repeat(3, 1fr)"
                alignItems="center"
            >
                <Text mb={1} fontSize="3xl">
                    My spending
                </Text>
                <Flex mb={1} justifySelf="end" gridColumn="3">
                    <Box
                        as={Button}
                        mt={8}
                        mr={2}
                        borderColor="white"
                        bg="#4ECDC4"
                        onClick={() => open()}
                    >
                        <Text color="white" fontWeight="bold">
                            Sync account
                        </Text>
                    </Box>
                </Flex>
                <Text mt={1} fontSize="md" gridColumn="1">
                    Click on the fields to edit
                </Text>
            </Grid>
            <Grid templateColumns="repeat(4, 1fr)">
                <ColumnWrapper>
                    <ColumnHeader>Date</ColumnHeader>
                </ColumnWrapper>
                <ColumnWrapper>
                    <ColumnHeader>Category</ColumnHeader>
                </ColumnWrapper>
                <ColumnWrapper>
                    <ColumnHeader>Amount</ColumnHeader>
                </ColumnWrapper>
                <ColumnWrapper>
                    <ColumnHeader>Description</ColumnHeader>
                </ColumnWrapper>
                {!loading &&
                    data?.transactions?.map((transaction: any) => {
                        return <SpendingRow transaction={transaction} />
                    })}
            </Grid>
        </Box>
    )
}
