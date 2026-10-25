import { useState } from 'react';
import { Download } from 'lucide-react';
import Button from './Button';
import CvDialog from './CvDialog';
import useResumeStatus from '../hooks/useResumeStatus';
import { siteConfig } from '../data/siteConfig';

/**
 * Downloads the PDF when available; otherwise shows a short availability message.
 */
export default function CvButton({ variant = 'secondary', size = 'md', className = '' }) {
  const status = useResumeStatus();
  const [open, setOpen] = useState(false);
  const { url, fileName } = siteConfig.resume;

  if (status === 'available') {
    return (
      <Button href={url} download={fileName} variant={variant} size={size} icon={Download} className={className}>
        Download Resume
      </Button>
    );
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        icon={Download}
        className={className}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        Download Resume
      </Button>
      {open && <CvDialog onClose={() => setOpen(false)} />}
    </>
  );
}
