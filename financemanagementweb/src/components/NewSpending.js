// import { useEffect, useState } from "react"
import { Container, Input } from "@mui/material"

const NewSpending = () => {
    // const[spending, setSpending] = useState([])
    // useEffect(() => {

    // })

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW SPENDING</h1>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                    <Input id="content" type="text" style={{ width: '70%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Spending: </h4>
                    <Input id="id" type="text" style={{ width: '10%', marginRight: '2%' }} />
                </div>

                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                <Input id="id" type="text" multiline fullWidth rows={4} style={{ width: '100%' }} />

                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                    <Input id="id" type="text" style={{ width: '5%', marginRight: '2%' }} />
                
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                    <Input id="content" type="text" style={{ width: '5%', marginRight: '2%' }} />
                </div>
            </Container>
        </>
    )
}

export default NewSpending