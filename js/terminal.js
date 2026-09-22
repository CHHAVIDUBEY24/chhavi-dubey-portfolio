/* ==========================================================================
   INTERACTIVE DEVELOPER CLI TERMINAL - CHHAVI DUBEY PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const suggestionBtns = document.querySelectorAll('.term-btn');

  if (!terminalInput || !terminalBody) return;

  const COMMANDS = {
    help: `
<span class="text-accent">Available Terminal Commands:</span>
  <span class="text-gradient font-bold">about</span>       - Brief overview of engineering background & objective
  <span class="text-gradient font-bold">skills</span>      - List key programming languages, frameworks, & tools
  <span class="text-gradient font-bold">projects</span>    - View featured Java Spring Boot backend systems
  <span class="text-gradient font-bold">awards</span>      - Hackathons, National Competitions & Honors (Kriyeta 4.0, Prayatna 2.0)
  <span class="text-gradient font-bold">resume</span>      - Direct link to view and download official Resume (PDF)
  <span class="text-gradient font-bold">curl</span>        - Execute live endpoint requests (e.g. <span class="text-accent">curl /api/v1/profile</span>)
  <span class="text-gradient font-bold">contact</span>     - View direct contact details & social profiles
  <span class="text-gradient font-bold">clear</span>       - Clear terminal screen output
  <span class="text-gradient font-bold">date</span>        - Display current system time
`,
    about: `
<span class="text-accent">[PROFILE OVERVIEW]</span>
Name        : Chhavi Dubey
Role        : Software Engineer | Java Backend Developer
Location    : Indore, MP, India
Education   : B.Tech CSE @ Acropolis Institute (CGPA: 8.13/10 | Nov 2022 - June 2026)
Objective   : Software Engineer with hands-on experience developing backend applications using Java, Spring Boot, Spring Security, JPA/Hibernate, REST APIs, and MySQL. Strong foundation in DSA, OOP, DBMS, and backend system development.
`,
    skills: `
<span class="text-accent">[TECHNICAL SKILLSET MATRIX]</span>
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ Category            │ Technologies & Tools                                   │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Languages           │ Java (Core/Adv), SQL, C++                              │
│ Backend Frameworks  │ Spring Boot, Spring Framework, Spring Security (JWT)   │
│ ORM & Persistence   │ Hibernate, JPA, JDBC, RESTful APIs                     │
│ Database            │ MySQL (Relational Schema Design & Indexing)            │
│ Testing             │ JUnit 5, Unit Testing                                  │
│ Developer Tools     │ Git, GitHub, IntelliJ IDEA, Eclipse, Maven, Postman   │
│ Core Competencies   │ DSA, OOP Principles, REST Architecture, DBMS           │
└─────────────────────┴────────────────────────────────────────────────────────┘
`,
    projects: `
<span class="text-accent">[FEATURED PROJECTS]</span>
1. <span class="text-gradient font-bold">LifeCompanion</span> (Sep 2026) | Spring Boot 3, Google Gemini AI, Docker, JPA
   - Mental wellbeing platform with empathetic AI companion, crisis guardrails, mood analytics, & grounding suite.
   - GitHub: <a href="https://github.com/CHHAVIDUBEY24/LifeCompanion" target="_blank" style="color:#06b6d4">github.com/CHHAVIDUBEY24/LifeCompanion</a>

2. <span class="text-gradient font-bold">Job Application Portal</span> (Aug 2025 – Dec 2025) | Spring Boot, JWT, MySQL
   - Role-based job management, paginated search APIs, JWT token security, centralized exception handling.
   - GitHub: <a href="https://github.com/CHHAVIDUBEY24/job-application-portal" target="_blank" style="color:#06b6d4">github.com/CHHAVIDUBEY24/job-application-portal</a>

3. <span class="text-gradient font-bold">Events Hub</span> (Aug 2025 – Nov 2025) | Spring Boot, Spring Security, MySQL
   - RESTful APIs for events, profiles, and HackFinder team matching engine with JPA/Hibernate.
   - GitHub: <a href="https://github.com/CHHAVIDUBEY24/college-events-hub" target="_blank" style="color:#06b6d4">github.com/CHHAVIDUBEY24/college-events-hub</a>

4. <span class="text-gradient font-bold">Money-Trex (Personal Finance Tracker)</span> | Angular, Spring Boot, MySQL
   - Income/expense categorization analytics & transaction tracking APIs.
   - GitHub: <a href="https://github.com/CHHAVIDUBEY24/Money-Trex.git" target="_blank" style="color:#06b6d4">github.com/CHHAVIDUBEY24/Money-Trex.git</a>
`,
    awards: `
<span class="text-accent">[HACKATHONS, HONORS & AWARDS]</span>
🏆 <span class="text-gradient font-bold">Kriyeta 4.0</span> (April 18-20, 2025)
   - Competed in 48-hour national-level hackathon at Acropolis Institute of Technology and Research (AITR), Indore.

⚡ <span class="text-gradient font-bold">Prayatna 2.0</span> (March 2025)
   - Participated in 36-hour national-level hackathon held at AITR.

🥇 <span class="text-gradient font-bold">1st Place Winner - World Entrepreneurship Day</span> (August 2023)
   - Secured 1st place in Poster Making Competition on World Entrepreneurship Day hosted by AITR.

🎖️ <span class="text-gradient font-bold">4th Place - Inter Department Art & Craft Competition</span> (2023)
   - Secured 4th place representing Computer Science & Engineering department.

🥈 <span class="text-gradient font-bold">Elite + Silver Badge - Programming in Java</span> (NPTEL, IIT Kharagpur)
`,
    hackathons: function () { return COMMANDS.awards; },
    resume: `
<span class="text-accent">[OFFICIAL RESUME DOWNLOAD]</span>
Direct PDF Link: <a href="Chhavi_Dubey_Resume.pdf?v=3.0" target="_blank" style="color:#06b6d4; text-decoration:underline;">Chhavi_Dubey_Resume.pdf</a>
Web Resume Page: <a href="resume.html" target="_blank" style="color:#06b6d4; text-decoration:underline;">resume.html</a>
`,
    contact: `
<span class="text-accent">[DIRECT CONTACT DETAILS]</span>
Email    : chhavidubey2224@gmail.com
Phone    : +91 9770261260
LinkedIn : linkedin.com/in/chhavi-dubey24/
GitHub   : github.com/CHHAVIDUBEY24
Location : Indore, Madhya Pradesh, India
`,
    date: () => `Current Date & Time: ${new Date().toString()}`
  };

  function executeCommand(cmdStr) {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';
    outputDiv.innerHTML = `<div class="terminal-prompt-line" style="margin-bottom:0.4rem;">
      <span class="prompt-symbol">chhavi@backend-dev:~$</span>
      <span style="color:#fff;">${escapeHtml(rawCmd)}</span>
    </div>`;

    const lowerCmd = rawCmd.toLowerCase();

    if (lowerCmd === 'clear') {
      const banner = document.getElementById('terminal-welcome');
      terminalBody.innerHTML = '';
      if (banner) terminalBody.appendChild(banner);
      terminalInput.value = '';
      return;
    }

    let response = '';

    if (lowerCmd.startsWith('curl')) {
      if (lowerCmd.includes('/api/v1/profile') || lowerCmd === 'curl') {
        response = `
<span class="text-accent">HTTP/1.1 200 OK</span>
<span class="text-muted">Content-Type: application/json</span>

{
  <span class="string-lit">"status"</span>: <span class="type-lit">"SUCCESS"</span>,
  <span class="string-lit">"developer"</span>: {
    <span class="string-lit">"name"</span>: <span class="string-lit">"Chhavi Dubey"</span>,
    <span class="string-lit">"title"</span>: <span class="string-lit">"Java Backend Developer"</span>,
    <span class="string-lit">"cgpa"</span>: <span class="string-lit">"8.13/10"</span>,
    <span class="string-lit">"primaryStack"</span>: [<span class="string-lit">"Java 17+"</span>, <span class="string-lit">"Spring Boot"</span>, <span class="string-lit">"MySQL"</span>, <span class="string-lit">"JWT"</span>, <span class="string-lit">"Maven"</span>],
    <span class="string-lit">"hackathons"</span>: [<span class="string-lit">"Kriyeta 4.0 (48h)"</span>, <span class="string-lit">"Prayatna 2.0 (36h)"</span>],
    <span class="string-lit">"openToWork"</span>: <span class="keyword">true</span>
  }
}`;
      } else {
        response = `<span style="color:#ef4444;">curl: (6) Could not resolve endpoint '${escapeHtml(rawCmd.replace('curl', '').trim())}'. Try: <span class="text-accent">curl /api/v1/profile</span></span>`;
      }
    } else if (COMMANDS[lowerCmd]) {
      response = typeof COMMANDS[lowerCmd] === 'function' ? COMMANDS[lowerCmd]() : COMMANDS[lowerCmd];
    } else {
      response = `<span style="color:#ef4444;">zsh: command not found: ${escapeHtml(rawCmd)}. Type <span class="text-accent">'help'</span> for available commands.</span>`;
    }

    const resDiv = document.createElement('div');
    resDiv.innerHTML = response;
    outputDiv.appendChild(resDiv);

    terminalBody.insertBefore(outputDiv, terminalInput.closest('.terminal-prompt-line'));
    terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
});
