import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { changeCurrChat } from "../../../../../store/actions"
import { Group } from "../../../../../types/dbTypes"
import useUser from "../../../../../utility/hooks/useUser"
import classes from "./GroupBox.module.css";
interface GroupProps { group: Group }
const GroupBox = ({ group }: GroupProps) => {
    const dispatch = useDispatch()
    const user = useUser()

    const lastMessage = useMemo(() => {
        if (group.messages.length === 0)
            return undefined
        return group.messages.reduce((prev, curr) => prev.sentTime < curr.sentTime ? curr : prev)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group.messages.length, group.id, group.messages])
    const groupTitle = group.isChat ? group.users.find(gUser => gUser.phone !== user?.phone)?.name : group.name
    const time = lastMessage && new Date(lastMessage.sentTime)
    const timeText = time && (time?.getHours() + ':' + ('0' + time?.getSeconds()).slice(-2))
    const lastMessageText = lastMessage && (lastMessage.sender.name + ': ' + lastMessage.content)

    return <div onClick={() => dispatch(changeCurrChat(group.id))}
    className={'w-100 p-2 d-flex text-right '+classes.topEl}>
        <div className='h-100'>
            <img alt='' height='58px' width='58px' className='rounded-circle' src={group.isChat ? '/image6.png' : '/groupicon.png'} />
        </div>
        <div className='h-100 minWidth0 flex-grow-1' >
            <div className='d-flex w-100'>
                <div className='text-truncate flex-grow-1'>
                    <strong>{groupTitle}</strong>
                </div>
                <div>{timeText}</div>
            </div>
            <div className='w-100 d-flex'>
                <span className='w-100 text-truncate'>
                    {lastMessageText}
                </span>
            </div>
        </div>
    </div>
}
export default GroupBox