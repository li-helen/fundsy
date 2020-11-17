import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { Dashboard } from './spendsheet/dashboard'

export const Container = () => {
    const GET_LINK_TOKEN = gql`
        query getLinkToken {
            plaidLinkToken {
                link_token
            }
        }
    `

    const { loading, error, data } = useQuery(GET_LINK_TOKEN)
    if (loading) return <div>loading...</div>
    if (error) return <div>error!</div>
    return <Dashboard linkToken={data.plaidLinkToken.link_token} />
}
