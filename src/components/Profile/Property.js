import React, { Component } from 'react';

class Property extends Component {    
    render(){
        const {property, value} = this.props;
        //create dictionary here HI THIS IS THE USER
        const propertiesDict = {
            batch : "Training Batch",
            batch_tech : "Technology Trained in My Batch",
            current_project : "Current Project",
            favorite_tv : "Favorite TV Show(s)",
            first_name : "First Name",
            hobbies : "Hobbies",
            joining_date : "Joining Date",
            last_name: "Last Name",
            previous_projects: "Previous Projects",
            tech_interested_in: "Technology I'm Interested In",
            useremail: "Email",
            userid: "User ID"
        }
        return(
            <div className="flex flex-column items-start pl4">
                {/* <span> <a className="br3 bw1 input-reset ba bg-transparent">{property} </a> : <a> {value} </a> </span> */}
                <span> <a className="tc ba dib pa1 bg-white-50 br2 bw1 shadow-5 ma1">{propertiesDict[property]} </a> <a className="tc ba dib pa1 bg-light-gray br2 bw1 shadow-5 ma1"> {value} </a> </span>
            </div>
        )
    }
}

export default Property;