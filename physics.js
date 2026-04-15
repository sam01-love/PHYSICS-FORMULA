// ── Search ──
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('no-results');

searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    let visibleTopics = 0;

    document.querySelectorAll('.topic').forEach(section => {
        const cards = section.querySelectorAll('.card');
        let visibleCards = 0;

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (!q || text.includes(q)) {
                card.classList.remove('hidden');
                visibleCards++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (visibleCards === 0 && q) {
            section.classList.add('hidden');
        } else {
            section.classList.remove('hidden');
            visibleTopics++;
        }
    });

    noResults.style.display = (visibleTopics === 0 && q) ? 'block' : 'none';
});

// ── Scroll to top ──
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Nav pill active state ──
const sections = document.querySelectorAll('.topic');
const pills = document.querySelectorAll('.nav-pill');

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            pills.forEach(p => {
                p.classList.toggle('active', p.getAttribute('href') === '#' + e.target.id);
            });
        }
    });
}, { threshold: 0.2 });

sections.forEach(s => observer.observe(s));

// ── Staggered card animation on scroll ──
const cardObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }, i * 60);
            cardObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s, border-color 0.25s';
    cardObserver.observe(card);
});