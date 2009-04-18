var StickyPopup = {
    popup:    null,
    timerId:  null,
    parentId: null,
    show: function(url){
        if(StickyPopup.popupExists())
            StickyPopup.popup = window.open(url, 'Sticky_Popup', 'height=400,width=600,top=100');
        StickyPopup.popup.focus();
        StickyPopup.addUnloadEvent();
    },
    popupExists: function(){
        return (StickyPopup.popup == null || StickyPopup.popup.closed)
    },
    addUnloadEvent: function(){
        if(window.onunload == null) {
            window.onunload = function(){
                if(!StickyPopup.popupExists()) {
                    StickyPopup.popup.StickyPopup.addReference();
                }
            }
            StickyPopup.parentId = StickyPopup.generateRandomString();
        }
    },
    saveReference: function(){
        StickyPopup.parentId = window.opener.StickyPopup.parentId;
    },
    addReference: function(){
        var parentId = window.opener.StickyPopup.parentId;
        StickyPopup.timerId = setInterval(function() {
                if(StickyPopup.parentId == parentId) {
                    window.opener.StickyPopup.popup = window;
                    parentId = window.opener.StickyPopup.parentId;
                } else {
                    clearInterval(StickyPopup.timerId);
                    window.opener.StickyPopup.addUnloadEvent();
                    StickyPopup.saveReference();
                }
            }, 100);
    },
    redirectParent: function(url){
        window.opener.location = url;
        window.opener.focus();
    },
    generateRandomString: function() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var stringLength = 12;
        var randomString = '';
        for (var i = 0; i < stringLength; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(rnum, rnum + 1);
        }
        return randomString;
    }
}
