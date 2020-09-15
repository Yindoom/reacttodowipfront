import React, { ChangeEvent } from "react";
import Todo from "../Interfaces/todo.interface";
import Card from "react-bootstrap/Card";


export class TodoComponent extends React.Component<{
    todo: Todo,
    index: number,
    updateTodo: any
}> {
    render() {

        const todo = this.props.todo;
        return (
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{todo.deadline}</Card.Title>
                    <Card.Text>
                        {todo.description}
                    </Card.Text>
                    <input type="checkbox" checked={todo.isDone} onChange={(event) => this.updateTodo(event.target)} />
                </Card.Body>
            </Card>
            
        );
    }

    updateTodo(check: HTMLInputElement) {
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