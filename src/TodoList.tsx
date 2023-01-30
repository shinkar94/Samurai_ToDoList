import React from "react";
import {FilterValueType} from "./App";

type PropsType={
    hat1?: string
    hat2?: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}
export type TaskType={
    id: number,
    title: string,
    isDone: boolean
}

export const TodoList = (props:PropsType) =>{
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
                    props.tasks.map((el)=>{
                        return(
                            <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span><button onClick={()=>{props.removeTask(el.id)}}>X</button></li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("All")}}>All</button>
                <button onClick={()=>{props.changeFilter("Active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("Completed")}}>Completed</button>
            </div>
        </div>
    )
}