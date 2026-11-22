// Content for the sections added after client feedback. Every fact is from dutchbanglabank.com (checked 2026-11-21).
import type { Lang } from "./i18n";

export type L = Record<Lang, string>;
const s = (en: string, bn: string): L => ({ en, bn });
const B = "https://www.dutchbanglabank.com";
const faq = (f: string) => `${B}/help-desk/${f}`;

/* ───────── Offers: DBBL's published card campaigns (titles from its Help Desk FAQ list) ───────── */
export type Offer = { partner: string; title: L; tag: L; kind: "travel" | "movie" | "grocery" | "electronics" | "online" | "win" | "card"; href: string; tone: string };
export const offers: Offer[] = [
  { partner: "US-Bangla Airlines", title: s("10% off your flight", "ফ্লাইটে ১০% ছাড়"), tag: s("Travel", "ভ্রমণ"), kind: "travel", href: faq("US_Bangla_Discount_Offer_FAQ.pdf"), tone: "bg-lime text-indigo-950" },
  { partner: "Star Cineplex", title: s("Movie discount with Mastercard", "মাস্টারকার্ডে সিনেমায় ছাড়"), tag: s("Movies", "সিনেমা"), kind: "movie", href: faq("FAQ_Mastercard_Star_Cineplex_Discount_Offer_2025.pdf"), tone: "bg-red-600 text-white" },
  { partner: "Mastercard", title: s("Spend & Win: iPhone Air", "খরচ করুন, জিতুন আইফোন এয়ার"), tag: s("Spend & win", "খরচ ও জয়"), kind: "win", href: faq("FAQ%20_Mastercard_Spend&Win_(iPhone%20Air)_Campaign_2025.pdf"), tone: "bg-rocket text-white" },
  { partner: "Walton", title: s("Electronics discount", "ইলেকট্রনিক্সে ছাড়"), tag: s("Electronics", "ইলেকট্রনিক্স"), kind: "electronics", href: faq("FAQ_Walton_Discount_Offer.pdf"), tone: "bg-sun text-indigo-950" },
  { partner: "Firsttrip", title: s("Hotel & resort discount", "হোটেল ও রিসোর্টে ছাড়"), tag: s("Travel", "ভ্রমণ"), kind: "travel", href: faq("FAQ_Firsttrip_Hotel_&_Resort_Discount.pdf"), tone: "bg-green-600 text-white" },
  { partner: "Firsttrip", title: s("Domestic flight discount", "দেশীয় ফ্লাইটে ছাড়"), tag: s("Travel", "ভ্রমণ"), kind: "travel", href: faq("FAQ_Firsttrip_Domestic_Flight.pdf"), tone: "bg-indigo-600 text-white" },
  { partner: "Mastercard", title: s("Online grocery campaign", "অনলাইন গ্রোসারি ক্যাম্পেইন"), tag: s("Grocery", "গ্রোসারি"), kind: "grocery", href: faq("FAQ_Mastercard_Online_Grocery_Campaign_2025.pdf"), tone: "bg-lime text-indigo-950" },
  { partner: "Visa", title: s("Cross-border spend campaign", "ক্রস-বর্ডার খরচ ক্যাম্পেইন"), tag: s("Abroad", "বিদেশে"), kind: "card", href: faq("FAQ_VISA_Cross_Border_Spend_Campaign.pdf"), tone: "bg-indigo-950 text-white" },
  { partner: "Mastercard", title: s("E-commerce offer", "ই-কমার্স অফার"), tag: s("Online", "অনলাইন"), kind: "online", href: faq("Mastercard_ecommerce_Offer_2025.pdf"), tone: "bg-red-600 text-white" },
  { partner: "Mastercard", title: s("Travel campaign", "ভ্রমণ ক্যাম্পেইন"), tag: s("Travel", "ভ্রমণ"), kind: "travel", href: faq("FAQ_Mastercard_Travel_Campaign_2025.pdf"), tone: "bg-sun text-indigo-950" },
];

export const udyog = {
  title: s("UDYOG: 5,000 young entrepreneurs wanted", "উদ্যোগ: খোঁজা হচ্ছে ৫,০০০ নতুন উদ্যোক্তা"),
  body: s(
    "An upazila-based programme to find, back and finance young entrepreneurs. Applications are open in every upazila of 56 districts.",
    "উপজেলাভিত্তিক তরুণ উদ্যোক্তা অনুসন্ধান, চিহ্নিতকরণ ও অর্থায়ন কর্মসূচি। ৫৬ জেলার সকল উপজেলায় আবেদন চলছে।",
  ),
  dates: s("Apply 1 – 30 November 2026", "আবেদন ১ – ৩০ নভেম্বর ২০২৬"),
};

/* ───────── Retail loans (DBBL's Retail Loan Products page) ───────── */
export const retailLoans = [
  { key: "personal", name: s("Personal Loan", "পার্সোনাল লোন"), body: s("For the plans that can't wait for payday.", "যে পরিকল্পনা বেতনের দিনের অপেক্ষায় থাকতে পারে না।"), faq: `${B}/images/retail/faq/FAQ_Personal_Loan.pdf` },
  { key: "home", name: s("Home Loan", "হোম লোন"), body: s("A place of your own, paid for over time.", "নিজের একটা ঠিকানা, ধীরে ধীরে পরিশোধ।"), faq: `${B}/images/retail/faq/FAQ_Home_Loan.pdf` },
  { key: "car", name: s("Car Loan", "কার লোন"), body: s("Your own wheels, in monthly instalments.", "নিজের গাড়ি, মাসিক কিস্তিতে।"), faq: `${B}/images/retail/faq/FAQ_Car_Loan.pdf` },
] as const;

export const smeLoans = [
  { name: "Len-den", note: s("Cash credit", "ক্যাশ ক্রেডিট"), href: `${B}/sme-banking/cash-credit-lenden.html` },
  { name: "Somridhi", note: s("Term loan", "মেয়াদি ঋণ"), href: `${B}/sme-banking/term-loan-somridhi.html` },
  { name: "Janala", note: s("Property loan", "সম্পত্তি ঋণ"), href: `${B}/sme-banking/property-loan-janala.html` },
  { name: "Utshab", note: s("Festival loan", "উৎসব ঋণ"), href: `${B}/sme-banking/festival-loan-utshab.html` },
  { name: "Uthsaho", note: s("Women entrepreneurs", "নারী উদ্যোক্তা"), href: `${B}/sme-banking/women-loan-uthsaho.html` },
  { name: "Shofolota", note: s("Women, cash credit", "নারী, ক্যাশ ক্রেডিট"), href: `${B}/sme-banking/women-loan-shofolota.html` },
  { name: "Prosher", note: s("Distributor financing", "পরিবেশক অর্থায়ন"), href: `${B}/sme-banking/distributor-financing-prosher.html` },
];

/* ───────── School Savers (Personal Accounts page, product 107) ───────── */
export const schoolSavers = [
  { big: s("৳100", "৳১০০"), small: s("minimum balance", "ন্যূনতম ব্যালেন্স") },
  { big: s("৳0", "৳০"), small: s("account maintenance fee", "অ্যাকাউন্ট রক্ষণাবেক্ষণ ফি") },
  { big: s("Free", "ফ্রি"), small: s("Nexus debit card", "নেক্সাস ডেবিট কার্ড") },
  { big: s("Free", "ফ্রি"), small: s("SMS alerts & internet banking", "এসএমএস অ্যালার্ট ও ইন্টারনেট ব্যাংকিং") },
];

/* ───────── Rocket (Rocket page) ───────── */
/** `img` is an optional photo in /public shown when the card is hovered. */
export const rocketFeatures: { t: L; d: L; img?: string }[] = [
  { t: s("Cash in", "ক্যাশ ইন"), d: s("Deposit at any Rocket agent.", "যেকোনো রকেট এজেন্টে জমা দিন।") },
  { t: s("Cash out", "ক্যাশ আউট"), d: s("At agents or a DBBL ATM, no card needed.", "এজেন্ট বা ডিবিবিএল এটিএমে, কার্ড ছাড়াই।") },
  { t: s("Send money", "টাকা পাঠান"), d: s("Person to person, in seconds.", "একজন থেকে আরেকজনে, মুহূর্তে।") },
  { t: s("Mobile top-up", "মোবাইল রিচার্জ"), d: s("Recharge any number.", "যেকোনো নম্বরে রিচার্জ।") },
  { t: s("Pay bills & shops", "বিল ও কেনাকাটা"), d: s("Utility bills and merchant payments.", "ইউটিলিটি বিল ও মার্চেন্ট পেমেন্ট।") },
  { t: s("Remittance & salary", "রেমিট্যান্স ও বেতন"), d: s("Receive money from abroad and your salary.", "বিদেশ থেকে টাকা ও বেতন গ্রহণ।") },
];

/* ───────── Fast Track (Fast Track page) ───────── */
export const fastTrack = {
  launched: s("Since November 2009", "নভেম্বর ২০০৯ থেকে"),
  count: 153,
  perTrack: s("6–12 ATMs in every Fast Track", "প্রতিটি ফাস্ট ট্র্যাকে ৬–১২টি এটিএম"),
  services: [
    s("Withdraw cash 24/7", "২৪/৭ টাকা তোলা"),
    s("Deposit cash and cheques", "নগদ ও চেক জমা"),
    s("Collect your debit or credit card", "ডেবিট বা ক্রেডিট কার্ড সংগ্রহ"),
    s("Request a cheque book", "চেক বইয়ের আবেদন"),
    s("Get help opening an account", "অ্যাকাউন্ট খুলতে সহায়তা"),
  ],
  hours: [
    { day: s("Sun – Thu", "রবি – বৃহস্পতি"), time: s("9:00 am – 9:00 pm", "সকাল ৯টা – রাত ৯টা") },
    { day: s("Saturday", "শনিবার"), time: s("10:00 am – 6:00 pm", "সকাল ১০টা – সন্ধ্যা ৬টা") },
  ],
};

/* ───────── Media: DBBL's own TV commercials and billboards ───────── */
/* ───────── Cards: illustrative designs (not DBBL's actual card faces). Names are DBBL's product names. ───────── */
export type CardSpec = {
  name: string;
  /** Short tier line printed on the card */
  tier: string;
  network: "visa" | "mastercard" | "none";
  bg: string;
  /** "light" text for dark cards, "dark" for gold/silver */
  ink: "light" | "dark";
  accent: string;
};
const card = (name: string, tier: string, network: CardSpec["network"], bg: string, ink: CardSpec["ink"], accent: string): CardSpec => ({ name, tier, network, bg, ink, accent });
export const cardGroups = [
  {
    key: "debit",
    href: "debitCards",
    cards: [
      card("Nexus Debit Card", "Nexus Debit", "none", "linear-gradient(135deg,#1e2378,#090b3a)", "light", "#c8f169"),
      card("VISA Debit Card", "Debit", "visa", "linear-gradient(135deg,#3a40a8,#161a63)", "light", "#ffffff"),
      card("MasterCard Debit Card", "Debit", "mastercard", "linear-gradient(135deg,#c1272d,#3a0d18)", "light", "#ffcf3d"),
      card("VISA International Debit Card", "International Debit", "visa", "linear-gradient(135deg,#00904a,#0e1150)", "light", "#c8f169"),
      card("MasterCard International Debit Card", "International Debit", "mastercard", "linear-gradient(135deg,#f08a24,#a3201f)", "light", "#ffffff"),
    ],
  },
  {
    key: "credit",
    href: "creditCards",
    cards: [
      card("VISA Gold International Credit Card", "Gold", "visa", "linear-gradient(135deg,#f0d27a,#a97c1e)", "dark", "#6b4a06"),
      card("MasterCard Gold International Credit Card", "Gold", "mastercard", "linear-gradient(135deg,#f4d98a,#b6862a)", "dark", "#6b4a06"),
      card("VISA Platinum Credit Card", "Platinum", "visa", "linear-gradient(135deg,#eceef5,#9aa0b6)", "dark", "#3a3f58"),
      card("Mastercard Titanium Credit Card", "Titanium", "mastercard", "linear-gradient(135deg,#585c6e,#1b1d2a)", "light", "#d7dae6"),
      card("VISA Signature Credit Card", "Signature", "visa", "linear-gradient(135deg,#1b1c33,#05060f)", "light", "#e6c15a"),
      card("MasterCard World Credit Card", "World", "mastercard", "linear-gradient(135deg,#161a63,#02030f)", "light", "#c8f169"),
    ],
  },
  {
    key: "prepaid",
    href: "prepaidCards",
    cards: [
      card("Travel Card", "Prepaid · Travel", "none", "linear-gradient(135deg,#2aa7e0,#1e2378)", "light", "#ffffff"),
      card("Hajj Card", "Prepaid · Hajj", "none", "linear-gradient(135deg,#0b8a52,#0a3b2a)", "light", "#ffe9a3"),
      card("Femina Card", "Prepaid · Femina", "none", "linear-gradient(135deg,#e0568f,#7a2a8f)", "light", "#ffffff"),
      card("Gift Card", "Prepaid · Gift", "none", "linear-gradient(135deg,#e31b23,#f7a41d)", "light", "#ffffff"),
      card("Payroll Card", "Prepaid · Payroll", "none", "linear-gradient(135deg,#00a38a,#0e1150)", "light", "#c8f169"),
      card("Campus Card", "Prepaid · Campus", "none", "linear-gradient(135deg,#ff9d2e,#d11f2a)", "light", "#ffffff"),
    ],
  },
] as const;

export const tvAds = [60, 61, 62, 63, 64, 65].map((n) => ({
  id: n,
  poster: `${B}/img/poster/videoimg${n}.jpg`,
  src: `${B}/video1/video${n}.webm`,
}));
export const billboards = ["o1", "o2", "o3", "o4", "o5", "o7"].map((n) => `${B}/images/billBoards/${n}.jpg`);

/* ───────── CSR (Social Cause, Scholarship, CSR-GraTA, Sustainable Finance pages) ───────── */
export const csrTimeline = [
  { year: "2002", text: s("Blankets for cold-hit families across the country.", "সারা দেশের শীতার্ত মানুষের জন্য কম্বল।") },
  { year: "2003", text: s("৳10 lakh and 5,000 blankets for Iran earthquake relief.", "ইরানের ভূমিকম্পে ত্রাণে ১০ লক্ষ টাকা ও ৫,০০০ কম্বল।") },
  { year: "2004", text: s("৳5 million for flood rehabilitation, and 20,000 blankets.", "বন্যা পুনর্বাসনে ৫০ লক্ষ টাকা, আর ২০,০০০ কম্বল।") },
];
