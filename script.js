// Interactive unlock logic
const letterEl = document.getElementById('letter');
const progressEl = document.getElementById('progress');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');
const bgm = document.getElementById('bgm');

let idx = 0;
let unlocked = 0;

function renderProgress(total) {
    progressEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const d = document.createElement('span');
        d.className = 'dot' + (i < unlocked ? ' done' : (i === unlocked ? ' active' : ''));
        progressEl.appendChild(d);
    }
}

function render() {
    const total = CONTENT.paragraphs.length;
    titleEl.textContent = CONTENT.title;
    subtitleEl.textContent = CONTENT.subtitle;
    document.title = CONTENT.pageTitle || CONTENT.title || document.title;
    if (CONTENT.bgm) {
        bgm.src = CONTENT.bgm;
        bgm.controls = (unlocked >= total);
    }

    renderProgress(total);
    letterEl.textContent = CONTENT.paragraphs[idx];
    prevBtn.disabled = idx === 0;
    nextBtn.textContent = idx < total - 1 ? '下一页 →' : '节日祝福 🎉';
}

function confetti() {
    const root = document.getElementById('confetti');
    for (let i = 0; i < 80; i++) {
        const p = document.createElement('div');
        p.className = 'piece';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.background = Math.random() > .5 ? 'var(--accent)' : 'var(--accent-2)';
        p.style.animationDelay = (Math.random() * 800) + 'ms';
        root.appendChild(p);
        setTimeout(() => root.removeChild(p), 3000);
    }
}

nextBtn.addEventListener('click', () => {
    const total = CONTENT.paragraphs.length;
    if (idx < total) {
        render();
        if (idx <= total) {
            confetti();
        }
        idx++;
        if (unlocked < idx) {
            unlocked = idx;
        }

    } else {
        letterEl.innerHTML = CONTENT.epilogueHTML;
        nextBtn.disabled = true;
        bgm && (bgm.controls = true);
        confetti();
    }
});
prevBtn.addEventListener('click', () => {
    if (idx > 0) {
        idx--;
        render();
        nextBtn.disabled = false;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    unlocked = 0;
    render();
});
