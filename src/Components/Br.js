import React from "react";

export default ({h = "1", className = "",...props})=><div className={"parser "+className} style={{"--h":h}} {...props} />;