import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

type PropsType={
    hat1?: string
    hat2?: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTasks: (title: string)=>void
}
export type TaskType={
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = (props:PropsType) =>{

    let [filter, setFilter] = useState<FilterValueType>("All")
    const [newTasksTitle, setNewTitle] = useState("")

    function changeFilter(value: FilterValueType){
        setFilter(value)
    }
    const onChangerHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            props.addTasks(newTasksTitle)
            setNewTitle("")
        }
    }
    const addTasks = () =>{
        props.addTasks(newTasksTitle)
        setNewTitle("")
    }

    let tasksForTodoList = props.tasks;
    if(filter === "Completed"){
        tasksForTodoList = props.tasks.filter( t => t.isDone === true);
    }
    if(filter === "Active"){
        tasksForTodoList = props.tasks.filter( t => t.isDone === false);
    }
    return(
        <div>
            <h3>{props.hat1}</h3>
            <h3>{props.hat2}</h3>
            <div>
                <input
                    onChange={onChangerHandler}
                    onKeyPress={onKeyPress}
                    value={newTasksTitle}
                />
                <button onClick={addTasks}>+</button>
            </div>
            <ul>
                {
                    tasksForTodoList.map(el=>{
                        const onRemove = () => props.removeTask(el.id)
                        return(
                            <li key={el.id}>
                                <button onClick={onRemove}>X</button>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=>{changeFilter("All")}}>All</button>
                <button onClick={()=>{changeFilter("Active")}}>Active</button>
                <button onClick={()=>{changeFilter("Completed")}}>Completed</button>
            </div>
        </div>
    )
}