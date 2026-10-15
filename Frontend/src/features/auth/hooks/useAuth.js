import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            console.log("tring login")
            const data = await login({ email, password })
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
            console.log("tring login")
              console.log("data is", data)
        } catch (err) {
            console.error("❌ Login Error:", err.message)
            setUser(null)
            localStorage.removeItem("user")
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        console.log("reg1")
        try {
            const data = await register({ username, email, password })
        console.log("reg2")

            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
        console.log("reg3")

        } catch (err) {
        console.error("❌ Register Error:", err.message)
        setUser(null)
        localStorage.removeItem("user")

        } finally {
        console.log("reg5")

            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            localStorage.removeItem("user")
        } catch (err) {
            console.error("❌ Logout Error:", err.message)
            setUser(null)
            localStorage.removeItem("user")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const storedUser = localStorage.getItem("user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }

                const data = await getMe()
                setUser(data.user)
                localStorage.setItem("user", JSON.stringify(data.user))
            } catch (err) {
                localStorage.removeItem("user")
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}