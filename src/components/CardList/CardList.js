import React, { Component } from 'react';
import Card from '../Card/Card.js';

class CardList extends Component {
    render(){
        const cardComponent = (this.props.robotsList).map( (user, i) =>{
            return(
                <Card 
                    key={i}
                    name={user.name}
                    email={user.email}
                    catchphrase={user.company.catchphrase}
                />
            )
        })
        return(
            <div>
                {cardComponent}
            </div>
        )
    }
}

export default CardList;