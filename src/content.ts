import { Sprout, Sunrise, ShieldCheck, Building2 } from "lucide-react";

export const services = [
  {
    id: "epargne",
    icon: Sprout,
    title: "Épargne & transmission",
    short: "Faire grandir. Puis transmettre.",
    description:
      "Donner une direction à votre épargne, garder de la souplesse et préparer ce que vous souhaitez transmettre.",
    need: "Vous souhaitez organiser votre épargne autour de vos projets, tout en réfléchissant à sa transmission.",
    approach:
      "Nous faisons le point sur votre horizon, votre besoin de disponibilité et votre sensibilité au risque. Puis nous examinons les supports, les frais et la place de chaque solution dans votre patrimoine.",
    questions: [
      [
        "Par où commencer ?",
        "Par un inventaire simple : votre épargne actuelle, vos projets et la somme que vous souhaitez garder disponible.",
      ],
      [
        "Faut-il déjà disposer d’un patrimoine important ?",
        "Le premier échange permet de partir de votre situation actuelle. L’essentiel est de clarifier vos priorités.",
      ],
      [
        "Quelle place pour l’assurance-vie ?",
        "C’est une solution à examiner parmi d’autres. Sa pertinence dépend de vos objectifs, des frais, des supports et de votre horizon.",
      ],
    ],
    focus: "Vos projets, votre horizon, votre disponibilité.",
  },
  {
    id: "retraite",
    icon: Sunrise,
    title: "Préparation de la retraite",
    short: "Demain se dessine aujourd’hui.",
    description:
      "Imaginer votre vie de demain et construire, dès aujourd’hui, les moyens de la vivre sereinement.",
    need: "Vous voulez mieux comprendre vos besoins futurs et préparer la transition vers la retraite.",
    approach:
      "Nous partons de votre mode de vie souhaité et de vos ressources estimées. Le choix d’un éventuel produit intervient après cette réflexion, dans une vision globale.",
    questions: [
      [
        "Quand commencer à y réfléchir ?",
        "Dès que le sujet vous intéresse. L’horizon disponible influence les choix à étudier et le rythme de préparation.",
      ],
      [
        "Un PER est-il indispensable ?",
        "Non. Son intérêt doit être étudié au regard de votre situation, de vos besoins de liquidité et de vos autres solutions.",
      ],
      [
        "Que préparer avant notre échange ?",
        "Vos estimations de retraite si vous les avez, vos dispositifs existants et quelques idées sur vos projets futurs.",
      ],
    ],
    focus: "Votre futur niveau de vie, avant le choix d’un produit.",
  },
  {
    id: "protection",
    icon: ShieldCheck,
    title: "Prévoyance & protection",
    short: "Préserver ce qui compte.",
    description:
      "Protéger vos revenus, vos proches et vos projets face aux imprévus de la vie.",
    need: "Vous souhaitez comprendre ce qui est déjà couvert et identifier les fragilités de votre protection.",
    approach:
      "Nous relisons vos garanties actuelles, votre situation familiale et professionnelle. L’objectif est de repérer les manques et les doublons avant d’envisager une solution.",
    questions: [
      [
        "Mes garanties actuelles suffisent-elles ?",
        "Cela nécessite une lecture de vos contrats et de votre situation. Le premier travail consiste à les réunir.",
      ],
      [
        "Quels documents apporter ?",
        "Vos contrats de prévoyance et les informations sur votre couverture professionnelle, si vous en disposez.",
      ],
      [
        "Puis-je protéger aussi mes proches ?",
        "Votre situation familiale fait partie intégrante de la réflexion. Les besoins sont examinés avec vous.",
      ],
    ],
    focus: "Vos revenus, vos proches, votre tranquillité.",
  },
  {
    id: "immobilier",
    icon: Building2,
    title: "Investissement immobilier",
    short: "Construire sur de bonnes bases.",
    description:
      "Donner à l’immobilier sa juste place, en accord avec vos objectifs et votre équilibre financier.",
    need: "Vous envisagez un investissement immobilier et souhaitez le replacer dans une stratégie plus large.",
    approach:
      "Nous examinons votre capacité financière, votre horizon et les contraintes que vous acceptez. Les risques, les frais et la disponibilité du capital font partie de la discussion.",
    questions: [
      [
        "L’immobilier est-il adapté à tout le monde ?",
        "Non. Le projet doit tenir compte de votre budget, de votre horizon, des risques et des contraintes de gestion.",
      ],
      [
        "Peut-on en parler avant d’avoir trouvé un bien ?",
        "Oui. Définir le rôle de cet investissement dans votre patrimoine est un point de départ utile.",
      ],
      [
        "Quels sont les points à examiner ?",
        "Le financement, les frais, la liquidité, les charges et la cohérence avec vos autres projets.",
      ],
    ],
    focus: "Un investissement cohérent avec l’ensemble.",
  },
];

export const steps = [
  {
    title: "Faire connaissance",
    text: "Un premier échange pour parler de vous. Votre situation, vos envies et les questions que vous vous posez.",
    detail:
      "Vous repartez avec une vision claire des sujets à explorer ensemble. Aucun produit à choisir, aucune décision précipitée.",
    label: "L’écoute avant tout",
  },
  {
    title: "Tracer votre cap",
    text: "Relier vos objectifs à votre situation pour construire une stratégie compréhensible et personnalisée.",
    detail:
      "Nous hiérarchisons vos priorités et expliquons les possibilités, leurs contraintes et leurs risques, avec des mots simples.",
    label: "Une vision partagée",
  },
  {
    title: "Passer à l’action",
    text: "Sélectionner les solutions cohérentes et vous accompagner à chaque étape de leur mise en œuvre.",
    detail:
      "Vous comprenez le rôle de chaque choix. Les modalités et la rémunération sont expliquées avant tout engagement.",
    label: "Des choix éclairés",
  },
  {
    title: "Avancer ensemble",
    text: "Faire évoluer votre stratégie au rythme de votre vie, de vos projets et de vos priorités.",
    detail:
      "Un nouveau projet, une évolution professionnelle ou familiale : nous revenons à vos objectifs pour ajuster la trajectoire.",
    label: "Une relation dans la durée",
  },
];

export const resources = [
  {
    title: "Avant de choisir un placement, posez-vous ces 4 questions.",
    category: "ÉPARGNE",
    time: "3 min",
    color: "sand",
    paragraphs: [
      "À quoi cet argent doit-il servir ? Donner un objectif à votre épargne permet de poser un cadre à la discussion.",
      "Quand pourriez-vous en avoir besoin ? Un projet proche et un projet lointain ne soulèvent pas les mêmes questions.",
      "Quelle part souhaitez-vous garder disponible ? Votre tranquillité au quotidien fait partie de votre stratégie.",
      "Comment vivez-vous l’incertitude ? Parler franchement de votre rapport au risque aide à construire une approche cohérente.",
    ],
  },
  {
    title: "Votre retraite commence par une idée de la vie que vous voulez.",
    category: "RETRAITE",
    time: "3 min",
    color: "blue",
    paragraphs: [
      "Commencez par votre quotidien futur : votre logement, vos envies, vos activités et les personnes que vous souhaitez accompagner.",
      "Rassemblez ensuite vos estimations de ressources et les dispositifs que vous détenez déjà. Le but est de mettre des mots puis des repères sur votre projet.",
      "Cette réflexion sert de point de départ à un échange personnalisé. Elle précède le choix des solutions.",
    ],
  },
  {
    title: "Un patrimoine solide, c’est aussi une protection bien pensée.",
    category: "PRÉVOYANCE",
    time: "2 min",
    color: "green",
    paragraphs: [
      "Vos revenus permettent souvent de faire vivre vos projets. Comprendre comment ils sont protégés est donc une première étape essentielle.",
      "Réunissez vos garanties professionnelles et personnelles. Une lecture d’ensemble permet de repérer ce que vous connaissez déjà et ce qui reste à clarifier.",
      "Votre couverture mérite aussi d’être revue lorsque votre vie évolue. Un changement professionnel ou familial peut modifier vos besoins.",
    ],
  },
];
