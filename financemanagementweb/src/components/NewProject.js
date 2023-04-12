import { Container, Input } from "@mui/material"

const NewProject = () => {
    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW PROJECT</h1>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <Input id="content" type="text" style={{ width: '70%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Target: </h4>
                    <Input id="id" type="text" rows={4} style={{ width: '20%' }} />
                </div>

                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                <Input id="id" type="text" multiline fullWidth rows={4} style={{ width: '100%' }} />

                <div style={{ display: 'flex' }}>
                    <h4 style={{ width: '20%', color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                    <Input id="id" type="text" rows={4} style={{ width: '100%', marginRight: '2%' }} />

                    <h4 style={{ width: '20%', color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                    <Input id="id" type="text" rows={4} style={{ width: '100%', marginRight: '2%' }} />
                </div>
                <br />
            </Container>
        </>
    )
}

export default NewProject
