import React, { Component } from 'react';
import InputError from '../Register/InputError.js';
import plantWall from '../../images/infosys_plant_wall.JPG';
import './Login.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            signInEmail : "",
            signInPassword : "",
            signInErrorMsg : ""
        }
    }

    setSignInEmail = (event) =>{
        this.setState( {signInEmail : event.target.value});
    }

    setSignInPassword = (event) =>{
        this.setState( {signInPassword : event.target.value});
    }
    
    checkSignInEmail = (email) =>{
        if(!email){
            this.setState({signInErrorMsg: "Invalid email or password"})
            return false;
        }else{
            return true;
        }
    }

    checkSignInPassword = (password) =>{
        if(!password){
            this.setState({signInErrorMsg: "Invalid email or password"})
            return false;
        }else{
            return true;
        }
    }

    checkSignIn = (email,password) =>{
        if(this.checkSignInEmail(email) && this.checkSignInPassword(password)){
            console.log("authenticating user")
           this.props.authenticateUser(email, password) 
        }
    }

    render(){
        const {switchRegister} = this.props;

        return(
            <div className="flex ">
                <img alt="Infosys: Navigate Your Next" 
                    className="vh-75 w-auto br3 ba b--black-10 mv4 shadow-5"
                    height="auto" 
                    width="auto" 
                    src= {plantWall}>
                </img> 


                <article className="vh-75 br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa2 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt2">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address"
                                        onChange={this.setSignInEmail}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"  
                                        id="password"
                                        onChange={this.setSignInPassword}
                                    />
                                </div>
                                <div className="gold">
                                    {this.state.signInErrorMsg ? ( 
                                        <InputError errorMsg={this.state.signInErrorMsg}/>
                                    ) : (
                                        <div>&nbsp;</div>
                                    )} 
                                </div>
                            </fieldset>
                            <div className="">
                                <input 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign in"
                                    onClick={() =>{ 
                                        this.checkSignIn(this.state.signInEmail, this.state.signInPassword)
                                    }}
                                    />
                            </div>
                            <div className="lh-copy mt3">
                                <p className="f6 pointer link dim black db" onClick={() => switchRegister()}>Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default Login;