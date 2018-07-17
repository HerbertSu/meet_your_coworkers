import React, { Component } from 'react';

//Component used in Register.js for displaying error messages
class InputError extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {this.props.errorMsg}
            </div>
        )
    }
}

export default InputError;