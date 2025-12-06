export type Language = 'en' | 'cs';

export const translations = {
  en: {
    hero: {
      tagline: 'ai shopping. simplified.',
      title: 'Meet Umka 🐻 — Your AI Cooking Assistant',
      subtitle: 'Find recipes from real products, see prices instantly, and add ingredients to your cart — all in one chat.',
      startButton: 'Start Umka',
      howItWorksButton: 'How it works',
    },
    howItWorks: {
      title: 'How it works',
      step1: {
        title: 'Ask for a recipe',
        desc: 'Tell Umka what you want to cook or your preferences.',
      },
      step2: {
        title: 'AI searches our product list',
        desc: 'We use a real product database to find ingredients.',
      },
      step3: {
        title: 'Generates a recipe and price',
        desc: 'Get a complete recipe with an estimated total cost.',
      },
      step4: {
        title: 'Add ingredients to cart',
        desc: 'One click adds all items to your bag for checkout.',
      },
    },
    features: {
      title: 'Features',
      feature1: {
        title: 'Uses real product data',
        desc: 'Recipes are built from an actual product list with prices.',
      },
      feature2: {
        title: 'Generates recipes instantly',
        desc: 'Get step-by-step recipes in seconds, tailored to your needs.',
      },
      feature3: {
        title: 'Helps with meal planning',
        desc: 'Ask for weekly plans or budget-friendly options.',
      },
      feature4: {
        title: 'Smart ingredient selection',
        desc: 'Swap or optimize ingredients based on your goals.',
      },
    },
    storeIntegration: {
      title: 'Connected to a Real Grocery Store',
      intro: "Umka isn't just an AI recipe tool — it's connected to Um, a real grocery store at the Czech University of Life Sciences Prague (CZU).",
      intro2: 'This means every suggestion is based on real products and real prices from the store, making Umka practical, reliable, and instantly usable in everyday cooking.',
      realProducts: {
        title: 'Real Products',
        desc: "Umka generates recipes using real items from the store — including meat, dairy, grains, vegetables, and pantry staples. Every ingredient comes from the store's actual assortment.",
      },
      realPrices: {
        title: 'Real Prices',
        desc: 'Recipe prices are calculated using real product prices from Um. This makes Umka\'s suggestions practical, affordable, and grounded in reality.',
      },
    },
    cta: {
      title: 'Start Umka now',
      subtitle: 'Experience smarter cooking with AI. Try Umka in your browser — no install required.',
      button: 'Start Umka',
    },
    footer: {
      tagline: 'umka — ai shopping. simplified.',
      credits: 'created by andrey bukovsky',
    },
    chat: {
      welcome: "Hello! I'm Umka, your cooking assistant. Tell me what you'd like to cook!",
      placeholder: "Type a message...",
      error: "I'm sorry, something went wrong. Please try again later.",
      parseError: "I'm sorry, I couldn't process your request properly. Please try again.",
    },
  },
  cs: {
    hero: {
      tagline: 'ai nákupy. zjednodušené.',
      title: 'Poznejte Umku 🐻 — vašeho AI asistenta pro vaření',
      subtitle: 'Najděte recepty z reálných produktů, okamžitě uvidíte ceny a přidejte ingredience do košíku — vše v jednom chatu.',
      startButton: 'Spustit Umku',
      howItWorksButton: 'Jak to funguje',
    },
    howItWorks: {
      title: 'Jak to funguje',
      step1: {
        title: 'Požádejte o recept',
        desc: 'Řekněte Umce, co chcete uvařit nebo jaké máte preference.',
      },
      step2: {
        title: 'AI prohledá náš seznam produktů',
        desc: 'Používáme skutečnou databázi produktů k nalezení ingrediencí.',
      },
      step3: {
        title: 'Vygeneruje recept a cenu',
        desc: 'Získejte kompletní recept s odhadovanou celkovou cenou.',
      },
      step4: {
        title: 'Přidejte ingredience do košíku',
        desc: 'Jedním kliknutím přidáte všechny položky do košíku k pokladně.',
      },
    },
    features: {
      title: 'Funkce',
      feature1: {
        title: 'Používá reálná data produktů',
        desc: 'Recepty jsou vytvářeny ze skutečného seznamu produktů s cenami.',
      },
      feature2: {
        title: 'Okamžitě generuje recepty',
        desc: 'Získejte podrobné recepty během sekund, přizpůsobené vašim potřebám.',
      },
      feature3: {
        title: 'Pomáhá s plánováním jídel',
        desc: 'Požádejte o týdenní plány nebo možnosti šetrné k rozpočtu.',
      },
      feature4: {
        title: 'Chytrý výběr ingrediencí',
        desc: 'Vyměňte nebo optimalizujte ingredience podle vašich cílů.',
      },
    },
    storeIntegration: {
      title: 'Propojeno se skutečným obchodem',
      intro: 'Umka není jen nástroj pro AI recepty — je propojena s Um, skutečným obchodem na České zemědělské univerzitě v Praze (ČZU).',
      intro2: 'To znamená, že každý návrh je založen na skutečných produktech a skutečných cenách z obchodu, což činí Umku praktickou, spolehlivou a okamžitě použitelnou v každodenním vaření.',
      realProducts: {
        title: 'Skutečné produkty',
        desc: 'Umka generuje recepty pomocí skutečných položek z obchodu — včetně masa, mléčných výrobků, obilovin, zeleniny a základních potravin. Každá ingredience pochází ze skutečného sortimentu obchodu.',
      },
      realPrices: {
        title: 'Skutečné ceny',
        desc: 'Ceny receptů jsou vypočítávány pomocí skutečných cen produktů z Um. To činí návrhy Umky praktickými, dostupnými a založenými na realitě.',
      },
    },
    cta: {
      title: 'Spusťte Umku nyní',
      subtitle: 'Zažijte chytřejší vaření s AI. Vyzkoušejte Umku ve svém prohlížeči — není potřeba instalace.',
      button: 'Spustit Umku',
    },
    footer: {
      tagline: 'umka — ai nákupy. zjednodušené.',
      credits: 'created by andrey bukovsky',
    },
    chat: {
      welcome: "Ahoj! Jsem Umka, tvůj asistent pro vaření. Řekni mi, co bys chtěl uvařit!",
      placeholder: "Napiš zprávu...",
      error: "Omlouvám se, něco se pokazilo. Zkus to prosím znovu později.",
      parseError: "Omlouvám se, nemohl jsem správně zpracovat tvůj požadavek. Zkus to prosím znovu.",
    },
  },
} as const;

