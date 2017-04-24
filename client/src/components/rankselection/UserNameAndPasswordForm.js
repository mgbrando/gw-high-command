import React from 'react';

function UserNameAndPasswordForm(props){
	if(props.currentPage === 'leaderRegistration'){
        return (
            <form className="userNameAndPasswordForm" onSubmit={(event) => {event.preventDefault(); props.registerGuildLeader();}}>
          		<label for="userName">Username:</label>
          		<input id="userName" type="text" name="userName" onChange={props.getUserNameInput} required />
          		<label for="password">Password:</label>
          		<input id="password" type="password" name="password" onChange={props.getPasswordInput} required />
          		<label for="confirmPassword">Confirm password:</label>
				<input id="confirmPassword" type="password" name="confirmPassword" onChange={props.getConfirmPasswordInput} required />
          		<button type="submit">Submit</button>
            </form>
        );
    }
    else if(props.currentPage === 'leaderLogin'){
        return (
            <form className="userNameAndPasswordForm" onSubmit={(event) => {event.preventDefault(); props.authorizeGuildLeader();}}>
          		<label for="loginUserName">Username:</label>
          		<input id="loginUserName" type="text" name="loginUserName" onChange={props.getUserNameInput} required />
          		<label for="loginPassword">Password:</label>
          		<input id="loginPassword" type="password" name="loginPassword" onChange={props.getPasswordInput} required />
          		<button type="submit">Submit</button>
            </form>
        );
    }
}

export default UserNameAndPasswordForm;