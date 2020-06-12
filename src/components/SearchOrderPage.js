import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import { Container, Paper, Grid } from '@material-ui/core'
import OrderCard from './OrderCard'
import dataBase from '../firebase/fireBase'
import AddOrder from './AddOrder';
import authContext from '../context/authContext'


const useStyles = makeStyles(theme => ({
    root: {
	    padding: theme.spacing(.25, 2)
	},
	paper: {
		padding: theme.spacing(4)
    },
    card: {
        maxWidth: 345
    }
}));

const SearchOrderPage = () => {

    const classes = useStyles()
    const [orderData, setOrderState] = useState([])
    const [drinkData, setDrinkData] = useState([])
    const [hidePage1, setHidePage1] = useState(false)
    const [selected, setSelected] = useState({})
    const { setCurrentPage } = useContext(authContext)
    const [isLoaded, setIsLoaded] = useState(false)
    

    useEffect(() => {

        
        let tempArray = []

        setCurrentPage(2)

        dataBase.collection('order')
            .get()
            .then((snapShot) => {
                snapShot.forEach((doc) => {
                    tempArray.push(doc.data())
                })
                setOrderState(tempArray)
                setIsLoaded(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleClick = (orderId) => {

        let tempArray = ''

        const selectedItem = orderData.filter((item) => {
            return item.orderId === orderId
        })

        dataBase.collection('order').doc(`${selectedItem[0].orderId}`).collection('totalDrink')
            .get()
            .then((snapShot) => {
                snapShot.forEach((doc) => {
                    tempArray =[...doc.data().totalDrinks]
                })
            }).then(() => {
                setDrinkData(tempArray)
                setSelected(selectedItem)
                setHidePage1(true)
            }).catch((error) => {
                console.log(error)
            })
        
    }

    const myOrder = (orderData) => {
        
        if (!isLoaded) {

            return (
                <Typography>讀取中...</Typography>
            )

        } else if (isLoaded && orderData.toString() === '') {

            return (
                <Typography>您還未發起任何揪團喔</Typography>
            )
        
        } else if (orderData.toString() !== '' && !hidePage1 ) {

            return (
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                    alignContent="stretch"
                >
                    {orderData.map((data, index) => {

                        return (
                            <OrderCard text={'加入'} orderData={data} handleClick={handleClick} key={index}/>
                        )

                    })}
                </Grid>
            )

        } else {
            return (
                <AddOrder setHidePage1={setHidePage1} order={selected} drink={drinkData} />
            )
        }
    }

    return (

        <Container className={classes.root} maxWidth="xl" >
            <Paper className={classes.paper}>
                {myOrder(orderData)}
            </Paper>
        </Container>
    )

}

export default SearchOrderPage