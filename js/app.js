$(document).ready(function() 
{
	var contacts = JSON.parse(localStorage['list']);

	var str='';
	for(var i = 0; i < contacts.length; i++){
        var item = contacts[i];
        str += item.type + ' : ' + item.value + '\n';
    }

    $('#test').val(str);
    document.getElementById("test").select();
    document.execCommand("Copy", false, null);
    window.close();
});
