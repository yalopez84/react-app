import api from "./api"

const fetchAllUsers = () => {
    api.user().fetchAll().then(response => {
        result = response.data
    }).catch(err => result = {"message":"error"})
    return result;
}

export default fetchAllUsers;

