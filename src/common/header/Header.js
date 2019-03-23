import React, { Component } from 'react';
import './Header.css';
import { withStyles } from '@material-ui/core/styles';
import FastFoodIcon from '@material-ui/icons/Fastfood'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

const loginModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const styles = theme => ({
    searchUnderline: {
        '&:after': {
            borderBottomColor: 'white',
        },
    },
});

const TabContainer = function (props) {
    return (
        <Typography component='div' style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            loginContactNoRequired: 'display-none',
            loginContactNo: '',
            loginPasswordRequired: 'display-none',
            loginPassword: '',
            firstNameRequired: 'display-none',
            firstName: '',
            lastName: '',
            emailRequired: 'display-none',
            email: '',
            signupPasswordRequired: 'display-none',
            passwordRequired: '',
            signupContactNoRequired: 'display-none',
            signupContactNo: '',
            signupSuccess: false,
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
        }
    }

    openLoginModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            loginContactNoRequired: 'display-none',
            loginContactNo: '',
            loginPasswordRequired: 'display-none',
            loginPassword: '',
            firstNameRequired: 'display-none',
            firstName: '',
            lastName: '',
            emailRequired: 'display-none',
            email: '',
            signupPasswordRequired: 'display-none',
            passwordRequired: '',
            signupContactNoRequired: 'display-none',
            signupContactNo: '',
        });
    }

    closeLoginModalHandler = () => {
        this.setState({modalIsOpen: false});
    }

    loginModalTabChangeHandler = (event, value) => {
        this.setState({value});
    }

    inputLoginContactNoChangeHandler = (event) => {
        this.setState({loginContactNo: event.target.value});
    }

    inputLoginPasswordChangeHandler = (event) => {
        this.setState({loginPassword: event.target.value});
    }

    loginClickHandler = () => {
    }

    inputFirstNameChangeHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    inputLastNameChangeHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    inputEmailChangeHandler = (event) => {
        this.setState({email: event.target.value});
    }

    inputSignupPasswordChangeHandler = (event) => {
        this.setState({signupPassword: event.target.value});
    }

    inputSignupContactNoChangeHandler = (event) => {
        this.setState({signupContactNo: event.target.value});
    }

    singupClickHandler = () => {
    }

    render() {
        const { classes } = this.props;
        return (
            <div>

                <header className='app-header'>

                    {/* header app logo */}
                    <div className='app-logo'>
                        <FastFoodIcon id='fast-food-icon' fontSize='large' />
                    </div>

                    {/* header search box */}
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

                    {/* header app login */}
                    <div className='app-login'>
                        <Button id='login-btn' size='medium' variant='contained' color='default' onClick={this.openLoginModalHandler}>
                            <AccountCircleIcon id='login-btn-icon' />
                            LOGIN
                        </Button>
                    </div>

                </header>

                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel='Login'
                    onRequestClose={this.closeLoginModalHandler}
                    style={loginModalStyle}
                >

                    {/* tabs */}
                    <Tabs className='login-signup-tabs' value={this.state.value} onChange={this.loginModalTabChangeHandler}>
                        <Tab label='LOGIN' />
                        <Tab label='SIGNUP' />
                    </Tabs>

                    {/* login tab container */}
                    {this.state.value === 0 &&
                        <TabContainer>

                            {/* login contanct no */}
                            <FormControl required>
                                <InputLabel htmlFor='loginContactNo'>Contact No.</InputLabel>
                                <Input id='loginContactNo' type='text' logincontactno={this.state.loginContactNo} onChange={this.state.inputLoginContactNoChangeHandler} />
                                <FormHelperText className={this.state.loginContactNoRequired}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />

                            {/* login password */}
                            <FormControl required>
                                <InputLabel htmlFor='loginPassword'>Password</InputLabel>
                                <Input id='loginPassword' type='password' loginpassword={this.state.loginPassword} onChange={this.state.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />

                            <Button id='modal-login-btn' variant='contained' color='primary' onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }

                    {/* signup tab container */}
                    {this.state.value === 1 &&
                        <TabContainer>

                            {/* signup first name */}
                            <FormControl required>
                                <InputLabel htmlFor='firstName'>First Name</InputLabel>
                                <Input id='firstName' type='text' firstname={this.state.firstName} onChange={this.state.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstNameRequired}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />

                            {/* signup last name */}
                            <FormControl>
                                <InputLabel htmlFor='lastName'>Last Name</InputLabel>
                                <Input id='lastName' type='text' lastname={this.state.lastName} onChange={this.inputLastNameChangeHandler} />
                            </FormControl>
                            <br /><br />

                            {/* signup email */}
                            <FormControl required>
                                <InputLabel htmlFor='email'>Email</InputLabel>
                                <Input id='email' type='text' email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />

                            {/* signup password */}
                            <FormControl required>
                                <InputLabel htmlFor='signupPassword'>Password</InputLabel>
                                <Input id='signupPassword' type='password' signupPassword={this.state.signupPassword} onChange={this.inputSignupPasswordChangeHandler} />
                                <FormHelperText className={this.state.signupPasswordRequired}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />

                            {/* signup contact no */}
                            <FormControl required>
                                <InputLabel htmlFor='signupContactNo'>Contact No</InputLabel>
                                <Input id='signupContactNo' type='text' signupContactNo={this.state.signupContactNo} onChange={this.inputSignupContactNoChangeHandler} />
                                <FormHelperText className={this.state.signupContactNoRequired}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />

                            <Button id='modal-signup-btn' variant='contained' color='primary' onClick={this.singupClickHandler}>SIGNUP</Button>
                        </TabContainer>
                    }
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(Header);
