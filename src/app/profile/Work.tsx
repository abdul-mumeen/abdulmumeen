import { caseStudies, smallCaseStudies, type CaseStudy } from "./content";
import Section from "./Section";
import styles from "./profile.module.css";

function Cases({ study }: { study: CaseStudy }) {
  const items = [
    { label: "Challenge", body: study.challenge },
    { label: "Approach", body: study.approach },
    { label: "Outcome", body: study.outcome },
  ];
  return (
    <dl className={styles.cases}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className={styles.mono}>{item.label}</dt>
          <dd>{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}

function Metrics({ study }: { study: CaseStudy }) {
  return (
    <ul className={styles.metrics}>
      {study.metrics.map((metric) => (
        <li key={metric.value} className={styles.metric}>
          <span className={styles.metricValue}>{metric.value}</span>
          <span className={styles.metricLabel}>{metric.label}</span>
        </li>
      ))}
    </ul>
  );
}

function Intro({ study }: { study: CaseStudy }) {
  return (
    <div>
      <p className={styles.meta}>{study.meta}</p>
      <h3 className={styles.h3}>{study.title}</h3>
      <p className={styles.summary}>{study.summary}</p>
    </div>
  );
}

export default function Work() {
  return (
    <Section id="work" number="02" title="Selected work">
      <div className={styles.stack}>
        {caseStudies.map((study) => (
          <article key={study.title} className={styles.card} data-reveal>
            <div className={styles.caseTop}>
              <Intro study={study} />
              <Metrics study={study} />
            </div>
            <Cases study={study} />
          </article>
        ))}
        <div className={styles.smallGrid}>
          {smallCaseStudies.map((study) => (
            <article
              key={study.title}
              className={`${styles.card} ${styles.cardSmall}`}
              data-reveal
            >
              <Intro study={study} />
              <Metrics study={study} />
              <Cases study={study} />
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
