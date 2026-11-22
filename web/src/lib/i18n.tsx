"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

export type Lang = "en" | "bn";

const en = {
  skip: "Skip to main content",
  concept: "Concept redesign",
  conceptNote: "Concept redesign · not affiliated with DBBL",
  utility: {
    segments: ["Personal", "VIP Banking", "SME", "Corporate", "NRB & Offshore"],
    hotline: "24/7 hotline",
    locate: "ATM & branches",
    langLabel: "বাংলা",
    langAria: "Switch to Bangla",
  },
  nav: {
    offers: "Offers",
    accounts: "Accounts",
    cards: "Cards",
    loans: "Loans",
    digital: "Digital",
    business: "Business",
    about: "About",
    ib: "Internet Banking",
    ibShort: "Log in",
    search: "Search",
    menu: "Menu",
    close: "Close menu",
  },
  hero: {
    pause: "Pause slideshow",
    play: "Play slideshow",
    slide: "Slide",
    slides: [
      {
        title: "Bangladesh's lowest cash out charge",
        body: "Cash out from your Rocket account at any DBBL ATM for just 0.9%. That's ৳9 on ৳1,000.",
        cta: "Get Rocket",
        cta2: "See all charges",
        tag: "Rocket cash out",
      },
      {
        title: "Got an idea? Get it funded.",
        body: "UDYOG is looking for 5,000 young entrepreneurs across every upazila of 56 districts. Applications run 1 to 30 November 2026.",
        cta: "Get the form",
        cta2: "See all campaigns",
        tag: "UDYOG campaign",
      },
      {
        title: "Your bank, in your pocket.",
        body: "Send money free to any mobile number, pay by QR or tap, and open an account from the NexusPay app.",
        cta: "Get NexusPay",
        cta2: "See what it does",
        tag: "NexusPay",
      },
      {
        title: "An ATM is never far away.",
        body: "Over 4,100 DBBL ATMs across Bangladesh, free and unlimited for DBBL customers.",
        cta: "Find an ATM",
        cta2: "Open an account",
        tag: "Largest ATM network",
      },
    ],
  },
  dock: {
    label: "Quick actions",
    items: {
      atm: "Find ATM / branch",
      open: "Open an account",
      nexus: "NexusPay",
      rocket: "Rocket",
      call: "Call 16216",
    },
  },
  needs: {
    title: "What do you want to do?",
    lede: "Start with the job, not the product name. Every option links straight to the details on DBBL.",
    tabs: {
      save: "Save",
      spend: "Spend",
      borrow: "Borrow",
      send: "Send & receive",
      business: "Run a business",
    },
    more: "View details",
  },
  app: {
    intro: "NexusPay: Bangladesh's first app-based digital banking",
    title: "Everyday banking, done in a tap.",
    lede: "NexusPay was Bangladesh's first app-based digital banking solution. It works with DBBL, Rocket, Visa, Mastercard and other banks' cards.",
    steps: [
      { title: "Send money free", body: "To any mobile number in the country, at no charge." },
      { title: "Pay with QR or tap", body: "Full QR and NFC payments across the DBBL network. Over 10,000 shops accept NexusPay." },
      { title: "Cash out without a card", body: "Cardless ATM withdrawal, now rolling out across the network." },
      { title: "Shop online safely", body: "Generate a temporary card number that expires in 10 minutes." },
    ],
    download: "Download NexusPay",
    scan: "Scan to get the app",
    illustrative: "Illustrative screens",
  },
  rocket: {
    title: "Rocket: banking without a branch.",
    body: "Rocket was the country's first mobile financial service. Cash in, cash out, pay bills, receive salary or remittance, and withdraw at an ATM using just your phone.",
    features: ["Cash in & cash out", "Send money (P2P)", "Bill & merchant payment", "Foreign remittance", "Salary disbursement", "ATM withdrawal"],
    cta: "Learn about Rocket",
    agent: "Find agent banking",
  },
  cards: {
    title: "A card for every way you pay.",
    lede: "Every DBBL card carries an EMV chip. Credit cards are accepted at more than 40 million merchants and over 2 million ATMs worldwide.",
    drag: "Drag to turn the card",
    list: [
      { name: "Nexus Debit", body: "DBBL's own debit card, used at the country's largest ATM network.", href: "debitCards" },
      { name: "Visa & Mastercard Credit", body: "Local and international, from Classic and Gold up to Platinum, Signature, Titanium and World.", href: "creditCards" },
      { name: "Prepaid", body: "Load it, spend it, control it. Good for travel and online payments.", href: "prepaidCards" },
    ],
    cta: "Compare cards",
  },
  video: {
    title: "The bank behind the screen.",
    titleA: "The bank",
    titleB: "behind the screen.",
    body: "DBBL was the first bank in Bangladesh to be fully automated, in 2003. Watch one of our TV commercials.",
    play: "Play the TV commercial",
    learn: "Learn more",
    close: "Close video",
    loading: "Loading video",
    error: "The video couldn't load. You can watch DBBL's ads on YouTube instead.",
    youtube: "Open YouTube channel",
  },
  segments: {
    title: "Banking for where you are in life.",
    items: {
      personal: { name: "Personal", body: "Savings, current and term deposits, retail loans and the Future Line plan." },
      vip: { name: "VIP Banking", body: "Dedicated relationship managers and VIP lounges in selected branches." },
      sme: { name: "SME", body: "Seven SME loan products, including two made for women." },
      corporate: { name: "Corporate", body: "Corporate financing, LC and trade services, and electronic banking for business." },
      nrb: { name: "NRB & Offshore", body: "Offshore FC accounts and FDRs in USD, EUR, GBP, CAD and AUD, plus remittance." },
    },
    cta: "Explore",
  },
  proof: {
    title: "Built the rails. Still running them.",
    lede: "Most local banks use DBBL's ATM and card infrastructure instead of building their own.",
    stats: [
      { value: 64120000, suffix: "+", label: "customers use Dutch-Bangla Bank" },
      { value: 4100, suffix: "+", label: "ATMs nationwide" },
      { value: 23, suffix: "", label: "commercial banks connected to our ATM network" },
    ],
    source: "Figures as published on dutchbanglabank.com",
    firstsTitle: "Firsts that changed banking in Bangladesh",
    firsts: [
      { year: "First", title: "Joint venture bank", body: "Founded with the Netherlands Development Finance Company (FMO)." },
      { year: "2003", title: "Fully automated bank", body: "Automation completed after the Electronic Banking Division launched in 2002." },
      { year: "First", title: "Mobile financial service", body: "Rocket put banking on every phone." },
      { year: "First", title: "App-based digital bank", body: "NexusPay, the first fully cardless banking solution." },
    ],
    networkTitle: "One network, many banks",
    networkBody: "Our ATMs connect directly to Bangladesh Bank and 23 commercial banks, so their customers can use them too.",
    networkCenter: "DBBL ATM network",
    networkBB: "Bangladesh Bank",
    networkPartner: "Partner bank",
  },
  conscience: {
    title: "Profit was never the only point.",
    body: "DBBL is the largest bank donor to social causes in Bangladesh, through the Dutch-Bangla Bank Foundation and its scholarship programme.",
    cta: "Social causes",
    cta2: "Scholarships",
  },
  help: {
    title: "We're here, any hour.",
    lede: "Call centre open 24 hours a day, 365 days a year.",
    local: "From Bangladesh",
    intl: "From abroad",
    lost: "Lost or stolen card?",
    lostBody: "Call 16216 right away to block it.",
    safetyTitle: "Stay safe",
    safety: [
      "DBBL will never ask for your PIN, OTP or password.",
      "Never share your card's CVV or OTP with anyone.",
      "Log in only at ib.dutchbanglabank.com.",
    ],
    links: { faq: "FAQ", complaint: "Complaint cell", forms: "All forms", charges: "Charges & fees" },
    card: "Helpdesk",
    rows: {
      complaint: "Raise a complaint and follow it up with the bank.",
      faq: "Quick answers on cards, accounts and apps.",
      charges: "Published charges and fees for every service.",
    },
  },
  footer: {
    tagline: "Your Trusted Partner",
    cols: {
      bank: "Banking",
      digital: "Digital",
      about: "About DBBL",
      help: "Help",
    },
    getApp: "Get the apps",
    follow: "Follow us",
    address: "47 Motijheel Commercial Area, Dhaka-1000, Bangladesh",
    swift: "SWIFT: DBBLBDDH",
    legal: "Dutch-Bangla Bank PLC is regulated by Bangladesh Bank.",
    disclaimer:
      "This is an independent concept redesign of dutchbanglabank.com made for a portfolio. It is not affiliated with or endorsed by Dutch-Bangla Bank PLC. Photography from Unsplash; app screens are illustrative.",
  },
};

export type Dict = typeof en;

const bn: Dict = {
  skip: "মূল বিষয়বস্তুতে যান",
  concept: "কনসেপ্ট রিডিজাইন",
  conceptNote: "কনসেপ্ট রিডিজাইন · ডিবিবিএলের সঙ্গে সম্পর্কিত নয়",
  utility: {
    segments: ["ব্যক্তিগত", "ভিআইপি ব্যাংকিং", "এসএমই", "কর্পোরেট", "প্রবাসী ও অফশোর"],
    hotline: "২৪/৭ হটলাইন",
    locate: "এটিএম ও শাখা",
    langLabel: "English",
    langAria: "Switch to English",
  },
  nav: {
    offers: "অফার",
    accounts: "অ্যাকাউন্ট",
    cards: "কার্ড",
    loans: "ঋণ",
    digital: "ডিজিটাল",
    business: "ব্যবসা",
    about: "আমাদের কথা",
    ib: "ইন্টারনেট ব্যাংকিং",
    ibShort: "লগ ইন",
    search: "খুঁজুন",
    menu: "মেনু",
    close: "মেনু বন্ধ করুন",
  },
  hero: {
    pause: "স্লাইডশো থামান",
    play: "স্লাইডশো চালান",
    slide: "স্লাইড",
    slides: [
      {
        title: "বাংলাদেশে সবচেয়ে কম ক্যাশ আউট চার্জ",
        body: "যেকোনো ডিবিবিএল এটিএম থেকে রকেট অ্যাকাউন্টের টাকা তুলুন মাত্র ০.৯% চার্জে। ১,০০০ টাকায় মাত্র ৯ টাকা।",
        cta: "রকেট নিন",
        cta2: "সব চার্জ দেখুন",
        tag: "রকেট ক্যাশ আউট",
      },
      {
        title: "আইডিয়া আছে? অর্থায়ন নিন।",
        body: "৫৬ জেলার সকল উপজেলায় ৫,০০০ তরুণ উদ্যোক্তা খুঁজছে উদ্যোগ। আবেদন ১ থেকে ৩০ নভেম্বর ২০২৬।",
        cta: "ফর্ম নিন",
        cta2: "সব ক্যাম্পেইন",
        tag: "উদ্যোগ ক্যাম্পেইন",
      },
      {
        title: "আপনার ব্যাংক, আপনার পকেটে।",
        body: "যেকোনো মোবাইল নম্বরে বিনা খরচে টাকা পাঠান, কিউআর বা ট্যাপে পেমেন্ট করুন, আর নেক্সাসপে অ্যাপ থেকেই অ্যাকাউন্ট খুলুন।",
        cta: "নেক্সাসপে নিন",
        cta2: "কী কী করা যায় দেখুন",
        tag: "নেক্সাসপে",
      },
      {
        title: "এটিএম সবসময় কাছেই।",
        body: "সারা দেশে ৪,১০০-এরও বেশি ডিবিবিএল এটিএম, ডিবিবিএল গ্রাহকদের জন্য বিনামূল্যে ও সীমাহীন।",
        cta: "এটিএম খুঁজুন",
        cta2: "অ্যাকাউন্ট খুলুন",
        tag: "সবচেয়ে বড় এটিএম নেটওয়ার্ক",
      },
    ],
  },
  dock: {
    label: "দ্রুত সেবা",
    items: {
      atm: "এটিএম / শাখা খুঁজুন",
      open: "অ্যাকাউন্ট খুলুন",
      nexus: "নেক্সাসপে",
      rocket: "রকেট",
      call: "কল করুন ১৬২১৬",
    },
  },
  needs: {
    title: "আপনি কী করতে চান?",
    lede: "পণ্যের নাম নয়, কাজ দিয়ে শুরু করুন। প্রতিটি অপশন সরাসরি ডিবিবিএলের বিস্তারিত পাতায় নিয়ে যাবে।",
    tabs: {
      save: "সঞ্চয়",
      spend: "খরচ",
      borrow: "ঋণ",
      send: "টাকা পাঠানো ও পাওয়া",
      business: "ব্যবসা চালানো",
    },
    more: "বিস্তারিত দেখুন",
  },
  app: {
    intro: "নেক্সাসপে: বাংলাদেশের প্রথম অ্যাপভিত্তিক ডিজিটাল ব্যাংকিং",
    title: "প্রতিদিনের ব্যাংকিং, এক ট্যাপে।",
    lede: "নেক্সাসপে বাংলাদেশের প্রথম অ্যাপভিত্তিক ডিজিটাল ব্যাংকিং সমাধান। এটি ডিবিবিএল, রকেট, ভিসা, মাস্টারকার্ড ও অন্যান্য ব্যাংকের কার্ডের সঙ্গে কাজ করে।",
    steps: [
      { title: "বিনা খরচে টাকা পাঠান", body: "দেশের যেকোনো মোবাইল নম্বরে, কোনো চার্জ ছাড়াই।" },
      { title: "কিউআর বা ট্যাপে পেমেন্ট", body: "পুরো ডিবিবিএল নেটওয়ার্কে কিউআর ও এনএফসি পেমেন্ট। ১০,০০০-এর বেশি দোকানে নেক্সাসপে চলে।" },
      { title: "কার্ড ছাড়াই টাকা তুলুন", body: "কার্ডলেস এটিএম উত্তোলন, নেটওয়ার্কজুড়ে চালু হচ্ছে।" },
      { title: "নিরাপদে অনলাইন কেনাকাটা", body: "১০ মিনিটে মেয়াদ শেষ হয় এমন অস্থায়ী কার্ড নম্বর তৈরি করুন।" },
    ],
    download: "নেক্সাসপে ডাউনলোড করুন",
    scan: "স্ক্যান করে অ্যাপ নিন",
    illustrative: "নমুনা স্ক্রিন",
  },
  rocket: {
    title: "রকেট: শাখা ছাড়াই ব্যাংকিং।",
    body: "রকেট দেশের প্রথম মোবাইল আর্থিক সেবা। শুধু ফোন দিয়েই ক্যাশ ইন, ক্যাশ আউট, বিল পরিশোধ, বেতন বা রেমিট্যান্স গ্রহণ আর এটিএম থেকে টাকা তোলা।",
    features: ["ক্যাশ ইন ও ক্যাশ আউট", "টাকা পাঠানো (পি২পি)", "বিল ও মার্চেন্ট পেমেন্ট", "বিদেশি রেমিট্যান্স", "বেতন বিতরণ", "এটিএম উত্তোলন"],
    cta: "রকেট সম্পর্কে জানুন",
    agent: "এজেন্ট ব্যাংকিং খুঁজুন",
  },
  cards: {
    title: "প্রতিটি পেমেন্টের জন্য একটি কার্ড।",
    lede: "প্রতিটি ডিবিবিএল কার্ডে ইএমভি চিপ। ক্রেডিট কার্ড বিশ্বজুড়ে ৪ কোটিরও বেশি মার্চেন্ট ও ২০ লাখের বেশি এটিএমে গ্রহণযোগ্য।",
    drag: "কার্ডটি ঘোরাতে টানুন",
    list: [
      { name: "নেক্সাস ডেবিট", body: "ডিবিবিএলের নিজস্ব ডেবিট কার্ড, দেশের সবচেয়ে বড় এটিএম নেটওয়ার্কে ব্যবহারযোগ্য।", href: "debitCards" },
      { name: "ভিসা ও মাস্টারকার্ড ক্রেডিট", body: "লোকাল ও ইন্টারন্যাশনাল, ক্লাসিক ও গোল্ড থেকে প্লাটিনাম, সিগনেচার, টাইটানিয়াম ও ওয়ার্ল্ড।", href: "creditCards" },
      { name: "প্রিপেইড", body: "টাকা লোড করুন, খরচ করুন, নিয়ন্ত্রণ রাখুন। ভ্রমণ ও অনলাইন পেমেন্টের জন্য ভালো।", href: "prepaidCards" },
    ],
    cta: "কার্ড তুলনা করুন",
  },
  video: {
    title: "পর্দার পেছনের ব্যাংক।",
    titleA: "পর্দার পেছনের",
    titleB: "ব্যাংক।",
    body: "২০০৩ সালে ডিবিবিএল বাংলাদেশের প্রথম সম্পূর্ণ স্বয়ংক্রিয় ব্যাংক হয়। আমাদের একটি টিভি বিজ্ঞাপন দেখুন।",
    play: "টিভি বিজ্ঞাপন চালান",
    learn: "আরও জানুন",
    close: "ভিডিও বন্ধ করুন",
    loading: "ভিডিও লোড হচ্ছে",
    error: "ভিডিওটি লোড হয়নি। ইউটিউবে ডিবিবিএলের বিজ্ঞাপন দেখতে পারেন।",
    youtube: "ইউটিউব চ্যানেল খুলুন",
  },
  segments: {
    title: "জীবনের প্রতিটি ধাপের ব্যাংকিং।",
    items: {
      personal: { name: "ব্যক্তিগত", body: "সঞ্চয়ী, চলতি ও মেয়াদি আমানত, রিটেইল ঋণ এবং ফিউচার লাইন।" },
      vip: { name: "ভিআইপি ব্যাংকিং", body: "নির্দিষ্ট রিলেশনশিপ ম্যানেজার এবং নির্বাচিত শাখায় ভিআইপি লাউঞ্জ।" },
      sme: { name: "এসএমই", body: "সাতটি এসএমই ঋণ, যার দুটি নারীদের জন্য।" },
      corporate: { name: "কর্পোরেট", body: "কর্পোরেট অর্থায়ন, এলসি ও ট্রেড সেবা, আর ব্যবসার জন্য ইলেকট্রনিক ব্যাংকিং।" },
      nrb: { name: "প্রবাসী ও অফশোর", body: "ইউএসডি, ইউরো, জিবিপি, সিএডি ও এইউডি-তে অফশোর এফসি অ্যাকাউন্ট ও এফডিআর, আর রেমিট্যান্স।" },
    },
    cta: "দেখুন",
  },
  proof: {
    title: "রেলপথ বানিয়েছি। এখনো চালাচ্ছি।",
    lede: "দেশের বেশিরভাগ ব্যাংক নিজস্ব অবকাঠামো না গড়ে ডিবিবিএলের এটিএম ও কার্ড নেটওয়ার্ক ব্যবহার করে।",
    stats: [
      { value: 64120000, suffix: "+", label: "গ্রাহক ডাচ-বাংলা ব্যাংক ব্যবহার করেন" },
      { value: 4100, suffix: "+", label: "এটিএম সারা দেশে" },
      { value: 23, suffix: "", label: "বাণিজ্যিক ব্যাংক আমাদের এটিএম নেটওয়ার্কে যুক্ত" },
    ],
    source: "সংখ্যাগুলো dutchbanglabank.com-এ প্রকাশিত",
    firstsTitle: "যে প্রথমগুলো বদলে দিয়েছে বাংলাদেশের ব্যাংকিং",
    firsts: [
      { year: "প্রথম", title: "জয়েন্ট ভেঞ্চার ব্যাংক", body: "নেদারল্যান্ডস ডেভেলপমেন্ট ফাইন্যান্স কোম্পানি (এফএমও)-র সঙ্গে প্রতিষ্ঠিত।" },
      { year: "২০০৩", title: "সম্পূর্ণ স্বয়ংক্রিয় ব্যাংক", body: "২০০২ সালে ইলেকট্রনিক ব্যাংকিং ডিভিশন চালুর পর অটোমেশন সম্পন্ন।" },
      { year: "প্রথম", title: "মোবাইল আর্থিক সেবা", body: "রকেট প্রতিটি ফোনে পৌঁছে দিয়েছে ব্যাংকিং।" },
      { year: "প্রথম", title: "অ্যাপভিত্তিক ডিজিটাল ব্যাংক", body: "নেক্সাসপে, প্রথম সম্পূর্ণ কার্ডলেস ব্যাংকিং সমাধান।" },
    ],
    networkTitle: "এক নেটওয়ার্ক, অনেক ব্যাংক",
    networkBody: "আমাদের এটিএম সরাসরি বাংলাদেশ ব্যাংক ও ২৩টি বাণিজ্যিক ব্যাংকের সঙ্গে যুক্ত, তাই তাদের গ্রাহকরাও ব্যবহার করতে পারেন।",
    networkCenter: "ডিবিবিএল এটিএম নেটওয়ার্ক",
    networkBB: "বাংলাদেশ ব্যাংক",
    networkPartner: "অংশীদার ব্যাংক",
  },
  conscience: {
    title: "মুনাফাই কখনো একমাত্র লক্ষ্য ছিল না।",
    body: "ডাচ-বাংলা ব্যাংক ফাউন্ডেশন ও বৃত্তি কর্মসূচির মাধ্যমে ডিবিবিএল বাংলাদেশে সামাজিক কাজে সবচেয়ে বড় ব্যাংক দাতা।",
    cta: "সামাজিক কার্যক্রম",
    cta2: "বৃত্তি",
  },
  help: {
    title: "আমরা আছি, যেকোনো সময়।",
    lede: "কল সেন্টার খোলা দিনে ২৪ ঘণ্টা, বছরে ৩৬৫ দিন।",
    local: "বাংলাদেশ থেকে",
    intl: "বিদেশ থেকে",
    lost: "কার্ড হারিয়েছে বা চুরি হয়েছে?",
    lostBody: "এখনই ১৬২১৬-এ কল করে কার্ডটি বন্ধ করুন।",
    safetyTitle: "নিরাপদ থাকুন",
    safety: [
      "ডিবিবিএল কখনো আপনার পিন, ওটিপি বা পাসওয়ার্ড চাইবে না।",
      "কার্ডের সিভিভি বা ওটিপি কাউকে দেবেন না।",
      "শুধু ib.dutchbanglabank.com-এ লগ ইন করুন।",
    ],
    links: { faq: "সাধারণ প্রশ্ন", complaint: "অভিযোগ সেল", forms: "সব ফর্ম", charges: "চার্জ ও ফি" },
    card: "হেল্পডেস্ক",
    rows: {
      complaint: "অভিযোগ জানান এবং ব্যাংকের সঙ্গে ফলো-আপ করুন।",
      faq: "কার্ড, অ্যাকাউন্ট ও অ্যাপ নিয়ে দ্রুত উত্তর।",
      charges: "প্রতিটি সেবার প্রকাশিত চার্জ ও ফি।",
    },
  },
  footer: {
    tagline: "আপনার বিশ্বস্ত সঙ্গী",
    cols: {
      bank: "ব্যাংকিং",
      digital: "ডিজিটাল",
      about: "ডিবিবিএল সম্পর্কে",
      help: "সহায়তা",
    },
    getApp: "অ্যাপ নিন",
    follow: "আমাদের অনুসরণ করুন",
    address: "৪৭ মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০, বাংলাদেশ",
    swift: "সুইফট: DBBLBDDH",
    legal: "ডাচ-বাংলা ব্যাংক পিএলসি বাংলাদেশ ব্যাংক কর্তৃক নিয়ন্ত্রিত।",
    disclaimer:
      "এটি পোর্টফোলিওর জন্য তৈরি dutchbanglabank.com-এর একটি স্বাধীন কনসেপ্ট রিডিজাইন। ডাচ-বাংলা ব্যাংক পিএলসির সঙ্গে এর কোনো সম্পর্ক বা অনুমোদন নেই। ছবি আনস্প্ল্যাশ থেকে; অ্যাপ স্ক্রিন নমুনা মাত্র।",
  },
};

const dicts: Record<Lang, Dict> = { en, bn };

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

type Ctx = {
  lang: Lang;
  d: Dict;
  toggle: () => void;
  num: (n: number) => string;
};

const LangContext = createContext<Ctx | null>(null);

// The chosen language lives in localStorage (a per-visitor convenience); the server always renders English.
const KEY = "dbbl-lang";
const EVT = "dbbl-lang-change";
let memoryLang: Lang = "en"; // fallback when storage is blocked

function readLang(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "bn" || v === "en") return v;
  } catch {}
  return memoryLang;
}
function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    const next: Lang = readLang() === "en" ? "bn" : "en";
    memoryLang = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    window.dispatchEvent(new Event(EVT));
  }, []);

  const num = useCallback(
    (n: number) => {
      const s = n.toLocaleString(lang === "bn" ? "en-IN" : "en-US");
      return lang === "bn" ? s.replace(/\d/g, (c) => bnDigits[+c]) : s;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, d: dicts[lang], toggle, num }), [lang, toggle, num]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
