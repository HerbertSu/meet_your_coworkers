import React, { Component } from 'react';

class InputError extends Component {
    
    constructor(props){
        super(props);
        this.state = {

        };
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