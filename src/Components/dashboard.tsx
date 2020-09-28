import React, { Component } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import TodoComponent from "../Components/todo";
import Todo from "../Interfaces/todo.interface";
import "./styles.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

interface Istate {
    todos: Todo[],
    loading: boolean
}

interface Iprops { }


export class Dashboard extends Component<Iprops, Istate> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: [],
            loading: true
        }
        this.getTodos();
    }

    getTodos() {
        fetch("https://localhost:5001/todo")
            .then(res => res.json())
            .then(data => {
                this.setState({ todos: [...data], loading: false })
            });
    }

    updateTodo = (update: Todo) => {
        debugger;
        fetch("https://localhost:5001/todo/" + update.id,
            {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update),
            })
            .then(res => res.json())
            .then(data => {
                debugger;
                const todos = this.state.todos;
                const index = todos.findIndex(t => t.id === data.id);
                todos[index] = data;
                this.setState({ todos: [...todos] });
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="sweet-loading">
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={this.state.loading}
                    />
                </div>
            )
        }
        if (this.state.todos && this.state.todos.length > 0) {
            return (

                this.state.todos.map((todo: Todo, index: number) => (
                    <TodoComponent key={todo.id} todo={todo} index={index} updateTodo={this.updateTodo} />
                ))
            );
        } else {
            return (
                <h3>Your list of todos is empty, add a new one to keep track of your schedule</h3>
            )
        }
    }
}

export default Dashboard;