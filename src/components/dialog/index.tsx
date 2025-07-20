import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'
import styles from './dialog.module.css'
import { Button } from '@/components'

interface DialogProps {
  id: string
  children: React.ReactNode
  className?: string
}

const DialogContext = createContext<{
  open: (id: string) => void
  close: (id: string) => void
  toggle: (id: string) => void
  dialogState: Record<string, boolean>
}>({
  open: () => {},
  close: () => {},
  toggle: () => {},
  dialogState: {},
})

function Dialog({ id, children, className }: DialogProps) {
  const [dialogState, setDialogState] = useState<Record<string, boolean>>({})

  const open = useCallback(() => {
    setDialogState((prev) => ({ ...prev, [id]: true }))
  }, [id])

  const close = useCallback(() => {
    setDialogState((prev) => ({ ...prev, [id]: false }))
  }, [id])

  const toggle = useCallback(() => {
    setDialogState((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [id])

  return (
    <DialogContext.Provider value={{ open, close, toggle, dialogState }}>
      <div className={clsx(styles.dialog, className)}>{children}</div>
    </DialogContext.Provider>
  )
}

export const useDialog = (id: string) => {
  const { open, close, toggle, dialogState } = useContext(DialogContext)
  const isDialogOpen = useMemo(() => dialogState[id] ?? false, [dialogState, id])
  const openDialog = useCallback(() => open(id), [open, id])
  const closeDialog = useCallback(() => close(id), [close, id])
  const toggleDialog = useCallback(() => toggle(id), [toggle, id])
  return { openDialog, closeDialog, isDialogOpen, toggleDialog, dialogState }
}

interface Props {
  id: string
  children: React.ReactNode
  className?: string
}

Dialog.Trigger = function Trigger({ id, children, className }: Props) {
  const { toggleDialog } = useDialog(id)
  return (
    <div className={clsx(styles.trigger, className)}>
      <Button onClick={toggleDialog}>{children}</Button>
    </div>
  )
}

Dialog.Close = function Close({ id, children, className }: Props) {
  const { closeDialog } = useDialog(id)
  return (
    <div className={clsx(styles.close, className)}>
      <Button onClick={closeDialog}>{children}</Button>
    </div>
  )
}

Dialog.Header = function Header({ id, children, className }: Props) {
  const { isDialogOpen } = useDialog(id)
  if (!isDialogOpen) return null
  return (
    <>
      {ReactDOM.createPortal(
        <div id={`${id}-header`} className={clsx(styles.header, className)} data-id={id}>
          {children}
        </div>,
        document.getElementById(`${id}-content`) as HTMLElement
      )}
    </>
  )
}

Dialog.Title = function Title({ id, children, className }: Props) {
  const { isDialogOpen } = useDialog(id)
  if (!isDialogOpen) return null
  return (
    <>
      {ReactDOM.createPortal(
        <h2 id={`${id}-title`} className={clsx(styles.title, className)}>
          {children}
        </h2>,
        document.getElementById(`${id}-header`) as HTMLElement
      )}
    </>
  )
}

Dialog.Content = function Content({ id, children, className }: Props) {
  const { isDialogOpen, closeDialog } = useDialog(id)
  if (!isDialogOpen) return null

  return (
    <>
      {ReactDOM.createPortal(
        <div
          id={id}
          onClick={() => closeDialog()}
          className={clsx(styles.overlay, className)}
          data-id={id}
          data-state={isDialogOpen ? 'open' : 'closed'}
          aria-hidden={!isDialogOpen}
          data-aria-hidden={!isDialogOpen}
        />,
        document.body
      )}
      {ReactDOM.createPortal(
        <div
          id={`${id}-content`}
          data-id={id}
          onClick={(e) => e.stopPropagation()}
          className={clsx(styles.content, className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={id}
          data-state={isDialogOpen ? 'open' : 'closed'}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  )
}

export default Dialog
