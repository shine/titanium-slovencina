require('properties');
var currentWindow = Ti.UI.currentWindow;

var forms = require('forms');
var fields = [
	{ title:'Address of Rails server', type:'text', id:'rails_address', name:'rails_address' }
];
var textFieldDefaults = {
	height: '40dp',
	width: '250dp',
	top: '10dp',
	color: '#222',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
};

var container = Ti.UI.createView({
	layout: 'vertical',
	height: 'auto'
});
var fieldRefs = {};
var configurationForm = Ti.UI.createScrollView({
	contentHeight: 'auto',
	contentWidth: 'auto',
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true,
   	
	// new stuff
	container: container,
	fieldStyle: forms.STYLE_HINT
});

var label = Titanium.UI.createLabel(
{
    text:"Rails server address",
    height:'auto',
    width:'auto',
    shadowColor:'#aaa',
    shadowOffset:{x:5,y:5},
    color:'#090',
    font:{fontSize:16},
    textAlign:'center'
});
configurationForm.container.add(label);

var addressField = Ti.UI.createTextField(textFieldDefaults);
addressField.value = Ti.App.rails_address;
addressField.addEventListener('change', function(e){
	Ti.App.Properties.setString(Ti.App.rails_address_field_name, e.value);
	Ti.App.rails_address = Titanium.App.Properties.getString(Ti.App.rails_address_field_name, 'http://89.173.95.102:3000');
});
configurationForm.container.add(addressField);
configurationForm.add(container);

currentWindow.add(configurationForm);