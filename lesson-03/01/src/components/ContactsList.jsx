var React = require('react');
var Contact = require('./Contact.jsx');
var CONTACTS = require('./Contacts.js');

var ContactsList = React.createClass({
    getInitialState: function() {
        return {
            displayedContacts: CONTACTS
        };
    },

    handleSearch: function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var displayedContacts = CONTACTS.filter(function (el) {
            var searchValue = el.name.toLocaleLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedContacts: displayedContacts
        });
    },

    render: function() {
        return(
            <div className="contacts">
                <input type="text" className="search-field" onChange={this.handleSearch} />
                <ul className="contacts-list">
                    {
                        this.state.displayedContacts.map(function (el) {
                            return <Contact key={el.id} name={el.name} phoneNumber={el.phoneNumber} image={el.image} />
                        })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = ContactsList;