import React, { Component } from 'react';
import '../../../node_modules/react-sticky-header/styles.css';
// import icon from "./navigate_your_next.png";  //TODO: Include a background image in the header?
import StickyHeader from 'react-sticky-header';


//The header component
class Header extends Component {
    
    render(){
        const {onLogout} = this.props;
        let changeUserButtonValue = "";
            if(this.props.userDetailsView){
                changeUserButtonValue = "Back";
            } else {
                changeUserButtonValue = "Change My Details";
            }
        return(
            <div id="header" className="imgbox">
                <StickyHeader
                    header={
                    <div className="bb tc pb1">
                        
                        <div className="flex justify-start pl4"> 
                            <h1 style={{color:"white"}} className="dib">Meet the Infoscions</h1>
                        </div>

                        {this.props.login ? (
                            <div className="flex justify-between pl2">
                                <button onClick={() => {this.props.switchUserDetailsView()}}>
                                    {changeUserButtonValue}
                                </button>
                            
                                <div className= "">
                                    <input type="text"></input> 
                                    <button>Search</button>
                                </div>

                                <div className="pr2">
                                    <button onClick={() => {onLogout()}}>Logout</button>
                                </div>
                            </div>
                        ):(
                            <div>
                                &nbsp;
                            </div>
                        )
                        }

                    </div>
                }
                headerOnly={true}
                backgroundColor={"#016ECF"}
                backgroundImage={"indy_skyline.jpg"}
                className="center-fit"
            >
                <section>
                    
                </section>

            </StickyHeader>
            </div>
        )
    }
}

export default Header;