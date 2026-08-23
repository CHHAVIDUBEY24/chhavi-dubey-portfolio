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
  <span class="text-gradient font-bold">about</span>       - Brief overview of background and career objective
  <span class="text-gradient font-bold">skills</span>      - List key programming languages, frameworks, and tools
  <span class="text-gradient font-bold">projects</span>    - View featured Java Spring Boot backend projects
  <span class="text-gradient font-bold">resume</span>      - Direct link to view and download Resume (PDF)
  <span class="text-gradient font-bold">curl</span>        - Execute endpoint requests (e.g., <span class="text-accent">curl /api/v1/profile</span>)
  <span class="text-gradient font-bold">contact</span>     - View direct contact information and social profiles
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
│ Tools & IDEs        │ Git, GitHub, IntelliJ IDEA, Eclipse, Maven, Postman   │
│ Core Competencies   │ DSA, OOP Principles, REST Architecture, DBMS           │
└─────────────────────┴────────────────────────────────────────────────────────┘
`,
    projects: `
<span class="text-accent">[FEATURED PROJECTS]</span>
1. <span class="text-gradient font-bold">Job Application Portal</span> (Aug 2025 – Dec 2025) | Spring Boot, JWT, MySQL
   - Role-based job management, paginated search APIs, JWT token security, centralized exception handling.
   - GitHub: <a href="https://github.com/CHHAVIDUBEY24/job-application-portal" target="_blank" style="color:#06b6d4">github.com/CHHAVIDUBEY24/job-application-portal</a>

2. <span class="text-gradient font-bold">Events Hub</span> (Aug 2025 – Nov 2025) | Spring Boot, Spring Security, MySQL
   - RESTful APIs for events, profiles, and HackFinder team matching engine with JPA/Hibernate.
   - GitHub: <a href="https://github.com/CHHAVIDUBEY24/college-events-hub" target="_blank" style="color:#06b6d4">github.com/CHHAVIDUBEY24/college-events-hub</a>

3. <span class="text-gradient font-bold">Money-Trex (Personal Finance Tracker)</span> | Angular, Spring Boot, MySQL
   - Income/expense categorization analytics & transaction tracking APIs.
   - GitHub: <a href="https://github.com/CHHAVIDUBEY24/Money-Trex.git" target="_blank" style="color:#06b6d4">github.com/CHHAVIDUBEY24/Money-Trex.git</a>
`,
    resume: `
<span class="text-accent">[RESUME DOWNLOAD]</span>
Direct PDF Link: <a href="Chhavi_Dubey_Resume.pdf" target="_blank" style="color:#06b6d4; text-decoration:underline;">Chhavi_Dubey_Resume.pdf</a>
`,
    contact: `
<span class="text-accent">[DIRECT CONTACT DETAILS]</span>
Email    : chhavidubey2224@gmail.com
Phone    : +91 9770261260
LinkedIn : linkedin.com/in/chhavi-dubey24/
GitHub   : github.com/CHHAVIDUBEY24
Resume   : Chhavi_Dubey_Resume.pdf
Location : Indore, Madhya Pradesh, India
`,
    date: () => `Current Date & Time: ${new Date().toString()}`
  };

  function executeCommand(cmdStr) {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    // Create prompt output line
    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';
    outputDiv.innerHTML = `<div class="terminal-prompt-line" style="margin-bottom:0.4rem;">
      <span class="prompt-symbol">chhavi@backend-dev:~$</span>
      <span style="color:#fff;">${escapeHtml(rawCmd)}</span>
    </div>`;

    const lowerCmd = rawCmd.toLowerCase();

    if (lowerCmd === 'clear') {
      // Clear terminal body except initial banner
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
    <span class="string-lit">"primaryStack"</span>: [<span class="string-lit">"Java"</span>, <span class="string-lit">"Spring Boot"</span>, <span class="string-lit">"MySQL"</span>, <span class="string-lit">"JUnit 5"</span>],
    <span class="string-lit">"openToWork"</span>: <span class="keyword">true</span>,
    <span class="string-lit">"nptelCertification"</span>: <span class="string-lit">"Elite + Silver Badge (Java)"</span>
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
