import React, { useReducer, useEffect, useState, useContext } from 'react'
import DropDown from './DropDown'
import InputBox from './InputBox'
import AllButton from './AllButton'
import OrderShower from './OrderShower'
import MakeOrderReducer from '../reducer/makeOrderReducer'
import drinkReducer from '../reducer/drinkReducer'
import InputContext from '../context/inputContext'
import authContext from '../context/authContext'
import CounterSlider from './CounterSlider'
import { dropDownProps, inputBoxText, defaultOrder, defaultDrink } from './DefaultValues'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'
import dataBase from '../firebase/fireBase'
import uuid from 'uuid/v1'


const useStyles = makeStyles(theme => ({
    button: {
	  padding: theme.spacing(0, 8)
	},
}));

const MakeOrder = () => {

    const classes = useStyles()

    const { uid, emailVerified, displayName } = useContext(authContext)

    const [userData, dispatchUserData] = useReducer(MakeOrderReducer, defaultOrder)
    const [drinkData, dispatchDrink] = useReducer(drinkReducer, defaultDrink)
    const [isInputNameValid, setIsInputNameValid] = useState(true)
    const [isInputAddressValid, setIsInputAddressValid] = useState(true)

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem('userData'))
        const drinkData = JSON.parse(localStorage.getItem('userDrink'))
    
        if (userData) {
            dispatchUserData({ type: 'POPULATE_USER_DATA', userData })
        }

        if (drinkData) {
            dispatchDrink({ type: 'POPULATE_DRINK', drinkData })
        }

    }, [])

    useEffect(() => {

        console.log(userData)
        localStorage.setItem('userData', JSON.stringify(userData))

    }, [userData])

    useEffect(() => {

        console.log(drinkData)
        localStorage.setItem('drink', drinkData)
        
    }, [drinkData])

    const handleInputNameError = (isInputNameValid) => {
        setIsInputNameValid(isInputNameValid )
    }

    const handleInputAddressError = (isInputAddressValid) => {
        setIsInputAddressValid(isInputAddressValid )
    }

    const handleButton = (isInputNameValid, isInputAddressValid) => {

        if (isInputNameValid === true || isInputAddressValid === true) {

            return true

        } else {

            return false

        }
    }

    const handleInputName = (userName) => {
        dispatchUserData({ type: 'INPUT_USER_NAME', userName })
    }

    const handleInputAddress = (userAddress) => {
        dispatchUserData({ type: 'INPUT_USER_ADDRESS', userAddress })
    }

    const handleShopDropDown = (shop) => {
        dispatchUserData({ type: 'SELECT_SHOP', shop })
    }

    const handleDiscountDropDown = (discount) => {
        dispatchUserData({ type: 'SELECT_DISCOUNT', discount })
    }

    const handleDrinkDropDown = (drink) => {
        dispatchDrink({ type: 'SELECT_DRINK', drink })
    }

    const handleIceDropDown = (ice) => {
        dispatchDrink({ type: 'SELECT_ICE', ice })
    }

    const handleSweetDropDown = (sweet) => {
        dispatchDrink({ type: 'SELECT_SWEET', sweet })
    }

    const handleCounterSlider = (count) => {
        dispatchDrink({ type: 'ADD_DRINK_COUNT', count })
    }

    const handleClick = () => {

        const drinkId = Date.now()

        dispatchDrink({ type: 'SEND_DRINK_ID',  drinkId })
        dispatchUserData({ type: 'SEND_DRINK',  drink: drinkData })

    }

    const handleFireBasePush = () => {

        const sendTime = Date.now()

        dataBase.collection('user').doc(`${uid}`).set({
            sendTime,
            ...userData
        }).catch((error) => {
            console.log(error)
        })

        userData.drinks.forEach((drink) => {

            const orderId = uuid()
            const drinkName = '555'

            dataBase.collection('user').doc(`${uid}`).collection(`${orderId}`).doc(`${drinkName}`).set({
                ...drink
            })

        })

    //     userData.drinks.forEach((drink) => {
    //         dataBase.ref('drinkSet').push({
    //             userId: userData.userName,
    //             sendTime,
    //             ...drink
    //         })
    //     })

    //     dataBase.ref('userData').push({
    //         sendTime,
    //         ...userData
    //     })
    }

    return (

        <InputContext.Provider value={{
            userData,
            drinkData,
            dispatchUserData
        }}>
        
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                alignContent="center"
            >
                <Grid
                    container
                    item
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    alignContent="flex-start"
                >
                    <Grid
                        xs={4}
                        container
                        item
                        direction="column"
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Grid
                            container
                            item
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            spacing={3}
                        >   
                            <Grid item>
                                <InputBox text={inputBoxText.name} handleInput={handleInputName} handleInputNameError={handleInputNameError} />
                            </Grid>
                            <Grid item>
                                <InputBox text={inputBoxText.address} handleInput={handleInputAddress} handleInputAddressError={handleInputAddressError} />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            spacing={3}
                        >
                            <Grid item>
                                <DropDown text={dropDownProps.shopDropDown} handleDropDown={handleShopDropDown} />
                            </Grid>
                            <Grid item>
                                <DropDown text={dropDownProps.discountDropDown} handleDropDown={handleDiscountDropDown} />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            spacing={3}
                        >
                            <Grid item>
                                <DropDown text={dropDownProps.drinkDropDown} handleDropDown={handleDrinkDropDown} />
                            </Grid>
                            <Grid item>
                                <CounterSlider handleSlider={handleCounterSlider}/>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            spacing={3}
                        >
                            <Grid item>
                                <DropDown text={dropDownProps.iceDropDown} handleDropDown={handleIceDropDown} />
                            </Grid>
                            <Grid item>
                                <DropDown text={dropDownProps.sweetDropDown} handleDropDown={handleSweetDropDown} />
                            </Grid>
                        </Grid>
                        <Grid item container justify="center">
                            <AllButton text={'放入清單'} handleClick={handleClick} disable={handleButton(isInputNameValid, isInputAddressValid)} />  
                        </Grid>
                    </Grid>
                    <Grid
                        alignItems="flex-start"
                        alignContent="flex-start"
                        container
                        item
                        xs={4}
                    >
                        <OrderShower />
                    </Grid>
                </Grid>
                <Grid item>
                    <AllButton text={'送出訂單'} handleClick={handleFireBasePush} disable={handleButton(isInputNameValid, isInputAddressValid)} />
                </Grid>
            </Grid>
        </InputContext.Provider>
    )

}

export default MakeOrder