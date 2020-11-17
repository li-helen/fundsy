import * as React from 'react'
import { Formik } from 'formik'
import {
    Box,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Grid,
    Icon,
    Input,
    Text,
} from '@chakra-ui/core'
import { gql, useQuery } from '@apollo/client'

export const CategoriesForm: React.FC = () => {
    const EditableControls = ({
        isEditing,
        onSubmit,
        onCancel,
    }: {
        isEditing: boolean
        onSubmit: () => {}
        onCancel: () => {}
        onRequestEdit: () => {}
    }) => {
        return isEditing ? (
            <Flex>
                <Box mx={2}>
                    <Icon name="close" onClick={onCancel} />
                </Box>
                <Icon name="check" onClick={onSubmit} />
            </Flex>
        ) : null
    }
    const [editing, setEditing] = React.useState(false)
    const GET_USER_CATEGORIES = gql`
        query getUserCategories {
            categories {
                name
            }
        }
    `
    const { loading, data } = useQuery(GET_USER_CATEGORIES)
    return (
        <>
            {!loading && (
                <Formik
                    initialValues={data?.categories.reduce(
                        (accum: any, category: any) => {
                            accum[category.name] = category.name
                            return accum
                        },
                        {}
                    )}
                    onSubmit={() => {}}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid
                                templateColumns="repeat(2, 1fr)"
                                alignItems="center"
                            >
                                <Text fontSize="xl">Budget Categories</Text>
                                {/* <Icon name="edit" justifySelf="end" onClick={() => setEditing(true)}/> */}
                                <Text justifySelf="end" fontSize="xs">
                                    Click on fields to edit
                                </Text>
                                <Box gridColumn="2">
                                    {/* {data.categories.map((category: any) => 
                            editing ? 
                                    <Input mb={2} width="fit-content" maxWidth="80%" gridColumn="2" key={category.name} name={category.name} value={values[category.name]} onChange={handleChange}/> : 
                                    <Text mb={2} gridColumn="2">{values[category.name]}</Text>
                            )} */}
                                    {data.categories.map((category: any) => (
                                        <Editable
                                            style={{
                                                fontFamily: 'varela round',
                                            }}
                                            defaultValue={values[category.name]}
                                        >
                                            {(props: any) => (
                                                <>
                                                    <EditablePreview mb={2} />
                                                    <Flex>
                                                        <EditableInput mb={2} />
                                                        <EditableControls
                                                            {...props}
                                                        />
                                                    </Flex>
                                                </>
                                            )}
                                        </Editable>
                                    ))}
                                    <Grid
                                        templateColumns="repeat(2, 1fr)"
                                        alignItems="center"
                                    >
                                        <Input
                                            width="fit-content"
                                            placeholder="Add new category..."
                                            value=""
                                            onChange={handleChange}
                                        ></Input>
                                        <Icon
                                            name="add"
                                            justifySelf="end"
                                            onClick={() => setEditing(false)}
                                        />
                                    </Grid>
                                </Box>
                            </Grid>
                        </form>
                    )}
                </Formik>
            )}
        </>
    )
}
