import React, { useEffect } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, setGroupsScreen, logout } from "../../../../store/actions";
import { IState } from "../../../../store/reducer";
import { Group } from "../../../../types/dbTypes";
import { fetchimage } from "../../../../utility/imgToLocalSt";
import { postAndGetToApi } from "../../../../utility/requestService";
import GroupBox from "./GroupBox/GroupBox";
import classes from "./GroupsList.module.css";

const GroupsList = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: IState) => state.user)!
    const groups = useSelector((state: IState) => state.groups)!
    const CustomToggle = React.forwardRef((props: any, ref: React.Ref<HTMLDivElement>) => {
        const { children, onClick } = props
        return <div ref={ref} className='h-100' onClick={e => {
            e.preventDefault();
            onClick(e);
        }}>
            {children}
        </div>
    });
    const getLastMessageTime = (groupToCheck: Group) => {
        if (groupToCheck.messages.length === 0)
            return 0
        const latestMesage = groupToCheck.messages.reduce((a, b) => (new Date(a.sentTime)).getTime() < (new Date(b.sentTime)).getTime() ? b : a)
        if (latestMesage) {
            return new Date(latestMesage.sentTime).getTime()
        }
        return 0
    }
    const listDisplay = groups
        ? <div className={'pb-auto w-100 minWidth0 '+classes.groupsList}>
            {groups.sort((a, b) => getLastMessageTime(b) - getLastMessageTime(a))
                .map((group) => <GroupBox key={group.id} group={group} />)}
        </div>
        : <div className='w-100 pt-5 text-center'>
            <Spinner animation='border' />
            </div>
    useEffect(() => {
        const cancelInterval = setInterval(() => {
            postAndGetToApi('/group', { phone: user.phone }).then((data) => {
                dispatch(setGroups(data.groups))
            })
        }, 4000)
        return () => { clearInterval(cancelInterval) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className='bg-success d-flex flex-column w-100 h-100'>
        <div className={'w-100 d-flex '+classes.header}>
            <div className='ml-auto h-100'>
                <img alt='profile' className='p-1 h-100 rounded-circle' onClick={() => dispatch(setGroupsScreen('my-profile'))} src={fetchimage()} />
            </div>
            <div className='h-100 py-2 px-1'>
                <img alt='new chat' src='/focus.png' className='h-100' onClick={() => dispatch(setGroupsScreen('new-chat'))} />
            </div>

            <div className='h-100 py-2 px-1'>
                <Dropdown className='h-100'>
                    <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-basic">
                        <img alt='' src='/more.png' height='100%' />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => dispatch(setGroupsScreen('new-group-users'))}>צור קבוצה חדשה</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(setGroupsScreen('my-profile'))}>הפרופיל שלי</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(logout())}>התנתק</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>

        {listDisplay}
    </div>

}
export default GroupsList