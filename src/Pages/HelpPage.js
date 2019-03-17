import React from "react";
import Page from "./../Components/Page";

export default ({ parent, ...props }) => {
    return <Page {...props}>
		<p>you can know here several things about this app and how to use it</p>


		<h5 id="help_footerBar">Getting Help</h5>
		<p>This is page for help you to know how use this App</p>

		<h5 id="help_footerBar">What is `WhattConsume?` App</h5>
		<p>App for tracking your actions with devices, turn them on/off or change them states</p>
		<p>it's store data as you use in real time, for use them later to any propose</p>

		<h5 id="help_footerBar">Footer Bar</h5>
		<p>it's super easy way to move between pages</p>
		<ul style={{ listStyle : "none" }}>
		    <li>
		        <i className="material-icons mdl-color-text--primary">home</i> : go to home page where a list of controls of your devices
		    </li>
		</ul>


	</Page>;
};
