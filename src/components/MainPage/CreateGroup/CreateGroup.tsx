import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroupsScreen } from "../../../store/actions";
import { IState } from "../../../store/reducer";
import { User } from "../../../types/dbTypes";
import useUser from "../../../utility/hooks/useUser";
import { postToApi } from "../../../utility/requestService";
import NewGroupName from "./NewGroupName/NewGroupName";
import NewGroupUsers from "./NewGroupUsers/NewGroupUsers";

const CreateGroup = () => {
    const [groupUsers, setGroupUsers] = useState<User[]>([])
    const [groupName, setGroupName] = useState<string>('')
    const user = useUser()!
    const currScreen = useSelector((state: IState) => state.groupSectionScreen)
    const dispatch = useDispatch()

    const post = () => {
        postToApi('/group/new', { name: groupName, users: groupUsers.map(gUser => gUser.phone).concat(user.phone) }).then((data?: any) => {
            setGroupName('')
            setGroupUsers([])
            dispatch(setGroupsScreen('none'))
        }).catch((e) => {
            console.log(e.message);
            alert(e.message)
        })
    }

    return currScreen === 'new-group-users'
        ? <NewGroupUsers groupUsers={groupUsers} setGroupUsers={setGroupUsers} />
        : <NewGroupName groupName={groupName} setGroupName={setGroupName} post={post} />
}
export default CreateGroup