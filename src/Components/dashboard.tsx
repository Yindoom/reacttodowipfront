import React, { Component } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import TodoComponent from "../Components/todo";
import Todo from "../Interfaces/todo.interface";

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
                this.setState({ todos: data, loading: false })
            });
    }

    updateTodo(update: Todo) {
        fetch("https://localhost:5001/todo/" + update.id,
            { method: "POST", body: JSON.stringify(update) })
            .then(res => res.json())
            .then(data => {
                const todos = this.state.todos;
                let c = todos.find(todo => todo.id === update.id);
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
        return (

            this.state.todos.map((todo: Todo, index: number) => (
                <TodoComponent todo={todo} index={index} updateTodo={this.updateTodo} />
            ))
        );
    }
}

export default Dashboard;