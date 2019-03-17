import React, { Component, useState } from 'react';
import MainStorage from "./Modules/Storage";

import Footer from "./Components/Footer";
import SnackBar from "./Components/SnackBar";
import IconSet from "./Components/IconSet";

import Page from "./Components/Page";
import HomePage from "./Pages/HomePage";
import EquipmentPage from "./Pages/EquipmentPage";
import HistoryPage from "./Pages/HistoryPage";
import SettingsPage from "./Pages/SettingsPage";
import DownloadPage from "./Pages/DownloadPage";
import HelpPage from "./Pages/HelpPage";
// import from "./Components/";




class App extends Component {
	state = {
		active: "home_0",
		loaded: false
	}

	store = {
		set(obj) {
			Object.assign(this, obj);
			return this;
		},
		pageTitle: "WattConsume",

		selectedIcon: 0,
	}

	actions = {
		do: (action, ...arg) => {
			if (action in this.actions) {
				this.action[action](...arg);
			}
		},
		showIconSet: state => {
			let icst = document.querySelector(".iconset");
			if (icst) {
				if (state) icst.classList.add("show");
				else icst.classList.remove("show");
			}
		}
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
				return <Page parent={this} title="Not Found" >
					<h4>Page Not Found - 404</h4>
					<p>I thinks there an error for reach this type of page</p>
					<h5><a href="#" onClick={e => this.setState({active : "help_5"})} className="link">Get help?</a></h5>
				</Page>;
		}
	}

	// change store data related by pages
	restore() {
		const { active } = this.state;
		let { pageTitle } = this.store;
		switch (active) {
			case "home_0":
				// pageTitle = "WattConsume";
				break;
			case "add_1":
				pageTitle = "Devices";
				break;
			case "assignment_2":
				pageTitle = "History";
				break;
			case "settings_3":
				pageTitle = "Settings";
				break;
			case "get_app_4":
				pageTitle = "Downloads";
				break;
			case "help_5":
				pageTitle = "Help Page";
				break;
			default:
				pageTitle = "WattConsume";
				break;
		}

		this.store.set({ pageTitle });

	}

	render() {
		this.restore();
		return (<div className="app mdl-layout">
			<h3>{this.store.pageTitle}</h3>
			<Footer parent={this} />
			<SnackBar id="feedBack" />
			<IconSet parent={this} selected={this.store.selectedIcon} />
			{this.getActivePage(this.state.active)}
		</div>);
	}
}

export default App;
