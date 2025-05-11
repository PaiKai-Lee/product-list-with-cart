import { cn } from './utils';
import { ClassValue } from 'clsx';
import { useUi } from '../hooks';
export function Modal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  const { isModalOpen, closeModal } = useUi();

  if (!isModalOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
        className,
      )}
      onClick={() => closeModal()}
    >
      {children}
    </div>
  );
}
