import { Trash, Circle, CheckCircle } from '@phosphor-icons/react'; 
import { useState, useEffect } from 'react';
import styles from './Task.module.css';

interface TaskTable {
    content: string;
    onDeleteTask: (content: string, hasCheckCircle: boolean) => void;
    updateTotalChangeCount: (value: number, isIncrease: boolean) => void;
}

export function Task({ content, onDeleteTask, updateTotalChangeCount  }: TaskTable) {
    const [visible, setVisible] = useState(true);
    const [changeCount, setChangeCount] = useState(0);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (!visible && !hasChanged) {
            setChangeCount(changeCount + 1);
            setHasChanged(true);
            updateTotalChangeCount(1, true); // Incrementar totalChangeCount
        } else if (visible) {
            if (hasChanged) {
                setChangeCount(changeCount - 1);
                setHasChanged(false);
                updateTotalChangeCount(-1, false); // Decrementar totalChangeCount
            }
        }
    }, [visible, hasChanged, changeCount, updateTotalChangeCount]);

    function handleDeleteTask() {
        onDeleteTask(content, !visible);
    }
    
    

    return (
        <div className={styles.taskBox}>
            <div className={styles.taskCreated}>
                <div className={styles.taskContent}>
                    <button
                        className={!visible ? styles.textCompletedButton : styles.textIncompletedButton}
                        onClick={() => setVisible(!visible)}
                    >
                        {visible ? <Circle size={20} /> : <CheckCircle size={20} />}{" "}
                    </button>
                    <p className={!visible ? styles.textCompleted : ""}>{content}</p>
                    <button onClick={handleDeleteTask} title="Deletar Tarefa">
                        <Trash size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
