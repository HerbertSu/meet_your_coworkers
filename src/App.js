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


  //Finish up /setUserDetails in server.js
  //Figure out whether to call changeUserDetails() in UserDetails.js or in App.js
  //In UserDetails.js, create state variables for all of the inputs
  //After Register.js is successful, go to new page that allows user to input their details. This should be done in 
    //the switchRegister function in App.js   
  //Upload photos option
  //Add default photo if no photo found
  //Create options to change user details
  //Include Navigate Your Next logo in header
  //Use a better header photo
  


class App extends Component {
  
  

  constructor(){
    super();
    this.state={
      user: {},
      userEmail: "",
      focusName: "",
      focusId: "",
      userDetailsView: false,
      profileView: false,
      login: false,
      robotsList: [],
      registerView: false
    }
  }
  componentDidMount(){
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => console.log(data))
  }
  
  setRobotsList = (list) =>{
    this.setState({robotsList: list});
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

  onLogout = () =>{      
    this.setState({
      user:{},
      focusName:"",
      focusId:"",
      robotsList: [],
      userEmail: "",
      profileView: false,
      login: false,
      registerView: false
    })
  }

  fetchUserList = () =>{
    fetch('http://localhost:3000/userList')
      .then(response=> response.json())
      .then(data => {
        this.setRobotsList(data.robots);
        console.log('the robots list', this.state.robotsList)
      })
  }


  authenticateUser = (loginEmail, loginPassword) => {
    let user = {};

    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email : loginEmail,
        password: loginPassword
      })
    }).then(response=> {
      if(String(response.status) == "200"){  
        return response.json()
      } else {
        throw("Something went wrong")
      }
    })
      .then(data => { 
        if(data){
          this.switchLogin();
          this.setRobotsList(data.robots);
        } 
      })
      .catch((err) => {
        console.log(err)
      })
  }


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
        console.log("THE DATA.ROBOT in fetchProfile", data.robot)
        this.setUser(data.robot);
    })
  }

  changeUserDetails = (joinDate, 
    batch, 
    techTrained, 
    techInterest, 
    tv, 
    hobbies, 
    currentProject, 
    previousProjects) =>{
    // fetch
    //response will be userid if successful or false if an error occurred
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
    .then(response => {
      console.log(response)
      if(response.status == 404){
        console.log("Failed")
      }else{
        this.setFocusId(response)
      }
    })
  }

  registerProfile = (firstName, lastName, email, password) => {
    fetch('http://localhost:3000/register', {
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
      if(data.status == 200){
        console.log("STATUS IS 200")
        this.fetchUserList();
        this.switchUserDetailsView(); //if successful, call this.switchLogin();
          this.switchLogin();

      }else if(data.status == 499){
        throw "EMAIL ALREADY IN DATABASE";

      } else{
        throw "Could not insert into database";
      }
    })
    .then(response => response.json())
    .then(data=> {console.log("this is the data", data)})
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
        <Header onLogout={this.onLogout}/>

        {this.state.userDetailsView ? (
          <UserDetails/>
          
          ) : (
            <div>
          </div>
          )
        }

        {!this.state.login ? (
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
            />
          )
        ) : (
          !this.state.profileView ? ( 
            <CardList 
              robotsList={this.state.robotsList} 
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
                  <Profile user={this.state.user}  focusId={this.state.focusId}/>
              </div>
            </div>
              )
            )
        }
       

        
      </div>
    );
  }
}

export default App;
