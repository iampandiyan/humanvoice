// Guide pages (how-to articles). Each guide answers one real question and points to the app that helps.
// Facts about the apps must match tools/products.mjs and the privacy policies. Edit here, then run `node tools/build.mjs`.
// Fields: slug, app (product slug), h1, seoTitle (<=60), description (120-155), answer (short direct answer),
//         steps { name, items[] } (optional HowTo), sections [{ h, html }], faq [[q, a]], updated (YYYY-MM-DD)

export const GUIDES = [
  {
    slug: "family-budget-guide",
    app: "shared-ai-budget-tracker",
    h1: "How to build a family budget you can stick to",
    seoTitle: "How to Build a Family Budget You Can Stick To",
    description: "A simple 5-step way to build a family budget: list income, cover essentials, set category limits, track spending and review monthly.",
    answer:
      "A family budget works when it is simple: add up your monthly income, cover essentials first, give every other category a limit, record each expense as it happens, and review the numbers once a month.",
    updated: "2026-09-24",
    steps: {
      name: "Build a family budget in 5 steps",
      items: [
        "List your monthly income, including every earner in the household.",
        "Write down fixed essentials first: rent or EMI, utilities, groceries, insurance and school fees.",
        "Give each remaining category (eating out, travel, fun, savings) a monthly limit that fits what is left.",
        "Record every expense the same day, so small purchases do not disappear.",
        "Review once a month: compare spending with each limit, then adjust next month's limits.",
      ],
    },
    sections: [
      {
        h: "A simple rule of thumb",
        html: "<p>Many households start with the 50/30/20 rule: about half of income for needs, about 30% for wants and about 20% for savings and debt repayment. It is only a starting point. Change the split to match your city, family size and goals.</p>",
      },
      {
        h: "Where a budget app helps",
        html: "<p><a href=\"../shared-ai-budget-tracker/\">Shared AI Budget Tracker</a> (also called Family Budget) lets you log expenses and income, set custom budgets per category, track savings goals and follow loan repayments with an amortization schedule. It works offline, and your data stays in a local database on your phone.</p><p>If you want extra help, you can opt in to the AI assistant to ask questions about your spending. You can also back up to your own Google Drive and sync transactions to your own Google Sheets. See the <a href=\"../shared-ai-budget-tracker/privacy.html\">privacy policy</a> for exactly what is shared and when.</p>",
      },
      {
        h: "Habits that make budgets last",
        html: "<ul><li>Keep the categories few (8 to 12 is plenty).</li><li>Track loans and EMIs as fixed lines, so they are never a surprise.</li><li>Set a savings goal with a target amount, and pay it first.</li><li>Treat a busted limit as information, not failure: change the limit or the habit.</li></ul>",
      },
    ],
    faq: [
      ["How much of my income should I save?", "A common starting point is about 20%, but any regular amount is better than none. Begin with what you can keep up and raise it over time."],
      ["Is my budget data private in this app?", "Yes. Expenses, budgets, goals and loans are stored on your device, and we do not keep them on our own servers. AI insights and Google Drive backup are optional."],
      ["Does the app work without internet?", "Yes. Tracking works offline. Only the optional AI assistant and Google backup or sync need a connection."],
    ],
  },
  {
    slug: "one-on-one-meeting-notes",
    app: "one-on-one-tracker",
    h1: "How to run and document a 1-on-1 meeting",
    seoTitle: "How to Run and Document a 1-on-1 Meeting",
    description: "Prepare, listen, capture decisions and follow up: a practical way to run 1-on-1 meetings and keep useful notes on every person.",
    answer:
      "A good 1-on-1 has a light agenda, mostly listening, and written notes that end with clear action items, each with an owner and a date. Open the next meeting by reviewing those items.",
    updated: "2026-09-24",
    steps: {
      name: "Run a 1-on-1 in 5 steps",
      items: [
        "Before the meeting, read your last notes and any open follow-ups.",
        "Agree a short agenda: the other person's topics first, then yours.",
        "Listen more than you talk, and ask open questions.",
        "Write down decisions and action items, each with an owner and a due date.",
        "Start the next meeting by checking whether those follow-ups are done.",
      ],
    },
    sections: [
      {
        h: "What to write down",
        html: "<ul><li>The date and who attended.</li><li>Key takeaways in two or three lines.</li><li>Decisions made and the reason for them.</li><li>Follow-ups with owner and date.</li><li>Personal context worth remembering, such as goals or concerns the person shared.</li></ul>",
      },
      {
        h: "Where a tracker helps",
        html: "<p><a href=\"../one-on-one-tracker/\">One On One Tracker</a> keeps meeting logs, a profile for every contact (role, team and history) and pending follow-ups in one searchable place. Keyword search and name filters help you find any past conversation. Notes are stored on your device, and the optional Google Drive backup uses only a private app-data folder. It is free, with a one-time Lifetime Pro upgrade and no subscription.</p>",
      },
      {
        h: "Common mistakes",
        html: "<ul><li>Skipping meetings when things are busy, which is when they matter most.</li><li>Taking notes but never reviewing them.</li><li>Recording tasks without an owner or a date.</li></ul>",
      },
    ],
    faq: [
      ["How long should a 1-on-1 be?", "Many managers use 30 minutes weekly or every two weeks. The right length is the one you will keep consistently."],
      ["Where are my meeting notes stored?", "On your device. If you turn on Google Drive backup, a private backup file is kept in your own Google Drive."],
      ["Is there a subscription?", "No. The app is free, with an optional one-time Lifetime Pro purchase."],
    ],
  },
  {
    slug: "kids-video-screen-time-limits",
    app: "safeplay-video-player",
    h1: "How to set screen-time limits for your child's videos",
    seoTitle: "How to Set Screen-Time Limits for Kids' Videos",
    description: "Set healthy video limits for your child: decide the limit, curate what they watch, lock parent settings and use kiosk mode.",
    answer:
      "Decide a daily limit that suits your child's age, choose the videos in advance, and use an app that enforces the limit and locks settings behind a parent PIN, so the rules do not depend on nagging.",
    updated: "2026-09-24",
    steps: {
      name: "Set video limits in 5 steps",
      items: [
        "Decide a daily video limit that fits your child's age and your household routine.",
        "Create a separate profile for each child, so each has their own limit.",
        "Add only the videos you have approved, and sort them into groups such as Cartoons, Learning and Bedtime.",
        "Set the screen-time limit for the profile and lock parent settings with a PIN or biometrics.",
        "Turn on kiosk mode for younger children, and check the Parent Dashboard to see what was watched and for how long.",
      ],
    },
    sections: [
      {
        h: "How SafePlay Video Player does it",
        html: "<p><a href=\"../safeplay-video-player/\">SafePlay Video Player</a> (called Kids Safe Video Player on Android) is a free, offline, parent-controlled video player. You add your own video files, or specific YouTube videos, and your child only sees what you approved. Each profile has its own screen-time limit with an on-screen countdown, and all parent settings sit behind a PIN or biometric lock.</p><p>There are no ads, no third-party trackers and no account. Profiles, video lists and watch history stay on your device. Videos saved on the device play offline; YouTube videos you add need an internet connection.</p>",
      },
      {
        h: "Tips for smoother screen time",
        html: "<ul><li>Explain the limit before you set it, so the countdown is not a surprise.</li><li>Keep a fixed offline video list for car trips and flights.</li><li>Choose calmer content for bedtime and put it in its own group.</li></ul>",
      },
    ],
    faq: [
      ["Does the app show ads?", "No. The app has no ads and no third-party trackers."],
      ["Does it need an internet connection?", "Not for videos stored on your device. Internet is used only to stream YouTube videos a parent has added, and for optional purchases."],
      ["Does it collect my child's data?", "There is no account and no company server. Profiles, settings and watch history stay on your device."],
    ],
  },
  {
    slug: "apartment-gate-vehicle-logging",
    app: "smart-gate",
    h1: "How apartment gate vehicle logging works",
    seoTitle: "How Apartment Gate Vehicle Logging Works",
    description: "How an apartment community can log vehicles at the gate: register residents, scan number plates, record visitors and keep audit logs.",
    answer:
      "Register resident vehicles once, then have the guard scan each number plate at the gate. Known vehicles match instantly, unknown ones are logged as visitors, and every entry and exit is recorded with the operator's name.",
    updated: "2026-09-24",
    steps: {
      name: "Set up gate vehicle logging in 5 steps",
      items: [
        "Add residents with their flat numbers and vehicle numbers.",
        "Give each staff member a role: Admin, Operator or Viewer, and keep Admin for trusted staff only.",
        "At the gate, the operator scans the vehicle's number plate with the phone camera.",
        "If the plate matches a resident or regular visitor, log the entry. If not, record the visitor's flat number and purpose of visit.",
        "Review the entry and exit log when needed, and export it to Excel or CSV for the association.",
      ],
    },
    sections: [
      {
        h: "How ANPR Smart Gate Tracker does it",
        html: "<p><a href=\"../smart-gate/\">ANPR Smart Gate Tracker</a> is an Android app for apartment communities. Number-plate text recognition runs on the phone, and the app is built to work mainly offline. It keeps resident and visitor records, a searchable entry and exit log with the operator's name for audits, Admin, Operator and Viewer roles, Excel and CSV exports, and optional backup to the admin's Google Drive.</p>",
      },
      {
        h: "Good practice for communities",
        html: "<ul><li>Tell residents and visitors that vehicle numbers are recorded at the gate.</li><li>Give only trusted staff the Admin role.</li><li>Back up regularly, and delete records you no longer need.</li></ul><p>The app stores data on the device. Read the <a href=\"../smart-gate/privacy.html\">privacy policy</a> for details on what is collected.</p>",
      },
    ],
    faq: [
      ["Does it work without internet?", "Yes, it is designed to work primarily offline. Internet is needed for Google sign-in, license checks and Google Drive backups."],
      ["Is it available on iPhone?", "No. ANPR Smart Gate Tracker is an Android app."],
      ["Can different staff have different access?", "Yes. The app has Admin, Operator and Viewer roles, so you can control what each person does within the same community."],
    ],
  },
  {
    slug: "family-location-sharing-privacy",
    app: "where-is-my-people",
    h1: "Family location sharing: a privacy checklist",
    seoTitle: "Family Location Sharing: A Privacy Checklist",
    description: "Before you share your location with family, check who can see it, what is stored, how to delete it and whether the app sells data.",
    answer:
      "Before using any family location app, check who can see your location, what the company stores, whether it shows ads or sells data, and whether you can delete your account and data yourself.",
    updated: "2026-09-24",
    steps: {
      name: "Check a family location app in 5 steps",
      items: [
        "Find out exactly who can see your location and how someone is added to the group.",
        "Read what the app stores about you and for how long.",
        "Check that the app does not show ads or sell your data.",
        "Make sure you can export and delete your data from inside the app.",
        "Review the phone permissions and battery settings the app needs to work reliably.",
      ],
    },
    sections: [
      {
        h: "What we are building",
        html: "<p><a href=\"../where-is-my-people/\">Where is my people</a> is a family location-sharing app for iPhone and Android that is coming soon. Family members see each other on a live map with battery level and place badges such as Home, Work and School. Location is shared only inside your family, and there are no ads and no data sales. You can export your data or delete your account inside the app. Read the <a href=\"../where-is-my-people/privacy.html\">privacy policy</a> for the full details.</p>",
      },
      {
        h: "Talk to your family first",
        html: "<p>Location sharing works best when everyone agrees. Explain why you are sharing it, decide together who is in the family, and respect requests to leave.</p>",
      },
    ],
    faq: [
      ["Who can see my location in Where is my people?", "Only the active members of your own family. Nobody else can see it, and we do not show ads or sell data."],
      ["Can I delete my account and data?", "Yes. Open the app, go to Settings and choose Delete account. You can also use the account deletion page on this site."],
      ["Is the app available yet?", "Not yet. It is coming to the App Store and Google Play, and this site will link to both when it is released."],
    ],
  },
];
