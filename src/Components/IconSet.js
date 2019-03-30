import React, { useState } from "react";
// import Icons from "IconList";
import Icon from "./Icon";
import Button from "./Button";

//Modules
import Icons from "./../Modules/Icons";

export default ({ parent, selected }) => {
	const [selectedIcon, useSelectedIcon] = useState(selected);
	return (<div className="iconset">{
		Icons.map((name, i) => <Icon className={selectedIcon==i?"mdl-color-text--primary":""} onClick={e=>parent.store.set({selectedIcon : i})&&useSelectedIcon(i)} key={"iconset-"+i}>{name}</Icon>)
	}
	<Button onClick={e=>parent.actions.showIconSet(false)} textColor="primary" text="ok" className="mdl-tabs" />
</div>)
};
