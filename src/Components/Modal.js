import React, { useState } from "react";


//import modules & components
import Button from "./Button";
import Br from "./Br";
import Icon from "./Icon";

export default function({ parent, id, title = "Alert", contents, ok, cancel, onOk, onCancel, ...props }) {
    let arg = arguments[0];
    return (<dialog id={id} className="mdl-dialog">
		<div className="mdl-dialog__content mdl-grid">
			<h4>{title}</h4>
			<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
				{contents || props.children || "soemthing wrong!!"}
			</div>
		</div>
		<div className="mdl-dialog__actions">
			<Button onClick={e => {
				if (typeof onOk == "function") onOk(e, arg);
				parent.closeModal("#"+id, true);
			}} type="button" text={ok || "OK"} />
			<Button onClick={e => {
				if (typeof onCancel == "function") onCancel(e, arg);
				parent.closeModal("#"+id, false);
			}} type="button" text={cancel|| "Cancel"} />
		</div>
	</dialog>);
}
