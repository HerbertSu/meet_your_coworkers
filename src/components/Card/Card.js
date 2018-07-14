import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    
    render(){
        return(
            <div>
                <div className ="tc ba dib pa4 bg-white-50 grow br4 bw2 shadow-5 pointer ma3">
                        <div className="flex justify-start">
                            <img className="ba bw1 br2" alt="404 Phot not found." src="http://podkarpackie.regiopedia.pl/sites/default/files/imagecache/200x200/sites/all/themes/regiopedia_theme/img/no_sprite/default-avatar.png" height="200px" width="auto"/>
                            {/* <img className="ba bw1 br2" alt="404 Phot not found." src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_644,c_limit/best-face-oil.png" height="200px" width="auto"/> */}
                            <div className="pa2">
                                <div className="">    
                                    <p className="b element">Name: </p> <div style={{overflow:"hidden",maxWidth:"15em", width:"15em", height: "2em"}} className="element">{this.props.name} </div>
                                    <p className="b element">Email: </p> <div className="element" style={{overflow:"hidden",maxWidth:"15em", width:"15em", height: "2em"}}> {this.props.email} </div>
                                </div>
                                {/* <div>
                                    <div className="b element"> Batch: </div> <div style={{overflow:"hidden",maxWidth:"20em", width:"15em", height: "2em"}} className="element">Milwakuee, WI Oct 2017</div> 
                                </div> */}
                            </div>
                                
                        </div>
                </div>
            </div>
        )
    }
}

export default Card;