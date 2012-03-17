var win = Ti.UI.createWindow({backgroundColor: 'white'});
var searchbar = Ti.UI.createSearchBar({
	top: 0,
	height: 50,
    showCancel: false
});
win.add(searchbar);

// Function to dump data
function dumpData() {
	var data = [];
	for(var i = 0; i < 20; i ++) {
		data.push({title: Math.random().toString(36).substring(7)});
	}
	return data;
}

var data = dumpData();
var tbl = Ti.UI.createTableView({
	data: data,
    backgroundColor:'transparent',
	separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	top: 50
});

win.add(tbl);
win.open();

// You can customize to whatever search algorithm you want
function mysearch(value, data) {
	var searchResults = [];
	for(var i = 0, len = data.length; i < len; i ++) {
		if (data[i].title.indexOf(value) == 0) {
			searchResults.push(data[i]);	
		}
	}
	return searchResults;
}

// This will do the trick :)
searchbar.addEventListener('change', function(e){
	tbl.setData([]);
	
	var searchResults = mysearch(e.value, data);
	
	if (searchResults.length == 0) {// "No Result"
		tbl.setData([
			{title: ''},
			{title: ''},
			{title: 'No Result'},
		]);	
	} else {
		tbl.setData( searchResults );
	}
});

searchbar.addEventListener('return', function(e){
	searchbar.blur();	
});