import styles from './Checkbox.module.css'

type CheckboxTypes = {
  handleIsCompleted: (id: number) => void
  id: number
}

export function Checkbox({ id, handleIsCompleted }: CheckboxTypes) {
  function handleCheck(id: number) {
    handleIsCompleted(id)
  }

  return (
    <label className={styles.checkboxContainer}>
      <input type="checkbox" onChange={() => handleCheck(id)} />
      <span className={styles.checkmark}></span>
    </label>
  )
}
