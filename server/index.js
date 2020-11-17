const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const {ApolloServer, AuthenticationError,} = require('apollo-server-express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { CategoryAPI, PlaidAPI, TransactionAPI, UserAPI } = require('./src/datasources')
const { typeDefs, resolvers} = require('./src/schema/schema') 
const { db } = require('./src/schema/db')
const { User } = require('./src/schema/db')

const port = 4000;

const getUser = async req => {
    const token = req.headers.authorization || ''
        try {
            return await jwt.verify(token, process.env.SECRET)
        } catch (error) {
            throw new AuthenticationError('Unfortunately, your session has expired. Please log in to try again.')
        }
}

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources: () => ({
        categoryAPI: new CategoryAPI(),
        plaidAPI: new PlaidAPI(),
        transactionAPI: new TransactionAPI(),
        userAPI: new UserAPI()
    }),
    context: async ({req}) => {
        const user = await getUser(req)
        return{
            secret: process.env.SECRET,
            user
        }
    }
    
})

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.post('/signup', async (req, res) => {
    try {
        const user = await User.create(req.body.values)
        res.send({token: jwt.sign({id: user.id, email: user.email}, process.env.SECRET, {expiresIn: '30m'})}) 
    } catch (err) {
        console.log(err)
        console.log('could not create new user')
    }
})

app.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.values.email
            }
        })

        if (bcrypt.compare(req.body.values.password, user.password)) {
            res.send({token: jwt.sign({id: user.id, email: user.email}, process.env.SECRET, {expiresIn: '30m'})})
        } else {
            throw new Error('incorrect email/password combo')
        }
    } catch(err) {
        console.log(err)
        console.log('error logging in')
    }
})
server.applyMiddleware({app})

db.sync().then(() => {
    console.log(`listening at ${port}`)
    app.listen({port});
})