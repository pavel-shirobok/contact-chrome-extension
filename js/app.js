$(document).ready(function(){
    $("<textarea type='text' id='copyBuffer'></textarea>").appendTo(document.body);
    start();
});

function start(){
    chrome.browserAction.onClicked.addListener(function(){
        var contacts;
        if(localStorage['list'] == undefined){
            openOptions();
            return;
        }

        contacts = JSON.parse(localStorage['list']);
        if(contacts.length == 0){
            openOptions();
            return;
        }

        var str='';
        for(var i = 0; i < contacts.length; i++){
            var item = contacts[i];
            str += item.type + ' : ' + item.value + '\n';
        }

        $('textarea').val(str);
        document.getElementById("copyBuffer").select();
        document.execCommand("Copy", false, null);

        showNotify(contacts);
    });
}

function openOptions(){
    chrome.tabs.create({url:chrome.extension.getURL('options.html')})
}

var notifyID = 0;
function showNotify(contacts){
    notifyID++;

    var items = [];
    $(contacts).each(function(index, item){
        items.push({title:item.type + ' :', message:item.value});
    });

    chrome.notifications.create(notifyID + '', {
        type:'list',
        title:'Copied to clipboard:',
        message:"Next contacts copiend to clipboard",
        iconUrl:chrome.extension.getURL('img/notify-icon.png'),
        items:items
    }, function(notify){});
}

/*


  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",*/