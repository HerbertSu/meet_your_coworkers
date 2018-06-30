import React, { Component } from 'react';


class UserDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageURL : "",
            joinDate : undefined,
            batch : undefined,
            techTrained : undefined,
            techInterest : undefined,
            tv : undefined,
            hobbies : undefined,
            currentProject : undefined,
            previousProjects : undefined
        }
    }

    setImageURL = (event) => {
        this.setState({imageURL : event.target.value})
    }

    setJoinDate = (event) => {
        this.setState({joinDate : event.target.value})
    }

    setBatch = (event) => {
        this.setState({batch : event.target.value})
    }

    setTechTrained = (event) => {
        this.setState({techTrained : event.target.value})
    }

    setTechInterest = (event) => {
        this.setState({techInterest : event.target.value})
    }

    setTV = (event) =>{
        this.setState({tv : event.target.value})
    }

    setHobbies = (event) =>{
        this.setState({hobbies : event.target.value})
    }

    setCurrentProject = (event) =>{
        this.setState({currentProject : event.target.value})
    }

    setPreviousProjects = (event) => {
        this.setState({previousProjects : event.target.value})
    }


    render(){
        return(
            <div className = "">
                <div className = "flex pa4 justify-center" >
                    <div className="pr5">
                        <div>
                            <img className="ba bw1 br2" alt="404 Phot not found." src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_644,c_limit/best-face-oil.png" height="200px" width="auto"/>
                        </div>
                        <div className="ba dib pa2 br3 bw1 shadow-5 ">
                            <input type="file" name="pic" accept="image/*" onChange={this.setImageURL}/>
                        </div>
                    </div>
                    <div className="flex flex-column pl5 justify-around">
                        <div className="flex justify-between">
                            Joining Date: <input type={"text"} onChange={this.setJoinDate} className="br3 bw1 input-reset ba bg-transparent hover-bg-blue hover-black"/>
                        </div>
                        <div className="flex justify-between">
                            Batch: <input type={"text"} onChange={this.setBatch} className="br3 bw1 input-reset ba bg-transparent hover-bg-blue hover-black "/>
                        </div>
                        <div className="flex justify-between">
                            Technologies Trained In: <input type={"text"} onChange={this.setTechTrained} className="br3 bw1 input-reset ba bg-transparent hover-bg-blue hover-black "/>
                        </div>
                        <div className="flex justify-between">
                            Technologies I'm Interested In: <input type={"text"} onChange={this.setTechInterest} className="br3 bw1 input-reset ba bg-transparent hover-bg-blue hover-black "/>
                        </div>
                        <div className="flex justify-between">
                            Favorite TV Series: <input type={"text"} onChange={this.setTV} className="br3 bw1 input-reset ba bg-transparent hover-bg-blue hover-black "/>
                        </div>
                        <div className="flex justify-between">
                            Hobbies: <input type={"text"} onChange={this.setHobbies} className="br3 bw1 input-reset ba bg-transparent hover-bg-blue hover-black "/>
                        </div>
                        <div className="flex justify-between">
                            Current Project: <input type={"text"} onChange={this.setCurrentProject} className="br3 bw1 input-reset ba bg-transparent hover-bg-blue hover-black "/>
                        </div>
                        <div className="flex justify-between">
                            Previous Projects: <input type={"text"} onChange={this.setPreviousProjects} className="br3 bw1 input-reset ba bg-transparent hover-bg-blue hover-black "/>
                        </div>
                    </div>
                </div>
                <div className="tc pa4">
                    <button onClick={() => {
                        this.props.changeUserDetails(this.state.joinDate, this.state.batch, 
                            this.state.techTrained, this.state.techInterest, 
                            this.state.tv, this.state.hobbies, 
                            this.state.currentProject, this.state.previousProjects)}}> 
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}

export default UserDetails;