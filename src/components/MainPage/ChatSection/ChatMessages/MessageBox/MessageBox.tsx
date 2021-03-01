import { Message } from "../../../../../types/dbTypes"
import useUser from "../../../../../utility/hooks/useUser"
import classes from './MessageBox.module.css';
interface MessageProps {
    message: Message
    , isChat: boolean
}
const MessageBox = ({ message, isChat }: MessageProps) => {
    const user = useUser()!
    const isSender = user.phone === message.sender.phone
    const time = new Date(message.sentTime)
    const timeText = time && (time?.getHours() + ':' + ('0' + time?.getSeconds()).slice(-2))

    return <div key={message.id} className={'w-100 d-flex text-right justify-content' + (isSender ? '-end' : 'start')}>
        <div className={classes.messageBox+' m-2'+(isSender?'':' bg-white')}>
            <div className='h-100 w-100 p-1'>
                {(isSender || isChat) ? null : <div className='font-weight-bold text-truncate'>
                    {message.sender.name}
                </div>}
                <p className='mb-0'>{message.content}</p>
                <span className={classes.messageTime}>{timeText}</span>
            </div></div>
    </div>
}
export default MessageBox