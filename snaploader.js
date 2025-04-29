async function loadSnaps() {
    const response = await fetch('snaplist.json');
    const snaps = await response.json();
    const container = document.getElementById('snap-container');
  
    snaps.forEach(snap => {
      const snapCard = `
        <div class="snap-card" data-track="${snap.track}">
          <h3>${snap.emoji} Snap #${snap.id}: ${snap.title}</h3>
          <p><strong>Scenario:</strong> ${snap.scenario}</p>
          <strong>Your Challenge:</strong>
          <ul>
            ${snap.challenge.map(q => `<li>${q}</li>`).join('')}
          </ul>
          <p class="outcome">✅ ${snap.outcome}</p>
          <div class="feedback-note">
            <small>🛠️ Spotted a scenario twist or field nuance? <a href="#">Submit feedback</a></small>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', snapCard);
    });
  }
  
  loadSnaps();
  
  // Filter logic
  document.querySelectorAll('.snap-filter button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      document.querySelectorAll('.snap-card').forEach(card => {
        if (category === "All" || card.dataset.track === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
  