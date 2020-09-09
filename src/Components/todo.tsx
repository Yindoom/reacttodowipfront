import React, { ChangeEvent } from "react";
import Todo from "../Interfaces/todo.interface";


export class TodoComponent extends React.Component<{
    todo: Todo,
    index: number,
    updateTodo: any
}> {
    render() {
        const todo = this.props.todo;
        return (
            <div>
                <h3>
                    {todo.description}
                </h3>
                <p>Due: {todo.deadline}</p> <input id="check" type="checkbox" checked={todo.isDone} onChange={(event) => this.todoDone(event.target)} />
            </div>
        )
    }

    todoDone(check: HTMLInputElement) {
        const todo = this.props.todo;
        const update: Todo = {
            deadline: todo.deadline,
            description: todo.description,
            id: todo.id,
            isDone: check.checked
        }
        this.props.updateTodo(update)
    }

}
export default TodoComponent;