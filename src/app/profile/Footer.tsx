import { contact, profile } from "./content";
import styles from "./profile.module.css";

export function ContactBand() {
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.contactInner} data-reveal>
          <div>
            <h2 id="contact-title" className={styles.contactTitle}>
              {contact.heading}
            </h2>
            <p className={styles.contactBody}>{contact.body}</p>
          </div>
          <div className={styles.contactActions}>
            <a
              href={`mailto:${profile.email}`}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Email me
            </a>
            <a href={profile.linkedin} className={styles.contactLink}>
              LinkedIn
            </a>
            <a href={profile.github} className={styles.contactLink}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <ul className={styles.footerLinks}>
          <li>
            <a href={profile.resume}>Resume</a>
          </li>
          <li>
            <a href={profile.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={profile.github}>GitHub</a>
          </li>
          <li>
            <a href="#top">Back to top</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
