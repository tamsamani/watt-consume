import React from "react";

export default ({ parent, className = "", title, ...props }) => {
    return (<div className={"page " + className} parent={parent} {...props}>
    {props.children}
</div>)
};
