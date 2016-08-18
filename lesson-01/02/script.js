var CONTACTS = [
	{
        id: 1,
        name: 'Darth Vader',
        phoneNumber: '+250966666666',
        image: 'http://cs7.pikabu.ru/images/big_size_comm_an/2014-03_7/13962622876915.gif'
	}, {
        id: 2,
        name: 'Princess Leia',
        phoneNumber: '+250966344466',
        image: 'http://images6.fanpop.com/image/photos/33100000/CARRIE-FISHER-anakin-vader-and-princess-leia-33186069-190-149.gif'
	}, {
        id: 3,
        name: 'Luke Skywalker',
        phoneNumber: '+250976654433',
        image: 'https://66.media.tumblr.com/855d95d021cb4d3996274302a3d5cba9/tumblr_o0g728ommV1qi2zsjo1_400.gif'
	}, {
        id: 4,
        name: 'Chewbacca',
        phoneNumber: '+250456784935',
	    image: 'https://media.giphy.com/media/RUUdVZqwpfTRS/giphy.gif'
	}
];

var Contact = React.createClass({
    render: function() {
        return(
            <li className="contact">
                <img className="contact-image" src={this.props.image} width="60px" height="60px" />
                <div className="contact-info">
                    <div className="contact-name">{this.props.name}</div>
                    <div className="contact-number">{this.props.phoneNumber}</div>
                </div>
            </li>
        );
    }
});

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

ReactDOM.render(
    <ContactsList />,
    document.getElementById('content')
);
