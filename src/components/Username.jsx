import React from "react";  

const Username = ({ handleTextInput, newUser }) => {

    return (

        <div>
            <label>Username</label>
            <br/>
            <input name='username' onChange={handleTextInput} value={newUser.Username} placeholder="username"/>
        </div>

    )

}

export default Username