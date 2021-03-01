import { useMemo } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setGroupsScreen } from "../../../../store/actions"
import { User } from "../../../../types/dbTypes"
import useUser from "../../../../utility/hooks/useUser"
import useUsers from "../../../../utility/hooks/useUsers"
import classes from "./NewGroupUsers.module.css";
interface NewGroupUsersProps {
    groupUsers: User[], setGroupUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const NewGroupUsers = ({ groupUsers, setGroupUsers }: NewGroupUsersProps) => {
    const dispatch = useDispatch()
    const user = useUser()!
    const users = useUsers()

    const sortedusers = useMemo(() => {
        console.log('recalc', users, groupUsers);

        return users && users.filter((fUser) => !groupUsers.concat(user).some(test => test.phone === fUser.phone))
            .sort((a, b) => a.name.localeCompare(b.name))
    }, [user, users, groupUsers])
    const userOnClick = (clickedUser: User) => {
        const booll = groupUsers.some(val => val.phone === clickedUser.phone)
        console.log(booll, groupUsers);
        if (!booll) setGroupUsers(groupUsers.concat(clickedUser))
    }

    const selectedUsersPills = groupUsers.map((gUser) =>
        <div className={'p-1 px-2 m-1 rounded-pill d-inline-flex '+classes.selectedUsersPills}>
            <span className="text-truncate">{gUser.name}</span>
            <button type="button" onClick={() => setGroupUsers(groupUsers.filter(v => v !== gUser))} className="close m-1 my-auto" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>)
    const sortedUsersDivs = sortedusers && sortedusers.map((sortUser) =>
        <div key={sortUser.phone} onClick={() => userOnClick(sortUser)} className={classes.userDiv}>
            <div className='text-truncate'><strong>{sortUser.name}</strong></div>
            <div className='text-truncate'>{sortUser.about}</div>
        </div>
    )

    return <div className={'w-100 h-100 d-flex flex-column '+classes.topEl} >
        <div className={'p-3 '+classes.header}>
            <img alt='back' height='24px' width='24px' src='/left-arrow.png' onClick={() => dispatch(setGroupsScreen('none'))} /> יצירת קבוצה
        </div>
        <div className={'d-flex flex-column flex-grow-1 '+classes.body}>
            <div className={'w-100 '+classes.pillsContainer}>
                {selectedUsersPills}
            </div>
            <div className={classes.userDivsContainer}>
                {sortedUsersDivs}
            </div>
            <div className={'w-100 '+classes.footer}>
                {groupUsers.length > 0 &&
                    <Button variant='success' onClick={() => dispatch(setGroupsScreen('new-group-name'))}>
                        {'<'}
                    </Button>
                }
            </div>
        </div>
    </div>
}
export default NewGroupUsers