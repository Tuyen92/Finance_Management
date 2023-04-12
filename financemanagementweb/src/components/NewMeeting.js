import { Container, Input } from "@mui/material"

const NewMeeting = () => {
    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW MEETING SCHEDULE</h1>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                    <Input id="content" type="text" style={{ width: '100%', marginRight: '2%' }} />
                </div>

                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                <Input id="id" type="text" multiline fullWidth rows={4} style={{ width: '100%' }} />

                <div style={{ display: 'flex' }}>
                    <h4 style={{ width: '20%', color: "#F1C338", marginRight: '2%' }}>Date date: </h4>
                    <Input id="id" type="text" rows={4} style={{ width: '100%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                    <Input id="id" type="text" rows={4} style={{ width: '20%' }} />
                </div>
                <br />
            </Container>
        </>
    )
}

export default NewMeeting