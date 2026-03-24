import { loginAction } from './actions';
import styles from './page.module.css';

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin</h1>
        <p className={styles.sub}>Entreprise de Débouchage</p>

        <form action={loginAction} className={styles.form}>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className={styles.input}
            autoComplete="current-password"
            autoFocus
            required
          />
          {error && <p className={styles.error}>Mot de passe incorrect</p>}
          <button type="submit" className={styles.btn}>
            Accéder →
          </button>
        </form>
      </div>
    </div>
  );
}
