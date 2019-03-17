import React, { useState } from "react";
import Page from "./../Components/Page";


//import modules & components
import Button from "./../Components/Button";
import Br from "./../Components/Br";
import Icon from "./../Components/Icon";


export default ({ parent, ...props }) => {
    const [format, setFormat] = useState("csv");
    return <Page className="center" {...props}>
		<p>You can here Download or back up & share your data to keep it in hand, please select a format you want to handle</p>

		<Button id="format-menu-state" textColor="white" style={{fontSize : "1em"}}>
			<Icon>library_books</Icon> {format.toLocaleUpperCase()}
		</Button>
		<ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" htmlFor="format-menu-state">
			<li onClick={()=>setFormat("csv")} className="mdl-menu__item">As CSV Format</li>
			<li onClick={()=>setFormat("json")} className="mdl-menu__item">As JSON Format</li>
			<li onClick={()=>setFormat("text")} className="mdl-menu__item">As Text Format</li>
		</ul><Br h="20px"  />
		<Button onClick={()=>parent.download(format)} raised colored style={{fontSize : "1em"}}>
			<Icon>get_app</Icon> Download
		</Button>
		<Br  h="20px" />
		<Button raised colored style={{fontSize : "1em"}}>
			<Icon>backup</Icon> Back Up
		</Button>
		<Br h="20px"  />
		<Button disabled={!navigator.share} onClick={()=>parent.download(format, "share")} raised colored style={{fontSize : "1em"}}>
			<Icon>share</Icon> Share
		</Button><Br h="20px"  />
		{
			(!navigator.share) ? <div className="mdl-color-text--orange">Your Browser Not Suppor Share Feature {""+navigator.share}</div>:null
		}
	</Page>;
};
