import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles(theme => ({
    root: {
		  width: 200,
		  padding: theme.spacing(0.75),
		  margin: theme.spacing(0.9)
    },
    margin: {
      	height: theme.spacing(3),
	},
	padding: {
		padding: theme.spacing(1.80)
	}
}));

const CounterSlider = ({ handleSlider }) => {

	const classes = useStyles()

    return (
		<div className={classes.root}>
			<Typography id="discrete-slider-always" gutterBottom>
				杯數
			</Typography>
			<Slider
				defaultValue={1}
				min={1}
				max={10}
				step={1}
				valueLabelDisplay="auto"
				marks={true}
				onChangeCommitted={(e, value) => handleSlider(value) }
			/>
		</div>
    )
}

export default CounterSlider