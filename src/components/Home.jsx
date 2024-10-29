import { Link } from "react-router-dom"
import styles from "./Home.module.css"

function Home() {
  return (
    <div className={styles.container}>
        <button><Link to="/products">Store Management</Link></button>
    </div>
  )
}

export default Home