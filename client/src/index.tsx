import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    NormalizedCacheObject,
    ApolloProvider,
} from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from './container'
import { SignUpSignIn } from './sign-up-sign-in'
import { AccountSettings } from './account-settings'
import { Header } from './header/header'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'
import { ThemeProvider, theme } from '@chakra-ui/core'
import 'typeface-varela-round'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
    const token = Cookies.get('token')

    return {
        headers: {
            ...headers,
            authorization: token,
        },
    }
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export const customTheme = {
    ...theme,
    fonts: {
        mono: 'varela round, sans serif',
        body: 'varela round, sans serif',
        heading: 'varela round, sans serif',
    },
    colors: {
        ...theme.colors,
        brand: {
            900: '#364958',
            800: '#3B6064',
            700: '#55828B',
            600: '#87BBA2',
            500: '#C9E4CA',
        },
    },
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={customTheme}>
            <Router>
                <Switch>
                    <Route path="/account-settings">
                        <Header />
                        <AccountSettings />
                    </Route>
                    <Route path="/dashboard">
                        <Header />
                        <Container />
                    </Route>
                    <Route path="/">
                        <SignUpSignIn />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
)
