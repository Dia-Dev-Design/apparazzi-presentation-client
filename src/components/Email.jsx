import React from "react";  

const Email = ({ handleTextInput, newUser }) => {

    return (

        <div>
            <label>Email</label>
            <br />
            <input type="text" name='email' onChange={handleTextInput} value={newUser.email} placeholder="example@email.com"/>
        </div>

    )

}

export default Email