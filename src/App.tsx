import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

const hat1 = 'What to learn-1';
export type FilterValueType = "All" | "Completed" | "Active";
function App() {
    let [tasks, setTask] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]);
    let [filter, setFilter] = useState<FilterValueType>("All")

    function removeTask(id: number){
        let filteredTasks = tasks.filter( el => id !== el.id)
        setTask(filteredTasks)
    }
    function changeFilter(value: FilterValueType){
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if(filter === "Completed"){
        tasksForTodoList = tasks.filter( t => t.isDone === true);
    }
    if(filter === "Active"){
        tasksForTodoList = tasks.filter( t => t.isDone === false);
    }
    return (
        <div className="App">
            <TodoList hat1={hat1}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
            {/*<TodoList hat2={hat2} tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
