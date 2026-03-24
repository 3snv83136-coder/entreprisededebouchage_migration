import styles from './ProcessSchema.module.css';

interface Step {
  icon: string;
  label: string;
  text: string;
  highlight?: boolean;
}

interface Props {
  type: string;
  ville: string;
  duree?: string;
  contexte?: string;
  diagnostic?: string;
  intervention: string;
  resultat: string;
}

export default function ProcessSchema({ type, ville, duree, contexte, diagnostic, intervention, resultat }: Props) {
  const steps: Step[] = [
    {
      icon: '🚨',
      label: 'Situation',
      text: contexte || `Appel pour ${type.toLowerCase()} à ${ville}.`,
    },
    {
      icon: '🔍',
      label: 'Diagnostic',
      text: diagnostic || `Inspection sur place et identification du problème.`,
    },
    {
      icon: '🔧',
      label: 'Intervention',
      text: intervention.length > 100 ? intervention.slice(0, 97) + '…' : intervention,
      highlight: true,
    },
    {
      icon: '✅',
      label: 'Résultat',
      text: resultat.length > 100 ? resultat.slice(0, 97) + '…' : resultat,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Déroulement de l&apos;intervention</span>
        {duree && <span className={styles.duree}>⏱ {duree}</span>}
      </div>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={i} className={`${styles.step} ${step.highlight ? styles.stepHighlight : ''}`}>
            <div className={styles.stepNumber}>{i + 1}</div>
            <div className={styles.stepIcon}>{step.icon}</div>
            <div className={styles.stepContent}>
              <div className={styles.stepLabel}>{step.label}</div>
              <p className={styles.stepText}>{step.text}</p>
            </div>
            {i < steps.length - 1 && <div className={styles.connector} />}
          </div>
        ))}
      </div>
    </div>
  );
}
