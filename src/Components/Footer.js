import React from "react";

import Icon from "./Icon";
import Button from "./Button";

export default ({parent, ...props}) => {
    
    let buttons = ["home", "add", "assignment", "settings", "get_app", "help"];
    
	return <div className="footer mdl-color--primary">
		{
			//textColor="white"
			buttons.map((name, i) => {
				let key = name + "_" + i;
				let isActive = parent.state.active == key;
				return <Button key={key}
					className={isActive ? "mdl-color-text--accent" : ""}
					onClick={() => parent.goto(key)}>
					<Icon >{name}</Icon>
				</Button>;
			})
		}
	</div>;
};