import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeCurrChat, setGroupsScreen } from "../../../store/actions"
import { IState } from "../../../store/reducer"
import { Group, User } from "../../../types/dbTypes"
import { getFromApi, postAndGetToApi } from "../../../utility/requestService"
import classes from "./NewChat.module.css";

const NewChat = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: IState) => state.user)!
    const groups = useSelector((state: IState) => state.groups)!
    const [users, setUsers] = useState<User[]>()

    useEffect(() => {
        getFromApi('/user').then((data) => setUsers(data.users))
    }, [])
    const sortedusers = useMemo(() => {
        return users && users.filter((fUser) => user.phone !== fUser.phone)
            .sort((a, b) => a.name.localeCompare(b.name))
    }, [users, user.phone])
    const chats = groups.filter(gr => gr.isChat)

    const userOnClick = async (clickedUser: User) => {
        const chatWithUser = chats.find(ch => ch.users.some(usr => clickedUser.phone === usr.phone))
        if (chatWithUser) {
            dispatch(setGroupsScreen('none'))
            dispatch(changeCurrChat(chatWithUser.id))
        } else {
            const g: Group = (await postAndGetToApi('/group/new', {
                name: '', users: [user.phone, clickedUser.phone], isChat: true
            })).group
            console.log('gfgfd GreT', g);

            dispatch(changeCurrChat(g.id))
            dispatch(setGroupsScreen('none'))
        }
    }
    const userDivs = sortedusers && sortedusers.map((sUser) =>
        <div key={sUser.phone} onClick={() => userOnClick(sUser)} className={classes.userDiv}>
            <div className='text-truncate'><strong>{sUser.name}</strong></div>
            <div className='text-truncate'>{sUser.about}</div>
        </div>
    )
    return <div className={'w-100 h-100 d-flex flex-column ' + classes.topEl}>
        <div className={'p-3 ' + classes.header}>
            <img alt='back' height='24px' width='24px' src='/left-arrow.png'
                onClick={() => dispatch(setGroupsScreen('none'))} />
            {" יצירת צ'אט"}
        </div>
        <div className={classes.body}>
            {userDivs}
        </div>
    </div>
}
export default NewChat