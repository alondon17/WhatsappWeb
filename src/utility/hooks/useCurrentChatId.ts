import { useSelector } from "react-redux"
import { IState } from "../../store/reducer"

const useCurrentChatId=()=>{
    return useSelector((state:IState)=>state.currentChat)
}
export default useCurrentChatId