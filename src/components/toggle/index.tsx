import clsx from 'clsx'
import styles from './toggle.module.css'
import { FaFileWord, FaMarkdown } from 'react-icons/fa6'

interface Props {
  isMarkdownMode: boolean
  onToggle: () => void
  className?: string
}

function ModeToggle({ isMarkdownMode, onToggle, className = '' }: Props) {
  return (
    <div className={clsx(styles.modeToggle, className)}>
      <button
        onClick={onToggle}
        className={clsx(styles.modeButton, isMarkdownMode ? styles.active : '')}
        aria-label="Markdown Mode"
      >
        <FaMarkdown />
        <span>Markdown</span>
      </button>
      <button
        onClick={onToggle}
        className={clsx(styles.modeButton, !isMarkdownMode ? styles.active : '')}
        aria-label="Direct Styling Mode"
      >
        <FaFileWord />
        <span>Direct</span>
      </button>
    </div>
  )
}

export default ModeToggle
