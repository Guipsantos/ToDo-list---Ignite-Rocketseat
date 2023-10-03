import { PlusCircle } from '@phosphor-icons/react'
import { Task } from './Task';
import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './NewTask.module.css';
import clipBoard from '../assets/Clipboard.svg'


interface Taask {
    content: string;
    taskToDelete: (content: string) => void;
    task: string;
    taskToDo: string;
};

export function NewTask({  }: Taask) {
    const [taskToDo, setTaskToDo] = useState(['']);

    const [newTaskText, setNewTaskText] = useState('');

    const [totalChangeCount, setTotalChangeCount] = useState(0);


    function handleCreateNewTask(event: FormEvent) {
        event?.preventDefault()


        setTaskToDo([...taskToDo, newTaskText]);

        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewTaskText(event.target.value)
    }

    function deleteTask(taskToDelete: string, hasCheckCircle: boolean) {
        const taskWithoutDeletedOne = taskToDo.filter(task => {
            return task !== taskToDelete;
        })

        setTaskToDo(taskWithoutDeletedOne);

        if (hasCheckCircle) {
            updateTotalChangeCount(1, false); // Diminuir totalChangeCount se a tarefa tinha CheckCircle
        }
    }

    function updateTotalChangeCount(value: number, isIncrease: boolean) {
        if (isIncrease) {
            setTotalChangeCount(totalChangeCount + value);
        } else {
            setTotalChangeCount(totalChangeCount - value);
        }
    }

    const isNewTaskEmpty = taskToDo.length > 1;

    const isNewTaskText = newTaskText === '';

    return (
        <div >
            <form  onSubmit={handleCreateNewTask} className={styles.typeTask}>
                <textarea 
                    name="task"
                    placeholder="Adicione uma nova tarefa"
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                    required
                />
                
                <button type='submit' disabled={isNewTaskText}>
                    Criar <PlusCircle size={24} />
                </button> 
   
            </form>
            <div className={styles.taskBox}>
                <div className={styles.taskCounter}>
                    <strong>Tarefas criadas <span>{taskToDo.length-1}</span></strong>
                    <strong>Concluídas <span>{totalChangeCount} de {taskToDo.length-1}</span></strong>
                </div>      
            </div> 
            <div>
            {taskToDo.map(task => {
    return (
        <Task
            key={task}
            content={task}
            onDeleteTask={deleteTask}
            updateTotalChangeCount={(value) => setTotalChangeCount(totalChangeCount + value)}
        />
    )
})}

            </div>
            <footer hidden={isNewTaskEmpty} >
                <div className={styles.footerTask}>
                    <img src={clipBoard} alt="Clipboard quando tarefa vazia" />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            </footer>
        </div>
        
    )
}