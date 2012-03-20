require('properties');

exports.getWord = function(f) 
{
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.onload = function()
	{
		var doc = this.responseText;
			
//		Ti.API.info('>>>>>getWord:doc' + doc);
		var word = JSON.parse(doc)["word"];
			
		var label = f.container.children[0];
		label['text'] = 'Как по-словацки будет "'+word['rus']+'"?';
		f.word_id = word['id'];
	}
	xhr.open('GET', Ti.App.rails_address+'/attempts/new.json');
	xhr.setRequestHeader("content-type", "application/json");
	xhr.send();	
};