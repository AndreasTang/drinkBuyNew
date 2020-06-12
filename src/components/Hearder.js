import React, { useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'
import authContext from '../context/authContext'

const useStyles = makeStyles({
    root: {
      flexGrow: 1
    },
  });
  


const Header = () => {
  
    const classes = useStyles();
    const { currentPage, setCurrentPage } = useContext(authContext)
  
    const handleChange = (event, newPage) => {

      setCurrentPage(newPage);
      
    };
  
    return (
        <Paper square className={classes.root}>
            <Tabs
                value={currentPage}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                <Tab icon={<HomeIcon />} component={Link} to="/home" label="我的揪團" />
                <Tab icon={<ShoppingCartIcon />} component={Link} to="/orderPage" label="馬上揪團" />
                <Tab icon={<SearchIcon />} component={Link} to="/searchOrderPage" label="搜尋揪團" />
            </Tabs>
      </Paper>
    );
  }

export default Header