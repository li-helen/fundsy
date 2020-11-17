import * as React from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import {
    Box,
    Button,
    Input,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Text,
} from '@chakra-ui/core'
import { Header } from './header/header'
import styled from 'styled-components'

const FormField = styled(Input)`
    padding-right: 0px;
    padding-left: 10px;
    margin-top: 10px;
    box-sizing: border-box;
`

const FormFieldLabel = styled(Text)`
    margin-top: 10px;
    margin-bottom: 0px;
`
export const SignUpSignIn: React.FC = () => {
    return (
        <Box>
            <Header />
            <Box
                width="30%"
                margin="50px auto"
                border="1px solid black"
                p="20px"
                borderRadius="10px"
            >
                <Tabs isFitted variant="enclosed">
                    <TabList>
                        <Tab
                            _selected={{ backgroundColor: 'brand.600' }}
                            bg="brand.500"
                            width="100%"
                        >
                            <Text color="brand.800">Sign up</Text>
                        </Tab>
                        <Tab
                            _selected={{ backgroundColor: 'brand.600' }}
                            bg="brand.500"
                            width="100%"
                        >
                            <Text color="brand.800">Sign in</Text>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                }}
                                onSubmit={(values) => {
                                    axios
                                        .post('http://localhost:4000/signup', {
                                            values,
                                        })
                                        .then(
                                            ({ data }) =>
                                                (document.cookie =
                                                    'token=' +
                                                    data.token +
                                                    '; Path=/;')
                                        )
                                }}
                            >
                                {({ handleChange, handleSubmit, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <FormFieldLabel>
                                            First name
                                        </FormFieldLabel>
                                        <FormField
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                        />

                                        <FormFieldLabel>
                                            Last name
                                        </FormFieldLabel>
                                        <FormField
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                        />

                                        <FormFieldLabel>Email</FormFieldLabel>
                                        <FormField
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />

                                        <FormFieldLabel>
                                            Password
                                        </FormFieldLabel>
                                        <FormField
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <Button
                                            color="brand.600"
                                            mt={10}
                                            type="submit"
                                        >
                                            <Text color="brand.900">
                                                Sign up
                                            </Text>
                                        </Button>
                                    </form>
                                )}
                            </Formik>
                        </TabPanel>
                        <TabPanel>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                onSubmit={(values) => {
                                    axios
                                        .post('http://localhost:4000/signin', {
                                            values,
                                        })
                                        .then(
                                            ({ data }) =>
                                                (document.cookie =
                                                    'token=' +
                                                    data.token +
                                                    '; Path=/;')
                                        )
                                        .then(
                                            () =>
                                                (window.location.href =
                                                    '/dashboard')
                                        )
                                }}
                            >
                                {({ handleChange, handleSubmit, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <FormFieldLabel>Email</FormFieldLabel>
                                        <FormField
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        <FormFieldLabel>
                                            Password
                                        </FormFieldLabel>
                                        <FormField
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <Button mt={10} type="submit">
                                            <Text>Sign in</Text>
                                        </Button>
                                    </form>
                                )}
                            </Formik>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}
