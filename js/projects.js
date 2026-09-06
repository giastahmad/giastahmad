(function () {
  const PROJECTS = [
    {
      id: 'lamiah-analytics',
      eyebrow: 'PROJECT 01 — DATA ENGINEERING & ML',
      title: 'Lamiah Analytics',
      period: 'Mar 2026 — Jun 2026',
      org: 'Universitas Padjadjaran',
      summary:
        'End-to-end analytics system unifying Shopee, Tokopedia & TikTok Shop into a demand-forecasting dashboard.',
      images: ['assets/projects/lamiah-1.jpg', 'assets/projects/lamiah-2.jpg'],
      stack: ['MySQL', 'Python', 'Pandas', 'RapidFuzz', 'LightGBM', 'SQLAlchemy', 'Flask'],
      overview:
        'An end-to-end data analytics system integrating multi-channel e-commerce data, transforming it into a data warehouse, forecasting demand with machine learning, and delivering interactive analytics through a dashboard.',
      description:
        '• Designed and implemented a fact-constellation data warehouse in MySQL, consolidating multi-channel sales data from Shopee, Tokopedia, and TikTok Shop into unified fact and dimension tables.\n' +
        '• Built an ETL pipeline in Python and Pandas to standardize inconsistent exports across three platforms, using RapidFuzz for fuzzy location matching and rule-based normalization for SKU, color, and size attributes.\n' +
        '• Developed a daily demand-forecasting model with LightGBM, using lag and rolling-window features for cross-platform sales forecasting.\n' +
        '• Implemented a champion-challenger retraining workflow with time-series cross-validation and GridSearchCV, so only better-performing models replace production.\n' +
        '• Designed an interactive dashboard with 10+ dynamic filters — date range, platform, product attributes, location, price, order status — powered by parameterized SQLAlchemy queries.',
      links: [],
    },
    {
      id: 'kangbuah',
      eyebrow: 'PROJECT 02 — BACKEND ENGINEERING',
      title: 'KangBuah',
      period: 'Aug 2025 — Dec 2025',
      org: 'Universitas Padjadjaran',
      summary:
        'Backend infrastructure for a B2B platform optimizing supply chain operations with role-based order management.',
      images: ['assets/projects/kangbuah-1.png'],
      stack: ['Supabase', 'PostgreSQL', 'REST API', 'RBAC', 'Firebase Auth', 'Postman'],
      overview:
        'Backend infrastructure for a web-based B2B platform designed to optimize supply chain operations through integrated order management and real-time business analytics.',
      description:
        '• Architected and deployed a scalable relational database using Supabase, establishing a secure, centralized data foundation for supply chain operations.\n' +
        '• Developed RESTful APIs implementing Role-Based Access Control, with dynamic filtering to tailor endpoint responses and data visibility for Admin and Customer privileges.\n' +
        '• Streamlined onboarding and access by integrating Google Firebase Authentication for a secure, frictionless login experience.\n' +
        '• Conducted pre-deployment API validation with Postman, guaranteeing seamless frontend integration, reliable data retrieval, and system stability.',
      links: [{ label: 'GitHub', url: 'https://github.com/giastahmad/backend-kangbuah' }],
    },
    {
      id: 'crypto-dw',
      eyebrow: 'PROJECT 03 — DATA WAREHOUSING',
      title: 'Cryptocurrency Historical Prices Data Warehouse',
      period: 'Apr 2025 — Jun 2025',
      org: 'Universitas Padjadjaran',
      summary:
        'Star-schema data warehouse and SSIS ETL pipeline surfacing crypto market trends through Power BI.',
      images: ['assets/projects/crypto-dw-1.png'],
      stack: ['SQL Server', 'SSIS', 'T-SQL', 'Power BI'],
      overview:
        'A data warehouse solution to centralize and analyze historical cryptocurrency market data — a star schema in SQL Server, a full ETL pipeline built with SSIS, and an interactive Power BI dashboard to uncover market trends and insights.',
      description:
        '• Designed and built the data warehouse star schema with 5 dimension tables in SQL Server Management Studio.\n' +
        '• Developed the entire end-to-end ETL pipeline using SQL Server Integration Services (SSIS).\n' +
        '• Implemented data cleansing, transformation logic, and custom metric calculations (RSI, Moving Average) within the SSIS data flow tasks.\n' +
        '• Orchestrated the ETL control flow so dimension tables loaded before the fact table, maintaining data integrity.',
      links: [{ label: 'GitHub', url: 'https://github.com/giastahmad/crypto-dw-historical-prices' }],
    },
    {
      id: 'churn',
      eyebrow: 'PROJECT 04 — DATA SCIENCE',
      title: 'Customer Churn Analysis & Prediction',
      period: 'Jun 2025',
      org: null,
      summary:
        'ANN-based churn prediction on telecom customer data, paired with an executive Power BI dashboard.',
      images: ['assets/projects/churn-1.gif'],
      stack: ['Python', 'SMOTE', 'Keras', 'KerasTuner', 'Power BI'],
      overview:
        'Analyzes customer behavior and predicts churn likelihood using data science and machine learning on telecommunications customer data — delivering a predictive model and an interactive Power BI dashboard for business teams.',
      description:
        '• Conducted data cleaning and EDA to surface relevant business insights.\n' +
        '• Performed feature engineering — cost ratio, customer loyalty categories, number of active services.\n' +
        '• Addressed data imbalance using the SMOTE method.\n' +
        '• Developed an Artificial Neural Network with Keras and tuned hyperparameters using KerasTuner.\n' +
        '• Designed an interactive Power BI dashboard to convey EDA and model insights to non-technical audiences.',
      links: [{ label: 'GitHub', url: 'https://github.com/giastahmad/telco-churn-data-science-project' }],
    },
    {
      id: 'ruangilmu',
      eyebrow: 'PROJECT 05 — FULL-STACK · TEAM LEAD',
      title: 'RuangIlmu',
      period: 'Apr 2025 — Jun 2025',
      org: 'Universitas Padjadjaran',
      summary:
        'Interactive learning platform helping grade 4–6 students learn Mathematics, aligned with SDG 4.',
      images: ['assets/projects/ruangilmu-1.png', 'assets/projects/ruangilmu-2.png'],
      stack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Figma', 'Postman'],
      overview:
        'An interactive web-based learning platform for elementary school students (grades 4–6) learning Mathematics — built to make learning more engaging, in line with SDG 4 (quality education). Features include interactive modules, a progress-tracking dashboard, sentiment analysis, and quizzes.',
      description:
        'As Team Lead, oversaw the full development lifecycle from planning to final evaluation.\n\n' +
        '• Led and coordinated the team\u2019s workflow to keep project milestones on schedule.\n' +
        '• Spearheaded QA — Blackbox and Whitebox testing, plus Usability Testing using the System Usability Scale (SUS) method.\n' +
        '• Developed the majority of the frontend\u2019s API integration, fetching data from backend services into the UI.',
      links: [
        { label: 'GitHub', url: 'https://github.com/giastahmad/frontend-ruangilmu' },
        { label: 'Live Site', url: 'https://frontend-ruangilmu.vercel.app/' },
      ],
    },
    {
      id: 'herehear',
      eyebrow: 'PROJECT 06 — MOBILE · MENTAL HEALTH',
      title: 'HereHear',
      period: 'Nov 2024 — Jan 2025',
      org: 'Bangkit Academy (Google, Tokopedia, Gojek & Traveloka)',
      summary:
        'A safe-space journaling app with suicidal-tendency detection, connecting at-risk users to recovery resources.',
      images: ['assets/projects/herehear-1.jpg', 'assets/projects/herehear-2.jpg'],
      stack: ['Android', 'Kotlin', 'REST API', 'ML Model Integration'],
      overview:
        'A mental wellness app providing a safe space for users to express their feelings through journal entries. Integrates a suicidal-tendency detection feature and surfaces resources for support — encouraging disclosure in a low-risk environment to help at-risk individuals seek timely help.',
      description:
        '• Collaborated on initial design and planning — defining the project\u2019s theme, core features, and application layout.\n' +
        '• Finalized design mockups and implemented the UI for key pages such as Profile and Archive.\n' +
        '• Engineered the core journaling feature with full CRUD, plus data search and date filtering.\n' +
        '• Handled API configuration for the predictive model.',
      links: [{ label: 'GitHub', url: 'https://github.com/C242-PS169-Capstone/MD-Repository' }],
    },
    {
      id: 'anxiety-evaluator',
      eyebrow: 'PROJECT 07 — ML · WEB APP',
      title: 'Anxiety Evaluator',
      period: 'Nov 2024 — Dec 2024 · revamped 2026',
      org: 'Universitas Padjadjaran',
      summary:
        'DASS-42 based anxiety assessment that pinpoints root-cause triggers and generates AI coping suggestions.',
      images: ['assets/projects/anxiety-1.png', 'assets/projects/anxiety-2.png'],
      stack: ['Python', 'LightGBM', 'Gemini 2.5 Flash API', 'Streamlit'],
      overview:
        'A web app that helps users assess their anxiety levels and identify the primary root causes of their stress, using the clinical DASS-42 questionnaire alongside a machine learning model that flags triggers like work, finances, or lifestyle, then offers personalized coping suggestions.',
      description:
        'Started in 2024 and revamped in 2026 to improve the tech stack and predictive performance.\n\n' +
        '• Cleaned and prepared a Kaggle mental health dataset for model training.\n' +
        '• Designed custom algorithms translating raw lifestyle, financial, and workplace data into actionable composite scores.\n' +
        '• Trained a LightGBM model (~90% accuracy) to predict primary anxiety triggers.\n' +
        '• Integrated the Gemini 2.5 Flash API to generate coping suggestions from ML and DASS-42 results.',
      links: [
        { label: 'GitHub', url: 'https://github.com/giastahmad/DSS-Anxiety-Evaluator' },
        { label: 'Live App', url: 'https://anxiety-evaluator.streamlit.app/' },
      ],
    },
    {
      id: 'so-release',
      eyebrow: 'PROJECT 08 — PROCESS AUTOMATION',
      title: 'SO Release Automation',
      period: 'Oct 2025 — Dec 2025',
      org: 'Danone Indonesia',
      summary:
        'Enterprise finance automation that cut Sales Order release processing from ~4 hours to under 25 minutes.',
      images: ['assets/projects/so-release-1.png', 'assets/projects/so-release-2.png'],
      stack: ['VBA', 'SAP GUI Scripting', 'Excel', 'Outlook Automation'],
      overview:
        'An enterprise-grade finance automation solution streamlining Sales Order release operations — reducing manual processing effort while improving operational accuracy and reporting reliability.',
      description:
        '• Designed an end-to-end automation workflow using VBA and SAP GUI Scripting to automate SAP data extraction, credit validation, and release decisions.\n' +
        '• Implemented automated business rules for overdue invoice evaluation, customer credit assessment, and order eligibility verification.\n' +
        '• Integrated automated Outlook reporting and exception handling to improve operational visibility and stakeholder communication.\n' +
        '• Conducted structured testing and validation for production stability, cutting daily processing time from ~4 hours to under 25 minutes.',
      links: [],
    },
    {
      id: 'hse-inspection',
      eyebrow: 'PROJECT 09 — LOW-CODE · WORKFLOW',
      title: 'HSE Inspection Management System',
      period: 'Jul 2026 — Aug 2026',
      org: 'ParagonCorp',
      summary:
        'A Power Apps inspection platform digitizing HSE workflows with real-time Power BI compliance monitoring.',
      images: ['assets/projects/hse-1.jpeg', 'assets/projects/hse-2.jpeg'],
      stack: ['Power Apps', 'Microsoft Lists', 'Power BI'],
      overview:
        'A digital inspection management solution modernizing Health, Safety, and Environment (HSE) inspection processes through workflow automation, centralized data collection, and real-time compliance monitoring.',
      description:
        '• Architected a Power Apps application integrated with Microsoft Lists, establishing a centralized platform for inspection execution and record management.\n' +
        '• Automated field inspection workflows by digitizing data collection, reducing manual paperwork and improving reporting efficiency.\n' +
        '• Implemented validation logic and structured data controls to ensure inspection data quality and compliance.\n' +
        '• Enabled real-time monitoring by integrating inspection data into Power BI dashboards for HSE stakeholders.\n' +
        '• Partnered with end users and business stakeholders throughout development, ensuring adoption and alignment with operational requirements.',
      links: [],
    },
  ];

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function buildCard(project, index, total) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'project-card';
    card.setAttribute('data-project-card', '');
    card.setAttribute('aria-haspopup', 'dialog');

    const thumb = project.images && project.images[0];

    card.innerHTML = `
      <span class="project-card__media">
        <span class="project-card__index">${pad(index + 1)} / ${pad(total)}</span>
        ${thumb ? `<img src="${thumb}" alt="" loading="lazy" />` : ''}
      </span>
      <span class="project-card__body">
        <span class="project-card__period">${project.period}${project.org ? ' · ' + project.org : ''}</span>
        <span class="project-card__title">${project.title}</span>
        <span class="project-card__summary">${project.summary}</span>
        <span class="project-card__tags">
          ${project.stack
            .slice(0, 4)
            .map((t) => `<span class="project-card__tag">${t}</span>`)
            .join('')}
        </span>
        <span class="project-card__cta">View details</span>
      </span>
    `;

    card.addEventListener('click', () => {
      if (!window.ProjectModal) return;
      window.ProjectModal.open({
        eyebrow: project.eyebrow,
        title: project.title,
        meta: `${project.period}${project.org ? ' · ' + project.org : ''}`,
        images: project.images,
        overview: project.overview,
        stack: project.stack,
        description: project.description,
        links: project.links,
      });
    });

    return card;
  }

  function init() {
    const catalog = document.querySelector('[data-project-catalog]');
    if (!catalog) return;

    const countEl = document.querySelector('[data-project-count]');
    if (countEl) countEl.textContent = pad(PROJECTS.length);

    const frag = document.createDocumentFragment();
    PROJECTS.forEach((project, i) => {
      frag.appendChild(buildCard(project, i, PROJECTS.length));
    });
    catalog.appendChild(frag);

    const moreBtn = document.createElement('button');
    moreBtn.type = 'button';
    moreBtn.className = 'project-more-btn';
    moreBtn.id = 'projectSeeAll';
    moreBtn.innerHTML =
      '<span>See All Projects</span>' +
      '<svg class="project-more-btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5l5 5 5-5"/></svg>';
    moreBtn.addEventListener('click', () => {
      catalog.setAttribute('data-expanded', 'true');
      moreBtn.remove();
      if (typeof gsap !== 'undefined') {
        gsap.to(catalog.querySelectorAll('.project-card'), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.05,
        });
      }
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
    catalog.insertAdjacentElement('afterend', moreBtn);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cards = catalog.querySelectorAll('.project-card');
      if (!prefersReducedMotion && cards.length) {
        gsap.set(cards, { opacity: 0, y: 28 });
        ScrollTrigger.batch(cards, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.08,
            }),
        });
      } else {
        gsap.set(cards, { opacity: 1, y: 0 });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.PROJECTS = PROJECTS;
})();