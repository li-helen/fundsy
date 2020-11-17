import * as React from 'react'
import { Formik } from 'formik'
import { Box, Flex, Icon, Input, Text } from '@chakra-ui/core'
import { gql, useQuery } from '@apollo/client'

export const EmailForm: React.FC = () => {
    const [editing, setEditing] = React.useState(false)
    const user = gql`
        query getUser {
            user {
                email
            }
        }
    `
    const { loading, data } = useQuery(user)
    return (
        <>
            {!loading &&
                (editing ? (
                    <Box width="30%">
                        <Formik
                            initialValues={{ email: data.user.email }}
                            onSubmit={() => {}}
                        >
                            {({ handleChange, handleSubmit, values }) => (
                                <form onSubmit={handleSubmit}>
                                    <Flex justifyContent="space-between">
                                        <Input
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        ></Input>
                                        <Box pt={4} pl={3}>
                                            <Icon
                                                name="check"
                                                onClick={() =>
                                                    setEditing(false)
                                                }
                                            />
                                        </Box>
                                    </Flex>
                                </form>
                            )}
                        </Formik>
                    </Box>
                ) : (
                    <Flex justifyContent="space-between">
                        <Text>{data.user.email}</Text>
                        <Box pt={4} pl={3} onClick={() => setEditing(true)}>
                            <Icon name="edit" />
                        </Box>
                    </Flex>
                ))}
        </>
    )
}
