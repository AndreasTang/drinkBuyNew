import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
    root: {
      	'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200,
     	},
    },
}));

const DropDown = ({ text, handleDropDown }) => {

    const classes = useStyles()

    const [item, setItem] = useState(text.items.name)

    const handleChange = (e) => {

		setItem(e.target.value)
		handleDropDown(e.target.value)
		  
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id={text.id}
                    select
                    label={text.label}
                    value={item}
                    onChange={handleChange}
                    SelectProps={{
						native: true,
					}}
                    helperText={text.helperText}
                    variant="outlined"
                >   
                    {text.items.map((item) => {

                        return (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        )
                    })}
                </TextField>
            </div>
        </form>
    )
}

export default DropDown