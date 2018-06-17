import React, { Component } from 'react';

class Property extends Component {    
    render(){
        const {property, value} = this.props;

        return(
            <div className="flex flex-column items-start pb1 pt1 pr4 pl4">
                {property} : {value}
            </div>
        )
    }
}

export default Property;