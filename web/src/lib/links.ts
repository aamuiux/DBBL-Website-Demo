// Every outbound link points at a real public DBBL page (verified 2026-11-21).
const B = "https://www.dutchbanglabank.com";

export const links = {
  home: B,
  ibLogin: "https://ib.dutchbanglabank.com",
  ibFeatures: `${B}/electronic-banking/internet-banking.html`,
  twoFA: "https://ecom.dutchbanglabank.com/2FAregistration",
  nexusPay: `${B}/nexuspay/nexusPay-home.html`,
  nexusPayPlay: "https://play.google.com/store/apps/details?id=com.dbbl.nexus.pay",
  nexusPayAppStore: "https://apps.apple.com/app/nexuspay/id1309057095",
  rocketPlay: "https://play.google.com/store/apps/details?id=com.dbbl.mbs.apps.main",
  /** "DBBL Rocket" on the App Store, developer Dutch-Bangla Bank. */
  rocketAppStore: "https://apps.apple.com/app/dbbl-rocket/id1194003397",
  rocket: `${B}/rocket/rocket.html`,
  /** Rocket fees: cash-out 0.9% at DBBL ATMs, 1.67% at agents (general consumer product). */
  rocketCharges: `${B}/rocket/charges-and-fees.html`,
  /** Rocket's official app icon (Google Play listing for com.dbbl.mbs.apps.main). */
  rocketLogo: "https://play-lh.googleusercontent.com/hcRpk0BWUTNPwr1bRWzNVKGZd2lbtdtNS9d__2w6glKwAUE_xvTh8FjkipEnzrlbEVCGsQ-75UwA5HRAYzHEdw=s512",
  agentBanking: `${B}/agent-banking/agentbanking.html`,
  agentRegistration: `${B}/agent-banking/registration.html`,
  atmLocator: "http://app.dutchbanglabank.com/dbblwebapp/atmCrmListCrmViewAction",
  branchLocator: "https://app.dutchbanglabank.com/DBBLWeb/BranchLocation",
  subBranch: `${B}/sub-branch/sub-branch.html`,
  merchantLocator: "https://app.dutchbanglabank.com/DBBLWeb/MerchantLocation",
  fastTrack: `${B}/electronic-banking/fast-track.html`,
  pos: `${B}/electronic-banking/pos.html`,
  ipg: `${B}/electronic-banking/internet-payment-gateway.html`,
  smsAlert: `${B}/electronic-banking/sms-alert.html`,
  callCenter: `${B}/electronic-banking/call-center.html`,
  atmCrm: `${B}/electronic-banking/crm.html`,
  eBankingIntro: `${B}/electronic-banking/introduction.html`,

  personalAccounts: `${B}/depositsadv/personal-accounts.html`,
  termDeposits: `${B}/depositsadv/term-deposit.html`,
  loansAdvances: `${B}/depositsadv/loansadv.html`,
  retailLoan: `${B}/personal-banking/retail-loan.html`,
  futureLine: `${B}/personal-banking/future-line.html`,
  vip: `${B}/vip-banking/vip-banking.html`,
  gsiw: `${B}/gsiw/gsiw.html`,

  debitCards: `${B}/electronic-banking/debit-cards.html`,
  creditCards: `${B}/electronic-banking/credit-cards.html`,
  prepaidCards: `${B}/electronic-banking/prepaid-cards.html`,
  odCards: `${B}/electronic-banking/od-cards.html`,
  emvCards: `${B}/electronic-banking/emv.html`,

  smeLenden: `${B}/sme-banking/cash-credit-lenden.html`,
  smeSomridhi: `${B}/sme-banking/term-loan-somridhi.html`,
  smeJanala: `${B}/sme-banking/property-loan-janala.html`,
  smeUtshab: `${B}/sme-banking/festival-loan-utshab.html`,
  smeUthsaho: `${B}/sme-banking/women-loan-uthsaho.html`,
  smeShofolota: `${B}/sme-banking/women-loan-shofolota.html`,
  smeProsher: `${B}/sme-banking/distributor-financing-prosher.html`,
  smeCalculator: "https://app.dutchbanglabank.com/dbblwebapp/loanVerifyEmployeeIDLoanAction",
  smeFaq: `${B}/sme-banking/faq-sme.html`,

  corporate: `${B}/corporate-banking/corpbanking.html`,
  corporateEbanking: `${B}/corporate-banking/ebankingforcorp.html`,
  lcTrade: `${B}/corporate-banking/lc-trade.html`,

  offshore: `${B}/offshorebanking/index.html`,
  remittance: `${B}/services_company/remittance-exchange.html`,
  remittanceStatus: "https://app.dutchbanglabank.com/remittance_online//checkstatus?",

  history: `${B}/about-us/brief-history.html`,
  board: `${B}/about-us/board.html`,
  management: "http://app.dutchbanglabank.com/DBBLWeb/DbblManagement",
  socialCause: `${B}/social/social-cause.html`,
  scholarship: "https://app.dutchbanglabank.com/DBBLScholarship",
  careers: "https://app.dutchbanglabank.com/Online_Job/",
  newsroom: "https://newsroom.dutchbanglabank.com/newsroom",
  tender: `${B}/tender/tender.html`,
  financialStatements: `${B}/investor-relations/financial-statements.html`,
  interimReport: `${B}/investor-relations/interim-report.html`,
  priceSensitive: `${B}/investor-relations/price-sensitive-information.html`,
  riskCapital: `${B}/investor-relations/risk-based-capital.html`,

  charges: `${B}/schedule_charge/ScheduleCharges.html`,
  lendingRate: `${B}/customer-awareness/LendingInterestRateofDutch-BanglaBankPLC.pdf`,
  forms: `${B}/electronic-banking/forms.html`,
  complaint: `${B}/complaint-cell/complaint-cell.html`,
  contact: `${B}/contact-us/head-office.html`,
  faq: `${B}/help-desk/faq.html`,
  lostStolen: `${B}/help-desk/lost-stolen.html`,
  customerService: `${B}/help-desk/customer-serveice.html`,
  citizensCharter: `${B}/CitizensCharter/CitizensCharter.html`,
  sustainableFinance: `${B}/SustainableFinance/SustainableFinance.html`,
  financialLiteracy: `${B}/financial_literacy/Financial_literacy.html`,
  nis: `${B}/nis/nis.html`,
  unclaimed: `${B}/unclaimed-deposit/Unclaimed_Deposit.html`,

  facebook: "https://www.facebook.com/DutchBanglaBankPLC",
  youtube: "https://www.youtube.com/c/DutchBanglaBankLimited-DBBL",
  linkedin: "https://www.linkedin.com/company/dutchbanglabank",

  // Commercial 63: its poster is a clean scene (60's poster carries a baked-in loan-ad ribbon and title)
  tvAd: `${B}/video1/video63.webm`,
  tvAdPoster: `${B}/img/poster/videoimg63.jpg`,
  allTvAds: `${B}/allTvads.html`,
  allBillboards: `${B}/allBillboards.html`,
  allPrintAds: `${B}/allAds.html`,

  // Campaigns
  udyog: `${B}/bbcirculars/UDYOG.pdf`,
  udyogForm: `${B}/bbcirculars/UDYOG-Form.pdf`,
  udyogCircular: `${B}/bbcirculars/UDYOGCircular.pdf`,

  // Retail loans
  loanApply: "https://app.dutchbanglabank.com/LoanApplication",
  emiCalc: `${B}/personal-banking/loan-calculator.html`,
  faqPersonalLoan: `${B}/images/retail/faq/FAQ_Personal_Loan.pdf`,
  faqHomeLoan: `${B}/images/retail/faq/FAQ_Home_Loan.pdf`,
  faqCarLoan: `${B}/images/retail/faq/FAQ_Car_Loan.pdf`,

  // CSR
  csrGrata: `${B}/csr-research/research.html`,
  fastTrackLocator: "http://app.dutchbanglabank.com/DBBLWeb/FastTrack",
  fastTrackPhoto: `${B}/img/slides/cashmachine.jpg`,
} as const;

export const phone = {
  hotline: "16216",
  international: "+8809666716216",
} as const;
