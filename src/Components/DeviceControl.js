import React from "react";

import Icon from "./../Components/Icon";
import Toggler from "./../Components/Toggler";


// global Data
import Icons from "./../Modules/Icons";


export default ({ parent, data = {}, ...props }) => {

    return <div className="device-control mdl-color--accent-contrast mdl-color-text--black">
		<Icon className="mdl-chip__contact  mdl-color--primary mdl-shadow--8dp">{Icons[data.icon||0]}</Icon>
		<span className="control-text"><b>{data.name}</b><br /><code>{data.location}</code></span>
		<Toggler className="control-actions" auto={data.lastState} on={<Icon power color="green" />} off={<Icon power_off color="red" />} />
		<a href="#?" className="control-actions"><Icon autorenew color="orange" /></a>
		<a href="#?" className="control-actions"><Icon create color="blue" /></a>
	</div>;
};
