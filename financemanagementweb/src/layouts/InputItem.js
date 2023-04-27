import React from "react"
import { FormControl, Input, TextField } from '@mui/material';

const InputItem = React.forwardRef(({label, type, value, setValue, name}, ref) => {
    // console.log(ref.current.files)
    if (type === "file")
    {
        return (
            <>
                <input type="file" variant='outlined' ref={ref} name={name} style={{ width: '100%', marginTop: '2.5%' }} />
            </>
            
        )
    }
})

export default InputItem
