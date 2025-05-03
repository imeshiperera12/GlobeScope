import { getAllCountries, getCountriesByName, getCountryByCode } from '../services/api';

// Mock fetch before tests
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('getAllCountries fetches data correctly', async () => {
    const mockResponse = [
      { name: { common: 'Country 1' } },
      { name: { common: 'Country 2' } }
    ];
    
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await getAllCountries();
    
    expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
    expect(result).toEqual(mockResponse);
  });

  test('getAllCountries handles errors', async () => {
    // Mock failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    await expect(getAllCountries()).rejects.toThrow('Failed to fetch countries');
  });

  test('getCountriesByName fetches data correctly', async () => {
    const mockResponse = [{ name: { common: 'Test Country' } }];
    
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await getCountriesByName('Test');
    
    expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/Test');
    expect(result).toEqual(mockResponse);
  });

  test('getCountriesByName handles 404 by returning empty array', async () => {
    // Mock 404 response
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    const result = await getCountriesByName('NonExistentCountry');
    
    expect(result).toEqual([]);
  });

  test('getCountryByCode fetches data correctly', async () => {
    const mockResponse = [{ name: { common: 'Test Country' }, cca3: 'TST' }];
    
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await getCountryByCode('TST');
    
    expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/TST');
    expect(result).toEqual(mockResponse);
  });
});
