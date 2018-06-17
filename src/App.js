import React, { Component } from 'react';
import './App.css';
import CardList from './components/CardList/CardList.js';
import Header from './components/Header/Header.js';
import Profile from './components/Profile/Profile.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';

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
  



class App extends Component {
  
  

  constructor(){
    super();
    this.state={
      user: {},
      userEmail: "",
      focusName: "",
      focusId: "",
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
    }).then(response=> response.json())
      .then(data => {
        if(data){
          this.switchLogin();
          this.setRobotsList(data.robots);

        } else {
          throw("Something went wrong")
        }
      })
      .catch((err) => {
        console.log(err)
        //TODO add a <LoginError /> component to say "Wrong username or password"
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
        this.setUser(data.robot);
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
      if(data){
        this.fetchUserList();
        this.switchLogin();
      }else{
        throw "Something went wrong";
      }
    })
    .catch(err=>{
      console.log("An error has occurred", err);
    })
  }

  

  render() {

    return (
      <div className="">
        <Header onLogout={this.onLogout}/>

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
              switchRegister={this.switchRegister}
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
