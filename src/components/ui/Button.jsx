import { Link } from 'react-router-dom'
import styles from './Button.module.css'

export default function Button({ children, to, type = 'button', className = '', onClick, disabled }) {
  const content = <>{children}<span className={styles.arrow} aria-hidden="true">↗</span></>
  if (to) {
    return <Link className={`${styles.button} ${className}`} to={to} data-cursor="link">{content}</Link>
  }
  return (
    <button className={`${styles.button} ${className}`} type={type} onClick={onClick} disabled={disabled} data-cursor="link">
      {content}
    </button>
  )
}
