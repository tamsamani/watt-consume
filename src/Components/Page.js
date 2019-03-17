import React from "react";

export default ({ parent, className = "", ...props }) => (<div className={"page " + className} parent={parent} {...props}>
    {props.children}
</div>);