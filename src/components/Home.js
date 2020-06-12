import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import { Container, Paper, Grid } from '@material-ui/core'
import OrderCard from './OrderCard'
import authContext from '../context/authContext'
import dataBase from '../firebase/fireBase'
import emailjs from 'emailjs-com'
import { history } from '../routers/AppRouter'

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

const Home = () => {

    const { uid } = useContext(authContext)
    const { setCurrentPage } = useContext(authContext)
    const classes = useStyles()
    const [orderData, setOrderState] = useState([])
    const [drinkDataArray, setDrinkDataArray] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {

        setCurrentPage(0)

        let tempArray = []
        let orderIdArray = []
        dataBase.collection('order').where('attendantUid', 'array-contains', uid)
            .get()
            .then((snapShot) => {
                snapShot.forEach((doc) => {
                    tempArray.push(doc.data())
                    orderIdArray.push(doc.data().orderId)
                })
                setOrderState(tempArray)
            })
            .catch((error) => {
                console.log(error)
            }).then(() => {
                let totalDrinksArray = []
                orderIdArray.forEach((orderId) => {
                    let drinkArray = {orderId: '', totalDrinks: []}
                    dataBase.collection('order').doc(orderId).collection('totalDrink')
                        .get()
                        .then((snapShot) => {
                            snapShot.forEach((doc) => {
                                drinkArray = {
                                    orderId: doc.data().orderId,
                                    totalDrinks: [...drinkArray.totalDrinks, ...doc.data().totalDrinks]
                                }
                            })
                            totalDrinksArray.push(drinkArray)
                        })
                })

                setDrinkDataArray(totalDrinksArray)
                setIsLoaded(true)

            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const sendMail = (orderId, attendantEmail, fetch) => {

        console.log(attendantEmail)

        if (attendantEmail && fetch) {

            emailjs.send("gmail", "drinkArrived", {"webURL":"https://drinkbuycoding101.herokuapp.com/", "admin_email":"0114078@nkust.edu.tw", "order":orderId, targetEmail: attendantEmail}, process.env.REACT_APP_EMAILJS_USER)
			.then((result) => {
                console.log(result.text)
			}).catch((error) => {
				console.log(error.text)
            })
            
        } else if (attendantEmail) {

            emailjs.send("gmail", "drinkbuy", {"webURL":"https://drinkbuycoding101.herokuapp.com/", "admin_email":"0114078@nkust.edu.tw", "order":orderId, targetEmail: attendantEmail}, process.env.REACT_APP_EMAILJS_USER)
			.then((result) => {
                console.log(result.text)
			}).catch((error) => {
				console.log(error.text)
            })
            
        }
	}

    const myOrder = (orderData, drinkDataArray) => {
        
        if (!isLoaded) {

            return (
                <Typography>讀取中...</Typography>
            )

        } else if (isLoaded && orderData.toString() === '') {

            return (
                <Typography>您還未發起任何揪團喔</Typography>
            )
        
        } else {

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
                            <OrderCard text={'編輯'} orderData={data} drinkData={drinkDataArray} sendMail={sendMail} key={index} />
                        )

                    })}
                </Grid>
            )
        }
    }

    return (

        <Container className={classes.root} maxWidth="xl" >
            <Paper className={classes.paper}>
                {myOrder(orderData, drinkDataArray)}
            </Paper>
        </Container>
    )
}

export default Home