import { useEffect, useState } from "react"
import { User } from "../../types/dbTypes"
import { getFromApi } from "../requestService"

const useUsers = () => {
    const [users, setUsers] = useState<User[]>()
    useEffect(() => {
        getFromApi('/user').then((data) => setUsers(data.users))
    }, [])
    return users
}
export default useUsers