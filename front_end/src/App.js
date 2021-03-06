import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import Particles from 'react-particles-js';

const particlesOptions = {
    particles: {
      number: {
        value: 300,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}

const initialState = {
  input: '',
  imageUrl: '',
  box:{},
  route: 'signin',
  isSignedIn:false,
  user: {
    id: '',
    name: '',
    email: '',            
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = data =>{
    this.setState({user : {
        email: data.email,
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box})
  }

  // To be used to set state parameter "input" to whatever the user inputs into the text box
  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }


  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    fetch('https://fierce-escarpment-56631.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then( response => {
      if(response){
        fetch('https://fierce-escarpment-56631.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(this.setState(Object.assign(this.state.user, {entries: count}))
          )
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
      // console.log();
    })
    .catch(err => console.log(err))
      // there was an error 
  }


  onRouteChange= (route) => {
    if(route === "signout"){
      this.setState(initialState)
    } else if (route === "home"){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


  render() { 
    return (
      <div className="App">
        <Particles className="particles" 
              params={particlesOptions}
            />

        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route ==='home' ?
            <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm isSignedIn={this.isSignedIn} onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
            
            :
            ( this.state.route === 'signin' || this.state.route === 'signout'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div> 
    );
  }
}

export default App;
