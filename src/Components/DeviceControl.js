import React from "react";

import Icon from "./../Components/Icon";
import Toggler from "./../Components/Toggler";


// global Data
import Icons from "./../Modules/Icons";


export default ({ parent, data = {}, ...props }) => {

	return <div className="device-control mdl-color--accent-contrast mdl-color-text--black">
		<Icon className="mdl-color--primary mdl-shadow--8dp">{Icons[data.icon||0]}</Icon>
		<span className="control-text"><b>{data.name}</b><br /><code>{data.location}</code></span>
		<div className="control-actions">
			<Toggler className="control-action"
                auto={data.lastState} 
                on={<Icon power color="green" />} 
                off={<Icon power_off color="red" 
                onToggle={e=>{}} />} />
			<a href="#?" className="control-action"><Icon autorenew color="orange" /></a>
			<a href="#?" className="control-action"><Icon create color="blue" /></a>
		</div>

	</div>;
};
