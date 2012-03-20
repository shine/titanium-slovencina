Ti.UI.backgroundColor = '#777';

//var testing = require('testing');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var testingWindow = Ti.UI.createWindow({
	url: 'testing.js',
	backgroundColor: Ti.UI.backgroundColor
});

var tabTesting = Titanium.UI.createTab({
	icon: 'KS_nav_views.png',
	title: 'Testing',
	window: testingWindow,
	backgroundColor: Ti.UI.backgroundColor
});

tabGroup.addTab(tabTesting);

var configurationWindow = Ti.UI.createWindow({
	url: 'configuration.js',
	backgroundColor: Ti.UI.backgroundColor
});

var tabConfiguration = Titanium.UI.createTab({
	icon: 'KS_nav_ui.png',
	title: 'Settings',
	window: configurationWindow,
	backgroundColor: Ti.UI.backgroundColor
});

tabGroup.addTab(tabConfiguration);

tabGroup.open();