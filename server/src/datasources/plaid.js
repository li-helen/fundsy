const { RESTDataSource } = require('apollo-datasource-rest')
const plaid = require('plaid')

class PlaidAPI extends RESTDataSource {
    constructor() {
        super()
        this.client = new plaid.Client({
            clientID: process.env.PLAID_CLIENT_ID || '',
            secret: process.env.PLAID_SECRET || '',
            env: plaid.environments.sandbox,
            options: {},
        })
    }

    initialize(config) {
        this.context = config.context
    }

    async createLinkToken() {
        const response = await this.client.createLinkToken({
            user: {
                client_user_id: '2',
            },
            client_name: 'fundsy',
            products: ['auth', 'transactions'],
            country_codes: ['US'],
            language: 'en',
        })
        return response
    }

    async getAccessToken(token) {
        const response = await this.client.exchangePublicToken(token)
        return response
    }

    async syncTransactions(token) {
        const response = await this.client.getTransactions(
            token,
            '2019-01-01',
            '2020-01-01',
            {
                count: 20,
                offset: 0,
            }
        )
        return response.transactions.map((transaction) => ({
            date: transaction.date,
            description: transaction.name,
            amount: transaction.amount,
        }))
    }
}

module.exports = PlaidAPI
