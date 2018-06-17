import React, { Component } from 'react';
import '../../../node_modules/react-sticky-header/styles.css';
import icon from "./navigate_your_next.png";
import StickyHeader from 'react-sticky-header';

class Header extends Component {
    
    render(){
        const {onLogout} = this.props;
        return(
            <div>
                <StickyHeader
                header={
                    <div className="bb tc pb1 pt2">
                        {/* <img alt="Infosys: Navigate Your Next" src= {icon} /> */}
                        <div> 
                            <h1 className="ba bw2 dib br4 tc pa2 bg-white-50">Infosys: Navigate Your Next</h1>
                        </div>
                        <div className="flex justify-between pl2">
                            <button>Home</button>
                        
                            <div className= "">
                                <input type="text"></input> 
                                <button>Search</button>
                            </div>
                            <div className="pr2">
                                <button onClick={() => {onLogout()}}>Logout</button>
                            </div>
                        </div>
                    </div>
                }
                headerOnly={true}
                backgroundImage={"https://admissions.iupui.edu/images/jaguar-life/thecity-skyline-banner.jpg"}
                >
                <section>
                    
                </section>

                </StickyHeader>
            </div>
        )
    }
}

export default Header;