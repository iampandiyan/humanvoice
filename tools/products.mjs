// All site content lives here. Edit this file, then run `node tools/build.mjs` to regenerate the pages.
// Copy is drawn from each app's App Store / Google Play listing and its own privacy policy.

export const SITE = {
  name: "Humanvoice",
  url: "https://humanvoice.in",
  owner: "Karuppasamy Pandiyan Marimuthu",
  email: "mepandiyan@gmail.com",
  year: 2026,
  replyTime: "24-48 hours",
  tagline: "Simple, privacy-friendly apps for families, parents, professionals and communities.",
};

const ALL_LANGS = "en,ta,te,ml,kn,hi,de,fr,es,ja,pt,ko,zh-CN,it,id,ar";

// Order here = order of the five layers on the home page.
export const PRODUCTS = [
  {
    slug: "where-is-my-people",
    name: "Where is my people",
    altNames: [],
    status: "soon", // "live" | "soon"
    tagline: "See where your family is, and keep it private.",
    definition:
      "Where is my people is a family location-sharing app for iPhone and Android. Family members see each other on a live map with battery level and the place they are at, and location is shared only inside the family circle.",
    blurb:
      "A live family map with battery levels and place badges such as Home, Work and School. Your location is shared only with the people in your family circle, and only your latest location is ever kept.",
    points: [
      "Live map where each person's pin glides smoothly as they move",
      "Battery level and place badges (Home, Work, School) for every family member",
      "Only your family circle can see you; no location history is kept",
      "Export your data or delete your account at any time, inside the app",
    ],
    facts: [
      ["Status", "Coming soon to the App Store and Google Play"],
      ["Platforms", "iPhone and Android"],
      ["Languages", "16, including English, Tamil, Hindi and Arabic"],
      ["Who sees your location", "Only the members of your family circle"],
      ["Location history", "None. Only your latest location is stored"],
      ["Account required", "Yes (email and password)"],
    ],
    category: "Lifestyle",
    schemaCategory: "LifestyleApplication",
    os: "iOS, Android",
    free: null, // price not announced
    stores: { apple: null, play: null },
    hasPrivacy: true,
    privacyLangs: ALL_LANGS,
    hasDelete: true,
    deleteFormUrl: "", // paste the Google Form link here when it exists; the delete page then shows a request button
    supportIntro:
      "If you are experiencing any issues with the app, or want to suggest a new feature, please reach out!",
    faq: [
      ["Who can see my location?", "Only the active members of your own family circle. Nobody else can see it, and we do not show ads or sell data."],
      ["Does the app keep a history of where I have been?", "No. Only your latest location is stored, and each new location replaces the previous one."],
      ["How do I delete my account and data?", "Open the app, go to Settings and choose Delete account. You can also request deletion from the account deletion page on this site."],
      ["Can I get a copy of my data?", "Yes. In the app, go to Settings and choose Export my data."],
      ["Is the app available yet?", "Not yet. It is coming to the App Store and Google Play; this page will link to both when it is released."],
    ],
    supportFaq: [
      ["My location is not updating.", "Make sure location permission is set to Allow all the time (Android) or Always (iPhone), that battery saver is not restricting the app, and that the phone has an internet connection."],
      ["I forgot my password.", "On the login screen tap Forgot password. We email a 6-digit code that lets you choose a new password."],
      ["How do I delete my account?", "Settings, then Delete account. If you cannot open the app, use the account deletion page."],
      ["How do I change the language?", "Settings, then Language. The app is available in 16 languages."],
    ],
  },
  {
    slug: "safeplay-video-player",
    name: "SafePlay Video Player",
    altNames: ["Kids Safe Video Player"],
    status: "live",
    tagline: "Ad-free, parent-controlled videos for kids.",
    definition:
      "SafePlay Video Player (called Kids Safe Video Player on Android) is a free, offline, parent-controlled video player for kids. A parent chooses the videos, sets screen-time limits and locks the settings with a PIN or biometrics.",
    blurb:
      "A safe, joyful video world for little ones. You choose the videos, set the screen time and lock the settings, and everything stays on your device with no ads, trackers or accounts.",
    points: [
      "Multiple child profiles with names and avatars",
      "Group videos your way: Cartoons, Learning, Bedtime and more",
      "Screen-time limits with a countdown, plus an optional kiosk mode",
      "PIN and biometric lock for all parent settings",
    ],
    facts: [
      ["Platforms", "iPhone and iPad (iOS 15 or later) and Android"],
      ["Price", "Free, with optional in-app purchases"],
      ["Works offline", "Yes, for videos saved on your device (YouTube videos you add need internet)"],
      ["Account required", "No"],
      ["Ads and trackers", "None"],
      ["Age rating (App Store)", "4+"],
      ["Android name", "Kids Safe Video Player"],
    ],
    category: "Photo & Video",
    schemaCategory: "MultimediaApplication",
    os: "iOS, Android",
    free: true,
    stores: {
      apple: "https://apps.apple.com/us/app/safeplay-video-player/id6797278830",
      play: "https://play.google.com/store/apps/details?id=com.iampandiyan.kidssafevideoplayer",
    },
    hasPrivacy: true,
    privacyLangs: ALL_LANGS,
    privacyTitle: "Privacy Policy for SafePlay Video Player (iOS) and Kids Safe Video Player (Android)",
    hasDelete: false,
    about: {
      "seoTitle": "About Kids Safe Video Player (SafePlay): Offline Kids Video App",
      "seoDescription": "A fully offline, parent-controlled video player for kids: Parent PIN, screen-time limits, no ads, no sign-up and no data sent to any server.",
      "eyebrow": "About Kids Safe Video Player",
      "h1": "A Safe, Distraction-Free Video Library for Your Child",
      "lead": [
        "Kids Safe Video Player is a fully offline, parent-controlled video player that lets you build a safe, distraction-free library just for your child — with no ads, no sign-up, and no data sent to any server."
      ],
      "heroChips": [
        "No ads",
        "No sign-up",
        "No data sent to any server"
      ],
      "fineprint": "Called SafePlay Video Player on iPhone and iPad · Free to download · Works offline",
      "heroShots": [
        1,
        3
      ],
      "how": {
        "title": "How It Works",
        "paragraphs": [
          "Set a Parent PIN (or use fingerprint/Face unlock) once, then curate exactly what your child can watch.",
          "Your child gets a simple, locked-down \"Child Mode\" — they can only see the videos and groups you've approved."
        ],
        "shot": 2,
        "caption": "Create your Parent PIN"
      },
      "featuresTitle": "Key Features",
      "features": [
        {
          "icon": "users",
          "text": "Multiple child profiles with names and avatars"
        },
        {
          "icon": "folder",
          "text": "Organize videos into groups (e.g. \"Cartoons,\" \"Learning,\" \"Bedtime\")"
        },
        {
          "icon": "play",
          "text": "Add your own local video files, or optionally add specific YouTube videos"
        },
        {
          "icon": "clock",
          "text": "Screen-time limits per profile, with an on-screen countdown for your child"
        },
        {
          "icon": "phonelock",
          "text": "Kiosk / screen-pinning mode so your child can't back out of the app"
        },
        {
          "icon": "chart",
          "text": "Parent Dashboard with watch-time analytics — see what was watched and for how long"
        },
        {
          "icon": "lock",
          "text": "PIN and biometric lock protects all parent settings"
        },
        {
          "icon": "wifioff",
          "text": "100% offline for locally added videos — nothing is uploaded anywhere"
        },
        {
          "icon": "ban",
          "text": "No ads. No third-party trackers or analytics. No account required."
        }
      ],
      "privacyTitle": "Privacy by Design",
      "privacyText": [
        "All profiles, video libraries, and watch history stay on your device in a local database. We don't operate a server and we don't collect or sell your family's data."
      ],
      "closingHeading": "Kids Safe Video Player is built for parents who want the convenience of a curated kids' video app without handing a company access to their family's data.",
      "schemaShots": 3
    },
    supportIntro:
      "If you are experiencing any issues with the app, or want to suggest a new feature, please reach out!",
    faq: [
      ["Does it need an internet connection?", "Not for videos stored on your device. Internet is used only to stream a YouTube video that a parent has added, and to process optional purchases."],
      ["Does the app collect my child's data?", "There is no account and no company server. Profiles, video lists, screen-time settings and watch history stay on your device."],
      ["Is it free?", "Yes. Optional in-app purchases are handled by the App Store and Google Play."],
      ["How do I delete the data?", "Delete profiles or clear watch history in Parent Mode, or uninstall the app to remove everything from the device. See the privacy policy for the data-deletion request form."],
    ],
    supportFaq: [
      ["How do I unlock Parent Mode?", "Use the 4-digit PIN you created, or Face ID / fingerprint if you turned it on."],
      ["Videos will not play.", "Check that the video file is still on the device, and that YouTube videos have an internet connection."],
      ["How do I remove all data?", "Uninstall the app; all data is stored only on the device. You can also use the deletion request form in the privacy policy."],
    ],
  },
  {
    slug: "shared-ai-budget-tracker",
    name: "Shared AI Budget Tracker",
    altNames: ["Family Budget", "BudgetTracker"],
    status: "live",
    tagline: "Family budgeting with optional AI insights.",
    definition:
      "Shared AI Budget Tracker is a personal and family finance app for iPhone and Android. It tracks expenses, income, budgets, goals and loans on your own device, with optional AI insights and optional backup to your Google Drive.",
    blurb:
      "Track expenses, income, budgets, goals and loans offline, share a budget with your partner or family, and switch on AI insights only when you want them.",
    points: [
      "Expense and income tracking, custom budgets, goals and loan amortization",
      "Works offline, and your data stays on your phone",
      "Optional AI assistant for spending insights (only if you opt in)",
      "Optional backup to your own Google Drive and sync to Google Sheets",
    ],
    facts: [
      ["Platforms", "iPhone and iPad (iOS 14 or later) and Android"],
      ["Price", "Free, with optional Premium (monthly, 3-month, 6-month, yearly or lifetime)"],
      ["Category", "Finance"],
      ["Works offline", "Yes"],
      ["Where data is stored", "On your device; we do not store it on our own servers"],
      ["Age rating (App Store)", "4+"],
    ],
    category: "Finance",
    schemaCategory: "FinanceApplication",
    os: "iOS, Android",
    free: true,
    stores: {
      apple: "https://apps.apple.com/us/app/shared-ai-budget-tracker/id6765643311",
      play: "https://play.google.com/store/apps/details?id=com.mepandiyan.sharedaibudget",
    },
    hasTerms: true,
    hasPrivacy: true,
    privacyLangs: ALL_LANGS,
    privacyTitle: "Privacy Policy for Shared AI Budget Tracker | Family Budget",
    hasTutorial: true,
    hasDelete: false,
    about: {
      "seoTitle": "About Shared AI Budget Tracker: Private Family Budget App with AI",
      "seoDescription": "A private budget tracker with optional AI insights. Track expenses, budgets, goals and loans offline, and back up to your own Google Drive and Sheets.",
      "eyebrow": "About Shared AI Budget Tracker",
      "h1": "Take Control of Your Money with a Budget Tracker That Respects Your Privacy",
      "lead": [
        "BudgetTracker is a secure, intelligent, and private personal finance manager designed to help you take control of your money. Whether you are tracking daily expenses, planning monthly budgets, or managing loans, BudgetTracker provides the tools you need to achieve your financial goals."
      ],
      "heroChips": [
        "Private & secure",
        "Works offline",
        "Opt-in AI assistant"
      ],
      "fineprint": "Also known as BudgetTracker · Free to download · optional Premium · iPhone, iPad and Android",
      "heroShots": [
        1,
        3
      ],
      "pillars": [
        {
          "icon": "shield",
          "title": "Private & Secure by Design",
          "text": "Your financial data belongs to you. BudgetTracker operates entirely on your local device. We do not store your personal or financial data on our servers."
        },
        {
          "icon": "cloud",
          "title": "Seamless Cloud Backup & Sync",
          "text": "Never lose your data. Securely back up your local database directly to your personal Google Drive. Want to analyze your spending on your computer? Automatically sync your transactions to your own Google Sheets account."
        },
        {
          "icon": "sparkles",
          "title": "AI Financial Assistant",
          "text": "Opt-in to our intelligent AI Chat assistant to get instant insights into your spending habits. Ask questions about your budgets, categorize expenses faster, and get smart financial summaries based on your actual data."
        }
      ],
      "pillarsLink": true,
      "featuresTitle": "Core Features",
      "features": [
        {
          "icon": "wallet",
          "title": "Expense & Income Tracking",
          "text": "Easily log transactions on the go."
        },
        {
          "icon": "pie",
          "title": "Custom Budgets",
          "text": "Set and monitor spending limits for different categories."
        },
        {
          "icon": "target",
          "title": "Goal Management",
          "text": "Track your progress toward savings goals."
        },
        {
          "icon": "calc",
          "title": "Loan Amortization",
          "text": "Calculate and track loan payments and schedules."
        },
        {
          "icon": "grid",
          "title": "Category Management",
          "text": "Organize your spending exactly how you want it."
        },
        {
          "icon": "wifioff",
          "title": "Offline Mode",
          "text": "Fully functional without an internet connection (sync and AI features require internet)."
        }
      ],
      "showcase": [
        {
          "shot": 2,
          "caption": "Your categories, your way",
          "text": "Organize spending into categories and subcategories."
        },
        {
          "shot": 4,
          "caption": "Savings goals with a plan",
          "text": "See progress and the monthly savings needed to hit a target."
        }
      ],
      "useCases": {
        "title": "What you can use it for",
        "intro": "One app for the whole household budget: personal, shared with your partner or family, and everything in between.",
        "items": [
          "Shared budget tracker for couples and families",
          "Household and family budget planner",
          "Group expenses and shared wallet",
          "Monthly budget and cash-flow management",
          "Bill and spending tracker",
          "Savings goals",
          "Loan and debt tracking",
          "AI expense analysis and budget insights"
        ]
      },
      "closingHeading": "Take charge of your personal finances today with a budget tracker that respects your privacy.",
      "keywords": [
        "AI budget tracker",
        "AI expense tracker",
        "shared budget tracker",
        "expense tracker",
        "budget planner",
        "money manager",
        "personal finance",
        "shared expenses",
        "couple budget",
        "family budget",
        "group expenses",
        "bill tracker",
        "spending tracker",
        "savings goals",
        "loan tracker",
        "budget insights",
        "AI chatbot",
        "finance assistant",
        "expense analysis",
        "smart budgeting",
        "monthly budget",
        "cash flow",
        "budget management",
        "financial goals",
        "debt tracking",
        "shared wallet",
        "household budget"
      ],
      "schemaShots": 4
    },
    supportIntro:
      "If you are experiencing any issues with the app, need to request a refund, or want to suggest a new feature, please reach out!",
    faq: [
      ["Where is my financial data stored?", "On your device, in a local database. We do not keep it on our own servers. If you choose, you can back it up to your personal Google Drive."],
      ["Does the AI see my finances?", "Only if you opt in to the AI assistant. Your question and relevant budget context are sent to the AI provider to answer it, and are not retained by us."],
      ["Is it free?", "The app is free to download. Premium plans are optional and are billed by the App Store or Google Play."],
      ["How do I delete my data?", "Delete records or clear the database in the app settings, or remove the app. Backups in Google Drive are removed from your own Google account. See the privacy policy for the deletion request form."],
    ],
    supportFaq: [
      ["How do I request a refund?", "Refunds for purchases are handled by Apple or Google. Email us and we will help you with the request."],
      ["How do I back up my data?", "The app can back up your database to your own Google Drive and sync it to your own Google Sheets. Those files live in your Google account, so you can also remove them there."],
    ],
  },
  {
    slug: "one-on-one-tracker",
    name: "One On One Tracker",
    altNames: ["OneOnOneTracker"],
    status: "live",
    tagline: "Never lose track of a 1-on-1 again.",
    definition:
      "One On One Tracker is a meeting-history app for managers, mentors and professionals. It keeps meeting notes, contact profiles and follow-up action items together in one searchable place on your phone.",
    blurb:
      "Keep meeting summaries, relationship profiles and follow-ups together, and find any past conversation with smart search.",
    points: [
      "Centralized meeting logs for summaries and takeaways",
      "Relationship manager with a profile for each person",
      "Follow-up tracking with action items",
      "Smart search and filters, rich-text notes and optional Google Drive backup",
    ],
    facts: [
      ["Platforms", "iPhone (iOS 13 or later) and Android"],
      ["Price", "Free, with a one-time Lifetime Pro upgrade"],
      ["Category", "Productivity"],
      ["Sign-in", "Google or Apple"],
      ["Backup", "Optional Google Drive backup and sync (included in Pro)"],
      ["Age rating (App Store)", "4+"],
    ],
    category: "Productivity",
    schemaCategory: "BusinessApplication",
    os: "iOS, Android",
    free: true,
    stores: {
      apple: "https://apps.apple.com/us/app/one-on-one-tracker/id6760655255",
      play: "https://play.google.com/store/apps/details?id=com.mepandiyan.one_on_one_tracker",
    },
    hasTerms: true,
    hasPrivacy: true,
    privacyLangs: "", // the original policy has no language picker
    privacyTitle: "Privacy Policy for OneOnOneTracker",
    hasDelete: false,
    about: {
      seoTitle: "About One On One Tracker: 1-on-1 Meeting Notes and Follow-Ups",
      seoDescription:
        "Log 1-on-1 meetings, keep a profile for every contact and never miss a follow-up. Your notes stay on your device. Free, with a one-time Lifetime Pro.",
      eyebrow: "About One On One Tracker",
      fineprint: "Free to download \u00b7 one-time Lifetime Pro upgrade \u00b7 iPhone and Android",
      h1: "Master Your Professional Relationships with One on One Tracker",
      lead: [
        "Are you struggling to remember what was discussed in your last 1-on-1? Do important follow-up items fall through the cracks?",
        "One on One Tracker is the ultimate tool for managers, mentors, and professionals who want to build stronger, more organized relationships.",
      ],
      statement: "Whether you are leading a team or managing a growing professional network, our app helps you stay prepared, present, and proactive.",
      chips: ["Prepared", "Present", "Proactive"],
      featuresTitle: "Key Features",
      features: [
        { icon: "notes", title: "Centralized Meeting Logs", text: "Quickly record summaries, dates, and key takeaways for every interaction." },
        { icon: "users", title: "Intuitive Relationship Manager", text: "Keep a dedicated profile for every contact, including their role, team, and history." },
        { icon: "check", title: "Never Miss a Follow-Up", text: "Track pending action items and notes to ensure your commitments are always met." },
        { icon: "search", title: "Smart Search & Filters", text: "Find any past conversation in seconds with powerful keyword search and name filters." },
        { icon: "chart", title: "Data-Driven Dashboard", soon: true, text: 'Visualize your interaction volume and identify "dormant" connections that need your attention.' },
      ],
      showcase: [
        { shot: 1, caption: "Your people at a glance", text: "A profile for every contact, with when you last met." },
        { shot: 2, caption: "Meetings, search and follow-ups", text: "Filter by person, team or date, and see each follow-up." },
      ],
      privacyTitle: "Privacy & Security First",
      privacyIntro: "As a professional tool, we treat your data with the highest level of respect.",
      privacy: [
        { icon: "lock", title: "Private & Local", text: "Your meeting notes and contact details are stored locally on your device database." },
        { icon: "cloud", title: "Secure Cloud Backup", text: "Use your personal Google Drive account to create encrypted backups. We never see your data; it stays entirely within your own Google ecosystem." },
        { icon: "shield", title: "No Third-Party Sharing", text: "We do not sell or share your data with advertisers or third parties." },
      ],
      proTitle: "Upgrade to Pro (Lifetime Access)",
      proBadge: "One-time purchase. No subscriptions.",
      proIntro: "Get the most out of your professional tracking with a one-time purchase. No subscriptions, just results.",
      pro: [
        { icon: "sync", title: "Google Drive Sync", text: "Seamlessly backup and restore your data across devices." },
        { icon: "infinity", title: "Unlimited Records", text: "Log as many meetings and contacts as your career requires." },
        { icon: "heart", title: "Support Independent Development", text: "Help us continue building features that make your professional life easier." },
      ],
      closing: "Stop relying on memory or scattered spreadsheets. Download One on One Tracker today and turn your meetings into meaningful progress.",
    },
    supportIntro:
      "If you are experiencing any issues with the app, need to request a refund, or want to suggest a new feature, please reach out!",
    faq: [
      ["Where are my meeting notes stored?", "On your device. If you turn on Google Drive backup, a private backup file is kept in your own Google Drive."],
      ["What does the Google Drive backup access?", "Only a private app-data folder. The app cannot see any other files in your Google Drive."],
      ["Is there a subscription?", "No. The app is free, with an optional one-time Lifetime Pro purchase."],
      ["How do I delete my data?", "Delete records or clear local data in the app settings. To delete your account and data from our systems, use the request form in the privacy policy."],
    ],
    supportFaq: [
      ["How do I request a refund?", "Refunds for purchases are handled by Apple or Google. Email us and we will help you with the request."],
      ["I changed phones. How do I get my data back?", "If you turned on Google Drive backup, your backup file is in your own Google Drive. Email us if you need help restoring it."],
    ],
  },
  {
    slug: "smart-gate",
    name: "ANPR Smart Gate Tracker",
    altNames: ["Smart Gate", "Smart Gate - ANPR Security"],
    seoTitle: "ANPR Smart Gate Tracker: Offline apartment gate tracking",
    status: "live",
    tagline: "Offline gate and visitor tracking for apartments.",
    definition:
      "ANPR Smart Gate Tracker is an Android app for apartment communities that scans vehicle number plates at the gate and logs entries, exits and visitors. Plate reading runs on the device, and the app is built to work offline.",
    blurb:
      "Scan number plates at the gate, match them to residents and regular visitors, and keep a searchable entry and exit log for your community, mostly offline.",
    points: [
      "Camera number-plate scanning, with text recognition done on the phone",
      "Resident and visitor records with flat numbers and visit purpose",
      "Entry and exit logs with the operator's name for audits",
      "Admin, Operator and Viewer roles, Excel and CSV exports, optional Google Drive backup",
    ],
    facts: [
      ["Platform", "Android"],
      ["Built for", "Apartment associations, security staff and property managers"],
      ["Works offline", "Yes, primarily offline"],
      ["Sign-in", "Google (Firebase Authentication)"],
      ["Price", "See the Google Play listing"],
    ],
    category: "Business",
    schemaCategory: "BusinessApplication",
    os: "Android",
    free: null,
    stores: {
      apple: null,
      play: "https://play.google.com/store/apps/details?id=com.smartgate.anpr_gate_system",
    },
    androidOnly: true,
    hasTerms: true,
    hasPrivacy: true,
    privacyLangs: "en,ta,te,ml,kn,hi,mr,gu,bn,pa,ur",
    privacyTitle: "Privacy Policy for ANPR Smart Gate Tracker",
    hasDelete: false,
    about: {
      "seoTitle": "About ANPR Smart Gate Tracker: Apartment Gate Security App",
      "seoDescription": "Scan number plates offline, log entries and exits, and manage residents with Admin, Operator and Viewer roles. A gate security app for apartments.",
      "eyebrow": "About ANPR Smart Gate Tracker",
      "h1": "Secure, Simple Gate Management for Apartments and Gated Communities",
      "lead": [
        "Smart Gate - ANPR Security is a secure gate management app for apartments, gated communities, and residential campuses.",
        "The app helps security teams scan vehicle number plates, manage entry and exit records, and monitor gate activity with a simple and reliable workflow."
      ],
      "heroChips": [
        "Offline ANPR",
        "Role-based access",
        "Audit logs"
      ],
      "fineprint": "Android app · Also called Smart Gate - ANPR Security",
      "heroShots": [
        2,
        3
      ],
      "statement": "Smart Gate is designed to improve gate security, reduce manual errors, and speed up vehicle movement at community entrances.",
      "chips": [
        "Improve gate security",
        "Reduce manual errors",
        "Speed up vehicle movement"
      ],
      "featuresTitle": "Key Features",
      "features": [
        {
          "icon": "scan",
          "text": "Offline ANPR for fast number plate scanning"
        },
        {
          "icon": "clock",
          "text": "Entry and exit logging with timestamps"
        },
        {
          "icon": "users",
          "text": "Smart detection of existing residents"
        },
        {
          "icon": "lock",
          "text": "Role-based access for Admin, Operator, and Viewer"
        },
        {
          "icon": "notes",
          "text": "Audit logs for activity tracking"
        },
        {
          "icon": "cloud",
          "text": "Backup and restore with Google Drive"
        },
        {
          "icon": "sync",
          "text": "Secure cloud sync with Firebase"
        },
        {
          "icon": "check",
          "text": "Easy-to-use interface for gate operations"
        }
      ],
      "useCases": {
        "title": "Suitable for",
        "items": [
          "Apartment complexes",
          "Residential communities",
          "Private campuses",
          "Security teams and gate operators"
        ]
      },
      "closingHeading": "The app focuses on practical gate operations with secure access, clear records, and dependable performance.",
      "schemaShots": 3
    },
    supportIntro:
      "If you are experiencing any issues with the app, or want to suggest a new feature, please reach out!",
    faq: [
      ["Is number-plate scanning done in the cloud?", "No. Text recognition runs on the device, and the entry database is stored on the device."],
      ["Who is it for?", "Apartment communities: administrators, gate operators and viewers with different permissions."],
      ["Does it work without internet?", "Yes, the app is designed to work primarily offline. Internet is used for sign-in, licence checks and Google Drive backups."],
      ["How do I delete data?", "Community administrators can delete entries or clear the log in the app. See the privacy policy for the account deletion request form."],
    ],
    supportFaq: [
      ["How do I back up the gate database?", "If your community administrator has configured it, the app backs up to the administrator's Google Drive. Email us if you need help restoring a backup."],
      ["A visitor's plate is not recognised.", "Retake the scan in good light, or enter the vehicle number manually."],
    ],
  },
];
