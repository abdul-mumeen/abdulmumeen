import Image from "next/image";
import {
  about,
  engagements,
  faqs,
  profile,
  services,
  steps,
  testimonials,
} from "./content";
import Section from "./Section";
import styles from "./profile.module.css";

export function Services() {
  return (
    <Section id="services" number="01" title="What I build">
      <ul className={styles.grid2}>
        {services.map((service) => (
          <li key={service.title} className={styles.card} data-reveal>
            <h3 className={styles.h3}>{service.title}</h3>
            <p className={styles.summary}>{service.description}</p>
            <ul className={styles.tools}>
              {service.tools.map((tool) => (
                <li key={tool} className={styles.tool}>
                  {tool}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Together() {
  return (
    <Section id="together" number="03" title="Working together">
      <ul className={styles.grid3}>
        {engagements.map((item) => (
          <li key={item.title} className={styles.card} data-reveal>
            <h3 className={styles.h3}>{item.title}</h3>
            <p className={styles.summary}>{item.audience}</p>
            <p className={`${styles.mono} ${styles.accentText}`}>{item.length}</p>
          </li>
        ))}
      </ul>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.title} className={styles.step} data-reveal>
            <span className={styles.stepNumber} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.summary}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Testimonials() {
  return (
    <Section id="kind-words" number="04" title="Kind words">
      <ul className={styles.grid2}>
        {testimonials.map((item, i) => (
          <li key={i}>
            <figure className={`${styles.card} ${styles.quote}`} data-reveal>
              <blockquote>
                <p>&ldquo;{item.quote}&rdquo;</p>
              </blockquote>
              <figcaption className={styles.mono}>{item.attribution}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" number="05" title="A little bit more about me">
      <div className={styles.aboutGrid}>
        <div className={styles.aboutProfile} data-reveal>
          <Image
            className={styles.avatar}
            src={profile.photo}
            alt={profile.name}
            width={176}
            height={176}
          />
          <dl className={styles.facts}>
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className={styles.mono}>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.aboutCopy} data-reveal>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className={styles.linkRow}>
            <li>
              <a href={profile.resume} className={styles.link}>
                Resume (PDF)
              </a>
            </li>
            <li>
              <a href={profile.linkedin} className={styles.link}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} className={styles.link}>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section id="faq" number="06" title="Good to know.">
      <div className={styles.faqList} data-reveal>
        {faqs.map((faq) => (
          <details key={faq.question} className={styles.faq}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
