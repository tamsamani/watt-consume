import React, { useState } from "react";
import Page from "./../Components/Page";


//import modules & components
import Button from "./../Components/Button";
import Br from "./../Components/Br";
import Icon from "./../Components/Icon";
import Modal from "./../Components/Modal";


export default ({ parent, ...props }) => {
    return <Page className="center" {...props}>
	<Button raised color="primary" onClick={e=>parent.showModal("#addDevice")} text="Add Device"/>
	<div className="mdl-color--accent-contrast mdl-color-text--primary mdl-shadow--16dp"
		style={{margin: "20px auto",paddingBottom: "1em", borderRadius: "8px"}}>
		<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
				<input onChange={e => parent.setState({modalName:e.target.value})} className="mdl-textfield__input" type="text" id={"add-name-input"} value={parent.state.modalName} />
				<label className="mdl-textfield__label" htmlFor={"add-name-input"}>Equipment Name...</label>
			</div>
			<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
				<input onChange={e => parent.setState({modalLocation:e.target.value})} className="mdl-textfield__input" type="text" id={"add-location-input"} value={parent.state.modalLocation} />
				<label className="mdl-textfield__label" htmlFor={"add-location-input"}>Location...</label>
			</div>
			<div className="mdl-cell mdl-cell--12-col">
				<Button id="add-menu-state" raised accent>State ({ parent.state.modalStateType == 0 ? "Switch":"Stated" })</Button>
				<ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" htmlFor="add-menu-state">
					<li onClick={()=>parent.setState({modalStateType:0})} className="mdl-menu__item">Switch (ON/OFF)</li>
					<li onClick={()=>parent.setState({modalStateType:1})} className="mdl-menu__item mdl-menu__item--full-bleed-divider">Stated</li>
				</ul>
			</div>
			<div className={"mdl-textfield mdl-js-textfield  mdl-textfield--floating-label mdl-cell mdl-cell--12-col " + (parent.state.modalStateType == 1 ? "" : "hide") }>
				<input onChange={e => parent.setState({modelStates:e.target.value})} className="mdl-textfield__input" type="text" id={"add-state-input"} />
				<label className="mdl-textfield__label" htmlFor={"add-state-input"}>States (seperated by comma ",")</label>
			</div>
	</div>
	<Modal parent={parent} id="addDevice" />
	</Page>;
};
