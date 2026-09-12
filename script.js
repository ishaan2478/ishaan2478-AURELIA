const modal = document.querySelector('[data-modal]');
const openAuthButtons = document.querySelectorAll('[data-open-auth]');
const closeAuthButton = document.querySelector('[data-close-auth]');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

function openAuth(event) {
  event.preventDefault();
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
  modal.querySelector('input').focus();
}

function closeAuth() {
  modal.classList.remove('visible');
  document.body.style.overflow = '';
}

openAuthButtons.forEach((button) => button.addEventListener('click', openAuth));
closeAuthButton.addEventListener('click', closeAuth);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeAuth();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('visible')) closeAuth();
});

menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
    document.querySelectorAll('.process-list').forEach((list) => list.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

const formTypeButtons = document.querySelectorAll('.form-type-button');
const brandFields = document.querySelectorAll('.brand-field');
const creatorFields = document.querySelectorAll('.creator-field');
const brandLabel = document.querySelector('.brand-label');
const creatorLabel = document.querySelector('.creator-label');
formTypeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const creatorMode = button.dataset.formType === 'creator';
    formTypeButtons.forEach((item) => item.classList.toggle('active', item === button));
    brandFields.forEach((field) => field.classList.toggle('hidden-field', creatorMode));
    creatorFields.forEach((field) => field.classList.toggle('hidden-field', !creatorMode));
    brandLabel.classList.toggle('hidden-label', creatorMode);
    creatorLabel.classList.toggle('hidden-label', !creatorMode);
  });
});

document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.target.reset();
  document.querySelector('.form-success').classList.add('visible');
});

document.getElementById('auth-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('.auth-success').textContent = 'You’re in. Your workspace is being prepared.';
});

document.querySelector('[data-google]').addEventListener('click', () => {
  document.querySelector('.auth-success').textContent = 'Google sign-in will connect here once authentication is configured.';
});

document.querySelector('[data-create-account]').addEventListener('click', (event) => {
  event.target.textContent = 'Create your account';
  document.getElementById('auth-title').textContent = 'Create your Aurelia account';
  document.querySelector('.auth-modal>p').textContent = 'Join the network and manage your collaborations in one place.';
});
