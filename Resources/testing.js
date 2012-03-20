var currentWindow = Ti.UI.currentWindow;

var forms = require('forms');
var rails = require('rails');

require('properties');

var fields = [
	{ title:'Translation', type:'text', id:'attempt_version', name:'attempt[version]' },
	{ title:'OK', type:'submit', id:'commit', name:'commit' }
];

var testingForm = forms.createForm(
{
	style: forms.STYLE_LABEL,
	fields: fields,
	background: '#fff'
});

var firstWord = rails.getWord(testingForm);

testingForm.addEventListener('commit', function(e) 
{
	var xhr = Titanium.Network.createHTTPClient();
	var f = this;
	var params = {'attempt': {'version': f.container.children[2].value, 'word_id': f.word_id}};

	xhr.onload = function()
	{
		var doc = this.responseText;
			
//		Ti.API.info('>>>>>commit:doc' + doc);
		var result = JSON.parse(doc);
		var is_correct = result[0];
		var variant = result[1];
		var correct = result[2];
		var word = result[3]["word"];
		
		f.container.children[2].value = '';
		if(is_correct == true)
		{
			f.container.children[0].text = 'Верно. Как по-словацки будет "'+word['rus']+'"?';
			f.container.children[0].color = '#090';
		}
		else
		{
			f.container.children[0].text = 'Неверно. Не "'+ variant +'", а "'+ correct +'". Как по-словацки будет "'+word['rus']+'"?';
			f.container.children[0].color = '#900';
		}
		f.word_id = word['id'];
	}
	
	xhr.open('POST', Ti.App.rails_address+'/attempts/create.json');
	xhr.setRequestHeader("content-type", "application/json");
	xhr.send(JSON.stringify(params));
});

currentWindow.add(testingForm);