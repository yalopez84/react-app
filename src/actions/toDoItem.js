import api from "./api"

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}


export const fetchAll = () => dispatch => {
    api.toDoItem().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))

}


const formateData = data => ({
    ...data,
    completed: data.completed
})


export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.toDoItem().create(data)
    .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.toDoItem().update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: {id:id, ...data}
            })
            onSuccess()
        })
        .catch(err => console.log(err))  
}

export const Delete = (id, onSuccess) => dispatch => {
    api.toDoItem().delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))  
}
