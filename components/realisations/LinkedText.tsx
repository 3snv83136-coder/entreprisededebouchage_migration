import Link from 'next/link';
import { linkifyText } from '@/lib/services/linking.service';

interface Props {
  text: string;
  excludeHref?: string;
  className?: string;
}

export default function LinkedText({ text, excludeHref, className }: Props) {
  const segments = linkifyText(text, excludeHref);

  return (
    <p className={className}>
      {segments.map((seg, i) =>
        seg.href ? (
          <Link key={i} href={seg.href} className="linkedKeyword">
            {seg.text}
          </Link>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </p>
  );
}
