import clsx from 'clsx'
import styles from './card.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

function Card({ children, className = '' }: Props) {
  return <div className={clsx(styles.card, className)}>{children}</div>
}

export default Card
