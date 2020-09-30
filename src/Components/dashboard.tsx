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
    done: Todo[],
    todos: Todo[],
    loading: boolean
}

interface Iprops { }


export class Dashboard extends Component<Iprops, Istate> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: [],
            done: [],
            loading: true
        }
        this.getTodos();
    }

    getTodos() {
        fetch("https://localhost:5001/todo")
            .then(res => res.json())
            .then(data => {
                this.setTodos(data)
            });
    }

    updateTodo = (update: Todo) => {
        fetch("https://localhost:5001/todo/" + update.id,
            {
                method: 'PUT', // or 'POST'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update),
            })
            .then(res => res.json())
            .then(data => {
                const done = this.state.done;
                const todos = this.state.todos;
                let filtered: Todo[];
                if (data.isDone) {
                    debugger;
                    filtered = todos.filter((value) => { return value.id !== data.id });
                    done.unshift(data);
                    this.setState({ done: done, todos: filtered });
                } else {
                    debugger;
                    filtered = done.filter((value) => {
                        debugger;
                        return value.id !== data.id
                    });
                    todos.unshift(data)
                    this.setState({ todos: todos, done: filtered });
                }
            });
    }

    setTodos(todos: Todo[]) {
        const done: Todo[] = [];
        const notdone: Todo[] = [];
        todos.sort((t1, t2) => {
            return new Date(t1.deadline).getTime() - new Date(t2.deadline).getTime();
        });
        todos.map((todo: Todo, index: number) => {

            if (todo.isDone) done.push(todo);
            else notdone.push(todo);
        })
        this.setState({ todos: [...notdone], done: [...done], loading: false })
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
        if (this.state.todos.length > 0 || this.state.done.length > 0) {
            return (
                <><ul className="todoList">
                    {this.state.todos.map((todo: Todo, index: number) => (
                        <li>
                            <TodoComponent key={todo.id} todo={todo} index={index} updateTodo={this.updateTodo} />
                        </li>
                    ))}
                </ul>

                    <ul className="doneList">
                        {this.state.done.map((todo: Todo, index: number) => (
                            <li>
                                <TodoComponent key={todo.id} todo={todo} index={index} updateTodo={this.updateTodo} />
                            </li>
                        ))}
                    </ul></>
            );
        } else {
            return (
                <h3>Your list of todos is empty, add a new one to keep track of your schedule</h3>
            )
        }
    }
}

export default Dashboard;