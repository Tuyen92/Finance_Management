import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
import { Container, FormGroup, Input, TextField, Button } from "@mui/material"


const CurrentUser = () => {
    const[currentUser, setCurrentUser] = useState("")
    const[password, setPassword] = useState({
        "old_password": "",
        "new_password": ""
    })
    
    useEffect(() => {
        const loadCurrentUser = async () => {
            let res = await authAPI().get(endpoints['current_user'])
            // console.log(res)
            setCurrentUser(res.data)
        }
        loadCurrentUser()
    }, [])

    const updatePassword = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("old_password", password.old_password)
                form.append("new_password", password.new_password)

                let res = await authAPI().put(endpoints['change_password'], form)
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setPassword(current => ({...current, [name]:value}))
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>USER INFORMATION</h1>
            <Container>
                <div style={{ display: 'flex' }}>
                    <img style={{ marginRight: '4%', marginTop: '3%', width: '15%', height: '15%'}} src={currentUser.avatar} alt={"../../user.jpg"} />
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

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Limit Rule: </h4>
                            <TextField id="name_group" type="text" value={currentUser.limit_rule} />
                        </div>
                    </div>
                    
                </div>
                <div  align="center">
                    <Button variant="outline-primary" type='submit' style={{ backgroundColor: '#609b56', color: '#FFECC9' }}>Update</Button>
                </div>
            </Container>
            <br />
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>UPDATE PASSWORD</h1>
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={updatePassword}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }} >Old Password:</h4>
                            <TextField className='col form-control' type="password" label="Old password" name='old_password' value={password.old_password}  onChange={setValue} />
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>New Password:</h4>
                            <TextField style={{ marginRight: '2%' }} type="password" label="New password" name='new_password' value={password.new_password}  onChange={setValue} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Re-enter new password:</h4>
                            <TextField className='col form-control' type="password" label="Re-enter password" name='confirmPass' />
                        </div>

                        <br />
                        <div  align="center">
                            <Button variant="outline-primary" type='submit' style={{ backgroundColor: '#609b56', color: '#FFECC9' }}>Change password</Button>
                        </div>
                    </form>
                </FormGroup>
            </Container>
        </>
    )
}

export default CurrentUser
