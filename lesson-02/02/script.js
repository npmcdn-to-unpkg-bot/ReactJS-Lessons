//
// КОМПОНЕНТ ОДНОЙ ЗАМЕТКИ. ЗАМЕТКА ОДНА, ПОЛЬЗЫ ДАХУЯ
//
var Note = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
});

//
// АССОЦИАЦИИ КАРЛ, ВЫБЕРИ ЦВЕТ ЗАМЕТКИ, НЕ ПРОЕБЁШЬ
//
var ColorChanger = React.createClass({
    render: function() {
        return(
            <div className="color-changer">
                <a onClick={this.props.onChangeColor} className="color-link red" href="#ff7f76"><i className="fa fa-check"></i></a>
                <a onClick={this.props.onChangeColor} className="color-link orange" href="#ffcc75"><i className="fa fa-check"></i></a>
                <a onClick={this.props.onChangeColor} className="color-link yellow" href="#ffff82"><i className="fa fa-check"></i></a>
                <a onClick={this.props.onChangeColor} className="color-link gray" href="#c9d3d8"><i className="fa fa-check"></i></a>
                <a onClick={this.props.onChangeColor} className="color-link blue" href="#75d3ff"><i className="fa fa-check"></i></a>
                <a onClick={this.props.onChangeColor} className="color-link aqua" href="#9effe8"><i className="fa fa-check"></i></a>
                <a onClick={this.props.onChangeColor} className="color-link green" href="#c6ff86"><i className="fa fa-check"></i></a>
            </div>
        );
    }
});

//
// ДУМАЕШЬ ПРОЕБЁШЬ МЫСЛЬ? ЗАПИШИ ЕЁ, НЕ БУДЬ МУДАКОМ
//
var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: '',
            color: ''
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleNoteAdd: function() {
        var newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now(),
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    },

    handleColorChange: function(event) {
        if (event.target.tagName === 'A') {
            $(event.target).parent().find('i').hide();
            this.setState({
                color: event.target.href.substring(event.target.href.lastIndexOf('/') + 1)
            });
            $(event.target).find('i').show();
        }
    },

    render: function() {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className="note-panel">
                    <ColorChanger onChangeColor={this.handleColorChange} />
                    <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
                </div>
            </div>
        );
    }
});

//
// СУКА СЕТКА ЗАМЕТОК, ЗДЕСЬ МАГИЯ
//
var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length || this.props.searchValue !== prevProps.searchValue) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function() {
        var onNoteDelete = this.props.onNoteDelete;

        var notes = this.props.notes.filter(function(note, i, arr) {
            return note.text.toLowerCase().indexOf(this.props.searchValue) !== -1;
        }.bind(this));

        return (
            <div className="notes-grid" ref="grid">
                {
                    notes.map(function(note){
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});

//
// ГЛАВНОЕ ПРИЛОЖЕНИЕ, БЛЯТЬ ПО РУКАМ ПОЛУЧИШЬ ЕСЛИ БУДЕШЬ ХУЛИГАНИТЬ С НИМ
//
var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            searchText: ''
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },

    handleSearch: function(searchText) {
        this.setState({
            searchText: searchText
        });

        console.log(searchText);
    },

    render: function() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <Search onSearch={this.handleSearch} />
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} searchValue={this.state.searchText} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});

//
// ПОИСК СУКА, ИЩИ ЧТО НУЖНО
//
var Search = React.createClass({
    getInitialState: function() {
        return {
            searchText: ''
        };
    },

    handleChange: function(event) {
        this.setState({
            searchText: event.target.value
        });

        this.props.onSearch(event.target.value.toLowerCase());
    },

    render: function() {
        return(
            <input type="text" onChange={this.handleChange} className="search-field" placeholder="Search..." />
        );
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);
