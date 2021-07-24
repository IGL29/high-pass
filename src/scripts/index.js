import initYandexMap from './yandexMap.js';
import SwitchTabs from './switchTabs.js';
import scrollToSection from './scrollTo.js';
import validateForm from './validateForm.js';
import closeBlock from './closeBlock.js';

const mapId = 'map';
const classblockInfoAddress = 'map-wrapper__address-container--close';

const addressButton = document.getElementById('close-address-btn');
const addressBlock = document.getElementById('address-container');

const servicesBtnContainer = document.getElementById('container-switch-tabs');
const servicesButtons = document.getElementsByClassName('services-btn');
const servicesTabs = document.getElementsByClassName('services-tab');
const servicesClassButtonsActive = 'services__tab--active';
const servicesClassTabsActive = 'services-tab--active';
const servicesClassButtons = 'services-btn';

const projectsBtnContainer = document.getElementById('projects-container-buttons');
const projectsButtons = document.getElementsByClassName('projects-btn');
const projectsTabs = document.getElementsByClassName('project-tabs');
const projectsTabClassActive = 'project-tabs--display-active';
const projectsBtnClassActive = 'btn-container__btn--active';
const projectsBtnClass = 'projects-btn';

const navElement = document.getElementById('nav');
const navMobileElement = document.getElementById('nav-mobile');

const formSubscribe = document.getElementById("form-subscribe");
const formApplication = document.getElementById("form-application");
const classMessageErrorsElement = "js-error";

const inputContainer = document.querySelector('.input-container');
const input = document.getElementById('header-input');

const handlerForm = validateForm.bind(null, {
  classMessageErrorsElement,
  classErrorShow: 'error-show',
  classErrorInputShow: 'error-input'
})

new SwitchTabs({
  btnContainer: servicesBtnContainer,
  btnActiveClass: servicesClassButtonsActive,
  btnClass: servicesClassButtons,
  tabActiveClass: servicesClassTabsActive,
  buttons: servicesButtons,
  tabs: servicesTabs
});

new SwitchTabs({
  btnContainer: projectsBtnContainer,
  btnActiveClass: projectsBtnClassActive,
  btnClass: projectsBtnClass,
  tabActiveClass: projectsTabClassActive,
  buttons: projectsButtons,
  tabs: projectsTabs
});

scrollToSection({
  containerLinks: navElement,
  classLink: 'nav__link',
})

scrollToSection({
  containerLinks: navMobileElement,
  classLink: 'nav__link',
})

closeBlock({
  buttonElement: addressButton,
  blockElement: addressBlock,
  classOfBlockToClosed: classblockInfoAddress,
});

initYandexMap({
  mapId,
  block: addressBlock,
  classBlock: classblockInfoAddress
});

input.addEventListener('focusin', () => {
  inputContainer.classList.add('input-container--focus');
});

input.addEventListener('focusout', () => {
  inputContainer.classList.remove('input-container--focus');
});

input.addEventListener('input', (ev) => {
  if (ev.currentTarget.value) {
    inputContainer.classList.add('input-container--active');
    return;
  }
  inputContainer.classList.remove('input-container--active');
})

formSubscribe.addEventListener('submit', handlerForm);
formApplication.addEventListener('submit', handlerForm);
