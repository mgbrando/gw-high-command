import React from 'react';

function GuildSelectionForm(props){
  return (
        <form onSubmit={event => {event.preventDefault(); props.addMemberToGuilds(props.memberApiKey, event.target.value);}}>
          <div>
            <label htmlFor="memberApiKey">Select guilds to submit API KEY to</label>
            <input id="memberApiKey" type="text" name="memberApiKey" placeholder={props.memberApiKey} required />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
  );
}

//<Link to="/" className="nextButton"><button type="button">Next</button></Link>

export default GuildSelectionForm; 