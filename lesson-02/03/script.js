const ToDo = React.createClass({
    render: function() {
        return(
            <li className={"to-do" + (this.props.status ? ' done' : '')}>
                <span className="accept" onClick={this.props.onToDoAccept} />
                <span className="text">
                    {this.props.children}
                </span>
                <span className="delete-task" onClick={this.props.onDelete}> × </span>
            </li>
        );
    }
});

var ToDoList = React.createClass({
    render: function() {
        const onToDoDelete = this.props.onToDoDelete;
        const onToDoAccept = this.props.onToDoAccept;

        return(
            <ul className="to-do-list">
                {
                    this.props.todos.map(function(item) {
                        return <ToDo key={item.id} status={item.status} onDelete={onToDoDelete.bind(null, item)} onToDoAccept={onToDoAccept.bind(null, item)}>{item.text}</ToDo>
                    })
                }
            </ul>
        );
    }
});

var ToDoAdd = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleChangeInput: function(event) {
        this.setState({ text: event.target.value });
    },

    handleKeyPressInput: function(event) {
        const value = event.target.value.replace(/\s{2,}/g, ' ');

        if (event.key === 'Enter' && value) {
            let newTodo = {
                id: Date.now(),
                text: value,
                status: false
            };

            this.props.onToDoAdd(newTodo);
            this.setState({ text: ''});
        }
    },

    render: function() {
        return(
            <div className="to-do-add">
                <input type="text"
                       placeholder="What you need to do?"
                       onKeyPress={this.handleKeyPressInput}
                       onChange={this.handleChangeInput}
                       value={this.state.text}
                />
            </div>
        );
    }
});

var ToDoSort = React.createClass({
    render: function() {
        const sortButtons = ['all', 'new', 'completed'];
        const onToDoSort = this.props.onToDoSort;
        const currentFilter = this.props.currentFilter;

        return(
            <ul className="to-do-sort">
                {
                    sortButtons.map(name =>
                        <li key={name} className={(name === currentFilter) ? 'active': ''} onClick={onToDoSort.bind(null, name)}>
                            {name}
                        </li>
                    )
                }
            </ul>
        );
    }
});

var ToDoListApp = React.createClass({
    getInitialState: function() {
        return {
            todos: [],
            filter: 'all'
        };
    },

    componentDidMount: function() {
        let todos = localStorage.getItem('todos');

        if (todos) {
            this.setState({
                todos: JSON.parse(todos)
            });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    onToDoAdd: function(todo) {
        const newTodos = this.state.todos.slice();
        newTodos.unshift(todo);

        this.setState({ todos: newTodos });
    },

    onToDoDelete: function(todo) {
        const newTodos = this.state.todos.filter(function(el) {
            return el.id !== todo.id;
        });

        this.setState({ todos: newTodos });
    },

    onToDoSort: function(filter) {
        this.setState({ filter: filter });
    },

    onToDoAccept: function(todo) {
        const newTodos = this.state.todos.slice();

        newTodos.forEach(function(item, i, arr) {
            if (item.id === todo.id) {
                item.status = !todo.status;
            }
        });

        this.setState({ tasks: newTodos });
    },

    render: function() {
        return (
            <div className="to-do-app">
                <ToDoAdd onToDoAdd={this.onToDoAdd}/>
                <ToDoList onToDoDelete={this.onToDoDelete} onToDoAccept={this.onToDoAccept} todos={this._getVisibleToDos(this.state.todos, this.state.filter)} />
                <ToDoSort currentFilter={this.state.filter} onToDoSort={this.onToDoSort} />
            </div>
        );
    },

    _getVisibleToDos(todos, filter){
        if (filter === 'completed') {
            return todos.filter(todo => todo.status);
        }
        if (filter === 'new') {
            return todos.filter(todo => !todo.status);
        }

        return todos;
    },

    _updateLocalStorage: function() {
        let todos = JSON.stringify(this.state.todos);
        localStorage.setItem('todos', todos);
    }
});

ReactDOM.render(
    <ToDoListApp />,
    document.getElementById('mount-point')
);
