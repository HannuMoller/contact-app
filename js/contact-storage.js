/**
 * Created by ekoodi on 21/03/2017.
 */

contactsApp.storage = (function() {

    var storageKey = 'contacts';

    if (!localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, JSON.stringify([]));
    }

    function saveContactsToLocalStorage(contacts) {
        localStorage.setItem(storageKey, JSON.stringify(contacts));
    }

    function loadContactsFromLocalStorage() {
        return JSON.parse(localStorage.getItem(storageKey));
    }

    return {
        saveContacts: function (contacts) {
            saveContactsToLocalStorage(contacts);
        },
        loadContacts: function () {
            return loadContactsFromLocalStorage();
        }
    }

})();