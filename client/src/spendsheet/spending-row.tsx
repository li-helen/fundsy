import * as React from 'react'
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Input,
    Select,
    Text,
} from '@chakra-ui/core'
import { Formik } from 'formik'
import { gql, useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'

export const SpendingRow = ({ transaction }: { transaction: any }) => {
    interface FormFields {
        id: string
        date: string
        category: string
        description: string
        amount: string
    }
    const initialState: FormFields = {
        id: transaction.id,
        date: transaction.date,
        category: transaction.category.name,
        amount: transaction.amount,
        description: transaction.description,
    }

    const reducer = (state: FormFields, action: any) => {
        switch (action.type) {
            case 'change-date':
                return { ...state, date: action.payload }
            case 'change-category':
                return { ...state, category: action.payload }
            case 'change-amount':
                return { ...state, amount: action.payload }
            case 'change-description':
                return { ...state, description: action.payload }
            default:
                return state
        }
    }

    const GET_USER_CATEGORIES = gql`
        query getUserCategories {
            categories {
                name
            }
        }
    `

    const { data } = useQuery(GET_USER_CATEGORIES)

    const [state, dispatch] = React.useReducer(reducer, initialState)
    const [isEditing, setIsEditing] = React.useState(false)

    const UPDATE_TRANSACTION = gql`
        mutation updateTransaction($formFields: TransactionFormFields) {
            updateTransaction(formFields: $formFields) {
                date
                category {
                    name
                }
                description
                amount
            }
        }
    `

    const [updateTransaction] = useMutation<{ formFields: FormFields }>(
        UPDATE_TRANSACTION,
        {
            variables: {
                formFields: {
                    id: state.id,
                    date: state.date,
                    category: state.category,
                    amount: state.amount,
                    description: state.description,
                },
            },
        }
    )

    const CellWrapper = styled(Box)`
        padding-left: 20px;
    `

    return !isEditing ? (
        <>
            <CellWrapper>
                <Text onClick={() => setIsEditing(true)}>{state.date}</Text>
            </CellWrapper>
            <CellWrapper>
                <Text onClick={() => setIsEditing(true)}>{state.category}</Text>
            </CellWrapper>
            <CellWrapper>
                <Text onClick={() => setIsEditing(true)}>{state.amount}</Text>
            </CellWrapper>
            <CellWrapper>
                <Text onClick={() => setIsEditing(true)}>
                    {state.description}
                </Text>
            </CellWrapper>
        </>
    ) : (
        <Formik
            initialValues={state}
            onSubmit={() => {
                updateTransaction()
                setIsEditing(false)
            }}
        >
            {({ handleChange, handleSubmit, values }) => (
                <>
                    <Input
                        mb={2}
                        name="date"
                        value={state.date}
                        width="50%"
                        onChange={(e: any) => {
                            handleChange(e)
                            dispatch({
                                type: 'change-date',
                                payload: e.target.value,
                            })
                        }}
                    />
                    <Box mb={2} width="50%" alignItems="center">
                        <Select
                            name="category"
                            value={values.category}
                            onChange={(e: any) => {
                                console.log(e.target.value)
                                handleChange(e)
                                dispatch({
                                    type: 'change-category',
                                    payload: e.target.value,
                                })
                            }}
                        >
                            {data?.categories.map((category: any) => (
                                <option style={{ fontFamily: 'varela round' }}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Input
                        mb={2}
                        name="amount"
                        value={values.amount}
                        width="50%"
                        onChange={(e: any) => {
                            handleChange(e)
                            dispatch({
                                type: 'change-amount',
                                payload: new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2,
                                }).format(values.amount),
                            })
                        }}
                    />
                    <Flex>
                        <Input
                            mb={2}
                            name="description"
                            value={values.description}
                            width="50%"
                            onChange={(e: any) => {
                                handleChange(e)
                                dispatch({
                                    type: 'change-description',
                                    payload: e.target.value,
                                })
                            }}
                        />
                        <Flex alignItems="center" pb={1}>
                            <Icon
                                mx={4}
                                name="close"
                                onClick={() => setIsEditing(false)}
                            />
                            <IconButton
                                icon="check"
                                aria-label="submit"
                                onClick={handleSubmit}
                            />
                        </Flex>
                    </Flex>
                </>
            )}
        </Formik>
    )
}
