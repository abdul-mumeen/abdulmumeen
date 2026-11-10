import styles from "./profile.module.css";

type SectionProps = {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
};

export default function Section({ id, number, title, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-reveal>
          <span className={styles.mono}>{number}</span>
          <h2 id={`${id}-title`} className={styles.h2}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
