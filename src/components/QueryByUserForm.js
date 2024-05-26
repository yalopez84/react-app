import { useEffect, useState } from "react";
import { Checkbox, MenuItem, TextField, Typography, Box, FormControlLabel } from "@mui/material";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../actions/api"
import "../App.css";

const initialFieldValues = {
    usuario: "",
    completed: false,
}

const QueryByUserForm = (props) => {

    const [values, setValues] = useState(initialFieldValues);
    const [userList, setUserList] = useState([]);


    useEffect(() => {

        api.user().fetchAll().then(response => setUserList(response.data))
        .catch(err => console.log(err))

    }, [])

    const handleInputChange = e => {
        //Actualizar listado de todoitems de acuerdo al usuario seleccionado y al campo completado
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        if (name === "completed")
            fieldValue.completed = !values.completed
        const temp ={ ...values, ...fieldValue }

        api.toDoItem().fetchAll()
        .then(response => response.data)
        .then(lista => {
           temp.usuario ? props.setToDoItemListQuery(lista.filter(x => x.usuario === temp.usuario && x.completed===temp.completed)) : props.setToDoItemListQuery(lista.filter(x => x.completed===temp.completed))
        })
        .catch(err => console.log(err))

         setValues({
             ...values,
             ...fieldValue
         })

    }

    return <>

        <Typography variant='h6' align='left' color="secondary" sx={{ paddingLeft: 11, paddingTop: 2 }}>Select fields</Typography>

        <Box align="center" gap={4}
            p={2} sx={{ '& .MuiTextField-root': { m: 2, width: '25ch', align: "center" }, }} noValidate autoComplete="off">

            <Box width={250} sx={{ border: '2px solid blue' }}>
                <TextField className="customTextField"
                    select
                    variant="outlined"
                    label="Select user..."
                    name="usuario"
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
                <FormControlLabel control={<Checkbox
                    name="completed"
                    variant="outlined"
                    checked={values.completed}
                    onChange={handleInputChange} size="small" style={{ paddingLeft: '40px' }} />} label="Completed" />

            </Box>
            <ToastContainer />
        </Box>
    </>
}

export default QueryByUserForm;