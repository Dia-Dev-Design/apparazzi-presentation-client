import React from "react";  

const Password = ({ handleTextInput, newUser }) => {

    return (

        <div>
            <label>Password</label>
            <br/>
            <input type="password" name='password' onChange={handleTextInput} value={newUser.password} placeholder="password"/>
        </div>

    )

}

export default Password