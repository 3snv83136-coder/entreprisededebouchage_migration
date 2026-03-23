import styles from './GeneratedContent.module.css';

interface Props {
  html: string;
}

function stripH1(html: string): string {
  return html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
}

export default function GeneratedContent({ html }: Props) {
  return (
    <article className={styles.section}>
      <div className="container">
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: stripH1(html) }}
        />
      </div>
    </article>
  );
}
