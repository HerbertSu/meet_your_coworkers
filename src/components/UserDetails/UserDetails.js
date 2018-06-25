import React, { Component } from 'react';


class UserDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageURL : ""
        }
    }

    setImageURL = (event) => {
        this.setState({imageURL : event.target.value})
        console.log(event.target.value)
    }
    render(){
        return(
            <div className = "tc" >   
                <div>
                    <img className="ba bw1 br2" alt="404 Phot not found." src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_644,c_limit/best-face-oil.png" height="200px" width="auto"/>
                </div>
                <div className="ba dib pa2 br4 bw1 shadow-5 ">
                    <input type="file" name="pic" accept="image/*" onChange={this.setImageURL}/>
                </div>
            </div>
        )
    }
}

export default UserDetails;