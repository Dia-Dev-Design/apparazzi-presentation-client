import React from "react";  

const Username = ({ handleTextInput, user }) => {

    return (

        <div>
            <label>Username</label>
            <br/>
            <input name='username' onChange={handleTextInput} value={user.Username} placeholder="username"/>
        </div>

    )

}

export default Username