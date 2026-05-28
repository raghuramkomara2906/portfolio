/* ============================================================
   RAGHU RAM KOMARA — PORTFOLIO APP JS
   UI/UX Designer Inspired Edition
   ============================================================ */

// ============================================================
// NAVIGATION
// ============================================================

const navHeader  = document.getElementById('navHeader');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navHeader.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nl').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    }
  });
});

// ============================================================
// PORTFOLIO FILTER
// ============================================================

const filterBtns = document.querySelectorAll('.pf-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('pf-active'));
    btn.classList.add('pf-active');

    const filter = btn.getAttribute('data-filter');

    portfolioCards.forEach(card => {
      const cats = card.getAttribute('data-cat') || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ============================================================
// SKILL BAR ANIMATION
// ============================================================

const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = width + '%'; }, 200);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillBarsSection = document.querySelector('.skill-bars');
if (skillBarsSection) skillBarObserver.observe(skillBarsSection);

// ============================================================
// SCROLL REVEAL
// ============================================================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.service-card, .portfolio-card, .exp-card, .research-pub-card, .ra-item, .skill-bar-item, .astat'
).forEach(el => {
  el.classList.add('fade-up');
  revealObserver.observe(el);
});
// ============================================================
// CONTACT MODAL
// ============================================================

const contactModal   = document.getElementById('contactModal');
const openModalBtn   = document.getElementById('openContactModal');
const closeModalBtn  = document.getElementById('closeContactModal');

function openModal() {
  contactModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  contactModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (openModalBtn)  openModalBtn.addEventListener('click', openModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

// Close on overlay click (outside the box)
if (contactModal) {
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeModal();
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactModal.classList.contains('open')) closeModal();
});
// ============================================================
// PROJECT MODALS — Video, Lightbox, Paper
// ============================================================

// ── Screenshot data per project ──────────────────────────────
const screenshotData = {
  soc: {
    title: 'AI Cybersecurity SOC Agent — Preview',
    shots: [
      { file: 'images/projects/soc-1.png', label: 'Dashboard Overview' },
      { file: 'images/projects/soc-2.png', label: 'Threat Detection View' },
      { file: 'images/projects/soc-3.png', label: 'Alert Investigation' },
      { file: 'images/projects/soc-4.png', label: 'Risk Scoring Panel' },
    ]
  },
  clinicos: {
    title: 'ClinicOS — Preview',
    shots: [
      { file: 'images/projects/clinicos-1.png', label: 'Patient Intake' },
      { file: 'images/projects/clinicos-2.png', label: 'SOAP Note Generator' },
      { file: 'images/projects/clinicos-3.png', label: 'Clinical Dashboard' },
      { file: 'images/projects/clinicos-4.png', label: 'Treatment Summary' },
    ]
  },
  radiology: {
    title: 'Radiology Report Structuring — Preview',
    shots: [
      { file: 'images/projects/radiology-1.png', label: 'Input Report' },
      { file: 'images/projects/radiology-2.png', label: 'Structured JSON Output' },
      { file: 'images/projects/radiology-3.png', label: 'Model Evaluation Metrics' },
      { file: 'images/projects/radiology-4.png', label: 'Pipeline Overview' },
    ]
  }
};

// ── Video Modal (MedLingo) ────────────────────────────────────
const VIDEO_URL = 'https://www.loom.com/share/d16a58f05a3e44ffaa634ea542f1bfec'; // ← Paste YouTube/Loom embed URL here when ready

function openVideoModal(project) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  const placeholder = document.getElementById('videoPlaceholder');

  if (VIDEO_URL) {
    iframe.src = VIDEO_URL;
    placeholder.style.display = 'none';
  } else {
    iframe.src = '';
    placeholder.style.display = 'flex';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  document.getElementById('videoModalIframe').src = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Lightbox (ClinicOS / SOC / Radiology) ────────────────────
function openLightbox(project) {
  const data = screenshotData[project];
  if (!data) return;

  document.getElementById('lightboxTitle').textContent = data.title;

  const grid = document.getElementById('lightboxGrid');
  grid.innerHTML = data.shots.map(shot => `
    <div class="lbx-slot">
      <img
        src="${shot.file}"
        alt="${shot.label}"
        onerror="this.parentElement.innerHTML = \`<div class='lbx-slot-placeholder'><span>🖼</span><p>${shot.label}</p><code>${shot.file}</code></div>\`"
      />
    </div>
  `).join('');

  document.getElementById('lightboxModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightboxModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Paper Preview Modal ───────────────────────────────────────
function openPaperModal() {
  document.getElementById('paperModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePaperModal() {
  document.getElementById('paperModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Close all modals on overlay click or Escape ───────────────
['videoModal', 'lightboxModal', 'paperModal'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', e => {
    if (e.target === el) {
      el.classList.remove('open');
      document.body.style.overflow = '';
      if (id === 'videoModal') document.getElementById('videoModalIframe').src = '';
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['videoModal', 'lightboxModal', 'paperModal'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.classList.contains('open')) {
        el.classList.remove('open');
        document.body.style.overflow = '';
        if (id === 'videoModal') document.getElementById('videoModalIframe').src = '';
      }
    });
  }
});