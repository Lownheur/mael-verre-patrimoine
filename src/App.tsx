import { useEffect, useRef, useState } from "react";
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
  Plus,
  X,
  Compass,
  MoveUpRight,
} from "lucide-react";
import {
  Arrow,
  Eyebrow,
  Modal,
  Reveal,
  ScrollDirectionContext,
} from "./components";
import { resources, services, steps } from "./content";
import { variant } from "./config";

type Overlay =
  | { kind: "service" | "article"; index: number }
  | { kind: "legal" | "privacy" }
  | null;
const isSkill = variant === "skill";

function Header() {
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
        <a href="#ressources" onClick={() => setOpen(false)}>
          Les éclairages
        </a>
        <a
          className="button nav-cta"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Faisons connaissance <Arrow />
        </a>
      </nav>
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
        <Reveal>
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
      <Reveal className="hero-visual" delay={0.12}>
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

function ProjectCompass() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="project-section" id="projets">
      <Reveal className="project-layout">
        <div>
          <Eyebrow>VOTRE POINT DE DÉPART</Eyebrow>
          <h2>
            Tout commence
            <br />
            par <em>un projet.</em>
          </h2>
          <p>
            Pas besoin d’avoir toutes les réponses.
            <br />
            Qu’est-ce qui compte pour vous aujourd’hui ?
          </p>
        </div>
        <div className="project-tool">
          <div
            className="project-options"
            role="group"
            aria-label="Choisir votre priorité"
          >
            {[
              "Faire grandir mon épargne",
              "Préparer ma retraite",
              "Protéger mes proches",
              "Investir dans l’immobilier",
            ].map((label, i) => (
              <button
                key={label}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <span className="option-number">0{i + 1}</span>
                {label}
                {selected === i ? <Check size={17} /> : <Plus size={17} />}
              </button>
            ))}
          </div>
          <div className="project-result" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <Compass size={28} strokeWidth={1.25} aria-hidden="true" />
                <h3>{services[selected].short}</h3>
                <p>{services[selected].focus}</p>
                <a
                  className="text-link"
                  href={`#contact?subject=${services[selected].id}`}
                >
                  En parlons-nous ? <Arrow />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Method() {
  const [active, setActive] = useState(0);
  return (
    <section className="section method" id="methode">
      <Reveal className="section-heading">
        <div>
          <Eyebrow>UNE MÉTHODE, UN CAP</Eyebrow>
          <h2>
            De la première rencontre
            <br />à <em>la suite de votre histoire.</em>
          </h2>
        </div>
        <p>
          Un accompagnement lisible.
          <br />À chaque étape, vous savez où vous allez.
        </p>
      </Reveal>
      <div
        className="method-tabs"
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
      </div>
      <div
        role="tabpanel"
        id={`step-panel-${active}`}
        aria-labelledby={`step-tab-${active}`}
        className="method-panel"
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
      </div>
    </section>
  );
}

function Contact() {
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const update = () => {
      const match = location.hash.match(/^#contact\?subject=(.+)$/);
      if (match) {
        setSubject(match[1]);
        document
          .getElementById("contact")
          ?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
      }
    };
    window.addEventListener("hashchange", update);
    update();
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return (
    <section className="contact-section" id="contact">
      <Reveal className="contact-layout">
        <div>
          <Eyebrow>ET SI ON EN PARLAIT ?</Eyebrow>
          <h2>
            Votre prochain chapitre
            <br />
            commence par
            <br />
            <em>une conversation.</em>
          </h2>
          <p>
            Un temps pour faire connaissance, poser vos questions
            <br className="desktop-break" /> et regarder ensemble ce qui est
            possible.
          </p>
          <div className="contact-person">
            <img
              src="/portrait.jpg"
              width="60"
              height="60"
              loading="lazy"
              alt=""
            />
            <div>
              <strong>Maël Verré</strong>
              <span>À Nice ou en visioconférence</span>
            </div>
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <p className="form-heading">
            Faisons connaissance <Arrow />
          </p>
          <div className="form-row">
            <label>
              Votre prénom et nom
              <input
                name="name"
                autoComplete="name"
                placeholder="Camille Martin"
                required
              />
            </label>
            <label>
              Votre adresse e-mail
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="camille@exemple.fr"
                required
              />
            </label>
          </div>
          <label>
            Ce qui vous amène
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              name="subject"
            >
              <option value="">Faisons le point ensemble</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Votre projet, en quelques mots <span>(facultatif)</span>
            <textarea
              name="message"
              rows={3}
              placeholder="Une envie, une question, un nouveau départ…"
            />
          </label>
          <button className="button primary" type="submit">
            Préparer notre échange <Arrow />
          </button>
          <p className="form-note">
            Formulaire de démonstration : aucune donnée n’est envoyée.
          </p>
          {submitted && (
            <p className="form-feedback" role="status">
              <Check size={20} /> Votre demande est prête. L’envoi sera
              disponible une fois le service de contact connecté.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const reduced = useReducedMotion();
  const scrollDirection = useRef(1);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -100 },
      duration: 0.95,
      smoothWheel: true,
      prevent: (node) => node.tagName === "DIALOG",
    });
    return () => lenis.destroy();
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
  return (
    <ScrollDirectionContext.Provider value={scrollDirection}>
      <>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <motion.div className="reading-progress" style={{ scaleX }} />
        <Header />
        <main id="main">
          <Hero />
          <div className="trust-strip">
            <span>
              <MapPin size={17} /> Ancré à Nice, proche de vous
            </span>
            <span>
              <Check size={17} /> Une stratégie à votre mesure
            </span>
            <span className="partner">
              Partenaire de{" "}
              <strong>
                PREDICTIS<span className="partner-dot">.</span>
              </strong>
            </span>
          </div>
          <section className="section about" id="approche">
            <Reveal>
              <Eyebrow>LE PATRIMOINE EST PERSONNEL. LE CONSEIL AUSSI.</Eyebrow>
              <div className="about-grid">
                <h2>
                  Avant de parler de chiffres,
                  <br />
                  parlons <em>de vous.</em>
                </h2>
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
              </div>
              <div className="values">
                <div>
                  <span>01 /</span>
                  <h3>La clarté, toujours.</h3>
                  <p>
                    Vous comprenez chaque choix.
                    <br />
                    Le jargon reste à la porte.
                  </p>
                </div>
                <div>
                  <span>02 /</span>
                  <h3>La relation, d’abord.</h3>
                  <p>
                    Un interlocuteur qui vous connaît.
                    <br />
                    Et prend le temps de vous écouter.
                  </p>
                </div>
                <div>
                  <span>03 /</span>
                  <h3>Le temps, un allié.</h3>
                  <p>
                    Une vision qui va plus loin.
                    <br />
                    Un suivi qui évolue avec votre vie.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>
          <ProjectCompass />
          <section className="section expertise" id="expertises">
            <Reveal className="section-heading">
              <div>
                <Eyebrow>QUATRE EXPERTISES. UNE VISION D’ENSEMBLE.</Eyebrow>
                <h2>
                  Votre vie est un tout.
                  <br />
                  <em>Votre patrimoine aussi.</em>
                </h2>
              </div>
              <p>
                Des solutions qui se répondent,
                <br />
                au service de ce qui compte pour vous.
              </p>
            </Reveal>
            <div className="service-grid">
              {services.map((service, i) => (
                <Reveal key={service.id} delay={i * 0.05}>
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
          <section className="quote-section">
            <Reveal>
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
          <section className="partner-section">
            <Reveal className="partner-layout">
              <div>
                <Eyebrow>PROCHE DE VOUS. BIEN ENTOURÉ.</Eyebrow>
                <h2>
                  Une relation personnelle.
                  <br />
                  <em>La force d’un réseau.</em>
                </h2>
              </div>
              <div>
                <p>
                  J’ai choisi de m’appuyer sur Predictis, membre du Groupe
                  Premium, pour accéder à une sélection de solutions d’épargne,
                  de retraite et de prévoyance.
                </p>
                <p>
                  Je reste votre interlocuteur pour comprendre vos objectifs,
                  vous expliquer les choix et vous accompagner dans la durée.
                </p>
                <button
                  className="text-link"
                  onClick={() => setOverlay({ kind: "legal" })}
                >
                  Comprendre ce partenariat <Arrow />
                </button>
                <div className="partner-wordmark">
                  PREDICTIS<span>.</span>
                  <small>GROUPE PREMIUM</small>
                </div>
              </div>
            </Reveal>
          </section>
          <section className="section resources" id="ressources">
            <Reveal className="section-heading">
              <div>
                <Eyebrow>QUELQUES REPÈRES POUR AVANCER</Eyebrow>
                <h2>
                  Voir plus clair.
                  <br />
                  <em>Décider plus sereinement.</em>
                </h2>
              </div>
              <p>
                Des éclairages simples,
                <br />
                pour se poser les bonnes questions.
              </p>
            </Reveal>
            <div className="resource-grid">
              {resources.map((article, i) => (
                <Reveal key={article.title} delay={i * 0.05}>
                  <button
                    className="article-card"
                    onClick={() => setOverlay({ kind: "article", index: i })}
                  >
                    <div
                      className={`article-art ${article.color}`}
                      aria-hidden="true"
                    >
                      <span className="art-circle" />
                      <span className="art-line" />
                      <span className="art-label">
                        LES ÉCLAIRAGES
                        <br />
                        DE MAËL
                      </span>
                      <span className="art-index">0{i + 1}</span>
                    </div>
                    <div className="article-meta">
                      {article.category}
                      <span>{article.time} de lecture</span>
                    </div>
                    <h3>{article.title}</h3>
                    <span className="text-link">
                      Prendre un peu de recul <Arrow />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </section>
          <section className="section faq">
            <Reveal className="faq-layout">
              <div>
                <Eyebrow>EN TOUTE SIMPLICITÉ</Eyebrow>
                <h2>
                  Les questions
                  <br />
                  <em>que vous vous posez.</em>
                </h2>
              </div>
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
          </section>
          <Contact />
        </main>
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
              <button onClick={() => setOverlay({ kind: "legal" })}>
                Mentions légales & transparence
              </button>
              <button onClick={() => setOverlay({ kind: "privacy" })}>
                Confidentialité
              </button>
            </div>
            <span>Avec attention, pour demain.</span>
          </div>
        </footer>
        {overlay && (
          <Modal
            title={
              overlay.kind === "service"
                ? services[overlay.index].title
                : overlay.kind === "article"
                  ? resources[overlay.index].title
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
            ) : overlay.kind === "article" ? (
              <>
                <p className="eyebrow">
                  {resources[overlay.index].category} ·{" "}
                  {resources[overlay.index].time} DE LECTURE
                </p>
                {resources[overlay.index].paragraphs.map((p, i) => (
                  <p className="article-paragraph" key={p}>
                    <span>0{i + 1}</span>
                    {p}
                  </p>
                ))}
                <aside>
                  Ces repères généraux servent à préparer une conversation. Ils
                  ne constituent pas une recommandation d’investissement
                  personnalisée.
                </aside>
                <a
                  href="#contact"
                  className="button primary"
                  onClick={() => setOverlay(null)}
                >
                  Et pour votre situation ? <Arrow />
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
                  Cette version de démonstration n’envoie pas les informations
                  saisies dans le formulaire et ne les conserve pas après
                  fermeture ou rechargement de la page.
                </p>
                <p>
                  Aucun outil publicitaire ou de mesure d’audience n’est
                  intégré. Les polices sont chargées auprès de Google Fonts, qui
                  reçoit les informations techniques nécessaires à cette
                  requête.
                </p>
                <p>
                  Avant l’activation d’un service de contact, cette page devra
                  préciser le responsable de traitement, les finalités, la base
                  juridique, les destinataires, la durée de conservation et les
                  modalités d’exercice des droits.
                </p>
              </>
            )}
          </Modal>
        )}
      </>
    </ScrollDirectionContext.Provider>
  );
}
