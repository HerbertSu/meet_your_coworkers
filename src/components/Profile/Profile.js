import React, { Component } from 'react';
import Property from './Property.js';

class Profile extends Component {    
    
    render(){
        const {user} = this.props;

        delete user["key"];

        let key_value_pairs = Object.entries(user);

        let properties = key_value_pairs.map( (array) => {
            var newObj = {};
                newObj[array[0]] = array[1];
            return newObj;
        })
        


        
        for (let i = 0; i <properties.length; i++){
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
                <img className= "ba bw1 br2" alt="404 seriously, where is it" src="http://podkarpackie.regiopedia.pl/sites/default/files/imagecache/200x200/sites/all/themes/regiopedia_theme/img/no_sprite/default-avatar.png" height="200px" width="auto"/>
                
                <div className="">
                    {propertyComponent}
                </div>

                {/* 
                    <div className="flex justify-start pl4 pt1 pb1">
                        Favorite Movie: The Curious Case of Benjamin Button 
                    </div>
                    <div className="flex justify-start pl4 pt1 pb1">
                        Favorite Song: "Electric Love" by B0rns
                    */}
            </div>
        )
    }
}

export default Profile;