/**
 * Created by ekoodi on 15/03/2017.
 */

var contacts = [];

function fullAddress(contact) {
    return contact.address+', '+contact.city;
}

function saveContact() {

    var contact = new Object();
    contact.firstName = $('#first_name').val();
    contact.lastName = $('#last_name').val();
    contact.address = $('#address').val();
    contact.phone = $('#phone').val();
    contact.city = $('#city').val();

    var index = $('#index').val();
    if (index < 0) {
        contacts.push(contact);
    } else {
        contacts[index] = contact;
        $('#index').val(-1);
        $('#save').html('Add Contact');
        $('#formheader').html('New Contact');
    }
    saveContactsToLocalStorage();

    showContacts();

    $('#first_name').val('');
    $('#last_name').val('');
    $('#address').val('');
    $('#phone').val('');
    $('#city').val('');
}

function showContacts() {
    var tbody = $('#contacts');
    tbody.empty();
    contacts.forEach(function(contact, ind) {
        var values = [contact.firstName, contact.lastName, contact.phone];
        var tr = $('<tr></tr>');
        values.forEach(function(value) {
            tr.append($('<td></td>').text(value));
        });

        var link = $('<a></a>');
        link.attr('target','_new');
        link.attr('href','https://www.google.fi/maps/place/'+fullAddress(contact));
        link.text(fullAddress(contact));
        var td = $('<td></td>');
        td.html(link);
        tr.append(td);

        td = $('<td></td>');
        var button_mod = $('<button onclick="editContact('+ind+')">Modify</button>');
        td.append(button_mod);
        var button_del = $('<button onclick="deleteContact('+ind+')">Delete</button>');
        td.append(button_del);
        tr.append(td);

        tbody.append(tr);
    });
}

function editContact(ind) {
    var contact = contacts[ind];
    $('#first_name').val(contact.firstName);
    $('#last_name').val(contact.lastName);
    $('#address').val(contact.address);
    $('#phone').val(contact.phone);
    $('#city').val(contact.city);
    $('#index').val(ind);
    $('#formheader').html('Edit Contact');
    $('#save').html('Save Contact');
}

function deleteContact(ind) {
    var contact = contacts[ind];

    if (confirm('Ok to remove '+contact.firstName+' '+contact.lastName+' ?')) {
        contacts.splice(ind, 1);
        saveContactsToLocalStorage();
        showContacts();
    }
}

function saveContactsToLocalStorage() {
    localStorage.contacts = JSON.stringify(contacts);
}

function loadContactsFromLocalStorage() {
    if (localStorage.contacts) {
        contacts = JSON.parse(localStorage.contacts);
        showContacts();
    }
}