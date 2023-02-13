import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

const hat1 = 'What to learn-1';
export type FilterValueType = "All" | "Completed" | "Active";

function App() {
    let [tasks, setTask] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ]);


    function removeTask(id: string){
        setTask(tasks.filter( el => id !== el.id))
    }
    function addTasks(title:string){
        let newTask = {id: v1(), title:title, isDone: false}
        let newTasks = [newTask, ...tasks];
        setTask(newTasks)
    }
    const changeStatus = (taskId: string, isDone: boolean) =>{
        let task = tasks.find(t=>t.id === taskId)
        if(task){
            task.isDone = isDone
        }
        setTask([...tasks]);
    }

    return (
        <div className="App">
            <TodoList hat1={hat1}
                      tasks={tasks}
                      removeTask={removeTask}
                      addTasks={addTasks}
                      changeStatus={changeStatus}/>
        </div>
    );
}

export default App;
