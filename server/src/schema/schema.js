const { gql } = require('apollo-server-express')
require('dotenv').config()

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
    }

    type Transaction {
        id: ID!
        date: String!
        amount: String!
        description: String!
        category: Category
    }

    type Category {
        id: ID!
        name: String!
        user: User
    }

    type LinkTokenResponse {
        expiration: String!
        link_token: String!
        request_id: String!
        status_code: Int!
    }

    type AccessToken {
        access_token: String!
        item_id: String!
        request_id: String!
        status_code: Int!
    }

    type UserToken {
        token: String!
    }

    input TransactionFormFields {
        id: String
        date: String
        category: String
        description: String
        amount: String
    }

    type Query {
        categories: [Category]
        transactions: [Transaction]
        user: User
        plaidLinkToken: LinkTokenResponse
    }

    type Mutation {
        getAccessToken(token: String): AccessToken
        syncTransactions(token: String): [Transaction]
        updateTransaction(formFields: TransactionFormFields): Transaction
        addCategory(name: String): Category
    }
`

const resolvers = {
    Query: {
        categories: async (_, __, { dataSources }) => {
            return await dataSources.categoryAPI.getAllCategories()
        },
        transactions: async (_, __, { dataSources }) => {
            return await dataSources.transactionAPI.getAllTransactions()
        },
        user: async (_, __, { dataSources }) => {
            return await dataSources.userAPI.getUser()
        },
        plaidLinkToken: (_, __, { dataSources }) =>
            dataSources.plaidAPI.createLinkToken(),
    },
    Mutation: {
        getAccessToken: async (_, { token }, { dataSources }) => {
            return await dataSources.plaidAPI.getAccessToken(token)
        },
        syncTransactions: async (_, { token }, { dataSources }) => {
            const transactions = await dataSources.plaidAPI.syncTransactions(
                token
            )
            return await dataSources.transactionAPI.createTransactions(
                transactions
            )
        },
        updateTransaction: async (_, { formFields }, { dataSources }) => {
            return await dataSources.transactionAPI.updateTransaction(
                formFields
            )
        },
        addCategory: async (_, { name }, { dataSources }) => {
            return await dataSources.categoryAPI.addCategory(name)
        },
    },
}

module.exports = { typeDefs, resolvers }
