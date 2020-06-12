import React, { useContext, useEffect } from 'react'
import DropDown from './DropDown'
import InputBox from './InputBox'
import AllButton from './AllButton'
import DataContext from '../context/dataContext'
import { dropDownProps, inputBoxText } from './DefaultValues'
import { Grid } from '@material-ui/core'

const MakeOrder1 = ({ handleHide }) => {

    const { orderData, dispatchOrderData } = useContext(DataContext)

    const handleInputAddress = (address) => {
        dispatchOrderData({ type: 'INPUT_ORDER_ADDRESS', address })
    }

    const handleShopDropDown = (shop) => {
        dispatchOrderData({ type: 'SELECT_SHOP', shop })
    }

    const countSetter = () => {
        const count = dropDownProps.discountDropDown.items.filter((item) => {
            return item.name === orderData.discount
        })

        return count[0].totalCount
    }

    const handleDiscountDropDown = (discount) => {
        dispatchOrderData({ type: 'SELECT_DISCOUNT', discount })
    }

    const handleDisable = () => {

       if (orderData.address && orderData.shop && orderData.discount) {
           return false
       } else {
           return true
       }
    }

    const handleClick = () => {

        const totalCount = countSetter()
        dispatchOrderData({ type: 'SET_TOTAL_COUNT', totalCount })
        handleHide(true)

    }

    useEffect(() => {
        console.log(orderData)
    }, [orderData])

    return (
        <Grid container direction='column' alignItems='center' spacing={3}>
            <Grid item>
                <InputBox
                    text={inputBoxText.address}
                    handleInput={handleInputAddress} />
            </Grid>
            <Grid item>
                <DropDown
                    text={dropDownProps.shopDropDown}
                    handleDropDown={handleShopDropDown} />
            </Grid>
            <Grid item>
                <DropDown
                    text={dropDownProps.discountDropDown}
                    handleDropDown={handleDiscountDropDown} />
            </Grid>
            <Grid>
                <AllButton
                    text={'下一步'}
                    handleClick={handleClick}
                    disable={handleDisable()} />
            </Grid>
        </Grid>
    )
}

export default MakeOrder1