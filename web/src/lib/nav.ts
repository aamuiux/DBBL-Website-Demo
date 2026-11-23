import { links } from "./links";
import type { Lang } from "./i18n";

type L = Record<Lang, string>;
export type NavLink = { label: L; href: string; note?: L };
export type NavColumn = { heading: L; links: NavLink[] };
export type NavFeature = { title: L; body: L; href: string; cta: L; tone: "indigo" | "green" | "rocket" | "lime" };
export type NavItem = { key: "accounts" | "cards" | "loans" | "digital" | "business" | "payroll" | "about"; columns: NavColumn[]; feature: NavFeature };

const s = (en: string, bn?: string): L => ({ en, bn: bn ?? en });

export const nav: NavItem[] = [
  {
    key: "accounts",
    columns: [
      {
        heading: s("Savings & current", "সঞ্চয়ী ও চলতি"),
        links: [
          { label: s("Savings Deposit Plus", "সেভিংস ডিপোজিট প্লাস"), href: links.personalAccounts },
          { label: s("Excel Savings Account", "এক্সেল সেভিংস অ্যাকাউন্ট"), href: links.personalAccounts },
          { label: s("Interest Free Savings", "সুদমুক্ত সঞ্চয়ী হিসাব"), href: links.personalAccounts },
          { label: s("Current Deposit Account", "চলতি হিসাব"), href: links.personalAccounts },
          { label: s("Special Notice Deposit", "স্পেশাল নোটিস ডিপোজিট"), href: links.personalAccounts },
        ],
      },
      {
        heading: s("For someone special", "বিশেষ মানুষের জন্য"),
        links: [
          { label: s("DBBL School Savers", "ডিবিবিএল স্কুল সেভার্স"), href: links.personalAccounts, note: s("For students", "শিক্ষার্থীদের জন্য") },
          { label: s("FeminaPlus Savings", "ফেমিনাপ্লাস সেভিংস"), href: links.personalAccounts, note: s("For women", "নারীদের জন্য") },
          { label: s("Prestige Senior Savings", "প্রেস্টিজ সিনিয়র সেভিংস"), href: links.personalAccounts, note: s("For senior citizens", "প্রবীণদের জন্য") },
        ],
      },
      {
        heading: s("Grow it", "বাড়িয়ে তুলুন"),
        links: [
          { label: s("Term Deposits", "মেয়াদি আমানত"), href: links.termDeposits },
          { label: s("DBBL Future Line", "ডিবিবিএল ফিউচার লাইন"), href: links.futureLine },
          { label: s("Govt. Securities Investment Window", "সরকারি সিকিউরিটিজ বিনিয়োগ"), href: links.gsiw },
          { label: s("Required documents & charges", "প্রয়োজনীয় কাগজ ও চার্জ"), href: links.charges },
        ],
      },
    ],
    feature: {
      title: s("Open an account from your phone", "ফোন থেকেই অ্যাকাউন্ট খুলুন"),
      body: s("NexusPay lets you open an account without visiting a branch.", "নেক্সাসপে দিয়ে শাখায় না গিয়েই অ্যাকাউন্ট খুলুন।"),
      href: links.nexusPay,
      cta: s("Get NexusPay", "নেক্সাসপে নিন"),
      tone: "indigo",
    },
  },
  {
    key: "cards",
    columns: [
      {
        heading: s("Debit & prepaid", "ডেবিট ও প্রিপেইড"),
        links: [
          { label: s("Nexus Debit Cards", "নেক্সাস ডেবিট কার্ড"), href: links.debitCards },
          { label: s("Prepaid Cards", "প্রিপেইড কার্ড"), href: links.prepaidCards },
          { label: s("OD Cards", "ওডি কার্ড"), href: links.odCards },
        ],
      },
      {
        heading: s("Credit", "ক্রেডিট"),
        links: [
          { label: s("Nexus Credit Cards", "নেক্সাস ক্রেডিট কার্ড"), href: links.creditCards },
          { label: s("Visa Platinum & Signature", "ভিসা প্লাটিনাম ও সিগনেচার"), href: links.creditCards },
          { label: s("Mastercard Titanium & World", "মাস্টারকার্ড টাইটানিয়াম ও ওয়ার্ল্ড"), href: links.creditCards },
        ],
      },
      {
        heading: s("Card services", "কার্ড সেবা"),
        links: [
          { label: s("EMV chip security", "ইএমভি চিপ নিরাপত্তা"), href: links.emvCards },
          { label: s("Lost or stolen card", "কার্ড হারানো বা চুরি"), href: links.lostStolen },
          { label: s("Card offers FAQ", "কার্ড অফার প্রশ্নোত্তর"), href: links.faq },
        ],
      },
    ],
    feature: {
      title: s("Accepted in 40M+ places", "৪ কোটিরও বেশি জায়গায় গ্রহণযোগ্য"),
      body: s("DBBL credit cards work at merchants and ATMs worldwide.", "ডিবিবিএল ক্রেডিট কার্ড বিশ্বজুড়ে মার্চেন্ট ও এটিএমে চলে।"),
      href: links.creditCards,
      cta: s("See credit cards", "ক্রেডিট কার্ড দেখুন"),
      tone: "green",
    },
  },
  {
    key: "loans",
    columns: [
      {
        heading: s("Personal", "ব্যক্তিগত"),
        links: [
          { label: s("Retail Loan Products", "রিটেইল ঋণ"), href: links.retailLoan },
          { label: s("Loans & Advances", "ঋণ ও অগ্রিম"), href: links.loansAdvances },
          { label: s("Lending interest rates", "ঋণের সুদের হার"), href: links.lendingRate },
        ],
      },
      {
        heading: s("SME loans", "এসএমই ঋণ"),
        links: [
          { label: s("Len-den (cash credit)", "লেন-দেন (ক্যাশ ক্রেডিট)"), href: links.smeLenden },
          { label: s("Somridhi (term loan)", "সমৃদ্ধি (মেয়াদি ঋণ)"), href: links.smeSomridhi },
          { label: s("Janala (property loan)", "জানালা (সম্পত্তি ঋণ)"), href: links.smeJanala },
          { label: s("Utshab (festival loan)", "উৎসব (উৎসব ঋণ)"), href: links.smeUtshab },
        ],
      },
      {
        heading: s("For women & distributors", "নারী ও পরিবেশকদের জন্য"),
        links: [
          { label: s("Uthsaho (women entrepreneurs)", "উৎসাহ (নারী উদ্যোক্তা)"), href: links.smeUthsaho },
          { label: s("Shofolota (women, cash credit)", "সফলতা (নারী, ক্যাশ ক্রেডিট)"), href: links.smeShofolota },
          { label: s("Prosher (distributor financing)", "প্রসার (পরিবেশক অর্থায়ন)"), href: links.smeProsher },
          { label: s("SME loan eligibility calculator", "এসএমই ঋণ যোগ্যতা ক্যালকুলেটর"), href: links.smeCalculator },
        ],
      },
    ],
    feature: {
      title: s("Check your SME loan eligibility", "এসএমই ঋণের যোগ্যতা যাচাই করুন"),
      body: s("Use DBBL's calculator before you apply.", "আবেদনের আগে ডিবিবিএলের ক্যালকুলেটর ব্যবহার করুন।"),
      href: links.smeCalculator,
      cta: s("Open calculator", "ক্যালকুলেটর খুলুন"),
      tone: "lime",
    },
  },
  {
    key: "digital",
    columns: [
      {
        heading: s("Apps", "অ্যাপ"),
        links: [
          { label: s("NexusPay", "নেক্সাসপে"), href: links.nexusPay, note: s("Cardless digital banking", "কার্ডলেস ডিজিটাল ব্যাংকিং") },
          { label: s("Rocket", "রকেট"), href: links.rocket, note: s("Mobile financial service", "মোবাইল আর্থিক সেবা") },
          { label: s("Internet Banking", "ইন্টারনেট ব্যাংকিং"), href: links.ibFeatures },
          { label: s("2FA registration", "২এফএ নিবন্ধন"), href: links.twoFA },
        ],
      },
      {
        heading: s("Everywhere you are", "আপনি যেখানেই থাকুন"),
        links: [
          { label: s("ATM / CRM", "এটিএম / সিআরএম"), href: links.atmCrm },
          { label: s("Fast Track", "ফাস্ট ট্র্যাক"), href: links.fastTrack },
          { label: s("Agent Banking", "এজেন্ট ব্যাংকিং"), href: links.agentBanking },
          { label: s("SMS Alert Banking", "এসএমএস অ্যালার্ট ব্যাংকিং"), href: links.smsAlert },
        ],
      },
      {
        heading: s("For merchants", "মার্চেন্টদের জন্য"),
        links: [
          { label: s("Internet Payment Gateway", "ইন্টারনেট পেমেন্ট গেটওয়ে"), href: links.ipg },
          { label: s("POS terminals", "পিওএস টার্মিনাল"), href: links.pos },
          { label: s("Merchant locations", "মার্চেন্ট লোকেশন"), href: links.merchantLocator },
        ],
      },
    ],
    feature: {
      title: s("Rocket: the first MFS in Bangladesh", "রকেট: বাংলাদেশের প্রথম এমএফএস"),
      body: s("Cash in, cash out and pay bills from any phone.", "যেকোনো ফোন থেকে ক্যাশ ইন, ক্যাশ আউট ও বিল পরিশোধ।"),
      href: links.rocket,
      cta: s("Explore Rocket", "রকেট দেখুন"),
      tone: "rocket",
    },
  },
  {
    key: "business",
    columns: [
      {
        heading: s("SME banking", "এসএমই ব্যাংকিং"),
        links: [
          { label: s("SME loan products", "এসএমই ঋণ"), href: links.smeLenden },
          { label: s("SME FAQ", "এসএমই প্রশ্নোত্তর"), href: links.smeFaq },
        ],
      },
      {
        heading: s("Corporate", "কর্পোরেট"),
        links: [
          { label: s("Corporate banking overview", "কর্পোরেট ব্যাংকিং"), href: links.corporate },
          { label: s("Electronic banking for business", "ব্যবসার জন্য ইলেকট্রনিক ব্যাংকিং"), href: links.corporateEbanking },
          { label: s("LC & trade", "এলসি ও ট্রেড"), href: links.lcTrade },
        ],
      },
      {
        heading: s("International", "আন্তর্জাতিক"),
        links: [
          { label: s("Offshore Banking", "অফশোর ব্যাংকিং"), href: links.offshore },
          { label: s("Remittance for exchange houses", "এক্সচেঞ্জ হাউসের জন্য রেমিট্যান্স"), href: links.remittance },
          { label: s("Remittance status", "রেমিট্যান্স স্ট্যাটাস"), href: links.remittanceStatus },
        ],
      },
    ],
    feature: {
      title: s("Accept online payments", "অনলাইনে পেমেন্ট নিন"),
      body: s("DBBL's Internet Payment Gateway for your business.", "আপনার ব্যবসার জন্য ডিবিবিএলের ইন্টারনেট পেমেন্ট গেটওয়ে।"),
      href: links.ipg,
      cta: s("See the gateway", "গেটওয়ে দেখুন"),
      tone: "indigo",
    },
  },
  {
    key: "payroll",
    columns: [
      {
        heading: s("For employers", "নিয়োগকর্তার জন্য"),
        links: [
          { label: s("Corporate banking overview", "কর্পোরেট ব্যাংকিং"), href: links.corporate },
          { label: s("Electronic banking for business", "ব্যবসার জন্য ইলেকট্রনিক ব্যাংকিং"), href: links.corporateEbanking },
          { label: s("Payroll Card", "পে-রোল কার্ড"), href: links.prepaidCards, note: s("Salary on a prepaid card", "প্রিপেইড কার্ডে বেতন") },
          { label: s("Salary disbursement on Rocket", "রকেটে বেতন বিতরণ"), href: links.rocket },
        ],
      },
      {
        heading: s("For employees", "কর্মচারীর জন্য"),
        links: [
          { label: s("Salary & savings accounts", "বেতন ও সঞ্চয়ী হিসাব"), href: links.personalAccounts },
          { label: s("Nexus Debit Cards", "নেক্সাস ডেবিট কার্ড"), href: links.debitCards },
          { label: s("NexusPay", "নেক্সাসপে"), href: links.nexusPay, note: s("Cardless digital banking", "কার্ডলেস ডিজিটাল ব্যাংকিং") },
          { label: s("Rocket: receive your salary", "রকেট: বেতন গ্রহণ"), href: links.rocket },
        ],
      },
      {
        heading: s("Borrow & plan", "ঋণ ও পরিকল্পনা"),
        links: [
          { label: s("Retail Loan Products", "রিটেইল ঋণ"), href: links.retailLoan },
          { label: s("Lending interest rates", "ঋণের সুদের হার"), href: links.lendingRate },
          { label: s("EMI calculator", "ইএমআই ক্যালকুলেটর"), href: links.emiCalc },
        ],
      },
    ],
    feature: {
      title: s("Payroll Card for your team", "আপনার দলের জন্য পে-রোল কার্ড"),
      body: s("A prepaid card that carries your team's salary.", "প্রিপেইড কার্ডে কর্মচারীদের বেতন।"),
      href: links.prepaidCards,
      cta: s("See prepaid cards", "প্রিপেইড কার্ড দেখুন"),
      tone: "green",
    },
  },
  {
    key: "about",
    columns: [
      {
        heading: s("Who we are", "আমরা কারা"),
        links: [
          { label: s("Brief history", "সংক্ষিপ্ত ইতিহাস"), href: links.history },
          { label: s("Board of Directors", "পরিচালনা পর্ষদ"), href: links.board },
          { label: s("Management", "ব্যবস্থাপনা"), href: links.management },
          { label: s("News room", "নিউজ রুম"), href: links.newsroom },
        ],
      },
      {
        heading: s("Giving back", "সমাজের জন্য"),
        links: [
          { label: s("Social causes", "সামাজিক কার্যক্রম"), href: links.socialCause },
          { label: s("DBBL Scholarship", "ডিবিবিএল বৃত্তি"), href: links.scholarship },
          { label: s("Sustainable finance", "টেকসই অর্থায়ন"), href: links.sustainableFinance },
          { label: s("Careers", "ক্যারিয়ার"), href: links.careers },
        ],
      },
      {
        heading: s("Investors", "বিনিয়োগকারী"),
        links: [
          { label: s("Financial statements", "আর্থিক বিবরণী"), href: links.financialStatements },
          { label: s("Interim reports", "অন্তর্বর্তী প্রতিবেদন"), href: links.interimReport },
          { label: s("Price sensitive information", "মূল্য সংবেদনশীল তথ্য"), href: links.priceSensitive },
          { label: s("Risk based capital (Basel)", "ঝুঁকিভিত্তিক মূলধন (বাসেল)"), href: links.riskCapital },
        ],
      },
    ],
    feature: {
      title: s("The largest bank donor in Bangladesh", "বাংলাদেশের সবচেয়ে বড় ব্যাংক দাতা"),
      body: s("Read how the Dutch-Bangla Bank Foundation gives back.", "ডাচ-বাংলা ব্যাংক ফাউন্ডেশনের কাজ সম্পর্কে পড়ুন।"),
      href: links.socialCause,
      cta: s("Social causes", "সামাজিক কার্যক্রম"),
      tone: "green",
    },
  },
];
