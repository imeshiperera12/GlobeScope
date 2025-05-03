const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async (fields = null) => {
  try {
    let url = `${BASE_URL}/all`;
    if (fields) {
      url += `?fields=${fields}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

export const getCountriesByName = async (name, fullText = false) => {
  try {
    const url = `${BASE_URL}/name/${name}${fullText ? '?fullText=true' : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        return []; // Return empty array if no countries found
      }
      throw new Error('Failed to fetch countries by name');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching countries by name "${name}":`, error);
    throw error;
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries by region');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching countries by region "${region}":`, error);
    throw error;
  }
};

export const getCountriesByLanguage = async (language) => {
  try {
    const response = await fetch(`${BASE_URL}/lang/${language}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries by language');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching countries by language "${language}":`, error);
    throw error;
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country by code');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching country by code "${code}":`, error);
    throw error;
  }
};

export const getCountriesByCodes = async (codes) => {
  try {
    const response = await fetch(`${BASE_URL}/alpha?codes=${codes.join(',')}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries by codes');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching countries by codes "${codes}":`, error);
    throw error;
  }
};
