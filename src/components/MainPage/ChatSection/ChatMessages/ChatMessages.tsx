import { useEffect, useRef } from "react"
import { Group } from "../../../../types/dbTypes"
import MessageBox from "./MessageBox/MessageBox"
import classes from "./ChatMessages.module.css";

const ChatMessages = ({ currentChat }: { currentChat: Group }) => {
    const isScrolled = useRef<boolean>(true)
    const out = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (out.current)
            out.current.scrollTop = out.current.scrollHeight - out.current.clientHeight
    }, [currentChat])
    useEffect(function () {
        if (isScrolled.current) {
            messagesEndRef.current!.scrollIntoView({ behavior: 'smooth' })
        }
    }, [currentChat.messages.length])
    const onScroll = () => {
        isScrolled.current = out.current!.scrollHeight - out.current!.clientHeight <= out.current!.scrollTop + 1
    }

    return <div className={'w-100 h-100 '+classes.chatContainer} ref={out}
        onScroll={onScroll} >
        {currentChat.messages.map(message => <MessageBox key={message.id} message={message} isChat={currentChat.isChat} />)}
        <div ref={messagesEndRef} />
    </div>
}
export default ChatMessages