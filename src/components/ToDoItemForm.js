import { useEffect, useState } from "react";
import { Checkbox, Stack, MenuItem, TextField, Button, Typography, Box, FormControlLabel } from "@mui/material";
import React from "react";
import useForm from "./useForm"
import { connect } from "react-redux";
import * as actions from "../actions/toDoItem"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../actions/api";
import "../App.css";

const initialFieldValues = {
    action: "",
    description: "",
    completed: false,
    usuario: ""
}

const ToDoItemForm = ({ ...props }) => {


    const [userList, setUserList] = useState([])

    const validate = (fieldValues = values) => {
        let temp = {}
        if ("action" in fieldValues)
            temp.action = fieldValues.action != "" ? "" : "This field is required."
        if ("description" in fieldValues)
            temp.description = fieldValues.description != "" ? "" : "This field is required."
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
    } = useForm(initialFieldValues, validate, props.setCurrentId)



    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                toast("Submitted successfully!", { theme: "light", type: "success" });
            }
            if (props.currentId == 0)
                props.createToDoItem(values, onSuccess)
            else
                props.updateToDoItem(props.currentId, values, onSuccess)
        }

    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.toDoItemList.find(x => x.id == props.currentId)
            })
            setErrors({})

        }
        api.user().fetchAll().then(response => setUserList(response.data)
        ).catch(err => console.log(err))


    }, [props.currentId])

    return <>

        <Typography variant='h6' align='left' color="secondary" sx={{ paddingLeft: 3, paddingTop: 2 }}>New/Update To-Do Item</Typography>

        <Box component="form" align="center" gap={4}
            p={2} sx={{ '& .MuiTextField-root': { m: 2, width: '25ch', align: "center" }, }} noValidate autoComplete="off" onSubmit={handleSubmit} onReset={resetForm}>

            <Box width={250} sx={{ border: '2px solid blue' }} >
                <TextField className="customTextField"
                    name="action"
                    variant="outlined"
                    label="Action..."
                    value={values.action}
                    onChange={handleInputChange}
                    error={true}
                    helperText={errors.action}
                    size="small"
                    margin="normal"
                    fullWidth                   

                />               

               <TextField className="customTextField" 
                    name="description"
                    variant="outlined"
                    label="Description..."
                    value={values.description}
                    onChange={handleInputChange}
                    error={true}
                    helperText={errors.description}
                    multiline
                    maxRows={4}
                    size="small"
                    margin="normal"
                    fullWidth
                />  
                <TextField className="customTextField"
                    name="usuario"
                    select
                    variant="outlined"                                        
                    label="Select user..."                    
                    value={values.usuario}
                    onChange={handleInputChange}
                    size="small"
                    margin="normal"
                    fullWidth
                >
                    {
                        userList.map((record, index) => {
                            return (<MenuItem key={index} value={record.usuario}>{record.usuario}</MenuItem>)
                        })
                    }
                </TextField>
                <br />
                <FormControlLabel control={<Checkbox
                    name="completed"
                    variant="outlined"
                    checked={values.completed}
                    onChange={handleInputChange} size="small" style={{ paddingLeft: '40px' }} />} label="Completed" />

                <Stack p={2} direction="row" spacing={2} align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="reset"
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
    toDoItemList: state.toDoItem.list
})

const mapActionToProps = {
    createToDoItem: actions.create,
    updateToDoItem: actions.update,


}

export default connect(mapStateToProps, mapActionToProps)(ToDoItemForm);