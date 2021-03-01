import { useSelector } from "react-redux"
import { IState } from "../../store/reducer"

const useGroups=()=>{
    return useSelector((state:IState)=>state.groups)
}
export default useGroups