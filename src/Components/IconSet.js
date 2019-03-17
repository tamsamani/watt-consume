import React from "react";
// import Icons from "IconList";
import Icon from "./Icon";
import Button from "./Button";

//Modules
import Icons from "./../Modules/Icons";

export default ({ parent, selected }) => (<div className="iconset">
	{
		Icons.map((name,i) => <Icon className={selected==i?"mdl-color-text--primary":""} onClick={e=>parent.store.set({selectedIcon : i})} key={"iconset-"+i}>{name}</Icon>)
	}
	<Button onClick={e=>parent.showIconSet(false)} textColor="primary" text="ok" className="mdl-tabs" />
</div>);
