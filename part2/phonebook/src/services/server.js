import axios from "axios";
const baseUrl = "http://localhost:3000/persons";

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

//"delete" is a reserved word in JavaScript, so we use "del" instead
const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`) //` is different from ' and " in that it allows for string interpolation, which means you can embed expressions inside the string using ${expression}. In this case, it allows us to dynamically insert the value of id into the URL.
    return request.then((response) => response.data)
}

export default { getAll, create, update, del };

