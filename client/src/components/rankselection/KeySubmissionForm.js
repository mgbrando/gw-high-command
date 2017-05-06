import React from 'react';
import IconButton from 'material-ui/IconButton';

function KeySubmissionForm(props){
  return (
        <form onSubmit={event => {event.preventDefault(); props.validateAPIKey();}}>
          <div className="leftSide">
            <label htmlFor="memberApiKey">Enter your API Key</label>
            <input 
              id="memberApiKey" 
              type="text" 
              name="memberApiKey" 
              placeholder={props.memberApiKey} 
              onChange={props.getAPIKeyInput}
              required />
          </div>
          <div className="rightSide">
            <button type="submit">Validate</button>
          </div>
        </form>
  );
}

//<Link to="/" className="nextButton"><button type="button">Next</button></Link>

export default KeySubmissionForm;      