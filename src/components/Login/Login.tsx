import { useState } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { postAndGetToApi } from '../../utility/requestService'
import { changeUser } from "../../store/actions";

const Login = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    
    const send = () => {
        postAndGetToApi('/login', { phone: phone, password: password }).then(({ error, user }) => {
            console.log('rsdgda');
            console.log(error, user);
            user ? dispatch(changeUser(user)) : error && alert(error)
        })
    }

    return <div className='align-middle text-right pt-2 px-3'>
        <h1>{'התחברות משתמשים'}</h1>
        <div className='my-2'>
            <FormControl type='text'  value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className='my-2'>
            <FormControl type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <Button variant='success' className='round'  onClick={send}>
            {"התחבר"}
            </Button>
    </div>
}
export default Login