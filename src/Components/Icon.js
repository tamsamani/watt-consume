import React from "react";

export default ({ className = "", color = "", ...props }) => {
	let name = props.children || Object.keys(props)[0];
	if (color) {
		className += " mdl-color-text--"+color;
	}
	return <i className={"material-icons " + className} {...props}>{name}</i>;
};