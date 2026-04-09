// City Mate - Complete India Tourist Data + Booking System

let bookings = JSON.parse(localStorage.getItem('cityMateBookings') || '[]');

// Cities
const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Agra', 'Jaipur', 'Goa'];

// Guides - ~₹100/hr, city-specific
const guides = [
  // Delhi
  {id: 1, city: 'Delhi', name: 'Raj Food Walk Guide', expertise: 'Street Food', price: 100, duration: '4hrs', rating: 4.9, image: '🍲', details: 'Chandni Chowk, Paranthe Wali Gali expert'},
  {id: 2, city: 'Delhi', name: 'Amit History Expert', expertise: 'Monuments', price: 100, duration: '4hrs', rating: 4.8, image: '🏛️', details: 'India Gate, Qutub Minar'},
  {id: 3, city: 'Delhi', name: 'Priya Markets Guide', expertise: 'Shopping', price: 100, duration: '3hrs', rating: 4.7, image: '🛍️', details: 'Sarojini Nagar, Karol Bagh'},
  // Mumbai
  {id: 4, city: 'Mumbai', name: 'Vikram Marine Drive', expertise: 'Coast', price: 100, duration: '4hrs', rating: 4.9, image: '🌊', details: 'Marine Drive, Chowpatty Beach'},
  {id: 5, city: 'Mumbai', name: 'Sneha Street Food', expertise: 'Vada Pav', price: 100, duration: '3hrs', rating: 4.8, image: '🌮', details: 'Juhu Beach, Bandra food'},
  // Bangalore
  {id: 6, city: 'Bangalore', name: 'Kiran Pub Crawl', expertise: 'Nightlife', price: 100, duration: '4hrs', rating: 4.7, image: '🍻', details: 'MG Road, Indiranagar'},
  {id: 7, city: 'Bangalore', name: 'Lakshmi Gardens', expertise: 'Parks', price: 100, duration: '3hrs', rating: 4.6, image: '🌳', details: 'Lalbagh, Cubbon Park'},
  // Agra
  {id: 8, city: 'Agra', name: 'Taj Sunrise Guide', expertise: 'Taj Mahal', price: 100, duration: '4hrs', rating: 4.9, image: '🏰', details: 'Sunrise Taj, Mehtab Bagh'},
  // Jaipur
  {id: 9, city: 'Jaipur', name: 'Pink City Walk', expertise: 'History', price: 100, duration: '4hrs', rating: 4.8, image: '🏯', details: 'Hawa Mahal, Amber Fort'},
  // Goa
  {id: 10, city: 'Goa', name: 'Beach Party Guide', expertise: 'Night', price: 100, duration: '5hrs', rating: 4.7, image: '🏖️', details: 'Baga, Anjuna beaches'}
];

// Stays - ~₹500/night
const stays = [
  // Delhi
  {id: 1, city: 'Delhi', name: 'Paharganj Budget Stay', price: 500, rating: 4.2, image: '🏨', details: 'Near New Delhi Railway, clean basic room'},
  {id: 2, city: 'Delhi', name: 'Karol Bagh Homestay', price: 450, rating: 4.5, image: '🏠', details: 'Family run, near markets'},
  // Mumbai
  {id: 3, city: 'Mumbai', name: 'Colaba Budget Hotel', price: 550, rating: 4.3, image: '🏨', details: 'Near Gateway, AC room'},
  // Bangalore
  {id: 4, city: 'Bangalore', name: 'Koramangala PG', price: 480, rating: 4.1, image: '🏠', details: 'Near pubs/tech area'},
  // Agra
  {id: 5, city: 'Agra', name: 'Taj Ganj Homestay', price: 500, rating: 4.4, image: '🏨', details: '5min walk to Taj'},
  // Jaipur
  {id: 6, city: 'Jaipur', name: 'Bani Park Hotel', price: 520, rating: 4.3, image: '🏨', details: 'Near Pink City'},
  // Goa
  {id: 7, city: 'Goa', name: 'Anjuna Beach Hut', price: 500, rating: 4.6, image: '🏖️', details: 'Beachfront budget'}
];

// Places - Famous landmarks
const places = [
  // Delhi
  {id: 1, city: 'Delhi', name: 'India Gate', image: '🚩', details: 'War Memorial, free entry'},
  {id: 2, city: 'Delhi', name: 'Qutub Minar', image: '🕌', details: 'UNESCO site ₹40 entry'},
  {id: 3, city: 'Delhi', name: 'Lotus Temple', image: '🧘', details: 'Free, peaceful'},
  // Mumbai
  {id: 4, city: 'Mumbai', name: 'Gateway of India', image: '🏰', details: 'Iconic arch, free'},
  {id: 5, city: 'Mumbai', name: 'Marine Drive', image: '🌅', details: 'Queen\'s Necklace sunset'},
  // Bangalore
  {id: 6, city: 'Bangalore', name: 'Lalbagh Botanical', image: '🌺', details: '₹25 entry'},
  // Agra
  {id: 7, city: 'Agra', name: 'Taj Mahal', image: '👑', details: '₹50 Indians, sunrise best'},
  // Jaipur
  {id: 8, city: 'Jaipur', name: 'Hawa Mahal', image: '🏰', details: 'Palace of Winds ₹50'},
  // Goa
  {id: 9, city: 'Goa', name: 'Baga Beach', image: '🏖️', details: 'Party beach, free'}
];

// Theme functions
function initTheme() {
  const savedTheme = localStorage.getItem('cityMateTheme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const toggle = document.querySelector('.theme-toggle i');
  if (toggle) {
    toggle.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('cityMateTheme', newTheme);
  const toggle = document.querySelector('.theme-toggle i');
  if (toggle) {
    toggle.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  // Smooth transition
  document.body.style.transition = 'all 0.3s ease';
  setTimeout(() => document.body.style.transition = '', 300);
}

// Add toggle button if navbar exists


// Enhanced init with new features
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initApp();
  initScrollAnimations();
  initNavHighlight();
  initFAQ();
  initScrollToTop();
  toggleUserNav();
  toggleAdminNav();
});

function renderPopular() {
  const popular = [...guides.slice(0,3), ...stays.slice(0,3)];
  const list = document.getElementById('popular-grid');
  if (!list) return;
  list.innerHTML = popular.map(item => `
    <div class="item">
      <div style="font-size:2rem;">${item.image}</div>
      <h3>${item.name}</h3>
      <span class="type">${item.city}</span>
      <p>${item.details.substring(0,60)}...</p>
      <div>₹${item.price} ${'price' in item && item.price > 200 ? '/night' : '/hr'}</div>
      <div>⭐ ${item.rating || 4.5}</div>
      <a href="booking-form.html?type=${guides.some(g => g.id === item.id) ? 'guide' : 'stay'}&item=${encodeURIComponent(JSON.stringify(item))}" class="book-btn">Quick Book</a>
    </div>
  `).join('');
}

function initApp() {
  renderRecentBookings();
  if (document.getElementById('guides-list')) renderGuides();
  if (document.getElementById('stays-list')) renderStays();
  if (document.getElementById('places-list')) renderPlaces();
  if (document.getElementById('popular-grid')) renderPopular();
  if (document.getElementById('city') && document.getElementById('days')) calculateBudget(); // Initial
  animateStats();
}

// Render functions
function renderGuides(filtered = guides) {
  const list = document.getElementById('guides-list');
  if (!list) return;
  list.innerHTML = filtered.map(item => `
    <div class="item" onclick="openModal(${item.id}, 'guide')">
      <div style="font-size:2rem;">${item.image}</div>
      <h3>${item.name}</h3>
      <span class="type">${item.city}</span>
      <p>${item.expertise} | ${item.details}</p>
      <div>₹${item.price}/hr (${item.duration})</div>
      <div>⭐ ${item.rating}</div>
      <a href="booking-form.html?type=guide&amp;item=${encodeURIComponent(JSON.stringify(item))}" class="book-btn">Book Now</a>
    </div>
  `).join('');
}

function renderStays(filtered = stays) {
  const list = document.getElementById('stays-list');
  if (!list) return;
  list.innerHTML = filtered.map(item => `
    <div class="item" onclick="openModal(${item.id}, 'stay')">
      <div style="font-size:2rem;">${item.image}</div>
      <h3>${item.name}</h3>
      <span class="type">${item.city}</span>
      <p>${item.details}</p>
      <div>₹${item.price}/night</div>
      <div>⭐ ${item.rating}</div>
      <a href="booking-form.html?type=stay&amp;item=${encodeURIComponent(JSON.stringify(item))}" class="book-btn">Book Now</a>
    </div>
  `).join('');
}

function renderPlaces(filtered = places) {
  const list = document.getElementById('places-list');
  if (!list) return;
  list.innerHTML = filtered.map(item => `
    <div class="item">
      <div style="font-size:2rem;">${item.image}</div>
      <h3>${item.name} - ${item.city}</h3>
      <p>${item.details}</p>
    </div>
  `).join('');
}

// Filter functions
function filterGuides() {
  const query = document.getElementById('guideSearch').value.toLowerCase();
  const filtered = guides.filter(g => 
    g.city.toLowerCase().includes(query) || 
    g.name.toLowerCase().includes(query) ||
    g.expertise.toLowerCase().includes(query)
  );
  renderGuides(filtered);
}

function filterStays() {
  const query = document.getElementById('staysSearch').value.toLowerCase();
  const filtered = stays.filter(s => 
    s.city.toLowerCase().includes(query) || 
    s.name.toLowerCase().includes(query) ||
    s.price.toString().includes(query)
  );
  renderStays(filtered);
}

function filterPlaces() {
  const query = document.getElementById('placesSearch').value.toLowerCase();
  const filtered = places.filter(p => 
    p.city.toLowerCase().includes(query) || 
    p.name.toLowerCase().includes(query)
  );
  renderPlaces(filtered);
}

// Modal & Booking
let currentBooking = {};

function openModal(id, type, event) {
  event?.stopPropagation();
  const data = type === 'guide' ? guides.find(g => g.id === id) :
               type === 'stay' ? stays.find(s => s.id === id) : null;
  if (!data) return;

  currentBooking = { ...data, type, id };
  document.getElementById('booking-type').value = type;
  document.getElementById('booking-item-details').value = JSON.stringify(data);
  document.getElementById('booking-item-name').textContent = data.name;
  document.getElementById('bookingModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('bookingModal').style.display = 'none';
  document.getElementById('bookingForm').reset();
}

function saveBooking() {
  const formData = new FormData(document.getElementById('bookingForm'));
  const bookingData = {
    id: Date.now(),
    ...Object.fromEntries(formData),
    timestamp: new Date().toLocaleString(),
    status: 'confirmed'
  };
  bookings.unshift(bookingData);
  localStorage.setItem('cityMateBookings', JSON.stringify(bookings));
  closeModal();
  renderRecentBookings();
  alert('Booking saved! Check My Bookings on home.');
}

// Recent Bookings
function renderRecentBookings() {
  const list = document.getElementById('recent-bookings');
  if (!list) return;
  const recent = bookings.slice(0, 4);
  list.innerHTML = recent.map(b => `
    <div class="item">
      <h4>${b['customerName'] || 'Guest'}</h4>
      <p>${b.type?.toUpperCase()} - ${JSON.parse(b.itemDetails || '{}').name}</p>
      <small>${b.timestamp}</small>
    </div>
  `).join('') || '<p>No recent bookings</p>';
}

// Budget Calculator
function calculateBudget() {
  const city = document.getElementById('city')?.value || 'delhi';
  const days = parseInt(document.getElementById('days')?.value) || 3;
  
  const cityMultipliers = {
    delhi: 1, mumbai: 1.3, bangalore: 1.1, agra: 0.8, jaipur: 0.9, goa: 1.2
  };
  
  const base = 2000 * cityMultipliers[city.toLowerCase()] * days;
  const breakdown = `
    Stay (₹500/night): ₹${500 * days}<br>
    Food: ₹${800 * days}<br>
    Local Travel: ₹${300 * days}<br>
    Misc: ₹500
  `;
  
  document.getElementById('total').textContent = `Total: ₹${Math.round(base)}`;
  document.getElementById('breakdown-details').innerHTML = breakdown;
}

let scrolled = false;

// Enhanced scroll handler
window.addEventListener('scroll', () => {
  const header = document.querySelector('.logo-header');
  if (window.scrollY > 100 && !scrolled) {
    header.classList.add('shrunk');
    scrolled = true;
  } else if (window.scrollY <= 100 && scrolled) {
    header.classList.remove('shrunk');
    scrolled = false;
  }
  updateScrollToTop();
}, { passive: true });

// Event Listeners
if (document.getElementById('guideSearch')) document.getElementById('guideSearch').addEventListener('input', filterGuides);
if (document.getElementById('staysSearch')) document.getElementById('staysSearch').addEventListener('input', filterStays);
if (document.getElementById('placesSearch')) document.getElementById('placesSearch').addEventListener('input', filterPlaces);

// Modal close outside
window.onclick = function(event) {
  const modal = document.getElementById('bookingModal');
  if (event.target === modal) closeModal();
}

// Budget form
if (document.getElementById('budgetForm')) {
  document.getElementById('budgetForm').addEventListener('submit', e => e.preventDefault());
  document.querySelector('#budgetForm button')?.addEventListener('click', calculateBudget);
}

// User nav toggle
function toggleUserNav() {
  const userLoginLink = document.getElementById('userLoginNav');
  const userLogoutLink = document.getElementById('userLogoutNav');
  const isUserLogged = localStorage.getItem('cityMateUserLoggedIn') === 'true';
  
  if (userLoginLink) userLoginLink.style.display = isUserLogged ? 'none' : 'block';
  if (userLogoutLink) userLogoutLink.style.display = isUserLogged ? 'block' : 'none';
}

// User logout
function userLogout() {
  localStorage.removeItem('cityMateUserLoggedIn');
  localStorage.removeItem('cityMateUserEmail');
  toggleUserNav();
  if (typeof initApp === 'function') initApp();
}

// Admin nav toggle (now consistent with login changes)
function toggleAdminNav() {
  const adminLinks = document.querySelectorAll('#adminLink');
  const isLogged = localStorage.getItem('cityMateAdminLoggedIn') === 'true';
  adminLinks.forEach(link => {
    link.style.display = isLogged ? 'block' : 'none';
  });
}

// New feature functions
function initScrollAnimations() {
  // Simple scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });
  
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)';
    observer.observe(el);
  });
}

function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        document.querySelector(`.navbar a[href*="${id}"]`)?.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  
  sections.forEach(section => observer.observe(section));
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });
}

function initScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

function animateStats() {
  const stats = document.querySelectorAll('.hero-stats strong');
  stats.forEach(stat => {
    const target = parseInt(stat.textContent.replace('+', ''));
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        stat.textContent = target + '+';
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(count) + '+';
      }
    }, 20);
  });
}

// Contact form submit
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! We\'ll get back within 2 hours.');
      contactForm.reset();
    });
  }
});


