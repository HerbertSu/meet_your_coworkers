let funct = () => {
    console.log("4");
}


let firstFunct = async (message) => {
    console.log(message);
    return message;
}

let secondFunct = (message)=>{
    console.log("1");
    
    let message2 = firstFunct("2");
    console.log(message);

    funct();
    

}