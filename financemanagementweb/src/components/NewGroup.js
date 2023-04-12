import { Container, Input } from "@mui/material"

const NewGroup = () => {
    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW GROUP</h1>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <Input id="content" type="text" style={{ width: '70%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Leader ID: </h4>
                    <Input id="id" type="text" style={{ width: '10%', marginRight: '2%' }} />
                </div>

                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Members: </h4>
                <Input id="id" type="text" rows={4} style={{ width: '100%' }} />

                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                <Input id="id" type="text" rows={4} style={{ width: '100%' }} />
                <br />
            </Container>
        </>
    )
}

export default NewGroup