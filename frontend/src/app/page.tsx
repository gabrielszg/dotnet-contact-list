import styles from "./page.module.css";
import Contacts from "./pages/contacts";

export default function Home() {
  return (
    <main className={styles.main}>
      <Contacts />
    </main>
  );
}
