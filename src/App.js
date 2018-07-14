/*
Author: Herbert Su
*/

import React, { Component } from 'react';
import './App.css';
import CardList from './components/CardList/CardList.js';
import Header from './components/Header/Header.js';
import Profile from './components/Profile/Profile.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import UserDetails from './components/UserDetails/UserDetails.js'

//TODO:
  //Create Login Page   DONE  
  //Create Server       DONE
  //Connect to Server   DONE
  //Create Database     DONE
  //Connect to Database DONE
  //Configure select statements to give details from the user details table.  DONE
  //CardList.js component is not getting the name and email of users. Figure out a way to provide robotsList = user_details  DONE
  //Add a transaction around the ./register endpoint in server.js. Udemy L229 DONE
  //Add bcrypt.compare to check hash value vs inputted password in server.js  DONE
  //After a successful registration, go to the home page of the site. DONE
  //Finish up checks on Register.js. Have checks in separate function and then call them in one big function. After
    //checks have been cleared, call registerProfile() in that big function  DONE
  //Create onLogout() function that clears state values and sets them to their default values when Logout button is
    //clicked DONE
  //Create error messages that show up when a field is incorrect during registration in Register.js  
    //What if a correct input is given in one entry, then made incorrect later? ie switch the "state" when a correct value
    //is given and switch it back when an incorrect one is given DONE
  //Format register so that the error messages on incorrect inputs don't move the other components  DONE
  //Have backend send a tailored error if we are registering with a username that's already taken DONE
  //Have the error message for the email field in Register.js display "Email is already registered" if the email 
      //is already taken DONE
  //There is still an error when you first register an account and then try clicking
      //on a profile     DONE
  //When we're in a clean state, registering a new email briefly shows a "Email already registered" error message before 
      //going to the cardlist page    DONE
  //Figure out whether to call changeUserDetails() in UserDetails.js or in App.js 
    //Ans: UserDetails.js         DONE
  //In UserDetails.js, create state variables for all of the inputs     DONE
  //Figure out when to how to show UserDetails after Register.js and before CardList.js       DONE
  //After Register.js is successful, go to new page that allows user to input their details. This should be done in 
    //the switchRegister function in App.js         DONE
  //Front end will need to updated focusedUserID once user is logged in     DONE
  //Finish up /setUserDetails in server.js    DONE
  //Create a button so once you're logged in you can change user details. Lives in the header.    DONE
  //The "Change User Details" button should be "Cancel Changes" when in the changeUserDetailsView     DONE
  //Include Navigate Your Next logo in header   DONE
  //Added an image of the plant wall on the 22nd floor to the login and registration page. Also added new font family.   DONE
  //When a new user registers their details, the values don't show up when their card is clicked        DONE
  //When registering, I don't like how it scrolls. Customize the spacing so that scrolling is unnecessary     DONE
  //Create a "Property" component for Profile.js for the user details that exist      DONE
  //There seems to be an error. Register no longer updates the emailErr field if the email is already used. What's
    //happening (I believe) is that the promise in registerProfile (in App.js) is running after checkRegistrationInputs,
    //which is causing emailErr (in Register.js) to be undefined 
    //check out https://javascript.info/async-await to learn more about Async-Awaits
    //The above issue will also solve us not getting an error when an incorrect email or password is given to Login.js  
      //DONE


  //Have PlantWall image disappear if screen is minimized too small. Instead, it should just show either the 
    //Login or Register component
  //Add a check that makes sure Joining Date in UserDetails.js is a date
  //Add comments, clean up, and update README
  //Upload photos option
  //Add default photo if no photo found
  //Set a limit on the possible text entries for user profiles
  //Add searchbar feature with dropdown menu that allows you to choose how you want to filter the people 
    //default should be by first name
  //Currently, robotsList, a list of all of the users in the database, is being saved on the backend and 
    //sent over to the front end. Should probably delete this and just have the front end call the backened/database
    //whenever it wants user information
      //Issues with changing in CardList is that it is asynchronous and I am trying to use a variable 
      //populated by fetch before fetch actually gets a chance to run
  



class App extends Component {
  

  constructor(){
    super();
    this.state={
      user: {},
      focusName: "",
      focusId: "",
      userDetailsView: false,
      profileView: false,
      login: false,
      registerView: false,
      usersList: [],
      emailAlreadyRegisteredErr: "",
    }
  }

  
  //Setter functions for state variables
  setEmailedAlreadyRegisteredErr = () => {
    this.setState({emailAlreadyRegisteredErr: "Email already exists"})
  }

  setUsersList = (list) =>{
    this.setState({usersList: list});
  }

  setFocusName = (newName) =>{
    this.setState({focusName : newName});
  };

  setFocusId = (newId) =>{
    this.setState({focusId : newId});
  };

  switchUserDetailsView = () => {
    this.setState({ userDetailsView: !this.state.userDetailsView});
  }

  switchProfileView = () =>{
    this.setState( { profileView : !this.state.profileView });
  }

  switchLogin = () => {
    this.setState( {login : !this.state.login});
  }

  switchRegister = () => {
    this.setState( {registerView : !this.state.registerView});
  }

  setUser = (userObject) => {
    this.setState( { user : userObject});
  }

  
  //For Logout button. Resets all state variables to their default values.
  onLogout = () =>{      
    this.setState({
      user:{},
      focusName:"",
      focusId:"",
      usersList: [],
      profileView: false,
      login: false,
      registerView: false
    })
  }


  //Fetches a list of users and their details in our database. The list's elements are json objects
  fetchUserList = () =>{
    return fetch('http://localhost:3000/userList')
      .then(response=> response.json())
      .then(data => {
        this.setUsersList(data.users);
      })
  }


  //Authenticates the user's email and password by contacting the backend.
  //Used in Login.js
  authenticateUser = async (loginEmail, loginPassword) => {

    return await fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email : loginEmail,
        password: loginPassword
      })
    }).then(response=> {

      if(String(response.status) === "200"){
        //Set the focusId state variable to the user logging in
        fetch('http://localhost:3000/focusedUserID')
          .then( response => response.json())
          .then( data => {
            this.setFocusId(String(data.focusedUserID))
          })
          .catch( (err) => {throw "Unable to fetch this user"})
        return response.json()  // response.json() is a Promise
      } else {
        throw("Unable to log in.")
        return false;
      }
    })
      .then(data => {
        //If the login credentials are correct, the backend should return a list of users 
        if(data){
          this.switchLogin();
          this.setUsersList(data.users);
          return true;
        }
      })
      .catch((err) => {
        return false;
      })
  }


  //Fetch a user's profile from the backend if given their userID
  fetchProfile = (userID) =>{
    fetch('http://localhost:3000/profile', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id: userID
      })
    })
      .then(response => response.json())
      .then(data =>{
        this.setUser(data.user);
    })
  }

  //Method for changing a user's details
  changeUserDetails = (joinDate, batch, techTrained, techInterest, tv, hobbies, currentProject, previousProjects) =>{
    //Response will be the user's userid if successful or false if an error occurred
    fetch('http://localhost:3000/setUserDetails', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        joinDate : joinDate, 
        batch : batch, 
        techTrained : techTrained, 
        techInterest : techInterest, 
        tv : tv, 
        hobbies : hobbies, 
        currentProject : currentProject, 
        previousProjects : previousProjects
      })
    })
    .then(response=> {
      return response.json()
    })
    .then(response => {
      if(response.status == 404){
        console.log("Failed to update user details")
        throw "Failed to update user details";
      }else{
        this.setFocusId(response.focusedUserID)
        if(this.state.login == false){
          this.switchLogin(); //Turn login to true to signify that the user is logged in.
        }
        this.switchUserDetailsView();
      }
    })
  }

  
  //Method for registering a new user profile
  registerProfile = async (firstName, lastName, email, password) => {
    return await fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
    })
    .then(data => {
      //Successful case
      if(data.status == 200){
        this.fetchUserList();
        this.switchUserDetailsView();  
      }else if(data.status == 499){   //A specific unsuccessful case
        /*
          A response-status of 499 from the server has been hard-coded to represent that
          the email used in registration already exists in the database.
        */
        throw "EMAIL ALREADY IN DATABASE";
      } else{                         //All other unsuccessful case
        throw "Could not insert into database";
      }
    })
    .catch(err=>{
      if(err == "EMAIL ALREADY IN DATABASE"){
        return "Email-Used";
      }else{
        return "Could-Not-Register";
      }
    })
  }


  

  render() {

    return (
      <div className="">
        <Header onLogout={this.onLogout} 
                login={this.state.login} 
                switchUserDetailsView={this.switchUserDetailsView}
                userDetailsView={this.state.userDetailsView}
        />

        {this.state.userDetailsView ? (
          <UserDetails changeUserDetails={this.changeUserDetails}/>
          
          ) : (
            
        !this.state.login ? (
          !this.state.registerView ? (
            <div>
              <Login 
                switchLogin={this.switchLogin} 
                authenticateUser={this.authenticateUser}
                fetchLogin={this.fetchLogin}
                switchRegister={this.switchRegister}
              />
            </div>
          ) : (
            <Register 
              registerProfile={this.registerProfile}
              switchRegister={this.switchRegister}
            />
          )
        ) : (
          !this.state.profileView ? ( 
            <CardList 
              usersList={this.state.usersList} 
              switchProfileView={this.switchProfileView}
              fetchProfile={this.fetchProfile}/>
          ) : (
            <div >
              <div className="flex justify-end pa2">
                <button  onClick={() => {this.switchProfileView()}}>
                  Back
                </button>
              </div>
              <div className="pt5 pl5 pr5 pb5">
                  <Profile user={this.state.user}/>
              </div>
            </div>
              )
            )
      )
    }
       

        
      </div>
    );
  }
}

export default App;
