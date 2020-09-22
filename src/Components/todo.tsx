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
        const date = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric"
        }).format(new Date(todo.deadline));
        const today = new Date();
        const todoDay = new Date(date);
        const isToday = today.getDate() === todoDay.getDate();
        const isLate = today.getDate() >= todoDay.getDate();
        return (
            <Card border="secondary" style={{ width: '18rem' }} onClick={ () => this.updateTodo() } >
                <Card.Body>
                    <Card.Title>{date}</Card.Title>
                    <Card.Text>
                        {todo.description}
                    </Card.Text>
                    <input type="checkbox" checked={todo.isDone}/>
                </Card.Body>
                {isToday && !todo.isDone && <Card.Footer>This task is due today.</Card.Footer>}
                {isLate && !todo.isDone && <Card.Footer>This task is late</Card.Footer>}
            </Card>

        );
    }

    updateTodo() {
        const todo = this.props.todo;
        const update: Todo = {
            deadline: todo.deadline,
            description: todo.description,
            id: todo.id,
            isDone: !todo.isDone
        }
        this.props.updateTodo(update)
    }

}
export default TodoComponent;