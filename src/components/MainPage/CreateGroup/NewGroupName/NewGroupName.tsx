import { Button} from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setGroupsScreen } from "../../../../store/actions"
import classes from "./NewGroupName.module.css";

interface NewGroupNameProps {
    groupName: string,
    setGroupName: React.Dispatch<React.SetStateAction<string>>,
    post: () => void
}
const NewGroupName = ({ groupName, setGroupName, post }: NewGroupNameProps) => {
    const dispatch = useDispatch()

    const createGroup = () => {
        post()
        dispatch(setGroupsScreen('new-group-name'))
    }

    return <div className={'w-100 h-100 d-flex flex-column '+classes.topEl}>
        <div className={'p-3 '+classes.header}>
            <img alt='' height='24px' width='24px' src='/left-arrow.png' onClick={() => dispatch(setGroupsScreen('none'))} />
            {' יצירת קבוצה'}
        </div>
        <div className={'d-flex flex-column flex-grow-1 '+classes.body}>
            <div className='w-100 p-3'>
                <img alt='back' className='rounded-circle mx-auto' width='200px' height='200px' src='/groupicon.png' />
            </div>
            <div className={'pr-3 py-2 '+classes.inputContainer}>
                <input type='text' className={classes.input} onChange={(e) => setGroupName(e.target.value)}/>
            </div>
            <div className={'w-100 '+classes.buttonContainer}>
                {groupName.length > 0 &&
                    <Button className='mr-2' variant='success' onClick={createGroup}>{'צור קבוצה'}</Button>}
            </div>
        </div>
    </div>
}
export default NewGroupName