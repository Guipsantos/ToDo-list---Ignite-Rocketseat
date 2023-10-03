import { Header } from './components/Header';
import { NewTask } from './components/NewTask';

import './global.css';
import styles from './App.module.css';


export function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
        <div >
          <NewTask content={''} 
                   taskToDelete={function (): void {
                      throw new Error('Function not implemented.');
                    } } 
                   task={''} taskToDo={''} />
        
      </div>
    </div>
  )
}

