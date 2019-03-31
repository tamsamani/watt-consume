import React from "react";
import Page from "./../Components/Page";


//import main modules
import DeviceControl from "./../Components/DeviceControl";
import Toggler from "./../Components/Toggler";
import Icon from "./../Components/Icon";

export default ({ parent, ...props }) => {
	//
	return <Page className="controls" {...props}>
		
		<DeviceControl parent={parent} data={{
			name : "Small Roomate",
			location : "hall & Cuisine",
			type : 0,
			lastState : 0,
			icon : 13
		}} />
		<DeviceControl parent={parent} data={{
			name: "Green Flasj",
		    location: "toilit",
	        type: 0,
	        lastState: 1,
		        icon: 19
		}} />
	</Page>;
};
