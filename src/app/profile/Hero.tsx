import { hero, profile, proof } from "./content";
import styles from "./profile.module.css";

const LINE = "M0 110 L48 106 L96 108 L144 100 L196 102 L248 96 L300 94 L346 60 L388 36";

function KpiCard() {
  const { card } = hero;
  return (
    <aside className={styles.kpiCard} aria-label="Example AI-generated insight">
      <div className={styles.kpiHead}>
        <span className={styles.kpiTitle}>{card.title}</span>
        <span className={styles.tag}>{card.tag}</span>
      </div>
      <div className={styles.kpiValueRow}>
        <span className={styles.kpiValue}>{card.value}</span>
        <span className={styles.kpiDelta}>{card.delta}</span>
      </div>
      <svg
        className={styles.chart}
        viewBox="0 0 400 130"
        role="img"
        aria-label="Line chart showing checkout conversion rising over the week"
      >
        <path
          className={styles.chartArea}
          d={`${LINE} L388 130 L0 130 Z`}
          fill="var(--accent-soft)"
        />
        <path
          className={styles.chartLine}
          d={LINE}
          pathLength={1}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          className={styles.chartDot}
          cx="388"
          cy="36"
          r="5"
          fill="var(--card)"
          stroke="var(--accent)"
          strokeWidth="2.5"
        />
      </svg>
      <div className={styles.why}>
        <span className={styles.mono}>{card.whyLabel}</span>
        <p>{card.why}</p>
        <ul className={styles.chips}>
          {card.chips.map((chip, i) => (
            <li
              key={chip}
              className={`${styles.chip} ${i > 0 ? styles.chipAccent : ""}`}
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {hero.status}
          </p>
          <h1 id="hero-title" className={styles.h1}>
            {hero.headline}
          </h1>
          <p className={styles.lead}>{hero.summary}</p>
          <div className={styles.buttonRow}>
            <a
              href={`mailto:${profile.email}`}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Start a conversation
            </a>
            <a href="#work" className={`${styles.button} ${styles.buttonOutline}`}>
              See case studies
            </a>
          </div>
        </div>
        <div data-reveal>
          <KpiCard />
        </div>
      </div>
    </section>
  );
}

export function ProofStrip() {
  return (
    <section className={styles.proof} aria-label="Track record">
      <div className={styles.container} data-reveal>
        <div className={styles.proofCompanies}>
          <span className={styles.mono}>{proof.label}</span>
          <ul className={styles.companyList}>
            {proof.companies.map((company) => (
              <li key={company}>{company}</li>
            ))}
          </ul>
        </div>
        <dl className={styles.stats}>
          {proof.stats.map((stat) => (
            <div key={stat.value} className={styles.stat}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
