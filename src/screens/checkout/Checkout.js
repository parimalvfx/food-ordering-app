import React, { Component } from 'react';
import './Checkout.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    stepperRoot: {
        // width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    tabRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    existingAddressTabContainer: {
        float: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        overflowY: 'hidden',
    },
    existingAddressGridListTile: {
        marginBottom: '50px',
        cursor: 'pointer',
    },
    existingAddressGridListTileTile: {
        padding: '25px',
    },
    existingAddressCheckCircle: {
        float: 'right',
        marginRight: '10px',
    },
    radioRoot: {
        display: 'flex',
    },
    radioFormControl: {
        margin: theme.spacing.unit * 3,
    },
    radioGroup: {
        margin: `${theme.spacing.unit}px 0`,
    },
    summaryCard: {
        // float: 'right',
        // marginLeft: '10px',
        marginRight: '15px',
        marginTop: '25px',
        // width: '360px',
    },
    placeOrderButton: {
        // width: '100%'
    },
    stepperGridItem: {
        // width: '70%',
    },
});

function getSteps() {
    return ['Delivery', 'Payment'];
}

function TabContainer(props) {
    return (
        <Typography component='div' style={{padding: 8*3}}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            tabValue: 0,
            selectedExistingAddress: '',
            flatBuildingNoRequired: 'display-none',
            flatBuildingNo: '',
            localityRequired: 'display-none',
            locality: '',
            cityRequired: 'display-none',
            city: '',
            stateRequired: 'display-none',
            newAddressState: '',
            pincodeRequired: 'display-none',
            pincodeRequiredMsg: 'required',
            pincode: '',
            customerExistingAddresses: [],
            customerExistingAddressesSelection: [],
            states: [],
            paymentModes: [],
            radioValue: '',
        }
    };

    preState = {
        activeStep: 0,
    };

    componentWillMount() {
        let that = this;

        // customer existing address
        let dataCustomerAddress = null;
        let xhrCustomerAddress = new XMLHttpRequest();
        xhrCustomerAddress.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                that.setState({
                    customerExistingAddresses: JSON.parse(this.responseText).addresses,
                });
            }
        });
        xhrCustomerAddress.open('GET', 'http://localhost:8080/api/address/customer');
        xhrCustomerAddress.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
        xhrCustomerAddress.send(dataCustomerAddress);

        // states request
        let dataStates = null;
        let xhrStates = new XMLHttpRequest();
        xhrStates.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                that.setState({
                    states: JSON.parse(this.responseText).states,
                });
            }
        });
        xhrStates.open('GET', 'http://localhost:8080/api/states');
        xhrStates.send(dataStates);

        // payment modes request
        let dataPaymentModes = null;
        let xhrPaymentModes = new XMLHttpRequest();
        xhrPaymentModes.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                that.setState({
                    paymentModes: JSON.parse(this.responseText).paymentMethods,
                });
            }
        });
        xhrPaymentModes.open('GET', 'http://localhost:8080/api/payment');
        xhrPaymentModes.send(dataPaymentModes);
    };

    stepperNextHandler = () => {
        this.setState(preState => ({
            activeStep: preState.activeStep + 1,
        }));
    };

    stepperBackHandler = () => {
        this.setState(preState => ({
            activeStep: preState.activeStep - 1,
        }));
    };

    stepperResetHandler = () => {
        this.setState({
            activeStep: 0,
        });
    };

    tabChangeHandler = (event, value) => {
        this.setState({tabValue: value});
    };

    existingAddressOnClickHandler = (addressId) => {
        this.setState({
            [this.state.selectedExistingAddress]: 'unselect-address',
            selectedExistingAddress: addressId,
            [addressId]: 'select-address',
        });
    };

    flatBuildingNoChangeHandler = event => {
        this.setState({flatBuildingNo: event.target.value});
    };

    localityChangeHandler = event => {
        this.setState({locality: event.target.value});
    };

    cityChangeHandler = event => {
        this.setState({city: event.target.value});
    };

    stateChangeHandler = event => {
        this.setState({newAddressState: event.target.value});
    };

    pincodeChangeHandler = event => {
        this.setState({pincode: event.target.value});
    };

    saveAddressOnClickHandler = () => {
        let flatBuildingNoReq = false;
        if (this.state.flatBuildingNo === '') {
            this.setState({flatBuildingNoRequired: 'display-block'});
            flatBuildingNoReq = true;
        } else {
            this.setState({flatBuildingNoRequired: 'display-none'});
        }

        let localityReq = false;
        if (this.state.locality === '') {
            this.setState({localityRequired: 'display-block'});
            localityReq = true;
        }   else {
            this.setState({localityRequired: 'display-none'});
        }

        let cityReq = false;
        if (this.state.city === '') {
            this.setState({cityRequired: 'display-block'});
            cityReq = true;
        } else {
            this.setState({cityRequired: 'display-none'});
        }

        let stateReq = false;
        if (this.state.newAddressState === '') {
            this.setState({stateRequired: 'display-block'});
            stateReq = true;
        } else {
            this.setState({stateRequired: 'display-none'});
        }

        let pincodeReq = false;
        if (this.state.pincode === '') {
            this.setState({
                pincodeRequired: 'display-block',
                pincodeRequiredMsg: 'required'
            });
            pincodeReq = true;
        } else {
            this.setState({pincodeRequired: 'display-none'});
        }

        let validatePincode = new RegExp('^[1-9][0-9]{5}$');
        if (pincodeReq === false && validatePincode.test(this.state.pincode) === false) {
            this.setState({
                pincodeRequired: 'display-block',
                pincodeRequiredMsg: 'Pincode must contain only numbers and must be 6 digits long'
            })
        }

        if (flatBuildingNoReq || localityReq || cityReq || stateReq || pincodeReq) {
            return;
        }

        let stateUUID = '';
        for (let state of this.state.states) {
            if (state.state_name === this.state.newAddressState) {
                stateUUID = state.id;
            }
        }

        // add new address
        let that = this;
        let dataNewAddress = {
            'city': this.state.city,
            'flat_building_name': this.state.flatBuildingNo,
            'locality': this.state.locality,
            'pincode': this.state.pincode,
            'state_uuid': stateUUID
        }
        let xhrNewAddress = new XMLHttpRequest();
        xhrNewAddress.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                let dataCustomerAddress = null;
                let xhrCustomerAddress = new XMLHttpRequest();
                xhrCustomerAddress.addEventListener('readystatechange', function() {
                    if (this.readyState === 4) {
                        that.setState({
                            customerExistingAddresses: JSON.parse(this.responseText).addresses,
                        });
                    }
                });
                xhrCustomerAddress.open('GET', 'http://localhost:8080/api/address/customer');
                xhrCustomerAddress.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
                xhrCustomerAddress.send(dataCustomerAddress);
                window.alert('New address added!');
            }
        });
        xhrNewAddress.open('POST', 'http://localhost:8080/api/address');
        xhrNewAddress.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
        xhrNewAddress.setRequestHeader('Content-Type', 'application/json');
        xhrNewAddress.send(JSON.stringify(dataNewAddress));
    };

    radioChangeHandler = event => {
        this.setState({radioValue: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
        const {tabValue} = this.state;

        console.log(this.state);

        return (
            <div>
                <Header />

                <Grid container={true} >
                    <Grid item={true} xs={9} className={classes.stepperGridItem}>
                        <div className={classes.stepperRoot}>
                            <Stepper activeStep={activeStep} orientation='vertical'>
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            {index === 0 ?
                                                <div className={classes.tabRoot}>
                                                    <AppBar position='static'>
                                                        <Tabs value={tabValue} onChange={this.tabChangeHandler}>
                                                            <Tab label='EXISTING ADDRESS'/>
                                                            <Tab label='NEW ADDRESS'/>
                                                        </Tabs>
                                                    </AppBar>

                                                    {/* existing address */}
                                                    {tabValue === 0 &&
                                                        <TabContainer className={classes.existingAddressTabContainer}>

                                                            <GridList className={classes.gridList} cols={3} cellHeight='auto'>

                                                                {this.state.customerExistingAddresses.map(address => (

                                                                    <GridListTile
                                                                        key={'address' + address.id}
                                                                        id={this.state[address.id] || 'unselect-address'}
                                                                        onClick={() => this.existingAddressOnClickHandler(address.id)}
                                                                        className={classes.existingAddressGridListTile}
                                                                        classes={{tile: classes.existingAddressGridListTileTile}}
                                                                    >

                                                                        {/* existing address - flat/building no */}
                                                                        <Typography variant='subtitle1'>
                                                                            {address.flat_building_name}
                                                                        </Typography>

                                                                        {/* existing address - locality */}
                                                                        <Typography variant='subtitle1'>
                                                                            {address.locality}
                                                                        </Typography>

                                                                        {/* existing address - city */}
                                                                        <Typography variant='subtitle1'>
                                                                            {address.city}
                                                                        </Typography>

                                                                        {/* existing address - state */}
                                                                        <Typography variant='subtitle1'>
                                                                            {address.state.state_name}
                                                                        </Typography>

                                                                        {/* existing address - pincode */}
                                                                        <Typography variant='subtitle1'>
                                                                            {address.pincode}
                                                                        </Typography>

                                                                        {/* existing address - check */}
                                                                        <CheckCircleIcon
                                                                            className={classes.existingAddressCheckCircle}
                                                                            nativeColor={this.state[address.id] === 'select-address' ? 'green' : 'grey'}
                                                                        />

                                                                    </GridListTile>
                                                                ))}

                                                            </GridList>

                                                        </TabContainer>
                                                    }

                                                    {/* new address */}
                                                    {tabValue === 1 &&
                                                        <TabContainer>

                                                            {/* new address - flat/building no */}
                                                            <FormControl required>
                                                                <InputLabel htmlFor='flatBuildingNo'>Flat / Building No.</InputLabel>
                                                                <Input
                                                                    id='flatBuildingNo'
                                                                    type='text'
                                                                    flatbuildingno={this.state.flatBuildingNo}
                                                                    value={this.state.flatBuildingNo}
                                                                    onChange={this.flatBuildingNoChangeHandler}
                                                                />
                                                                <FormHelperText className={this.state.flatBuildingNoRequired} error={true}>
                                                                    <span>required</span>
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <br /><br />

                                                            {/* new address - locality */}
                                                            <FormControl required>
                                                                <InputLabel htmlFor='locality'>Locality</InputLabel>
                                                                <Input
                                                                    id='locality'
                                                                    type='text'
                                                                    locality={this.state.locality}
                                                                    value={this.state.locality}
                                                                    onChange={this.localityChangeHandler}
                                                                />
                                                                <FormHelperText className={this.state.localityRequired} error={true}>
                                                                    <span>required</span>
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <br /><br />

                                                            {/* new address - city */}
                                                            <FormControl required>
                                                                <InputLabel htmlFor='city'>City</InputLabel>
                                                                <Input
                                                                    id='city'
                                                                    type='text'
                                                                    city={this.state.city}
                                                                    value={this.state.city}
                                                                    onChange={this.cityChangeHandler}
                                                                />
                                                                <FormHelperText className={this.state.cityRequired} error={true}>
                                                                    <span>required</span>
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <br /><br />

                                                            {/* new address - state */}
                                                            <FormControl required className={classes.newAddressFormControl}>
                                                                <InputLabel htmlFor='newAddressstate'>State</InputLabel>
                                                                <Select
                                                                    id='newAddressstate'
                                                                    newaddressstate={this.state.newAddressState}
                                                                    value={this.state.newAddressState}
                                                                    onChange={this.stateChangeHandler}
                                                                >
                                                                    {this.state.states.map(state => (
                                                                        <MenuItem key={'state' + state.id} value={state.state_name}>
                                                                            {state.state_name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                                <FormHelperText className={this.state.stateRequired} error={true}>
                                                                    <span>required</span>
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <br /><br />

                                                            {/* new address - pincode */}
                                                            <FormControl required>
                                                                <InputLabel htmlFor='pincode'>Pincode</InputLabel>
                                                                <Input
                                                                    id='pincode'
                                                                    type='text'
                                                                    pincode={this.state.pincode}
                                                                    value={this.state.pincode}
                                                                    onChange={this.pincodeChangeHandler}
                                                                />
                                                                <FormHelperText className={this.state.pincodeRequired} error={true}>
                                                                    <span>{this.state.pincodeRequiredMsg}</span>
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <br /><br />

                                                            <Button
                                                                variant='contained'
                                                                color='secondary'
                                                                onClick={this.saveAddressOnClickHandler}
                                                            >
                                                                Save Address
                                                            </Button>
                                                        </TabContainer>
                                                    }
                                                </div>
                                                : ''
                                            }

                                            {index === 1 ?
                                                <div className={classes.radioRoot}>
                                                    <FormControl component='fieldset' className={classes.radioFormControl}>
                                                        <FormLabel component='legend'>Select Mode of Payment</FormLabel>
                                                        <RadioGroup
                                                            aria-label='paymentModes'
                                                            name='paymentModes'
                                                            className={classes.radioGroup}
                                                            value={this.state.radioValue}
                                                            onChange={this.radioChangeHandler}
                                                        >
                                                            {this.state.paymentModes.map(paymentMode => (
                                                                <FormControlLabel
                                                                    key={'paymentMode' + paymentMode.id}
                                                                    value={paymentMode.payment_name.toLowerCase()}
                                                                    control={<Radio />}
                                                                    label={paymentMode.payment_name}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>

                                                : ''
                                            }

                                            <div className={classes.actionsContainer}>
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={this.stepperBackHandler}
                                                        className={classes.button}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        onClick={this.stepperNextHandler}
                                                        className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} className={classes.resetContainer}>
                                    <Typography variant='h6'>
                                        View the summary &#38; place your order now!
                                    </Typography>
                                    <Button onClick={this.stepperResetHandler} className={classes.button}>
                                        CHANGE
                                    </Button>
                                </Paper>
                            )}
                        </div>
                    </Grid>

                    {/* cart summary */}
                    <Grid item={true} xs>
                        <Card className={classes.summaryCard}>
                            <CardContent>
                                <Typography variant='h5'>
                                    Summary
                                </Typography>
                                <br />

                                {/* summary - restaurant name */}
                                <Typography variant='h6' color='textSecondary' gutterBottom>
                                    Loud Silence
                                </Typography>

                                <div id='tmp1' className="flex width-100 pd-1-per">
                                    <div className="width-10"><i className='fa fa-stop-circle-o non-veg'></i></div>
                                    <div className="width-40 capital checkout-grey-color">Hakka Noodles</div>
                                    <div className="width-10 checkout-grey-color">2</div>
                                    <div className="width-5 checkout-grey-color"><i className='fa fa-inr'></i></div>
                                    <div className="width-10 checkout-grey-color">408.00</div>
                                </div>

                                <div id='tmp2' className="flex width-100 pd-1-per">
                                    <div className="width-10"><i className='fa fa-stop-circle-o veg'></i></div>
                                    <div className="width-40 capital checkout-grey-color">Portuguese Salad</div>
                                    <div className="width-10 checkout-grey-color">1</div>
                                    <div className="width-5 checkout-grey-color"><i className='fa fa-inr'></i></div>
                                    <div className="width-10 checkout-grey-color">245.00</div>
                                </div>

                                <Divider />

                                {/* summary - net amount */}
                                {/* <Typography variant='subtitle2' gutterBottom>
                                    Net Amount
                                </Typography>
                                <div  className="width-10 checkout-grey-color"><i className='fa fa-inr'></i> 653.00</div> */}
                                <div className="pd-1-per">Net Amount 
                                    <span className="right mr-8">
                                        <span className="width-5 checkout-grey-color">
                                            <i className='fa fa-inr'></i>
                                        </span>
                                        653.00
                                    </span>
                                </div>


                                {/* summary - place order */}
                                <Button variant='contained' color='primary' className={classes.placeOrderButton} fullWidth={true}>
                                    Place Order
                                </Button>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Checkout.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Checkout);
