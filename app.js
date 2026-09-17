const modal = document.getElementById('modal');
const selectedProgram = document.getElementById('selectedProgram');
const modalTitle = document.getElementById('modalTitle');

document.querySelectorAll('[data-program]').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedProgram.textContent = btn.dataset.program;
    modalTitle.textContent = btn.dataset.program.includes('Internship') ? 'Internship Application' : 'Registration';
    modal.classList.add('open');
  });
});

document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

document.getElementById('programForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const registrations = JSON.parse(localStorage.getItem('anowix_registrations') || '[]');
  registrations.push({...data, program: selectedProgram.textContent, createdAt: new Date().toISOString()});
  localStorage.setItem('anowix_registrations', JSON.stringify(registrations));
  document.getElementById('programStatus').textContent = 'Registration saved on this demo. Backend/database will be connected in the next phase.';
  e.target.reset();
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const enquiries = JSON.parse(localStorage.getItem('anowix_enquiries') || '[]');
  enquiries.push({...data, createdAt: new Date().toISOString()});
  localStorage.setItem('anowix_enquiries', JSON.stringify(enquiries));
  document.getElementById('formStatus').textContent = 'Enquiry saved on this demo. Connect Supabase to receive it centrally.';
  e.target.reset();
});
const menu = document.querySelector('.menu');
const nav = document.querySelector('.navbar nav');

menu.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.navbar nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});
