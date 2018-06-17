import React, { Component } from 'react';
import Property from './Property.js';

class Profile extends Component {    
    
    render(){
        const {user, focusId} = this.props;

        //retrieve all of the non-null user properties from Profiles table and save it in an array
        //do the array-of-components thing to show them all

        console.log("HI THIS IS THE USER", user)
        
        let key_value_pairs = Object.entries(user);

        let properties = key_value_pairs.map( (array) => {
            var newObj = {};
                newObj[array[0]] = array[1];
            return newObj;
        })
        


        
        for (let i = 0; i <properties.length; i++){
            let key = Object.keys(properties[i])[0];
            let value = properties[i][Object.keys(properties[i])[0]];
            if(!value || value === null || value === ""){             
                properties.splice(i, 1);
                i--;
            }
        }
        
        const propertyComponent = properties.map((element) => {
            return(
                <div>
                    <Property property={Object.keys(element)[0]} value={element[Object.keys(element)[0]]} />
                </div>
            )
        })

        return(
            <div className="flex flex-row justify-center tc">
                <img className= "ba bw1 br2" alt="404 seriously, where is it" src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_644,c_limit/best-face-oil.png" height="200px" width="auto"/>
                
                <div className="">
                    {propertyComponent}
                </div>

                {/* <div className="flex flex-column items-start pb4 pr4 pl4">
                    <div className="flex justify-start pl4">
                        Name: {user.name}
                    </div>
                    <div className="flex justify-start pl4 pt2 pb1">
                        Email: {user.email}
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Phone: {user.phone}
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Catchphrase: {user.catchphrase}
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Favorite Movie: The Curious Case of Benjamin Button 
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Favorite Song: "Electric Love" by B0rns
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Favorite TV Show: Game of Thrones
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Batch: Milwakuee
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Current Project: Eli Lilly
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Technologies I'm interested in: Web Design
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Profile;