import { useState } from "react"
import { FormControl } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setGroupsScreen } from "../../../store/actions"
import { sendMessageReq } from "../../../utility/dbActions"
import useCurrentChatId from "../../../utility/hooks/useCurrentChatId"
import useGroups from "../../../utility/hooks/useGroups"
import useUser from "../../../utility/hooks/useUser"
import ChatMessages from "./ChatMessages/ChatMessages"
import classes from "./ChatSection.module.css";

const ChatSection = () => {
    const [messageInput, setMessageInput] = useState('')
    const groups = useGroups()
    const user = useUser()!
    const currentChatId = useCurrentChatId()
    const currentChat = groups && groups.find(group => group.id === currentChatId)
    const dispatch = useDispatch()

    const sendMesaage = () => {
        sendMessageReq({ phone: user?.phone!, content: messageInput, groupId: currentChatId! })
    }

    return <div className={'bg-info h-100 w-100 '+classes.topEl}>
        {
            currentChat ? <>
                <header className={'d-flex w-100 align-items-center '+classes.header}>
                    <div className={'h-100 d-flex flex-column mr-1 text-right '+classes.groupDetails} >
                        {currentChat.isChat
                            ? <div className={'text-truncate mt-1 font-weight-bold '+classes.chatName}>
                                {currentChat.users.find(u => u.phone !== user.phone)?.name}
                            </div>
                            : <>
                                <span className={'text-truncate font-weight-bold '+classes.groupName}>
                                    {currentChat.name}
                                </span>
                                <div className={'text-truncate '+classes.groupUsersNames}>
                                    {currentChat.users.map(user => user.name).join(', ')}
                                </div>
                            </>
                        }
                    </div>
                    <div className='h-100 py-2 px-1'>
                        <img alt='' src='/loupe.svg' className='h-100' onClick={() => dispatch(setGroupsScreen('search'))} />
                    </div>
                </header>
                <ChatMessages currentChat={currentChat} />
                <footer className={'d-flex align-self-end w-100 '+classes.footer}>
                    <FormControl value={messageInput} type='text' className={classes.input} onChange={(e) => setMessageInput(e.target.value)} />
                    <button onClick={sendMesaage}>
                        <img alt='' src='/send.svg' className={'h-100 w-100 '+classes.sendButton}/>
                    </button>
                </footer>
            </>
                : <div className={classes.defaultMessage}><h1>Chat Section</h1></div>
        }
    </div>
}
export default ChatSection
