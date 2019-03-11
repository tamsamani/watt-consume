import React, { Component, useState } from 'react';
import MainStorage from "./Storage";

import Footer from "./Components/Footer";
import SnackBar from "./Components/SnackBar";
import IconSet from "./Components/IconSet";

import Page from "./Components/Page";
import HomePage from "./Components/HomePage";
import EquipmentPage from "./Components/EquipmentPage";
import HistoryPage from "./Components/Historypage";
import SettingsPage from "./Components/SettingsPage";
import DownloadPage from "./Components/DownloadPage";
import HelpPage from "./Components/HelpPage";
// import from "./Components/";



class App extends Component {
  state = {
    title : "WattConsume",
    active : null,
    selectedIcon : 0,
  }
  
  Icons = "wb_incandescent tv print settings_input_hdmi settings_input_component settings_power speaker settings_remote settings_voice notification_important phone games video_label stay_current_portrait battery_charging_full devices highlight computer desktop_mac router scanner videogame_asset photo_camera straighten kitchen room_service ac_unit whatshot power hot_tub flash_on camera_rear extension".split(" ");
  
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
  
  render() {
    return (<div className="app mdl-layout">
			<h3>{this.state.title}</h3>
			<Footer parent={this} />
			<SnackBar id="feedBack" />
			<IconSet parent={this} selected={this.state.selectedIcon} />
			{this.getActivePage(this.state.active)}
		</div>);
  }
}

export default App;
