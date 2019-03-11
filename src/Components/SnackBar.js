import React from "react";

export default ({id, ...props}) => {
	return (<div id={id} className="mdl-js-snackbar mdl-snackbar">
    <div className="mdl-snackbar__text"></div>
        <button className="mdl-snackbar__action" type="button"></button>
    </div>);
};