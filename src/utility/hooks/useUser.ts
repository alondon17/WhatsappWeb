import { useSelector } from "react-redux"
import { IState } from "../../store/reducer"

const useUser=()=>{
    return useSelector((state:IState)=>state.user)
}
export default useUser