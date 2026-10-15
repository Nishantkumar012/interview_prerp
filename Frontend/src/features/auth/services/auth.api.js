import axios from "axios"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ||"http://localhost:3000",
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        console.log(err)

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {
        
        console.log(" aaya 1")
        const response = await api.get("/api/auth/get-me")
         
        console.log(" aaya 2")
        console.log("response is", response);
        console.log("data is", response.data);

        return response.data
        console.log(" aaya 3")


    } catch (err) {
        console.log("error aaya ")

        console.log(err)
    }

}