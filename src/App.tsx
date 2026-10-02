import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Lenis from "lenis";
import {
  ArrowDown,
  Check,
  ChevronDown,
  MapPin,
  Menu,
  X,
  MoveUpRight,
} from "lucide-react";
import {
  Arrow,
  Eyebrow,
  Modal,
  Reveal,
  ScrollDirectionContext,
} from "./components";
import { services, steps } from "./content";
import { variant } from "./config";

type Overlay =
  | { kind: "service"; index: number }
  | { kind: "legal" | "privacy" }
  | null;
const isSkill = variant === "skill";

function Header({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a className="brand" href="#accueil" aria-label="Maël Verré, accueil">
        <span className="monogram">
          m<span>v</span>
          <i />
        </span>
        <span>
          Maël Verré<small>CONSEIL EN PATRIMOINE</small>
        </span>
      </a>
      <nav
        className={open ? "navigation open" : "navigation"}
        aria-label="Navigation principale"
      >
        <a href="#approche" onClick={() => setOpen(false)}>
          L’approche
        </a>
        <a href="#expertises" onClick={() => setOpen(false)}>
          Les expertises
        </a>
        <a href="#methode" onClick={() => setOpen(false)}>
          La méthode
        </a>
        <button className="button nav-cta" onClick={() => { setOpen(false); onContact(); }}>
          Faisons connaissance <Arrow />
        </button>
      </nav>
      <button className="button mobile-contact-cta" onClick={onContact}>
        Prendre RDV <Arrow />
      </button>
      <button
        className="icon-button menu-toggle"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero() {
  const target = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 65]);
  return (
    <section className="hero" id="accueil" ref={target}>
      <div className="hero-copy">
        <Reveal from="left">
          <Eyebrow>À NICE & PARTOUT OÙ VOUS ÊTES</Eyebrow>
          <h1>
            {isSkill ? (
              <>
                Votre avenir.
                <br />
                Vos projets.
                <br />
                <em>Un cap clair.</em>
              </>
            ) : (
              <>
                Votre patrimoine.
                <br />
                Votre histoire.
                <br />
                <em>Notre horizon.</em>
              </>
            )}
          </h1>
          <p className="hero-description">
            Les bons choix commencent par une vraie conversation.
            <br className="desktop-break" /> Ensemble, donnons du sens à votre
            patrimoine.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              Parlons de vos projets <Arrow />
            </a>
            <a className="text-link" href="#approche">
              Découvrir mon approche <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-note">
            <span className="status-dot" /> Un premier échange, simplement. Sans
            engagement.
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-visual" delay={0.14} from="right">
        <div className="portrait-frame">
          <motion.img
            style={{ y: reduced ? 0 : y }}
            src="/portrait.jpg"
            alt="Maël Verré, conseiller en gestion de patrimoine à Nice"
            width="1254"
            height="1254"
            fetchPriority="high"
          />
          <div className="portrait-shade" />
          <div className="portrait-caption">
            <span>Votre interlocuteur, de bout en bout.</span>
            <strong>Maël Verré</strong>
            <p>Conseil en gestion de patrimoine</p>
          </div>
          <span className="portrait-corner">
            <MoveUpRight aria-hidden="true" size={28} />
          </span>
        </div>
        <div className="location-tag">
          <MapPin size={15} aria-hidden="true" /> Nice, Côte d’Azur{" "}
          <span>43°42′ N · 7°16′ E</span>
        </div>
        <div className="portrait-index">01 — UNE RELATION AVANT TOUT</div>
      </Reveal>
      <a className="scroll-cue" href="#approche">
        <ArrowDown size={15} /> PRENDRE LE TEMPS DE VOIR PLUS LOIN
      </a>
    </section>
  );
}

function Method() {
  const [active, setActive] = useState(0);
  return (
    <section className="page-scene section method" id="methode">
      <div className="section-heading">
        <Reveal from="left">
          <Eyebrow>UNE MÉTHODE, UN CAP</Eyebrow>
          <h2>
            De la première rencontre
            <br />à <em>la suite de votre histoire.</em>
          </h2>
        </Reveal>
        <Reveal from="right">
          <p>
            Un accompagnement lisible.
            <br />À chaque étape, vous savez où vous allez.
          </p>
        </Reveal>
      </div>
      <Reveal
        className="method-tabs"
        from="left"
        role="tablist"
        aria-label="Les étapes de l’accompagnement"
      >
        {steps.map((step, i) => (
          <button
            role="tab"
            aria-selected={i === active}
            aria-controls={`step-panel-${i}`}
            id={`step-tab-${i}`}
            tabIndex={i === active ? 0 : -1}
            key={step.title}
            onClick={() => setActive(i)}
            onKeyDown={(event) => {
              let next = i;
              if (event.key === "ArrowRight") next = (i + 1) % 4;
              else if (event.key === "ArrowLeft") next = (i + 3) % 4;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = 3;
              else return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`step-tab-${next}`)?.focus();
            }}
          >
            <span>0{i + 1}</span>
            <strong>{step.title}</strong>
            <Arrow />
          </button>
        ))}
      </Reveal>
      <Reveal
        className="method-panel"
        from="right"
        role="tabpanel"
        id={`step-panel-${active}`}
        aria-labelledby={`step-tab-${active}`}
      >
        <span className="giant-number" aria-hidden="true">
          0{active + 1}
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="eyebrow">{steps[active].label}</p>
            <h3>{steps[active].text}</h3>
            <p>{steps[active].detail}</p>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}

function Contact({
  onContact,
  onLegal,
  onPrivacy,
}: {
  onContact: () => void;
  onLegal: () => void;
  onPrivacy: () => void;
}) {
  return (
    <section className="page-scene contact-section" id="contact">
      <div className="contact-layout">
        <Reveal from="left">
          <Eyebrow>ET SI ON EN PARLAIT ?</Eyebrow>
          <h2>Votre prochain chapitre<br />commence par<br /><em>une conversation.</em></h2>
          <p>Un temps pour faire connaissance, poser vos questions et regarder ensemble ce qui est possible.</p>
          <div className="contact-person">
            <img src="/portrait.jpg" width="72" height="72" loading="lazy" alt="" />
            <div><strong>Maël Verré</strong><span>À Nice ou en visioconférence</span></div>
          </div>
        </Reveal>
        <Reveal from="right">
          <div className="contact-booking-card">
            <p className="form-heading">Faisons connaissance <Arrow /></p>
            <p>Choisissez directement un créneau pour un premier échange, à Nice ou en visioconférence.</p>
            <button className="button primary" type="button" onClick={onContact}>Prendre un rendez-vous <Arrow /></button>
            <p className="form-note">Premier échange sans engagement.</p>
          </div>
        </Reveal>
      </div>
      <footer>
        <div className="footer-top">
          <a href="#accueil" className="footer-brand">
            Maël Verré<span>Le patrimoine, à votre mesure.</span>
          </a>
          <p>
            Conseil en gestion de patrimoine
            <br />
            Nice · France entière à distance
          </p>
          <a href="#accueil" className="back-top">
            Revenir en haut <Arrow />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Maël Verré</span>
          <div>
            <button type="button" onClick={onLegal}>
              Mentions légales & transparence
            </button>
            <button type="button" onClick={onPrivacy}>
              Confidentialité
            </button>
          </div>
          <span>Avec attention, pour demain.</span>
        </div>
      </footer>
    </section>
  );
}

function CalBooking({ session, onBooked }: { session: number; onBooked: () => void }) {
  // Recharge le calendrier après une réservation pour retirer le créneau pris.
  const bookingUrl = import.meta.env.VITE_CALCOM_URL?.trim();
  const booked = useRef(false);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!/^https:\/\/([a-z0-9-]+\.)?cal\.com$/.test(event.origin)) return;
      const data = event.data;
      const type = data && typeof data === "object" ? String((data as { type?: string }).type || "") : "";
      if (!booked.current && /bookingSuccessful/i.test(type)) {
        booked.current = true;
        setConfirmed(true);
        onBooked();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onBooked]);
  if (!bookingUrl) {
    return (
      <div className="cal-missing" role="status">
        <p>La réservation en ligne sera disponible dès que l’adresse de votre agenda Cal.com aura été configurée.</p>
        <p>Pour terminer : renseignez <code>VITE_CALCOM_URL</code> avec votre lien Cal.com (par exemple <code>https://cal.com/votre-compte/premier-echange</code>), puis redémarrez le site.</p>
      </div>
    );
  }
  let url: URL;
  try {
    url = new URL(bookingUrl);
  } catch {
    return <p className="cal-missing" role="alert">Le lien Cal.com configuré n’est pas une URL valide.</p>;
  }
  if (!/^(cal\.com|www\.cal\.com)$/.test(url.hostname)) {
    return <p className="cal-missing" role="alert">L’adresse configurée doit être un lien public hébergé sur cal.com.</p>;
  }
  url.searchParams.set("embed", "true");
  return (
    <>
      {confirmed && <p className="booking-confirmed" role="status">Rendez-vous confirmé. Ce créneau n’est plus proposé.</p>}
      <iframe key={session} className="cal-embed" src={url.toString()} title="Réserver un rendez-vous avec Maël Verré" referrerPolicy="strict-origin-when-cross-origin" />
    </>
  );
}
export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSession, setBookingSession] = useState(0);
  const reduced = useReducedMotion();
  const scrollDirection = useRef(1);
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: false,
      duration: 1.15,
      smoothWheel: true,
      prevent: (node) => node.tagName === "DIALOG",
    });
    lenisRef.current = lenis;
    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, [reduced]);

  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const current = window.scrollY;
        if (Math.abs(current - previous) > 2) {
          scrollDirection.current = current > previous ? 1 : -1;
          previous = current;
        }
        frame = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  const handleAnchorClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
    if (!anchor || anchor.getAttribute("aria-disabled") === "true") return;
    const href = anchor.getAttribute("href");
    if (!href) return;
    const id = href.slice(1).split("?")[0];
    if (id === "contact") {
      event.preventDefault();
      setBookingSession((session) => session + 1);
      setBookingOpen(true);
      return;
    }
    const target = id === "main" || id === "accueil"
      ? document.querySelector<HTMLElement>(".opening-page")
      : document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    const top = target.getBoundingClientRect().top + window.scrollY + target.offsetHeight / 2 - window.innerHeight / 2;
    if (reduced) window.scrollTo({ top, behavior: "instant" });
    else if (lenisRef.current) lenisRef.current.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: "smooth" });
  };
  return (
    <ScrollDirectionContext.Provider value={scrollDirection}>
      <div className="app-shell" onClick={handleAnchorClick}>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <motion.div className="reading-progress" style={{ scaleX }} />
        <Header onContact={() => { setBookingSession((session) => session + 1); setBookingOpen(true); }} />
        <main id="main">
          <div className="opening-page" id="page-home">
            <Hero />
            <div className="trust-strip">
              <span>
                <MapPin size={17} /> Ancré à Nice, proche de vous
              </span>
              <span>
                <Check size={17} /> Une stratégie à votre mesure
              </span>
              <span className="partner">
                <span>
                  Partenaire de{" "}
                  <strong>
                    PREDICTIS<span className="partner-dot">.</span>
                  </strong>
                </span>
                <button
                  type="button"
                  className="partner-more"
                  onClick={() => setOverlay({ kind: "legal" })}
                >
                  En savoir plus
                </button>
              </span>
            </div>
          </div>
          <section className="page-scene section about" id="approche">
            <Reveal from="left">
              <Eyebrow>LE PATRIMOINE EST PERSONNEL. LE CONSEIL AUSSI.</Eyebrow>
            </Reveal>
            <div className="about-grid">
              <Reveal from="left">
                <h2>
                  Avant de parler de chiffres,
                  <br />
                  parlons <em>de vous.</em>
                </h2>
              </Reveal>
              <Reveal from="right">
                <div>
                  <p className="intro-text">
                    Un patrimoine, ce n’est pas seulement ce que vous possédez.
                    C’est ce que vous voulez en faire.
                  </p>
                  <p>
                    Une famille à protéger. Une liberté à préparer. Une histoire
                    à transmettre. Mon rôle est de comprendre la vôtre, puis de
                    vous aider à prendre des décisions éclairées, à votre
                    rythme.
                  </p>
                  <a href="#methode" className="text-link">
                    Une autre idée du conseil <Arrow />
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="values">
              <Reveal delay={0.08} from="left">
                <div>
                  <span>01 /</span>
                  <h3>La clarté, toujours.</h3>
                  <p>
                    Vous comprenez chaque choix.
                    <br />
                    Le jargon reste à la porte.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2} from="scale">
                <div>
                  <span>02 /</span>
                  <h3>La relation, d’abord.</h3>
                  <p>
                    Un interlocuteur qui vous connaît.
                    <br />
                    Et prend le temps de vous écouter.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.32} from="right">
                <div>
                  <span>03 /</span>
                  <h3>Le temps, un allié.</h3>
                  <p>
                    Une vision qui va plus loin.
                    <br />
                    Un suivi qui évolue avec votre vie.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
          <section className="page-scene section expertise" id="expertises">
            <div className="section-heading">
              <Reveal from="left">
                <div>
                  <Eyebrow>QUATRE EXPERTISES. UNE VISION D’ENSEMBLE.</Eyebrow>
                  <h2>
                    Votre vie est un tout.
                    <br />
                    <em>Votre patrimoine aussi.</em>
                  </h2>
                </div>
              </Reveal>
              <Reveal from="right">
                <p>
                  Des solutions qui se répondent,
                  <br />
                  au service de ce qui compte pour vous.
                </p>
              </Reveal>
            </div>
            <div className="service-grid">
              {services.map((service, i) => (
                <Reveal
                  key={service.id}
                  delay={i * 0.12}
                  from="up"
                >
                  <button
                    className={`service-card service-${i}`}
                    onClick={() => setOverlay({ kind: "service", index: i })}
                  >
                    <div className="card-top">
                      <service.icon size={29} strokeWidth={1.2} />
                      <span>0{i + 1}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="card-bottom">
                      Explorer <Arrow />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

          </section>
          <section className="page-scene quote-section" id="citation">
            <Reveal from="scale">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                Une bonne stratégie ne se mesure pas
                <br />
                seulement en chiffres.
                <br />
                <em>Elle se reconnaît à la sérénité qu’elle apporte.</em>
              </blockquote>
              <div className="quote-author">
                <span className="signature">Maël Verré</span>
                <span>VOTRE CONSEILLER, DANS LA DURÉE</span>
              </div>
            </Reveal>

          </section>
          <Method />
          <section className="page-scene section faq" id="questions">
            <div className="faq-layout">
              <Reveal from="left">
                <div>
                  <Eyebrow>EN TOUTE SIMPLICITÉ</Eyebrow>
                  <h2>
                    Les questions
                    <br />
                    <em>que vous vous posez.</em>
                  </h2>
                </div>
              </Reveal>
              <Reveal from="right">
                <div>
                  {[
                    [
                      "À qui s’adresse cet accompagnement ?",
                      "À celles et ceux qui souhaitent donner une direction à leur patrimoine : un premier projet, une nouvelle étape de vie ou le besoin de faire le point. Nous partons de votre situation, sans présupposé.",
                    ],
                    [
                      "Comment se déroule le premier rendez-vous ?",
                      "Nous prenons le temps de faire connaissance, de comprendre vos objectifs et de répondre à vos premières questions. Ce premier échange est sans engagement.",
                    ],
                    [
                      "Peut-on échanger à distance ?",
                      "Oui. L’accompagnement peut se faire à Nice ou en visioconférence, où que vous soyez en France.",
                    ],
                    [
                      "Comment votre conseil est-il rémunéré ?",
                      "Les modalités de rémunération et les éventuels frais doivent vous être présentés avant tout engagement. Les informations propres à Maël Verré restent à compléter dans la page Transparence avant la mise en ligne définitive.",
                    ],
                  ].map(([question, answer]) => (
                    <details key={question}>
                      <summary>
                        {question}
                        <ChevronDown size={18} />
                      </summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>

          </section>
          <Contact
            onContact={() => { setBookingSession((session) => session + 1); setBookingOpen(true); }}
            onLegal={() => setOverlay({ kind: "legal" })}
            onPrivacy={() => setOverlay({ kind: "privacy" })}
          />
      </main>
        {overlay && (
          <Modal
            title={
              overlay.kind === "service"
                ? services[overlay.index].title
                : overlay.kind === "legal"
                  ? "En toute transparence."
                  : "Vos données, simplement."
            }
            onClose={() => setOverlay(null)}
          >
            {overlay.kind === "service" ? (
              <>
                <p className="lead">{services[overlay.index].need}</p>
                <h3>Partir de votre situation</h3>
                <p>{services[overlay.index].approach}</p>
                <aside>
                  Les solutions peuvent être étudiées avec l’appui du réseau
                  Predictis, selon votre situation et vos objectifs.
                </aside>
                {services[overlay.index].questions.map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <ChevronDown size={18} />
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
                <a
                  href="#contact"
                  className="button primary"
                  onClick={() => setOverlay(null)}
                >
                  Parlons de votre projet <Arrow />
                </a>
              </>
            ) : overlay.kind === "legal" ? (
              <>
                <p className="lead">
                  Une relation de confiance commence par des informations
                  claires.
                </p>
                <h3>Éditeur et statut professionnel</h3>
                <p>
                  Maël Verré — conseil en gestion de patrimoine à Nice. Les
                  coordonnées professionnelles, l’identité juridique, le statut
                  exact, le numéro ORIAS et le médiateur restent à renseigner
                  avant publication.
                </p>
                <h3>Partenariat</h3>
                <p>
                  Le projet de site présente un partenariat avec Predictis,
                  Groupe Premium, sur la base des informations fournies par Maël
                  Verré. Le périmètre du partenariat et les mentions
                  professionnelles doivent être validés avant publication.
                </p>
                <h3>Rémunération</h3>
                <p>
                  Le mode de rémunération, les éventuels honoraires et
                  commissions doivent être précisés dans les documents remis
                  avant tout engagement. Aucun statut d’indépendance
                  réglementaire n’est revendiqué dans cette démonstration.
                </p>
                <a
                  className="text-link"
                  href="https://www.orias.fr"
                  target="_blank"
                  rel="noreferrer"
                >
                  Consulter le registre ORIAS <Arrow />
                </a>
              </>
            ) : (
              <>
                <p>
                  La prise de rendez-vous est fournie par Cal.com. Lorsque vous
                  utilisez le calendrier, les informations nécessaires à la
                  réservation sont transmises à Cal.com et traitées selon ses
                  propres conditions et sa politique de confidentialité.
                </p>
                <p>
                  Aucun outil publicitaire ou de mesure d’audience n’est
                  intégré. Les polices sont chargées auprès de Google Fonts, qui
                  reçoit les informations techniques nécessaires à cette
                  requête.
                </p>
                <p>
                  Avant la publication, cette page devra
                  préciser le responsable de traitement, les finalités, la base
                  juridique, les destinataires, la durée de conservation et les
                  modalités d’exercice des droits.
                </p>
              </>
            )}
          </Modal>
        )}
        {bookingOpen && (
          <Modal className="booking-dialog" title="Faisons connaissance" onClose={() => setBookingOpen(false)}>
            <p className="lead">Choisissez le créneau qui vous convient pour notre premier échange.</p>
            <CalBooking session={bookingSession} onBooked={() => setBookingSession((current) => current + 1)} />
          </Modal>
        )}
      </div>
    </ScrollDirectionContext.Provider>
  );
}
