import { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUser, setGroupsScreen } from "../../../store/actions";
import { IState } from "../../../store/reducer";
import { User } from "../../../types/dbTypes";
import imgToLocalSt, { fetchimage } from "../../../utility/imgToLocalSt";
import { putAndGetToApi } from "../../../utility/requestService";
import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
    const [b, setB] = useState(1)
    const dispatch = useDispatch()
    const fileSelectRef = useRef<HTMLInputElement>(null)
    const user = useSelector((state: IState) => state.user)!
    const changeListener = (e: ChangeEvent<HTMLInputElement | null>) => {
        imgToLocalSt(e, b, setB)
    };
    const [editName, setEditName] = useState(user.name)
    const [editAbout, setEditAbout] = useState(user.about)
    const [isEditName, setIsEditName] = useState(false)
    const [isEditAbout, setIsEditAbout] = useState(false)

    const nameButtonOnclick = () => {
        if (isEditName) {
            putAndGetToApi('/user', { user: { ...user, name: editName } as User }).then((data) => dispatch(changeUser(data.user as User)))
        }
        setIsEditName(!isEditName)
    }
    const aboutButtonOnclick = () => {
        if (isEditAbout) {
            putAndGetToApi('/user', { user: { ...user, about: editAbout } as User }).then((data) => dispatch(changeUser(data.user as User)))
        }
        setIsEditAbout(!isEditAbout)
    }

    return <div className={'w-100 h-100 d-flex flex-column text-right ' + classes.topEl}>
        <header className={'w-100 p-3 ' + classes.header}>
            <img alt='back' height='24px' width='24px' src='/left-arrow.png' onClick={() => dispatch(setGroupsScreen('none'))} /> פרופיל
        </header>
        <div className={'w-100 d-flex flex-column ' + classes.body}>
            <div className={'w-100 d-flex ' + classes.imgParent}>
                <img alt='replace pix' className={'mx-auto my-2 '+classes.profileImg} height='200px' width='200px' onClick={() => fileSelectRef.current?.click()} src={fetchimage()} />
                <span>
                    <input type='file' ref={fileSelectRef} className='d-none' onChange={changeListener} />
                </span>
            </div>
            <div className={'w-100 ' + classes.inputContainer}>
                <div className={'mb-3 ' + classes.inputLabel}>השם שלך</div>
                <div className={'d-flex ' + (isEditName ? classes.inputBorder : '')}>
                    <input onChange={e => setEditName(e.currentTarget.value || '')} value={editName}
                        readOnly={!isEditName} className={'text-truncate ' + classes.input} />
                    <span className={classes.inputButton} onClick={nameButtonOnclick}>
                        <img alt='edit' className={'w-100 '+(isEditName?classes.mirrorImg:'')} src={isEditName ? '/send.svg' : "/pencil.svg"} />
                    </span>
                </div>
            </div>
            <div className={'w-100 mt-4 ' + classes.inputContainer}>
                <div className={'mb-3 ' + classes.inputLabel}>אודות</div>
                <div className={'d-flex ' + (isEditAbout ? classes.inputBorder : '')}>
                    <input onChange={e => setEditAbout(e.currentTarget.value || '')} value={editAbout}
                        readOnly={!isEditAbout} className={'text-truncate ' + classes.input} />
                    <span className={classes.inputButton} onClick={aboutButtonOnclick}>
                        <img alt='edit' className={'w-100 '+(isEditAbout?classes.mirrorImg:'')} src={isEditAbout ? '/send.svg' : "/pencil.svg"} />
                    </span>
                </div>
            </div>
        </div>
    </div>
}
export default ProfilePage