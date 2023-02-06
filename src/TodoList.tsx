import React, {useState} from "react";
import {FilterValueType} from "./App";

type PropsType={
    hat1?: string
    hat2?: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}
export type TaskType={
    id: number,
    title: string,
    isDone: boolean
}

export const TodoList = (props:PropsType) =>{
    function changeFilter(value: FilterValueType){
        setFilter(value)
    }
    let [filter, setFilter] = useState<FilterValueType>("All")
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
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasksForTodoList.map((el)=>{
                        return(
                            <li key={el.id}><button onClick={()=>{props.removeTask(el.id)}}>X</button><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
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