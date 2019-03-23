import React, { Component } from 'react';
import './Header.css';
import { withStyles } from '@material-ui/core/styles';
import FastFoodIcon from '@material-ui/icons/Fastfood'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const styles = theme => ({
    searchUnderline: {
        '&:after': {
            borderBottomColor: 'white',
        },
    },
});

class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>

                <header className='app-header'>

                    <div className='app-logo'>
                        <FastFoodIcon id='fast-food-icon' fontSize='large' />
                    </div>

                    <div className='search-box'>
                        <Input
                            id='search-box-input'
                            classes={{
                                underline: classes.searchUnderline,
                            }}
                            type='text'
                            placeholder='Search by Restaurant Name'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <SearchIcon id='search-box-icon' />
                                </InputAdornment>
                            }
                        />
                    </div>

                    <div className='app-login'>
                        <Button id='login-btn' size='medium' variant='contained' color='default'>
                            <AccountCircleIcon id='login-btn-icon' />
                            LOGIN
                    </Button>
                    </div>

                </header>

            </div>
        )
    }
}

export default withStyles(styles)(Header);
