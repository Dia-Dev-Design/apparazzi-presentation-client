import React from "react";  

const ConfirmPassword = ({ setConfirmPassword, confirmPassword }) => {

    return (

        <div>
            <label>Confirm Password</label>
            <br />
            <input type="password" name='confirmPassword' onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Password"/>
        </div>

    )

}

export default ConfirmPassword