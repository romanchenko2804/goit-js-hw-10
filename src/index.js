import './css/styles.css';
import fetchCountries from '../src/js/fetchCountries.js';
import Lodash from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', Lodash(onInputField, DEBOUNCE_DELAY));

function onInputField(e) {
  const countries = e.target.value.trim();

  fetchCountries(countries)
    .then(renderCountriesInfo);

  fetchCountries(countries)
    .then(renderCountriesList);
}

function renderCountriesInfo(countries) {
  if (countries.length < 2) {
    const markup = countries
      .map(({ name, capital, population, flags, languages }) => {
        return `<img src="${flags.svg}" alt="${name.official}" width="30px">
          <h1 class="official-name">${name.official}</h1>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Langueges:</b> ${Object.values(languages)}</p>`;
      })
      .join('');
    refs.countryInfo.innerHTML = markup;
  }
  if (countries === '') {
    refs.countryInfo.innerHTML = '';
  }
  if (countries.length > 2) {
    refs.countryInfo.innerHTML = '';
  }
}

function renderCountriesList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<li>
        <img src="${flags.svg}" alt="${name.official}" width="30px">
        <p class="official-name"><b>${name.official}</b>
      </li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
  }
  if (countries === '') {
    refs.countryList.innerHTML = '';
  }
  if (countries.length === 1 || countries.length > 10) {
    refs.countryList.innerHTML = '';
  }
}