// Summarized from Isaac's supplied resume. Update career content here.
export const resumeUrl =
  "assets/documents/Isaac_Santiago_Senior_Full_Stack_Developer_Resume.docx";
export const experience = [
  {
    company: "Tata Consultancy Services",
    dates: "September 2024 — September 2026",
    role: "Full Stack Developer · MetLife · Remote",
    details: [
      "Built the complete Payments Portal frontend in React and TypeScript, integrating Mercado Pago for card and cash payments and reducing processing time by approximately 80%.",
      "Independently implemented Java/Spring Boot security middleware with RSA/AES encryption, JWT session expiration and inactivity controls.",
      "Built a catalog management structure adopted across approximately 12 catalogs and a quoting API that reduced quote generation time by approximately 50%.",
      "Worked with DDD, JUnit, React Testing Library (approximately 90% frontend coverage), Azure Pipelines, Kubernetes and security analysis.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "SQL Server",
      "Azure DevOps",
      "Kubernetes",
    ],
  },
  {
    company: "QuarkSoft",
    dates: "October 2022 — September 2024",
    role: "Full Stack Developer · Monte de Piedad",
    details: [
      "Developed Node.js/Express REST APIs, React components and business validations for Digital Account, with asynchronous communication through RabbitMQ.",
      "Reengineered the Non-Exhibition Certificate using SOLID principles, reducing code complexity by 30% according to SonarQube metrics.",
      "Implemented STP bank-transfer payments, backend and frontend tests, and code reviews.",
    ],
    stack: [
      "Node.js",
      "Express",
      "React",
      "RabbitMQ",
      "MongoDB",
      "Elasticsearch",
      "Jest",
    ],
  },
  {
    company: "Sye Software",
    dates: "June 2018 — October 2022",
    role: "Full Stack Developer · SAT · Three-month Tech Lead assignment",
    details: [
      "Modernized the customs transit arrival workflow with AngularJS, Java and Spring Boot, reducing vehicle entry and exit processing time by 30%.",
      "Developed a customs operator REST API that reduced integration time by 40% compared with database and FTP integrations.",
      "Implemented AWS S3 attachment storage for the Tax Mailbox and provided end-to-end production support.",
      "Coordinated developers, task assignments, code reviews and technical decisions during an approximately three-month Tech Lead assignment.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "AngularJS",
      "AWS S3",
      "Oracle",
      "Jenkins",
      "WebLogic",
    ],
  },
  {
    company: "Softtek",
    dates: "March 2017 — May 2018",
    role: "Full Stack Developer · SAT",
    details: [
      "Contributed to Phase 2 of Customs Inspection with AngularJS and Java/Spring. Both modernization phases together reduced inspection processing time by 70%.",
      "Built a consecutive document identifier generator with PrimeFaces, Java and Spring while maintaining compatibility with legacy systems.",
      "Provided production support and maintained quality with JUnit, SonarQube and Jenkins.",
    ],
    stack: ["Java", "Spring", "AngularJS", "PrimeFaces", "Oracle", "JUnit"],
  },
  {
    company: "Hewlett Packard Enterprise",
    dates: "December 2016 — March 2017",
    role: "Junior Developer · SAT · Project team transferred to Softtek",
    details: [
      "Developed AngularJS views for Phase 1 of Customs Inspection, establishing the foundation for the two-phase modernization.",
      "Built document searches and reports with PrimeFaces and Java, alongside production support and testing.",
    ],
    stack: ["Java", "AngularJS", "PrimeFaces", "MySQL", "WebLogic", "SVN"],
  },
];
export const skills = [
  [
    "Languages",
    "Java, JavaScript, TypeScript, SQL. Python for personal projects.",
  ],
  [
    "Backend",
    "Spring Boot, Spring Framework, Node.js, Express.js, Spring Data JPA, Hibernate, REST, SOAP and microservices.",
  ],
  ["Frontend", "React, AngularJS, PrimeFaces, HTML and CSS."],
  [
    "Architecture",
    "Domain-Driven Design, SOLID, JWT, RSA/AES encryption and API security.",
  ],
  ["Data", "SQL Server, Oracle, MySQL, Informix, MongoDB and Elasticsearch."],
  [
    "Cloud / DevOps",
    "AWS S3, Azure Repos, Azure Pipelines, Kubernetes, Jenkins, CI/CD, WebLogic, Git, Bitbucket and SVN.",
  ],
  [
    "Quality",
    "JUnit, Mocha, Chai, Jest, React Testing Library, SonarQube, OWASP Dependency-Check and ESLint.",
  ],
  [
    "Tools",
    "Maven, Gradle, Webpack and GitHub Copilot, with validation of generated results.",
  ],
];
export const projects = [
  {
    name: "Payments Portal",
    client: "MetLife · TCS",
    result: "≈80% less payment processing time",
    description:
      "Complete React and TypeScript frontend flow with Mercado Pago integration for card and cash payments.",
    stack: ["React", "TypeScript", "Mercado Pago"],
  },
  {
    name: "Insurance Quoting API",
    client: "MetLife · TCS",
    result: "≈50% less quote generation time",
    description:
      "REST API for insurance quotes and refactoring of business logic toward a Domain-Driven Design architecture.",
    stack: ["Java", "Spring Boot", "REST", "DDD"],
  },
  {
    name: "Digital Account",
    client: "Monte de Piedad · QuarkSoft",
    result: "Customer registration and bank-transfer payments",
    description:
      "APIs and React components within a microservices architecture, asynchronous RabbitMQ messaging and STP payment integration.",
    stack: ["Node.js", "Express", "React", "RabbitMQ"],
  },
  {
    name: "Customs Transit Arrivals",
    client: "SAT · Sye Software",
    result: "30% less vehicle entry and exit processing time",
    description:
      "Modernized customs vehicle workflows with AngularJS, Java, Spring and Spring Boot.",
    stack: ["AngularJS", "Java", "Spring Boot"],
  },
  {
    name: "Customs Inspection",
    client: "SAT · HPE / Softtek",
    result: "70% less inspection time across both phases",
    description:
      "Frontend and backend contributions to an automated merchandise evaluation workflow. The result reflects the combined work of both modernization phases.",
    stack: ["AngularJS", "Java", "Spring"],
  },
];
