import * as React from 'react'
import {
    Box,
    Icon,
    Flex,
    Editable,
    EditablePreview,
    EditableInput,
    Grid,
    Text,
} from '@chakra-ui/core'
import { EmailForm } from './email-form'
import { CategoriesForm } from './categories-form'

export const AccountSettings: React.FC = () => {
    const EditableControls = ({
        isEditing,
        onSubmit,
        onCancel,
        onRequestEdit,
    }: {
        isEditing: boolean
        onSubmit: () => {}
        onCancel: () => {}
        onRequestEdit: () => {}
    }) => {
        return isEditing ? (
            //   <ButtonGroup justifyContent="center" size="sm">
            //     <IconButton aria-label="" icon="check" onClick={onSubmit} />
            //     <IconButton aria-label="" icon="close" onClick={onCancel} />
            //   </ButtonGroup>
            <Flex>
                <Box mx={2}>
                    <Icon name="close" onClick={onCancel} />
                </Box>
                <Icon name="check" onClick={onSubmit} />
            </Flex>
        ) : (
            <Flex justifyContent="center">
                {/* <IconButton aria-label="" size="sm" icon="edit" onClick={onRequestEdit} /> */}
            </Flex>
        )
    }

    return (
        <Box width="50%">
            <Grid templateColumns="repeat(2, 1fr)">
                <Text fontSize="xl">Email</Text>
                <EmailForm />
            </Grid>
            <CategoriesForm />

            <Box>
                <Text mb={1} fontSize="xl">
                    Budget Categories
                </Text>
                <Text fontSize="xs">Click on fields to edit</Text>
                <Editable
                    style={{ fontFamily: 'varela round' }}
                    defaultValue="Rent"
                >
                    {(props: any) => (
                        <>
                            <Flex>
                                <EditableInput />

                                <EditableControls {...props} />
                            </Flex>
                            <EditablePreview />
                        </>
                    )}
                </Editable>
            </Box>
        </Box>
    )
}
