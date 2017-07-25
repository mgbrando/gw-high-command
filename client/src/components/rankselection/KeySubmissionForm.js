import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

function KeySubmissionForm(props){
  return (
        <form className="keySubmissionForm" onSubmit={event => {event.preventDefault(); props.validateAPIKey();}}>
          <div className="leftSide">
            <label htmlFor="memberApiKey">Enter your API Key</label>
            <div className="error">{props.memberValidationMessage}</div>
            <input 
              id="memberApiKey" 
              type="text" 
              name="memberApiKey" 
              placeholder={props.memberApiKey} 
              onChange={props.getAPIKeyInput}
              required />
          </div>
          <div className="rightSide">
            <RaisedButton className="validateButton" type="submit" primary={true} label="Validate" />
          </div>
        </form>
  );
}

//<Link to="/" className="nextButton"><button type="button">Next</button></Link>

export default KeySubmissionForm;      