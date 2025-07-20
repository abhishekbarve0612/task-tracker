import clsx from 'clsx'
import styles from './input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icon?: React.ReactNode
}

function Input({ className, icon, ...props }: InputProps) {
  return (
    <>
      {icon && <div className={styles.inputIcon}>{icon}</div>}
      <input className={clsx(styles.input, icon && styles.inputWithIcon, className)} {...props} />
    </>
  )
}

export default Input
