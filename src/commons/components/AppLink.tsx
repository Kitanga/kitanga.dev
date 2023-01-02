import type { Component } from 'solid-js'
import styles from './../../App.module.css';

interface IAppLinkProps {
    link: string
    title: string
    onHover: (state: boolean) => void
    target?: string
}

const AppLink: Component<IAppLinkProps> = ({ link, title, onHover, target }) => {
    return <a class={styles.link} onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} href={link} target={target ?? '_blank'}>{title}</a>
}

export default AppLink