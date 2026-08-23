/* ==========================================================================
   INTERACTIVE SPRING BOOT REST API SIMULATOR - CHHAVI DUBEY PORTFOLIO
   Live interactive endpoint sandbox testing for recruiters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const endpointSelector = document.getElementById('api-endpoint-select');
  const runBtn = document.getElementById('api-run-btn');
  const httpMethodBadge = document.getElementById('api-method-badge');
  const endpointUrlDisplay = document.getElementById('api-url-display');
  const statusBadge = document.getElementById('api-status-badge');
  const latencyBadge = document.getElementById('api-latency-badge');
  const responseBody = document.getElementById('api-response-body');
  const requestBodyWrap = document.getElementById('api-request-wrap');
  const requestBodyCode = document.getElementById('api-request-body');

  if (!endpointSelector || !runBtn || !responseBody) return;

  const ENDPOINTS = {
    'job-search': {
      method: 'GET',
      url: '/api/v1/jobs/search?query=Java+Backend&location=Indore&page=0&size=5',
      requestBody: null,
      response: {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'x-ratelimit-remaining': '98',
          'x-content-type-options': 'nosniff'
        },
        data: {
          timestamp: new Date().toISOString(),
          status: 'SUCCESS',
          totalElements: 48,
          totalPages: 10,
          currentPage: 0,
          jobs: [
            {
              id: 'job_2026_01',
              title: 'Java Backend Developer',
              company: 'FinTech Cloud Systems',
              location: 'Indore, India (Hybrid)',
              experience: '0-2 Years',
              techStack: ['Java 17', 'Spring Boot', 'MySQL', 'JWT', 'JUnit 5'],
              status: 'ACTIVE'
            },
            {
              id: 'job_2026_02',
              title: 'Associate Software Engineer - Microservices',
              company: 'Global Enterprise Solutions',
              location: 'Indore, India',
              experience: 'Fresher / Trainee',
              techStack: ['Java', 'Spring Cloud', 'Hibernate', 'REST APIs'],
              status: 'ACTIVE'
            }
          ]
        }
      }
    },
    'jwt-auth': {
      method: 'POST',
      url: '/api/v1/auth/authenticate',
      requestBody: JSON.stringify({
        email: 'recruiter@tech-tier1.com',
        role: 'RECRUITER_ADMIN',
        authMethod: 'BEARER_TOKEN'
      }, null, 2),
      response: {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          'x-auth-version': 'v2.4'
        },
        data: {
          status: 'AUTHENTICATED',
          tokenType: 'Bearer',
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGhhdmkiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE3ODc0Nzg4MDB9...',
          expiresInSeconds: 3600,
          user: {
            username: 'chhavidubey',
            permissions: ['READ_CANDIDATE_PROFILE', 'DOWNLOAD_RESUME', 'SCHEDULE_INTERVIEW']
          }
        }
      }
    },
    'hackfinder': {
      method: 'GET',
      url: '/api/v1/events/hackfinder/match?skill=Spring+Boot&hackathon=Kriyeta4.0',
      requestBody: null,
      response: {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'x-matching-algorithm': 'CosineSkillSim-v1.2'
        },
        data: {
          hackathonName: 'Kriyeta 4.0 (48h National Hackathon @ AITR)',
          targetSkill: 'Spring Boot',
          matchedProfiles: [
            {
              name: 'Chhavi Dubey',
              role: 'Backend Lead & Database Architect',
              primaryStack: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'REST APIs'],
              cgpa: '8.13/10',
              matchScore: '99.4%'
            }
          ]
        }
      }
    },
    'health-check': {
      method: 'GET',
      url: '/api/v1/actuator/health',
      requestBody: null,
      response: {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/vnd.spring-boot.actuator.v3+json'
        },
        data: {
          status: 'UP',
          components: {
            db: {
              status: 'UP',
              details: { database: 'MySQL 8.0', validationQuery: 'isValid()' }
            },
            diskSpace: { status: 'UP', details: { free: '184.2 GB', threshold: '10.0 MB' } },
            ping: { status: 'UP' }
          }
        }
      }
    }
  };

  function updateEndpointUI(key) {
    const config = ENDPOINTS[key] || ENDPOINTS['job-search'];
    httpMethodBadge.textContent = config.method;
    httpMethodBadge.className = 'api-method-badge ' + config.method.toLowerCase();
    endpointUrlDisplay.textContent = config.url;

    if (config.requestBody) {
      requestBodyWrap.style.display = 'block';
      requestBodyCode.textContent = config.requestBody;
    } else {
      requestBodyWrap.style.display = 'none';
    }
  }

  function simulateExecution() {
    const key = endpointSelector.value;
    const config = ENDPOINTS[key] || ENDPOINTS['job-search'];

    // Visual loading state
    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing...';
    responseBody.innerHTML = '<span style="color:var(--text-dim);">// Sending request to Spring Boot DispatcherServlet...</span>';
    statusBadge.textContent = '...';
    latencyBadge.textContent = '...';

    const randomLatency = Math.floor(Math.random() * 25) + 18; // 18ms - 42ms

    setTimeout(() => {
      statusBadge.textContent = `${config.response.status} ${config.response.statusText}`;
      statusBadge.className = 'status-tag status-200';
      latencyBadge.textContent = `${randomLatency}ms`;
      latencyBadge.className = 'latency-tag';

      const jsonString = JSON.stringify(config.response.data, null, 2);
      responseBody.innerHTML = syntaxHighlight(jsonString);

      runBtn.disabled = false;
      runBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Send Request';
    }, 400);
  }

  function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  endpointSelector.addEventListener('change', (e) => {
    updateEndpointUI(e.target.value);
    simulateExecution();
  });

  runBtn.addEventListener('click', simulateExecution);

  // Initial load
  updateEndpointUI('job-search');
  simulateExecution();
});
