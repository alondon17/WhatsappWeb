import { useSelector } from "react-redux"
import React from 'react'
import GroupsList from "./GroupsList/GroupsList"
import { IState } from "../../../store/reducer"
import ProfilePage from "../ProfilePage/ProfilePage"
import CreateGroup from "../CreateGroup/CreateGroup"
import Search from "../Search/Search"
import NewChat from "../NewChat/NewChat"
import classes from "./GroupsSection.module.css";
const GroupsSection = () => {
    const currScreen = useSelector((state: IState) => state.groupSectionScreen)
    const renderere = (() => {
        switch (currScreen) {
            case 'my-profile':
                // setElScreen(ProfilePage)
                return <ProfilePage />
            case 'new-group-users':
            case 'new-group-name':
                // setElScreen(ProfilePage);
                return <CreateGroup />
            case 'search':
                return <Search />
            case 'new-chat':
                return <NewChat />
            case 'none':
            default:
                return undefined
        }
    })()

    return <div className={'w-100 h-100 '+classes.topEl}>
        <div className={'w-100 h-100 '+classes.overlay}>
            {renderere && <div className={'w-100 h-100 '+classes.overlayEl}>{renderere}</div>}
        </div>
        <div className={'w-100 h-100 '+classes.underlay}>
            <GroupsList />
        </div>
    </div>
}
export default GroupsSection