import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../components/countries/CountryCard';

// Mock country data
const mockCountry = {
  name: { common: 'Test Country', official: 'Official Test Country' },
  capital: ['Test Capital'],
  region: 'Test Region',
  population: 1000000,
  languages: { eng: 'English', spa: 'Spanish' },
  flags: { png: 'test-flag.png', svg: 'test-flag.svg' },
  cca3: 'TST',
};

describe('CountryCard Component', () => {
  test('renders country card with correct information', () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    // Test that country name is rendered
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    
    // Test that capital is rendered
    expect(screen.getByText(/Test Capital/)).toBeInTheDocument();
    
    // Test that region is rendered
    expect(screen.getByText(/Test Region/)).toBeInTheDocument();
    
    // Test that population is rendered with formatting
    expect(screen.getByText(/1,000,000/)).toBeInTheDocument();
    
    // Test that languages are rendered
    expect(screen.getByText(/English, Spanish/)).toBeInTheDocument();
    
    // Test that flag alt text is correct
    const flagImage = screen.getByAltText('Flag of Test Country');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'test-flag.png');
  });

  test('handles missing or empty data gracefully', () => {
    const countryWithMissingData = {
      name: { common: 'Test Country' },
      capital: null,
      region: '',
      population: 0,
      languages: null,
      flags: { svg: 'test-flag.svg' },
      cca3: 'TST',
    };

    render(
      <BrowserRouter>
        <CountryCard country={countryWithMissingData} />
      </BrowserRouter>
    );

    // Test that missing capital is handled
    expect(screen.getByText(/Capital:/)).toHaveTextContent('Capital: None');
    
    // Test that missing languages is handled
    expect(screen.getByText(/Languages:/)).toHaveTextContent('Languages: None');
    
    // Test that zero population is formatted correctly
    expect(screen.getByText(/Population:/)).toHaveTextContent('Population: 0');
  });
});

