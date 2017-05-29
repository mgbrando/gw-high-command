import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

//iconElementLeft={<IconButton><NavigationClose /></IconButton>}

function WelcomeBar(props){
  return (
    <div className="welcomeBar">
      <AppBar
        title={<span>Welcome, {props.user}!</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FlatButton label="Log Out" onClick={props.logOut}/>}
      />
    </div>
  );
	/*if(props.previous && props.next){
		return (
    	<div className="registrationNavigation">
    		<IconButton className="previousButton" iconClassName="" onClick={() => props.changeSection(props.previousSection)}>
    			<NavigationArrowBack />
    		</IconButton>
      		<IconButton className="nextButton" iconClassName="" disabled={props.nextButtonDisabled} onClick={() => props.changeSection(props.nextSection)}>
      			<NavigationArrowForward />
      		</IconButton>
    	</div>
    	);
	}
	else if(props.next){
		return (
    		<div className="registrationNavigation">
      			<IconButton className="nextButton" iconClassName="" disabled={props.nextButtonDisabled} onClick={() => props.changeSection(props.nextSection)}>
      				<NavigationArrowForward />
      			</IconButton>
    		</div>
  		);
	}*/
}

//<Link to="/" className="nextButton"><button type="button">Next</button></Link>

export default WelcomeBar; 