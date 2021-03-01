import { useState } from "react"
import { useDispatch } from "react-redux"
import { setGroupsScreen } from "../../../store/actions"
import { Group } from "../../../types/dbTypes"
import useCurrentChatId from "../../../utility/hooks/useCurrentChatId"
import useGroups from "../../../utility/hooks/useGroups"
import classes from "./Search.module.css";

const Search = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const groups = useGroups()
    const currentChatId = useCurrentChatId()
    const currentChat: Group | undefined = groups?.find(gr => gr.id === currentChatId)
    const filteredMessages = currentChat?.messages.filter(message => message.content.includes(query))

    return <div className={'w-100 h-100 d-flex flex-column text-right '+classes.topEl}>
        <header className={'w-100 p-3 '+classes.header}>
            <img alt='back' height='24px' width='24px' src='/left-arrow.png' onClick={() => dispatch(setGroupsScreen('none'))} />
            {' חיפוש'}
        </header>
        <div className={'d-flex flex-column flex-grow-1 '+classes.body}>
            <div className='w-100 pr-2 pt-1'>
                <input type='string' value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className={classes.resultsContainer}>
                {filteredMessages?.map(fMess => {
                    return <div className='p-2 border'>{fMess.content}</div>
                })}
            </div>
        </div>
    </div>
}
export default Search