import ChatSection from "./ChatSection/ChatSection"
import GroupsSection from "./GroupsSection/GroupsSection"
import classes from "./MainPage.module.css";

const MainPage = () => {
    return <div className={'w-100 h-100 d-flex '+classes.topEl}>
                <div className={classes.groupsSection}>
                    <GroupsSection />
                </div>
                <div className={classes.chatSection} style={{}}>
                    <ChatSection />
                </div>

        </div>
    
}
export default MainPage