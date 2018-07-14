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


    /*
        Below, I am attempting to have react show an error message if the login email does not exist in the database.
    This means the front end has to ask the server to check with the database to see if the given email
    exists in the database. The database then responds to the server, which then responds to the 
    front-end. Since I will need to use a fetch() function (which is a Promise) that lives in 
    App.js (the parent of Login.js), I ran into an issue where the code in Login.js would finish running
    before my fetch in App.js finished. Login.js then wouldn't show an error message because it wouldn't 
    know if there was an error or not. Instead, emailErr was 'undefined'.
    
    To solve this, I had to make sure authenticateUser() ran completely in App.js before it finshed and reentered
    checkSignIn. This was done by making both checkSignIn() and authenticateUser() 
    asynchronous, while making everything inside authenticateUser() synchronous. The latter part was achieved by
    adding the "await" keyword in front of the fetch() inside authenticateUser(), which forces JS to wait until
    fetch() finishes before moving on with the rest of authenticateUser()
    */
    checkSignIn = async (email,password) =>{
        if(this.checkSignInEmail(email) && this.checkSignInPassword(password)){
           let emailErr = await this.props.authenticateUser(email, password);
           if(emailErr == false ){
               console.log("THE RESULT", emailErr);
               this.setState({signInErrorMsg :"Invalid email or password"})
           } else{
                this.setState({signInErrorMsg :""})
           }
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