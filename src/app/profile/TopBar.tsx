import { nav, profile } from "./content";
import ThemeToggle from "./ThemeToggle";
import styles from "./profile.module.css";

export default function TopBar() {
  return (
    <header className={styles.topBar}>
      <div className={`${styles.container} ${styles.topBarInner}`}>
        <a
          href="#top"
          className={styles.brand}
          aria-label={`${profile.name}, pronounced ${profile.pronunciation}`}
        >
          <span className={styles.mark} aria-hidden="true">
            {profile.initials}
          </span>
          <span className={styles.brandName}>{profile.name}</span>
          <span className={styles.pronunciation} role="tooltip">
            /{profile.pronunciation}/
          </span>
        </a>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.topBarActions}>
          <ThemeToggle />
          <a
            href={`mailto:${profile.email}`}
            className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonSmall}`}
          >
            Email me
          </a>
        </div>
      </div>
    </header>
  );
}
