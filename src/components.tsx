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
  from = "up",
  role,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right" | "scale";
  role?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25, margin: "0px 0px -12% 0px", once: false });
  const direction = useContext(ScrollDirectionContext);
  const controls = useAnimationControls();
  const hiddenState = (scrollDirection: number) => {
    if (from === "left")
      return { opacity: 0, x: scrollDirection > 0 ? -34 : 34 };
    if (from === "right")
      return { opacity: 0, x: scrollDirection > 0 ? 34 : -34 };
    if (from === "scale")
      return { opacity: 0, y: scrollDirection > 0 ? 20 : -20, scale: 0.94 };
    return { opacity: 0, y: scrollDirection > 0 ? 24 : -24 };
  };

  useEffect(() => {
    if (reduced) {
      controls.set({ opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: 0.92, delay, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      controls.start({
        ...hiddenState(direction?.current ?? 1),
        transition: { duration: 0.42, ease: [0.4, 0, 1, 1] },
      });
    }
  }, [controls, delay, direction, from, inView, reduced]);

  return (
    <motion.div
      ref={ref}
      className={className}
      role={role}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      initial={reduced ? false : hiddenState(1)}
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
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
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
      className={className}
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
