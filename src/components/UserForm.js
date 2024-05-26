import { useEffect, useState } from "react";
import { Stack, TextField, Button, Typography, Box} from "@mui/material";
import React from "react";
import useForm from "./useForm"
import { connect } from "react-redux";
import * as actions from "../actions/user"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../actions/api"

const initialFieldValues = {
    name: "",
    usuario: "",
}

const UserForm = ({ ...props }) => {


    const validate = (fieldValues = values) => {
        let temp = {}
        if ("name" in fieldValues)
            temp.name = fieldValues.name != "" ? "" : "This field is required."
        if ("usuario" in fieldValues)
            temp.usuario = fieldValues.usuario != "" ? "" : "This field is required."
        setErrors({
            ...temp,
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentUserId)



    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                toast("Submitted successfully!", { theme: "light", type: "success" });
            }
            if (props.currentUserId == 0)
                props.createUser(values, onSuccess)
            else
                props.updateUser(props.currentUserId, values, onSuccess)
        }

    }

    useEffect(() => {
        if (props.currentUserId != 0) {
            setValues({
                ...props.userList.find(x => x.id == props.currentUserId)
            })
            setErrors({})

        }

    }, [props.currentUserId])

    return <>

        <Typography variant='h6' align='left' color="secondary" sx={{ paddingLeft: 3, paddingTop: 2 }}>New/Update User</Typography>

        <Box component="form" align="center" gap={4}
            p={2} sx={{ '& .MuiTextField-root': { m: 2, width: '25ch', align: "center" }, }} noValidate autoComplete="off" onSubmit={handleSubmit} onReset={resetForm}>

            <Box width={250} sx={{ border: '2px solid blue' }}  >
                <TextField
                    name="name"
                    variant="outlined"
                    color="secondary"
                    label="Name..."
                    value={values.name}
                    onChange={handleInputChange}
                    error={true}
                    helperText={errors.name}
                    size="small"
                    margin="normal"
                    fullWidth
                    className="textfields"

                />
                <TextField
                    name="usuario"
                    variant="outlined"
                    label="Usuario..."
                    value={values.usuario}
                    onChange={handleInputChange}
                    error={true}
                    helperText={errors.usuario}
                    multiline
                    maxRows={4}
                    size="small"
                    margin="normal"
                    fullWidth
                />
                <Stack p={2} direction="row" spacing={2} align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        align="center"
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="reset"
                        align="center"
                    >
                        Reset
                    </Button>

                </Stack>

            </Box>
            <ToastContainer />
        </Box>
    </>

}

const mapStateToProps = state => ({
    userList: state.user.list
})

const mapActionToProps = {
    createUser: actions.create,
    updateUser: actions.update


}

export default connect(mapStateToProps, mapActionToProps)(UserForm);