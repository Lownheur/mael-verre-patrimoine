import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, X } from "lucide-react";

export const ScrollDirectionContext = createContext<RefObject<number> | null>(
  null,
);

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: false });
  const direction = useContext(ScrollDirectionContext);
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduced) {
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      controls.start({
        opacity: 0,
        y: direction?.current && direction.current < 0 ? 24 : -24,
        transition: { duration: 0.24, ease: [0.4, 0, 1, 1] },
      });
    }
  }, [controls, delay, direction, inView, reduced]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
export function Arrow({ size = 18 }: { size?: number }) {
  return <ArrowUpRight size={size} strokeWidth={1.5} aria-hidden="true" />;
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const dialog = ref.current;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">
        <button
          className="icon-button close"
          aria-label="Fermer"
          onClick={onClose}
          autoFocus
        >
          <X size={22} />
        </button>
        <p className="eyebrow">MAËL VERRÉ · CONSEIL PATRIMONIAL</p>
        <h2 id="dialog-title">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
