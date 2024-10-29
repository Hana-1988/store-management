import { Link } from "react-router-dom"
import styles from "./Home.module.css"

function Home() {
  return (
    <div className={styles.container}>
      <div><h2>Welcome to the product management section</h2></div>
      <div className={styles.image}><img src='/manager.png'/></div>
        <button><Link to="/products">Store Management</Link></button>
    </div>
  )
}

export default Home