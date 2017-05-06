import React from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import './RankSelection.css';

function SectionNavigation(props){
	if(props.previous && props.next){
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
	}
}

//<Link to="/" className="nextButton"><button type="button">Next</button></Link>

export default SectionNavigation; 