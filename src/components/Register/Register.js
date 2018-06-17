import React, { Component } from 'react';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            registerEmail : "",
            registerPassword : "",
            firstName: "",
            lastName: ""
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
    
    checkFirstName = (fName) => {
        if (!fName) {
            console.log("Please enter your first name")
            return false;
        } else if (!isNaN(fName)) {
            console.log("Your name cannot be a number");
            return false;
        } else{
            return true;
        }
    }

    checkLastName = (lName) => {
        if (!lName) {
            console.log("Please enter your last name")
            return false;
        } else if (!isNaN(lName)) {
            console.log("Your name cannot be a number");
            return false;
        } else{
            return true;
        }
    }

    checkEmail = (email) => {
        try{
            if(email.includes("@") && email.includes(".com") ) {
                return true;
            } else{
                console.log("email missing @ or .com")
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
                console.log("not more than 8 or less than 48")
                return false;
            } else {
                if( !this.containsSpecialChars(password) ){ //needs special characters
                    console.log("needs special characters")
                    return false;
                } else{
                    if(password.toLowerCase() != password && password.toUpperCase() != password){
                        return true;
                    } else{
                        console.log("Needs uppercase and lowercase")
                        return false;
                    }
                }
            }
        }catch(err){
            return false;
        }
    }


    checkRegistrationInputs = (firstName, lastName, email, password) => {
        if(this.checkFirstName(firstName) && this.checkLastName(lastName) && this.checkEmail(email) && this.checkPassword(password)){
            this.props.registerProfile(firstName, lastName, email, password)
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
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" >First Name</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" 
                                        name="first_name"  
                                        id="first_name"
                                        onChange={this.setFirstName}
                                    />
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