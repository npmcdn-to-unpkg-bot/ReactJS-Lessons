var React = require('react');

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

module.exports = Contact;