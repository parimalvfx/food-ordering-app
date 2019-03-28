import React, { Component } from 'react';
import './Details.css';
import dummy from './dummy.js'
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon  from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({});

class Details extends Component {
    constructor(props){
        super(props)
        this.state={
            open: false,
            btnClicked:'',
            checkoutArr:[],
            itemAdded:0,
            totalPrice:0
        }
    }

    getCategory=()=>{
        let data = this.props.data || dummy
        let dataLength =  data.categories && data.categories.length
        return dataLength > 0 ?
            data.categories.map((item,index)=>{
                return <span key={index}>{item.category_name}{dataLength === index+1 ? '':', '} </span>
            }):null
    }

    getEachDish=(item_list, category_name)=>{
        return item_list.map((item, index)=>{
            item={...item,'category_name':category_name}
            return <div className="flex pd-1-per" key={index}>
                <div className="flex-5"><i className={item.item_type==='NON_VEG' ? 'fa fa-circle non-veg':'fa fa-circle veg'}></i></div>
                <div  className="flex-75">{item.item_name}</div>
                <div  className="flex-10"><i className='fa fa-inr'></i> {item.price}</div>
                <div  className="flex-10 plus-btn">
                    <IconButton  aria-label="Add" style={{padding:'1px'}} onClick={this.addMenuClick(item)}>
                        <AddIcon  />
                    </IconButton>
                </div>
            </div>
        })
    }

    getCheckoutDishList=(checkoutArr)=>{
        return checkoutArr.map((item, index)=>{
            return <div className="flex width-100 pd-1-per" key={index}>
                <div className="width-5"><i className={item.item_type==='NON_VEG' ? 'fa fa-stop-circle-o non-veg':'fa fa-stop-circle-o veg'}></i></div>
                <div  className="width-40 capital">{item.item_name}</div>
                <div  className="width-45">
                    <IconButton  aria-label="AddIcon" style={{padding:'1px'}} onClick={this.addMenuClick(item)}>
                        <AddIcon  />
                    </IconButton>
                    {item.count}
                    <IconButton  aria-label="Add" style={{padding:'1px'}} onClick={this.addMenuClick(item)}>
                        <AddIcon  />
                    </IconButton>
                </div>
                <div  className="width-10"><i className='fa fa-inr'></i> {item.totalItemPrice}</div>

            </div>
        })
    }
    getCategoryList =()=>{
        let data = this.props.data || dummy
        let dataLength =  data.categories && data.categories.length
        return dataLength > 0 ?
            data.categories.map((item,index)=>{
                return <div className="mt-15">
                    <div>{item.category_name}</div>
                    <Divider />
                    {this.getEachDish(item.item_list, item.category_name)}
                </div>
            }):null
    }
    addMenuClick =item=>event => {
        let selectedItem,newAdded
        let duplicates = this.state.checkoutArr.filter(data=>item.id === data.id && item.category_name === data.category_name)
        if(duplicates.length>0){
            selectedItem=this.state.checkoutArr.map(eachItem=>{
                if(eachItem.id === duplicates[0].id && eachItem.category_name === duplicates[0].category_name){
                    let count = duplicates.length+1
                    eachItem.count = count
                    eachItem.totalItemPrice = eachItem.price*count
                }
                return eachItem
            })
            newAdded = [...selectedItem]
        } else {
            let count = duplicates.length+1
            selectedItem = {...item, count:count, totalItemPrice :item.price*count}
            newAdded = [...this.state.checkoutArr, selectedItem]
        }


        console.log(newAdded)
        const itemLength = this.state.itemAdded+1
        const totalPrice = this.state.totalPrice+item.price
        this.setState({checkoutArr:newAdded, open: true, btnClicked:'ADD', itemAdded: itemLength, totalPrice:totalPrice});
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false, btnClicked:'' });
    };
    checkoutHandler=()=>{
        if(this.state.checkoutArr && this.state.checkoutArr.length === 0){
            this.setState({open:true, btnClicked:'CHECKOUT'})
        }
    }

    render() {
        const restroData =  dummy
        const {photo_URL, restaurant_name, address, customer_rating,average_price, number_customers_rated} = restroData
        return (
            <>
                <Header />
                <div className="detail-container">
                    <div className = "container_item1">
                        <img src = {photo_URL} width="200" height="200"/>
                    </div>
                    <div className = "container_item2">
                        <h1>{restaurant_name}</h1>
                        <h3>{address.locality}</h3>
                        <h3>{this.getCategory()}</h3>
                        <div className = "item_container">
                            <div className = "container_item3">
                                <i className='fa fa-star'></i>
                                {customer_rating}
                                <p className = "text_format">AVERAGE RATING BY<br/><span className="bold">{number_customers_rated}</span> CUSTOMERS</p>
                            </div>
                            <div className = "container_item3">
                                <i className='fa fa-inr'></i>
                                {average_price}
                                <p className = "text_format">AVERAGE COST FOR<br/>TWO PEOPLE</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex padding-itembox">
                    <div className="flex-50">{this.getCategoryList()}</div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{
                            this.state.btnClicked === 'ADD' ?
                                'Item added to cart!' :
                                this.state.btnClicked === 'CHECKOUT' ?'Please add an item to your cart!':''}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    <div className="flex-50">
                        <Card className="margin-2em">
                            <CardContent>
                                <Typography variant="h5"  color="default" gutterBottom>
                                    <Badge badgeContent={this.state.itemAdded} color="primary">
                                        <ShoppingCart />
                                    </Badge>
                                    <span className="mycart">My Cart</span>
                                </Typography>
                                <div className="bold">Total Amount <span className="right mr-8"><i className='fa fa-inr'></i> {this.state.totalPrice}</span></div>
                                {this.getCheckoutDishList(this.state.checkoutArr)}
                                <Button className="mt-24-px" variant="contained" fullWidth size="medium" color="primary" onClick={this.checkoutHandler}>
                                    CHECKOUT
                                </Button>
                            </CardContent>

                        </Card>
                    </div>
                </div>
            </>
        )
    }
}

export default withStyles(styles)(Details);