import React from "react";
// import Icons from "IconList";
import Icon from "./Icon";
import Button from "./Button";

export default ({parent, selected}) => (<div className="iconset">
	{
		parent.Icons.map((name,i) => <Icon className={selected==i?"mdl-color-text--primary":""} onClick={e=>parent.setState({selectedIcon : i})} key={"iconset-"+i}>{name}</Icon>)
	}
	<Button onClick={e=>parent.showIconSet(false)} textColor="primary" text="ok" className="mdl-tabs" />
</div>);