import plus from '../assets/plus.svg'

import styles from './CreateButton.module.css'

export function CreateButton() {
  return (
    <button className={styles.createButton}>
      Criar <img src={plus} alt="Plus signal" />
    </button>
  )
}
