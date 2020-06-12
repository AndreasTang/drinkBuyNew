import React, { useContext, useEffect } from 'react'
import DropDown from './DropDown'
import AllButton from './AllButton'
import CounterSlider from './CounterSlider'
import DataContext from '../context/dataContext'
import { dropDownProps } from './DefaultValues'
import { Grid } from '@material-ui/core'

const MakeOrder2 = ({ handleHide, setHidePage1 }) => {

    const { drinkData, dispatchDrinkData, dispatchOrderData } = useContext(DataContext)

    const handleDrinkDropDown = (drink) => {
        dispatchDrinkData({ type: 'SELECT_DRINK', drink })
    }

    const handleIceDropDown = (ice) => {
        dispatchDrinkData({ type: 'SELECT_ICE', ice })
    }

    const handleSweetDropDown = (sweet) => {
        dispatchDrinkData({ type: 'SELECT_SWEET', sweet })
    }

    const handleCounterSlider = (count) => {
        dispatchDrinkData({ type: 'ADD_DRINK_COUNT', count })
    }

    const backToPreviousPage = () => {
        if (handleHide) {
            handleHide(false)
        } else if (setHidePage1) {
            setHidePage1(false)
        }
    }

    const handleAddDrink = () => {

        const remainedCount = drinkData.count
        dispatchOrderData({ type: 'DECREASE_REMAINED_COUNT', remainedCount })
        dispatchDrinkData({ type: 'SEND_DRINK', drinkData }) 

    }

    useEffect(() => {
        console.log(drinkData)
    }, [drinkData])

    return (
        <Grid container direction='column' alignItems='center' spacing={3}>
            <Grid item>
                <DropDown text={dropDownProps.drinkDropDown} handleDropDown={handleDrinkDropDown} />
            </Grid>
            <Grid item>
                <CounterSlider handleSlider={handleCounterSlider}/>
            </Grid>
            <Grid item>
                <DropDown text={dropDownProps.iceDropDown} handleDropDown={handleIceDropDown} />
            </Grid>
            <Grid item>
                <DropDown text={dropDownProps.sweetDropDown} handleDropDown={handleSweetDropDown} />
            </Grid>
            <Grid item>
                <AllButton text={'回上一步'} handleClick={backToPreviousPage} />
                <AllButton text={'放入購物車'} handleClick={handleAddDrink} disable={
                    drinkData.drink && drinkData.ice && drinkData.sweet ? false : true
                } />
            </Grid>
        </Grid>
    )
}

export default MakeOrder2