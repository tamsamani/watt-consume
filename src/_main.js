import React, { Component, useState } from 'react';
import MainStorage from "./Storage";


//
const Icons = "wb_incandescent tv print settings_input_hdmi settings_input_component settings_power speaker settings_remote settings_voice notification_important phone games video_label stay_current_portrait battery_charging_full devices highlight computer desktop_mac router scanner videogame_asset photo_camera straighten kitchen room_service ac_unit whatshot power hot_tub flash_on camera_rear extension".split(" ");

const IconSet = ({ parent, selected }) => <div className="iconset">
	{
		Icons.map((name,i) => <Icon className={selected==i?"mdl-color-text--primary":""} onClick={e=>parent.setState({selectedIcon : i})} key={"iconset-"+i}>{name}</Icon>)
	}
	<Button onClick={e=>parent.showIconSet(false)} textColor="primary" text="ok" className="mdl-tabs" />
</div>;

//Icon
const Icon = ({ className = "", color = "", ...props }) => {
    let name = props.children || Object.keys(props)[0];
    if (color) {
        className += " mdl-color-text--" + color;
    }
    return <i className={"material-icons " + className} {...props}>{name}</i>;
};

const Br = ({ h = "1", className = "", ...props }) => <div className={"parser "+className} style={{"--h":h}} {...props} />;


// Buttons
const Button = ({ className = "", text = "", color, textColor, fab, raised, colored, accent, ...props }) => {
    let classes = "mdl-button mdl-js-button mdl-js-ripple-effect ";
    if (fab) classes += "mdl-button--fab ";
    else if (raised) classes += "mdl-button--raised ";

    if (colored) classes += "mdl-button--colored ";
    else if (accent) classes += "mdl-button--accent ";

    if (color) classes += "mdl-color--" + color + " ";
    if (textColor) classes += "mdl-color-text--" + textColor + " ";

    return <button className={classes + className} {...props}>{props.children || text}</button>;
};

const Toggler = function({ parent, auto, on = "ON", off = "OFF", onToggle, className = "", ...props }) {

    const [isOn, toggle] = useState(!!auto);
    return <div onClick={e => {
		toggle(!isOn);
		if (typeof onToggle == "function") onToggle(e, isOn);
		
	}} className={"toggler "+className} >
		{ isOn ? on:off }
	</div>;
};

const ListItem = ({ primary, secondary, icon, className = "", ...props }) => (<li className={"mdl-list__item " + className}>
	<span className="mdl-list__item-primary-content">
		{icon?<Icon className="mdl-list__item-icon color-inherit">{icon}</Icon>:null}
		{primary || props.children}
  </span>
	{secondary? <span className="mdl-list__item-secondary-action">
		{secondary}
	</span>:null}
</li>);

//List
const List = ({ list, foreach = e => ({ primary: e }), on = false, ...props }) => <ul className="mdl-list">
	{
		!on ? (list || Array.from(props.children)).map((e, i, array) => {
			const { primary, icon, secondary, ...props } = foreach(e, i, array, list);
			return <ListItem primary={primary} secondary={secondary} icon={icon} {...props} />;
		}) : props.children
	}
</ul>;

//
const SnackBar = ({ id, ...props }) => {

    return <div id={id} className="mdl-js-snackbar mdl-snackbar">
  <div className="mdl-snackbar__text"></div>
  <button className="mdl-snackbar__action" type="button"></button>
</div>
};

// Modal defintion
const Modal = function({ parent, id, title = "Alert", contents, ok, cancel, onOk, onCancel, ...props }) {
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

//Footer
const Footer = ({ parent, ...props }) => {

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

const Page = ({ parent, className = "", ...props }) => <div className={"page " + className} parent={parent} {...props}>{props.children}
</div>;

const Switch = ({ label, name, className = "", ...props }) => {
    let l = (label || "|").split("|");
    name = name || "switch" + Date.now();
    return <div className={"switcher " + className} > 
	<span>{l[0]}</span>
	<label htmlFor={name} className="mdl-switch mdl-js-switch mdl-js-ripple-effect">
  	<input type="checkbox" id={name} className="mdl-switch__input mdl-color--accent" {...props}/>
	</label><span>{l[1]}</span>
</div>
};

const Select = ({ ...props }) => <div {...props}></div>;

const DeviceControl = ({ parent, data = {}, ...props }) => {

    return <div className="device-control mdl-color--accent-contrast mdl-color-text--black">
		<Icon className="mdl-chip__contact  mdl-color--primary mdl-shadow--8dp">{Icons[data.icon||0]}</Icon>
		<span className="control-text"><b>{data.name}</b><br /><code>{data.location}</code></span>
		<Toggler className="control-actions" auto={data.lastState} on={<Icon power color="green" />} off={<Icon power_off color="red" />} />
		<a href="#?" className="control-actions"><Icon autorenew color="orange" /></a>
		<a href="#?" className="control-actions"><Icon create color="blue" /></a>
	</div>;
};


const HomePage = ({ parent, ...props }) => {
    return <Page className="controls" {...props}>
			<div><Switch name="switch7" label="ON|OFF"/></div>
			<div><Toggler className="mdl-button" on={<Icon power color="green" />} off={<Icon power_off color="orange" />} /></div>
			<DeviceControl parent={parent} data={{
				name : "Small Roomate",
				location : "hall & Cuisine",
				type : 0,
				lastState : 0,
				icon : 13
			}} />
			<DeviceControl parent={parent} data={{
					name : "Green Flasj",
					location : "toilit",
					type : 0,
					lastState : 1,
					icon : 19
				}} />
	</Page>;
};

const EquipmentPage = ({ parent, ...props }) => {
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

const HistoryPage = ({ parent, ...props }) => {
    return <Page {...props}>

	</Page>;
};

const SettingsPage = ({ parent, ...props }) => {
    return <Page {...props}>
    
	</Page>;
};

const DownloadPage = ({ parent, ...props }) => {
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

// HelpPage
const HelpPage = ({ parent, ...props }) => {
    return <Page {...props}>
		<p>you can know here several things about this app and how to use it</p>


		<h5 id="help_footerBar">Getting Help</h5>
		<p>This is page for help you to know how use this App</p>

		<h5 id="help_footerBar">What is `WhatsConsum?` App</h5>
		<p>App for tracking your actions with devices, turn them on/off or change them states</p>
		<p>it's store data as you use in real time, for use them later to any propose</p>

		<h5 id="help_footerBar">Footer Bar</h5>
		<p>it's super easy way to move between pages</p> 

		
	</Page>;
};


export default class Main extends Component {

    state = {
        active: "home_0", // define which page active now
        title: "WhatsConsum?", // page main title
        loaded: false,
        selectedIcon: 0,
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }
    componentDidMount() {
        window.onload = () => {
            this.setState({ loaded: true });
            this.feedback({
                message: "content loaded",
            })
        }
        this.storage = new MainStorage("appstore", 2);

        this.storage.createIfNot("userData", {
            settings: [],
            locations: [],
            lastUsed: [],
            devices: {},
            history: []
        });
    }

    getActivePage(active) {
        switch (active) {
            case "home_0":
                return <HomePage parent={this} />;
            case "add_1":
                return <EquipmentPage parent={this} />;
            case "assignment_2":
                return <HistoryPage parent={this} />;
            case "settings_3":
                return <SettingsPage parent={this} />;
            case "get_app_4":
                return <DownloadPage parent={this} />;
            case "help_5":
                return <HelpPage parent={this} target="" />;
            default:
                return <Page>
					<h4>Page Not Found - 404</h4>
					<p>I thinks there an error for reach this type of page</p>
					<h5><a href="#" onClick={e => this.goto("help_5")} className="link">Get help?</a></h5>
				</Page>;
        }
    }

    showModal(id) {
        let modal = document.querySelector(id);
        if (modal) modal.showModal();
    }
    closeModal(id, state) {
        let modal = document.querySelector(id);
        if (modal) modal.close();
    }

    showIconSet(state) {
        let icst = document.querySelector(".iconset");
        if (icst) {
            if (state) icst.classList.add("show");
            else icst.classList.remove("show");
        }
    }

    getPageTitle(active) {
        switch (active) {
            case "home_0":
                return "WhatsConsum?";
            case "add_1":
                return "Equipmnets";
            case "assignment_2":
                return "History";
            case "settings_3":
                return "Settings";
            case "get_app_4":
                return "Download & Backup";
            case "help_5":
                return "Help Page";
            default:
                return "WhatsConsum?";
        }
    }

    download(format, share) {
        let data, formatExt;
        if (format == "csv") {
            formatExt = "csv";
            data = "CSV,PSD,delta\n1,2,3";
        }
        else if (format == "json") {
            formatExt = "json"
            data = JSON.stringify({
                JSON: 0,
                PSD: 1,
                gamma: 1.3
            });
        }
        else {
            formatExt = "txt";
            data = "text simple";
        }

        let filename = "WC-" + (new Date()).toLocaleDateString() + "." + formatExt;
        let file = new Blob([data], { type: "text/plain" });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            if (share && navigator.share) {
                navigator.share({
                        title: 'WS APP',
                        text: 'SHARE YOUR DATA',
                        url: "",
                    })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error));

            }
            else {
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }

        }
    }
    goto(active) {
        this.setState({ active, title: this.getPageTitle(active) });
    }

    feedback({ message = "NO FEEDS", timeout = 1500, action = e => e, actionText = "OK", ...data }) {
        let MS = document.querySelector("#feedBack").MaterialSnackbar;

        if (MS) MS.showSnackbar({ message, timeout, actionHandler: action, actionText });
        else console.log("", arguments[0]);
    }

    render() {

        if (!this.state.loaded) {
            return (<div className="app">
			<h3>LOADING ... </h3>
			</div>);
        }

        return (<div className="app mdl-layout">
			<h3>{this.state.title}</h3>
			<Footer parent={this} />
			<SnackBar id="feedBack" />
			<IconSet parent={this} selected={this.state.selectedIcon} />
			{this.getActivePage(this.state.active)}
		</div>);
    }
}
