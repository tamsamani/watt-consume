import React, { useState } from "react";


export default function({ parent, auto, on = "ON", off = "OFF", onToggle, className = "", ...props }) {

    const [isOn, toggle] = useState(!!auto);
    return (<div
        onClick={e => {
		    toggle(!isOn);
		    if (typeof onToggle == "function") onToggle(e, isOn);
        }}
        className={"toggler "+className} >
		{ isOn ? on:off }
	</div>);
};
