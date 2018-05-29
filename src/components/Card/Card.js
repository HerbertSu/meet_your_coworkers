import React, { Component } from 'react';


class Card extends Component {
    
    render(){
        return(
            <div>
                <div className ="tc ba dib pa3 bg-white-50 grow br4 bw2 shadow-5 pointer ma3">
                    <img src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_644,c_limit/best-face-oil.png" height="200px" width="auto"/>
                    <p>Hobbies: </p>

                    <p>Name: {this.props.name} </p>
                    <p>Email: {this.props.email} </p>
                    <p>Catchphrase: {this.props.catchphrase} </p>
                    <div> TV shows: </div>
                    <div> Batch: Milwakuee, WI Oct 2017 </div>
                </div>
            </div>
        )
    }
}

export default Card;