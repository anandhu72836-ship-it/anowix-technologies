// ========================================
// ANOWIX TECHNOLOGIES - APP.JS
// ========================================

// Supabase connection
const SUPABASE_URL = 'https://batgyvezofkylbfuiwvr.supabase.co';

const SUPABASE_KEY =
  'sb_publishable_IV3o0ke3w2yFoj9VmysSEQ_j7hnQUgc';

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ========================================
// ELEMENTS
// ========================================

const modal = document.getElementById('modal');
const selectedProgram = document.getElementById('selectedProgram');
const modalTitle = document.getElementById('modalTitle');


// ========================================
// PROGRAM / INTERNSHIP / WEBINAR / HACKATHON
// ========================================

document.querySelectorAll('[data-program]').forEach(button => {

  button.addEventListener('click', () => {

    const program = button.dataset.program;

    selectedProgram.textContent = program;

    if (program.includes('Internship')) {
      modalTitle.textContent = 'Internship Application';
    } else {
      modalTitle.textContent = 'Registration';
    }

    modal.classList.add('open');

  });

});


// ========================================
// CLOSE MODAL
// ========================================

document.getElementById('closeModal').addEventListener('click', () => {

  modal.classList.remove('open');

});


modal.addEventListener('click', event => {

  if (event.target === modal) {
    modal.classList.remove('open');
  }

});


// ========================================
// PROGRAM REGISTRATION
// ========================================

document.getElementById('programForm').addEventListener(
  'submit',
  async event => {

    event.preventDefault();

    const form = event.target;

    const data = Object.fromEntries(
      new FormData(form)
    );

    const registration = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      program: selectedProgram.textContent
    };

    const status =
      document.getElementById('programStatus');

    status.textContent = 'Submitting...';

    try {

      const { error } = await supabaseClient
        .from('registrations')
        .insert([registration]);

      if (error) {
        throw error;
      }

      status.textContent =
        'Registration submitted successfully!';

      form.reset();

    } catch (error) {

      console.error('Registration error:', error);

      status.textContent =
        'Registration failed. Please try again.';

    }

  }
);


// ========================================
// CONTACT / ENQUIRY FORM
// ========================================

document.getElementById('contactForm').addEventListener(
  'submit',
  async event => {

    event.preventDefault();

    const form = event.target;

    const data = Object.fromEntries(
      new FormData(form)
    );

    const enquiry = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message
    };

    const status =
      document.getElementById('formStatus');

    status.textContent = 'Sending...';

    try {

      const { error } = await supabaseClient
        .from('enquiries')
        .insert([enquiry]);

      if (error) {
        throw error;
      }

      status.textContent =
        'Your enquiry has been submitted successfully!';

      form.reset();

    } catch (error) {

      console.error('Enquiry error:', error);

      status.textContent =
        'Enquiry could not be submitted. Please try again.';

    }

  }
);


// ========================================
// MOBILE MENU
// ========================================

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


// ========================================
// CONNECTION TEST
// ========================================

console.log('Anowix Technologies app loaded.');
console.log('Supabase connected.');
