import styles from './Header.module.css'

import igniteLogo from '../assets/ToDo-logo.svg';

export function Header() {
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="Logotipo do To Do List" />
        </header>
    )
}