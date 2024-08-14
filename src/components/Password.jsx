import React from "react";  

const Password = ({ handleTextInput, user }) => {

    return (

        <div>
            <label>Password</label>
            <br/>
            <input type="password" name='password' onChange={handleTextInput} value={user.password} placeholder="password"/>
        </div>

    )

}

export default Password