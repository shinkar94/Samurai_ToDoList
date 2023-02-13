import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import tdSt from './TodoList.module.css';

type PropsType={
    hat1?: string
    hat2?: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTasks: (title: string)=>void
    changeStatus: (taskId: string, isDone: boolean)=>void
}
export type TaskType={
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = (props:PropsType) =>{

    let [filter, setFilter] = useState<FilterValueType>("All")
    const [newTasksTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    function changeFilter(value: FilterValueType){
        setFilter(value)
    }
    const onChangerHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setError(null)
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            if(newTasksTitle.trim() !== ""){
                props.addTasks(newTasksTitle)
                setNewTitle("")
            }else{
                setError('Error, Title is required!!!')
            }
        }
    }
    const addTasks = () =>{
        if(newTasksTitle.trim() !== ""){
            props.addTasks(newTasksTitle)
            setNewTitle("")
        }else{
            setError('Error, Title is required!!!')
        }
    }

    let tasksForTodoList = props.tasks;
    if(filter === "Completed"){
        tasksForTodoList = props.tasks.filter( t => t.isDone === true);
    }
    if(filter === "Active"){
        tasksForTodoList = props.tasks.filter( t => t.isDone === false);
    }

    const resultTasks = tasksForTodoList.map(el=>{
        const onRemove = () => props.removeTask(el.id)
        const onChangeCheckBox = (e:ChangeEvent<HTMLInputElement>) =>{
            props.changeStatus(el.id, e.currentTarget.checked)
        }
        return(
            <li key={el.id} className={el.isDone ? tdSt.is_done : ""}>
                <button onClick={onRemove}>X</button>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={onChangeCheckBox}/>
                <span>{el.title}</span>
            </li>
        )
    })

    return(
        <div>
            <h3>{props.hat1}</h3>
            <h3>{props.hat2}</h3>
            <div>
                <input
                    onChange={onChangerHandler}
                    onKeyDown={onKeyPress}
                    value={newTasksTitle}
                    className={error ? tdSt.error : ""}
                />
                <button onClick={addTasks}>Send</button>
            </div>
            {error && <p className={tdSt.errorMessage}>{error}</p>}
            <ul>
                {resultTasks}
            </ul>
            <div>
                <button className={filter === 'All' ? tdSt.activeFilter : ""} onClick={()=>{changeFilter("All")}}>All</button>
                <button className={filter === 'Active' ? tdSt.activeFilter : ""} onClick={()=>{changeFilter("Active")}}>Active</button>
                <button className={filter === 'Completed' ? tdSt.activeFilter : ""} onClick={()=>{changeFilter("Completed")}}>Completed</button>
            </div>
        </div>
    )
}