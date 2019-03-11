import React from "react";

export default ({ className = "", text = "", color, textColor, fab, raised, colored, accent, ...props }) => {
	let classes = "mdl-button mdl-js-button mdl-js-ripple-effect ";
	if (fab) classes += "mdl-button--fab ";
	else if (raised) classes += "mdl-button--raised ";

	if (colored) classes += "mdl-button--colored ";
	else if (accent) classes += "mdl-button--accent ";

	if (color) classes += "mdl-color--" + color + " ";
	if (textColor) classes += "mdl-color-text--" + textColor + " ";

	return <button className={classes + className} {...props}>{props.children || text}</button>;
};