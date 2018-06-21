import React, { Component } from 'react';
import InputError from './InputError.js'

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            registerEmail : "",
            registerPassword : "",
            firstName: "",
            lastName: "",
            fNameErrorMsg: "",
            lNameErrorMsg: "",
            passwordErrorMsg: "",
            emailErrorMsg: ""
        }
        
    }

    setRegisterEmail = (event) =>{
        this.setState( {registerEmail : event.target.value});
    }

    setRegisterPassword = (event) =>{
        this.setState( {registerPassword : event.target.value});
    }

    setFirstName = (event) =>{
        this.setState( {firstName : event.target.value});
    }

    setLastName = (event) =>{
        this.setState( {lastName : event.target.value});
    }
    
    checkStringForNumbers = (input) =>{
        let str = String(input);
        for( let i = 0; i < str.length; i++){
            if(!isNaN(str.charAt(i))){
                return true;
            }
        }
    }

    checkFirstName = (fName) => {
        if (!fName) {
            this.setState({fNameErrorMsg: "Please enter your first name"})
            return false;
        } else if (!isNaN(fName)) {
            this.setState({fNameErrorMsg: "Your name cannot be a number"});
            return false;
        } else if(this.checkStringForNumbers(fName)){
            this.setState({fNameErrorMsg: "Your name cannot contain a number"});
            return false;
        }else{
            this.setState({fNameErrorMsg: ""})
            return true;
        }
    }

    checkLastName = (lName) => {
        if (!lName) {
            this.setState({lNameErrorMsg:"Please enter your last name"})
            return false;
        } else if (!isNaN(lName)) {
            this.setState({lNameErrorMsg: "Your name cannot be a number"});
            return false;
        }else if(this.checkStringForNumbers(lName)){
            this.setState({lNameErrorMsg: "Your name cannot contain a number"});
            return false;
        }else{
            this.setState({lNameErrorMsg:""})
            return true;
        }
    }

    checkEmail = (email) => {
        try{
            if(email.includes("@") && email.includes(".com") ) {
                this.setState({emailErrorMsg: ""})
                return true;
            } else{
                this.setState({emailErrorMsg: "Invalid email"})
                return false;
            }

            
        }catch(err){
            return false;
        }
    }

    containsSpecialChars(str){
        return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
    }

    checkPassword = (password) =>{
        try{
            if(password.length < 8 || password.length > 48){ //needs length greater than 8 and less than 48
                this.setState({passwordErrorMsg:"Password must be more than 8 characters and less than 48"});
                return false;
            } else {
                this.setState({passwordErrorMsg: ""})
                if( !this.containsSpecialChars(password) ){ //needs special characters
                    this.setState({passwordErrorMsg:"Passwords needs at least one special character"})
                    return false;
                } else{
                    this.setState({passwordErrorMsg: ""})
                    if(password.toLowerCase() != password && password.toUpperCase() != password){
                        this.setState({passwordErrorMsg: ""})
                        return true;
                    } else{
                        this.setState({passwordErrorMsg: "Passwords need at least one uppercase and one lowercase letter"})
                        return false;
                    }
                }
            }
        }catch(err){
            return false;
        }
    }


    checkRegistrationInputs = (firstName, lastName, email, password) => {
        let check = true;

        if (!this.checkFirstName(firstName)){
            check = false;
        }
        
        if(!this.checkLastName(lastName)){
            check = false;
        }

        if( !this.checkEmail(email) ){
            check = false;
        }

        if( !this.checkPassword(password)){
            check = false;
        }
        
        if(check){ 
            let emailErr = this.props.registerProfile(firstName, lastName, email, password);

            if(emailErr == "Email-Used"){
                this.setState({emailErrorMsg:"Email already exists"});
            } else if (emailErr == ""){
                this.setState({emailErrorMsg:""});
            } else if (emailErr == "Could-Not-Register"){
                this.setState({emailErrorMsg:"Could not register this email"});
            } else{
                this.setState({emailErrorMsg:""});
            }
        }
    }


    render(){

        return(
            <div className="tc">
               <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3 ">
                                    <label className="db fw6 lh-copy f6" >First Name</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" 
                                        name="first_name"  
                                        id="first_name"
                                        onChange={this.setFirstName}
                                    />  
                                    <div className="gold">
                                        {this.state.fNameErrorMsg !== "" ? ( 
                                            <InputError errorMsg={this.state.fNameErrorMsg}/>
                                        ) : (
                                            <div>&nbsp;</div>
                                        )} 
                                    </div>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" >Last Name</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" 
                                        name="last_name"  
                                        id="last_name"
                                        onChange={this.setLastName}
                                    />
                                    <div className="gold">
                                        {this.state.lNameErrorMsg !== "" ? ( 
                                            <InputError errorMsg={this.state.lNameErrorMsg}/>
                                        ) : (
                                            <div>&nbsp;</div>
                                        )} 
                                    </div>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address"
                                        onChange={this.setRegisterEmail}
                                    />
                                    <div className="gold">
                                        {this.state.emailErrorMsg ? ( 
                                            <InputError errorMsg={this.state.emailErrorMsg}/>
                                        ) : (
                                            <div>&nbsp;</div>
                                        )}
                                    </div>
                                    
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"  
                                        id="password"
                                        onChange={this.setRegisterPassword}
                                    />
                                    <div className="gold">
                                        {this.state.passwordErrorMsg ? ( 
                                            <InputError errorMsg={this.state.passwordErrorMsg}/>
                                        ) : (
                                            <div>&nbsp;</div>
                                        )} 
                                    </div>
                                </div>
                                
                            </fieldset>
                            <div className="">
                                <input 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Register"
                                    onClick={() =>{ 
                                        this.checkRegistrationInputs(this.state.firstName, this.state.lastName, this.state.registerEmail, this.state.registerPassword)
                                    }}
                                    />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default Register;