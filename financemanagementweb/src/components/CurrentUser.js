import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, endpoints } from "../configs/API";
import { Container, TextField, Button } from "@mui/material";
import { format } from 'date-fns';
import Loading from "../layouts/Loading";
import Alert from '@mui/material/Alert';


const CurrentUser = () => {
    const[currentUser, setCurrentUser] = useState(null)
    const[password, setPassword] = useState({
        "old_password": "",
        "new_password": ""
    })
    const[updatedUser, setUpdateUser] = useState({
        "address": "",
        "email": "",
        "phone": "",
        "limit_rule": ""
    })
    const[err, setErr] = useState(null)
    const nav = useNavigate()
    let e = `${endpoints['current_user']}`

    useEffect(() => {
        const loadCurrentUser = async () => {
            let res = await authAPI().get(e)
            if (res.status == 200)
            {
                res.data.birthday = format(new Date(res.data.birthday), 'dd/MM/yyyy')
                // console.log(res)
                setCurrentUser(res.data)
                setErr(null)
            }
            else
                setErr(res.status)
            
        }
        loadCurrentUser()
    }, [err])

    const updatePassword = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("old_password", password.old_password)
                form.append("new_password", password.new_password)

                let res = await authAPI().put(endpoints['change_password'], form)
                if (res.status === 200)
                    nav("/")
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    const setValuePassword = e => {
        const { name, value } = e.target
        setPassword(current => ({...current, [name]:value}))
    }

    const setValueUser = e => {
        const { name, value} = e.target
        setUpdateUser(current => ({...current, [name]:value}))
    }

    const updateUser = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("address", updatedUser.address)
                form.append("email", updatedUser.email)
                form.append("phone", updatedUser.phone)
                
                if (updatedUser.limit_rule != "")
                {
                    let formLR = new FormData()
                    formLR.append("limit_rule", updatedUser.limit_rule)
                    let eLR = `${endpoints['choose_lr']}`
                    let resLR = await authAPI().put(eLR, formLR)
                }

                let res = await authAPI().put(e, form)
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    let alert = (<></>)
    if (err !== null)
    {
        alert = (
        <>
        <div align='center'>
            <Alert severity="error">Happend an error: {err} — check it out!</Alert>
        </div>
        <br />
        </>)
    }

    if (currentUser == null)
    {return(
    <>
        <h1 style={{ textAlign: "center", color: "#F1C338" }}>USER INFORMATION</h1>
        <Loading />
        <br />
        {alert}
    </>)}

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>USER INFORMATION</h1>
            {alert}
            <div style={{ backgroundColor: '#609b56'}}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }} >Your information</h3> 
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <img style={{ marginRight: '4%', marginTop: '3%', width: '15%', height: '15%'}} src={currentUser.avatar?currentUser.avatar:"../../user.jpg"} />
                    <div style={{ width: '100%'}}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                            <TextField id="id" type="text" value={currentUser.id} style={{ width: '10%', marginRight: '2%' }} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                            <TextField id="name_group" type="text" value={currentUser.first_name + " " + currentUser.last_name}  style={{ width: '100%', marginRight: '2%' }} />
                        
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Sex: </h4>
                            <TextField id="id" type="text" value={currentUser.sex} />
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Birthday: </h4>
                            <TextField id="id" type="text" value={currentUser.birthday} style={{ marginRight: '2%' }} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Address: </h4>
                            <TextField id="name_group" type="text" value={currentUser.address} style={{ width: '100%' }} />
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Email: </h4>
                            <TextField id="id" type="text" value={currentUser.email} style={{ marginRight: '2%' }} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Phone: </h4>
                            <TextField id="name_group" type="text" value={currentUser.phone} style={{ marginRight: '2%' }} />
                            
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Role: </h4>
                            {currentUser.is_superuser === true?
                            <TextField id="name_group" type="text" value="Superuser" />:
                            currentUser.is_staff === false?
                            <TextField id="name_group" type="text" value="User" />:
                            <TextField id="name_group" type="text" value="Leader" />}
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Limit Rule: </h4>
                            <TextField id="name_group" type="text" value={currentUser.limit_rule.id} />
                        </div>
                    </div>
                </div>
            </Container>
            <div style={{ backgroundColor: '#609b56'}}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }} >Update your password</h3> 
            </div>
            <br />
            <Container>
                    <form onSubmit={updatePassword}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }} >Old Password:</h4>
                            <TextField className='col form-control' type="password" label="Old password" name='old_password' value={password.old_password}  onChange={setValuePassword} />
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>New Password:</h4>
                            <TextField style={{ marginRight: '2%' }} type="password" label="New password" name='new_password' value={password.new_password}  onChange={setValuePassword} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Re-enter new password:</h4>
                            <TextField className='col form-control' type="password" label="Re-enter password" name='confirmPass' />
                        </div>
                        <br />
                        <div  align="center">
                            <Button variant="outline-primary" type='submit' style={{ backgroundColor: '#609b56', color: '#FFECC9' }}><strong>Change password</strong></Button>
                        </div>
                    </form>
            </Container>
            <div style={{ backgroundColor: '#609b56'}}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }} >Update your information</h3> 
            </div>
            <br />
            <Container>
                <form onSubmit={updateUser}>
                    <div style={{ display: 'flex' }}>
                        <h4 style={{ color: "#F1C338", marginRight: '2%' }} >Address:</h4>
                        <TextField className='col form-control' type="text" label="New address..." name='old_password' value={updatedUser.address}  onChange={setValueUser} 
                        style={{ width: '100%' }}/>
                    </div>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <h4 style={{ color: "#F1C338", marginRight: '2%' }} >Email:</h4>
                        <TextField className='col form-control' type="text" label="New email..." name='email' value={updatedUser.email}  onChange={setValueUser}
                            style={{ marginRight: '2%'}} />
                    
                        <h4 style={{ color: "#F1C338", marginRight: '2%' }} >Phone:</h4>
                        <TextField className='col form-control' type="text" label="New phone..." name='phone' value={updatedUser.phone} onChange={setValueUser} 
                            style={{ marginRight: '2%'}} />

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }} >Limit rule:</h4>
                        <TextField className='col form-control' type="text" label="New limit rule..." name='limit_rule' value={updatedUser.limit_rule} onChange={setValueUser} />
                    </div>
                    <br />
                    <div  align="center">
                        <Button variant="outline-primary" type='submit' style={{ backgroundColor: '#609b56', color: '#FFECC9' }}><strong>Update</strong></Button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default CurrentUser
