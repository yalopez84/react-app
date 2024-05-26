import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import * as actions from "../actions/toDoItem";
import * as actionsUsers from "../actions/user"
import { Grid, Paper, TableCell, TableContainer, Table, TableHead, TableRow, TableBody, ButtonGroup, Button } from '@mui/material';
import ToDoItemForm from './ToDoItemForm';
import UserForm from './UserForm';
import QueryByUserForm from './QueryByUserForm';
import { Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';
import api from '../actions/api';

const ToDoItems = (props) => {

    const [currentId, setCurrentId] = useState(0)
    const [currentUserId, setCurrentUserId] = useState(0)
    const [usersflag, setUsersflag] = useState(false)
    const [queryToDoItems, setQueryToDoItems] = useState(false)
    const [toDoItemListQuery, setToDoItemListQuery] =useState([])

    useEffect(() => {
        if (!usersflag)
            props.fetchAllToDoItems()
        else
            props.fetchAllUsers()

            api.toDoItem().fetchAll().then(response => setToDoItemListQuery(response.data)
        ).catch(err => console.log(err))
    }, [usersflag])

    const onDelete = id => {
        if (window.confirm("Are you sure to delete this record?")) {
            props.deleteToDoItem(id, toast("Deleted successfully!", { theme: "light", type: "info" }))
        }
    }

    const onDeleteUser = id => {
        if (window.confirm("Are you sure to delete this record?")) {
            props.deleteUser(id, toast("Deleted successfully!", { theme: "light", type: "info" }))
        }
    }

    if(queryToDoItems){
        return (<>
            <Typography variant='h4' align='center' color="secondary">Query To-Do Items by User</Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group" className="my-btn-right">
                <Button onClick={() => {setQueryToDoItems(false); setUsersflag(true)}}>Users CRUD</Button>
                <Button onClick={() => {setQueryToDoItems(false); setUsersflag(false)}}>ToDo Items CRUD</Button>
            </ButtonGroup>
            <Paper elevation={3}>
                <Grid container>
                    <Grid item xs={4}>
                        <QueryByUserForm {...({setToDoItemListQuery })} />
                    </Grid>
                    <Grid item xs={8} >
                        <TableContainer>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Id</b></TableCell>
                                        <TableCell><b>Action</b></TableCell>
                                        <TableCell><b>Description</b></TableCell>
                                        <TableCell><b>Usuario</b></TableCell>
                                        <TableCell><b>Completed</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        toDoItemListQuery.map((record, index) => {
                                            return (<TableRow key={index}>
                                                <TableCell>{record.id}</TableCell>
                                                <TableCell>{record.action}</TableCell>
                                                <TableCell>{record.description}</TableCell>
                                                <TableCell>{record.usuario}</TableCell>
                                                {record.completed && <TableCell>True</TableCell>}
                                                {!record.completed && <TableCell>False</TableCell>}
                                            </TableRow>)
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                </Grid>
            </Paper>

        </>);
    }

    if (!usersflag) {
        return (<>
            <Typography variant='h4' align='center' color="secondary">To-Do Items CRUD</Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group" className="my-btn-right">
                <Button onClick={() => setUsersflag(true)}>Users CRUD</Button>
                <Button onClick={() => setQueryToDoItems(true)}>Query to do items</Button>
            </ButtonGroup>
            <Paper elevation={3}>
                <Grid container>
                    <Grid item xs={4}>
                        <ToDoItemForm {...({ currentId, setCurrentId })} />
                    </Grid>
                    <Grid item xs={8} >
                        <TableContainer>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Id</b></TableCell>
                                        <TableCell><b>Action</b></TableCell>
                                        <TableCell><b>Description</b></TableCell>
                                        <TableCell><b>Usuario</b></TableCell>
                                        <TableCell><b>Completed</b></TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button><Edit color="primary" /></Button>
                                                <Button><Delete color="action" /></Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.toDoItemList.map((record, index) => {
                                            return (<TableRow key={index}>
                                                <TableCell>{record.id}</TableCell>
                                                <TableCell>{record.action}</TableCell>
                                                <TableCell>{record.description}</TableCell>
                                                <TableCell>{record.usuario}</TableCell>
                                                {record.completed && <TableCell>True</TableCell>}
                                                {!record.completed && <TableCell>False</TableCell>}
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button onClick={() => { setCurrentId(record.id) }}><Edit color="primary" /></Button>
                                                        <Button onClick={() => { onDelete(record.id) }}><Delete color="action" /></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>)
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                </Grid>
            </Paper>

        </>);
    }
    return (<>
        <Typography variant='h4' align='center' color="secondary">Users CRUD</Typography>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => setUsersflag(false)}>ToDo Items CRUD</Button>
            <Button onClick={() => setQueryToDoItems(true)}>Query to do items</Button>
        </ButtonGroup>
        <Paper elevation={3}>
            <Grid container>
                <Grid item xs={4}>
                    <UserForm {...({ currentUserId, setCurrentUserId })} />
                </Grid>
                <Grid item xs={8} >
                    <TableContainer>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Id</b></TableCell>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Usuario</b></TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="text">
                                            <Button><Edit color="primary" /></Button>
                                            <Button><Delete color="action" /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.userList.map((record, index) => {
                                        return (<TableRow key={index}>
                                            <TableCell>{record.id}</TableCell>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.usuario}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button onClick={() => { setCurrentUserId(record.id) }}><Edit color="primary" /></Button>
                                                    <Button onClick={() => { onDeleteUser(record.id) }}><Delete color="action" /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>
        </Paper>

    </>);

}

const mapStateToProps = state => ({
    toDoItemList: state.toDoItem.list,
    userList: state.user.list
})

const mapActionToProps = {
    fetchAllToDoItems: actions.fetchAll,
    deleteToDoItem: actions.Delete,
    fetchAllUsers: actionsUsers.fetchAll,
    deleteUser: actionsUsers.Delete
}


export default connect(mapStateToProps, mapActionToProps)(ToDoItems);