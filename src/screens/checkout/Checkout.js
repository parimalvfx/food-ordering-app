import React, { Component } from 'react';
import './Checkout.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';

const styles = theme => ({});

class Checkout extends Component {
    constructor(props){
        super(props)
        console.log(props.history.location.state)
        
    }
    render() {
        return (
            <div>
                <Header />
                <h1>Checkout page</h1>
            </div>
        )
    }
}

export default withStyles(styles)(Checkout);
