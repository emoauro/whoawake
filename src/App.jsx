import React, { useState, useEffect, useMemo } from 'react';

// Stardew Valley-inspired room avatars (emoji-based for simplicity, thematically cozy)
const ROOM_AVATARS = [
  { id: 'barn', emoji: '🏠', label: 'Farmhouse' },
  { id: 'greenhouse', emoji: '🌿', label: 'Greenhouse' },
  { id: 'chicken', emoji: '🐔', label: 'Chicken Coop' },
  { id: 'cow', emoji: '🐄', label: 'Barn' },
  { id: 'pig', emoji: '🐷', label: 'Pig Pen' },
  { id: 'cat', emoji: '🐱', label: 'Pet Corner' },
  { id: 'dog', emoji: '🐕', label: 'Doghouse' },
  { id: 'fish', emoji: '🐟', label: 'Fish Pond' },
  { id: 'tree', emoji: '🌳', label: 'Orchard' },
  { id: 'flower', emoji: '🌻', label: 'Garden' },
  { id: 'mushroom', emoji: '🍄', label: 'Cave' },
  { id: 'wheat', emoji: '🌾', label: 'Fields' },
  { id: 'apple', emoji: '🍎', label: 'Apple Trees' },
  { id: 'grape', emoji: '🍇', label: 'Vineyard' },
  { id: 'pumpkin', emoji: '🎃', label: 'Pumpkin Patch' },
  { id: 'corn', emoji: '🌽', label: 'Corn Maze' },
  { id: 'honey', emoji: '🍯', label: 'Apiary' },
  { id: 'bee', emoji: '🐝', label: 'Bee House' },
  { id: 'butterfly', emoji: '🦋', label: 'Meadow' },
  { id: 'rabbit', emoji: '🐰', label: 'Rabbit Hutch' },
  { id: 'duck', emoji: '🦆', label: 'Duck Pond' },
  { id: 'star', emoji: '⭐', label: 'Starlight' },
  { id: 'moon', emoji: '🌙', label: 'Night Market' },
  { id: 'sunrise', emoji: '🌅', label: 'Beach Farm' },
  { id: 'mountain', emoji: '⛰️', label: 'Mountain' },
  { id: 'tent', emoji: '⛺', label: 'Campsite' },
  { id: 'bridge', emoji: '🌉', label: 'Bridge' },
  { id: 'well', emoji: '🪣', label: 'Well' },
  { id: 'lantern', emoji: '🏮', label: 'Festival' },
  { id: 'heart', emoji: '💜', label: 'Community' },
];

// Comprehensive city database with timezones (~600 cities)
const CITY_DATABASE = [
  // North America - USA
  { city: 'New York', country: 'USA', timezone: 'America/New_York' },
  { city: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Chicago', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Houston', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Phoenix', country: 'USA', timezone: 'America/Phoenix' },
  { city: 'Philadelphia', country: 'USA', timezone: 'America/New_York' },
  { city: 'San Antonio', country: 'USA', timezone: 'America/Chicago' },
  { city: 'San Diego', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Dallas', country: 'USA', timezone: 'America/Chicago' },
  { city: 'San Jose', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Austin', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Jacksonville', country: 'USA', timezone: 'America/New_York' },
  { city: 'Fort Worth', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Columbus', country: 'USA', timezone: 'America/New_York' },
  { city: 'Charlotte', country: 'USA', timezone: 'America/New_York' },
  { city: 'San Francisco', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Indianapolis', country: 'USA', timezone: 'America/Indiana/Indianapolis' },
  { city: 'Seattle', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Denver', country: 'USA', timezone: 'America/Denver' },
  { city: 'Washington DC', country: 'USA', timezone: 'America/New_York' },
  { city: 'Boston', country: 'USA', timezone: 'America/New_York' },
  { city: 'El Paso', country: 'USA', timezone: 'America/Denver' },
  { city: 'Nashville', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Detroit', country: 'USA', timezone: 'America/Detroit' },
  { city: 'Oklahoma City', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Portland', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Las Vegas', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Memphis', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Louisville', country: 'USA', timezone: 'America/Kentucky/Louisville' },
  { city: 'Baltimore', country: 'USA', timezone: 'America/New_York' },
  { city: 'Milwaukee', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Albuquerque', country: 'USA', timezone: 'America/Denver' },
  { city: 'Tucson', country: 'USA', timezone: 'America/Phoenix' },
  { city: 'Fresno', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Sacramento', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Kansas City', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Mesa', country: 'USA', timezone: 'America/Phoenix' },
  { city: 'Atlanta', country: 'USA', timezone: 'America/New_York' },
  { city: 'Omaha', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Colorado Springs', country: 'USA', timezone: 'America/Denver' },
  { city: 'Raleigh', country: 'USA', timezone: 'America/New_York' },
  { city: 'Miami', country: 'USA', timezone: 'America/New_York' },
  { city: 'Oakland', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Minneapolis', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Tulsa', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Cleveland', country: 'USA', timezone: 'America/New_York' },
  { city: 'Wichita', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Arlington', country: 'USA', timezone: 'America/Chicago' },
  { city: 'New Orleans', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Bakersfield', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Tampa', country: 'USA', timezone: 'America/New_York' },
  { city: 'Honolulu', country: 'USA', timezone: 'Pacific/Honolulu' },
  { city: 'Aurora', country: 'USA', timezone: 'America/Denver' },
  { city: 'Anaheim', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Santa Ana', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'St. Louis', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Riverside', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Corpus Christi', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Lexington', country: 'USA', timezone: 'America/New_York' },
  { city: 'Pittsburgh', country: 'USA', timezone: 'America/New_York' },
  { city: 'Anchorage', country: 'USA', timezone: 'America/Anchorage' },
  { city: 'Stockton', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Cincinnati', country: 'USA', timezone: 'America/New_York' },
  { city: 'St. Paul', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Toledo', country: 'USA', timezone: 'America/New_York' },
  { city: 'Newark', country: 'USA', timezone: 'America/New_York' },
  { city: 'Greensboro', country: 'USA', timezone: 'America/New_York' },
  { city: 'Plano', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Henderson', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Lincoln', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Buffalo', country: 'USA', timezone: 'America/New_York' },
  { city: 'Jersey City', country: 'USA', timezone: 'America/New_York' },
  { city: 'Chula Vista', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Fort Wayne', country: 'USA', timezone: 'America/Indiana/Indianapolis' },
  { city: 'Orlando', country: 'USA', timezone: 'America/New_York' },
  { city: 'St. Petersburg', country: 'USA', timezone: 'America/New_York' },
  { city: 'Chandler', country: 'USA', timezone: 'America/Phoenix' },
  { city: 'Laredo', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Norfolk', country: 'USA', timezone: 'America/New_York' },
  { city: 'Durham', country: 'USA', timezone: 'America/New_York' },
  { city: 'Madison', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Lubbock', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Irvine', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Winston-Salem', country: 'USA', timezone: 'America/New_York' },
  { city: 'Glendale', country: 'USA', timezone: 'America/Phoenix' },
  { city: 'Garland', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Hialeah', country: 'USA', timezone: 'America/New_York' },
  { city: 'Reno', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Chesapeake', country: 'USA', timezone: 'America/New_York' },
  { city: 'Gilbert', country: 'USA', timezone: 'America/Phoenix' },
  { city: 'Baton Rouge', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Irving', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Scottsdale', country: 'USA', timezone: 'America/Phoenix' },
  { city: 'North Las Vegas', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Fremont', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Boise', country: 'USA', timezone: 'America/Boise' },
  { city: 'Richmond', country: 'USA', timezone: 'America/New_York' },
  { city: 'San Bernardino', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Birmingham', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Spokane', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Rochester', country: 'USA', timezone: 'America/New_York' },
  { city: 'Des Moines', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Modesto', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Fayetteville', country: 'USA', timezone: 'America/New_York' },
  { city: 'Tacoma', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Oxnard', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Fontana', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Salt Lake City', country: 'USA', timezone: 'America/Denver' },
  
  // Canada
  { city: 'Toronto', country: 'Canada', timezone: 'America/Toronto' },
  { city: 'Montreal', country: 'Canada', timezone: 'America/Montreal' },
  { city: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver' },
  { city: 'Calgary', country: 'Canada', timezone: 'America/Edmonton' },
  { city: 'Edmonton', country: 'Canada', timezone: 'America/Edmonton' },
  { city: 'Ottawa', country: 'Canada', timezone: 'America/Toronto' },
  { city: 'Winnipeg', country: 'Canada', timezone: 'America/Winnipeg' },
  { city: 'Quebec City', country: 'Canada', timezone: 'America/Montreal' },
  { city: 'Hamilton', country: 'Canada', timezone: 'America/Toronto' },
  { city: 'Kitchener', country: 'Canada', timezone: 'America/Toronto' },
  { city: 'London', country: 'Canada', timezone: 'America/Toronto' },
  { city: 'Victoria', country: 'Canada', timezone: 'America/Vancouver' },
  { city: 'Halifax', country: 'Canada', timezone: 'America/Halifax' },
  { city: 'Oshawa', country: 'Canada', timezone: 'America/Toronto' },
  { city: 'Windsor', country: 'Canada', timezone: 'America/Toronto' },
  { city: 'Saskatoon', country: 'Canada', timezone: 'America/Regina' },
  { city: 'Regina', country: 'Canada', timezone: 'America/Regina' },
  { city: 'St. John\'s', country: 'Canada', timezone: 'America/St_Johns' },
  
  // Mexico
  { city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Guadalajara', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Monterrey', country: 'Mexico', timezone: 'America/Monterrey' },
  { city: 'Puebla', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Tijuana', country: 'Mexico', timezone: 'America/Tijuana' },
  { city: 'León', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Cancún', country: 'Mexico', timezone: 'America/Cancun' },
  { city: 'Mérida', country: 'Mexico', timezone: 'America/Merida' },
  { city: 'Querétaro', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'San Luis Potosí', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Aguascalientes', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Hermosillo', country: 'Mexico', timezone: 'America/Hermosillo' },
  { city: 'Chihuahua', country: 'Mexico', timezone: 'America/Chihuahua' },
  { city: 'Morelia', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Veracruz', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Acapulco', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Oaxaca', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Playa del Carmen', country: 'Mexico', timezone: 'America/Cancun' },
  
  // Central America & Caribbean
  { city: 'Guatemala City', country: 'Guatemala', timezone: 'America/Guatemala' },
  { city: 'San Salvador', country: 'El Salvador', timezone: 'America/El_Salvador' },
  { city: 'Tegucigalpa', country: 'Honduras', timezone: 'America/Tegucigalpa' },
  { city: 'Managua', country: 'Nicaragua', timezone: 'America/Managua' },
  { city: 'San José', country: 'Costa Rica', timezone: 'America/Costa_Rica' },
  { city: 'Panama City', country: 'Panama', timezone: 'America/Panama' },
  { city: 'Havana', country: 'Cuba', timezone: 'America/Havana' },
  { city: 'Santo Domingo', country: 'Dominican Republic', timezone: 'America/Santo_Domingo' },
  { city: 'Port-au-Prince', country: 'Haiti', timezone: 'America/Port-au-Prince' },
  { city: 'Kingston', country: 'Jamaica', timezone: 'America/Jamaica' },
  { city: 'Nassau', country: 'Bahamas', timezone: 'America/Nassau' },
  { city: 'San Juan', country: 'Puerto Rico', timezone: 'America/Puerto_Rico' },
  { city: 'Belize City', country: 'Belize', timezone: 'America/Belize' },
  { city: 'Bridgetown', country: 'Barbados', timezone: 'America/Barbados' },
  { city: 'Port of Spain', country: 'Trinidad', timezone: 'America/Port_of_Spain' },
  
  // South America
  { city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Rio de Janeiro', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Brasília', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Salvador', country: 'Brazil', timezone: 'America/Bahia' },
  { city: 'Fortaleza', country: 'Brazil', timezone: 'America/Fortaleza' },
  { city: 'Belo Horizonte', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Manaus', country: 'Brazil', timezone: 'America/Manaus' },
  { city: 'Curitiba', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Recife', country: 'Brazil', timezone: 'America/Recife' },
  { city: 'Porto Alegre', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Belém', country: 'Brazil', timezone: 'America/Belem' },
  { city: 'Goiânia', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Campinas', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Florianópolis', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
  { city: 'Córdoba', country: 'Argentina', timezone: 'America/Argentina/Cordoba' },
  { city: 'Rosario', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
  { city: 'Mendoza', country: 'Argentina', timezone: 'America/Argentina/Mendoza' },
  { city: 'Mar del Plata', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
  { city: 'Salta', country: 'Argentina', timezone: 'America/Argentina/Salta' },
  { city: 'Lima', country: 'Peru', timezone: 'America/Lima' },
  { city: 'Arequipa', country: 'Peru', timezone: 'America/Lima' },
  { city: 'Cusco', country: 'Peru', timezone: 'America/Lima' },
  { city: 'Trujillo', country: 'Peru', timezone: 'America/Lima' },
  { city: 'Bogotá', country: 'Colombia', timezone: 'America/Bogota' },
  { city: 'Medellín', country: 'Colombia', timezone: 'America/Bogota' },
  { city: 'Cali', country: 'Colombia', timezone: 'America/Bogota' },
  { city: 'Barranquilla', country: 'Colombia', timezone: 'America/Bogota' },
  { city: 'Cartagena', country: 'Colombia', timezone: 'America/Bogota' },
  { city: 'Santiago', country: 'Chile', timezone: 'America/Santiago' },
  { city: 'Valparaíso', country: 'Chile', timezone: 'America/Santiago' },
  { city: 'Concepción', country: 'Chile', timezone: 'America/Santiago' },
  { city: 'La Serena', country: 'Chile', timezone: 'America/Santiago' },
  { city: 'Caracas', country: 'Venezuela', timezone: 'America/Caracas' },
  { city: 'Maracaibo', country: 'Venezuela', timezone: 'America/Caracas' },
  { city: 'Valencia', country: 'Venezuela', timezone: 'America/Caracas' },
  { city: 'Quito', country: 'Ecuador', timezone: 'America/Guayaquil' },
  { city: 'Guayaquil', country: 'Ecuador', timezone: 'America/Guayaquil' },
  { city: 'Cuenca', country: 'Ecuador', timezone: 'America/Guayaquil' },
  { city: 'Montevideo', country: 'Uruguay', timezone: 'America/Montevideo' },
  { city: 'Asunción', country: 'Paraguay', timezone: 'America/Asuncion' },
  { city: 'La Paz', country: 'Bolivia', timezone: 'America/La_Paz' },
  { city: 'Santa Cruz', country: 'Bolivia', timezone: 'America/La_Paz' },
  { city: 'Sucre', country: 'Bolivia', timezone: 'America/La_Paz' },
  { city: 'Georgetown', country: 'Guyana', timezone: 'America/Guyana' },
  { city: 'Paramaribo', country: 'Suriname', timezone: 'America/Paramaribo' },
  
  // Western Europe
  { city: 'London', country: 'UK', timezone: 'Europe/London' },
  { city: 'Birmingham', country: 'UK', timezone: 'Europe/London' },
  { city: 'Manchester', country: 'UK', timezone: 'Europe/London' },
  { city: 'Glasgow', country: 'UK', timezone: 'Europe/London' },
  { city: 'Liverpool', country: 'UK', timezone: 'Europe/London' },
  { city: 'Edinburgh', country: 'UK', timezone: 'Europe/London' },
  { city: 'Leeds', country: 'UK', timezone: 'Europe/London' },
  { city: 'Bristol', country: 'UK', timezone: 'Europe/London' },
  { city: 'Sheffield', country: 'UK', timezone: 'Europe/London' },
  { city: 'Newcastle', country: 'UK', timezone: 'Europe/London' },
  { city: 'Nottingham', country: 'UK', timezone: 'Europe/London' },
  { city: 'Southampton', country: 'UK', timezone: 'Europe/London' },
  { city: 'Belfast', country: 'UK', timezone: 'Europe/London' },
  { city: 'Cardiff', country: 'UK', timezone: 'Europe/London' },
  { city: 'Oxford', country: 'UK', timezone: 'Europe/London' },
  { city: 'Cambridge', country: 'UK', timezone: 'Europe/London' },
  { city: 'Brighton', country: 'UK', timezone: 'Europe/London' },
  { city: 'Paris', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Marseille', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Lyon', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Toulouse', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Nice', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Nantes', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Strasbourg', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Montpellier', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Bordeaux', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Lille', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Rennes', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Cannes', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Hamburg', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Munich', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Cologne', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Frankfurt', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Stuttgart', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Düsseldorf', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Dortmund', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Essen', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Leipzig', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Bremen', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Dresden', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Hanover', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Nuremberg', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam' },
  { city: 'Rotterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam' },
  { city: 'The Hague', country: 'Netherlands', timezone: 'Europe/Amsterdam' },
  { city: 'Utrecht', country: 'Netherlands', timezone: 'Europe/Amsterdam' },
  { city: 'Eindhoven', country: 'Netherlands', timezone: 'Europe/Amsterdam' },
  { city: 'Brussels', country: 'Belgium', timezone: 'Europe/Brussels' },
  { city: 'Antwerp', country: 'Belgium', timezone: 'Europe/Brussels' },
  { city: 'Ghent', country: 'Belgium', timezone: 'Europe/Brussels' },
  { city: 'Bruges', country: 'Belgium', timezone: 'Europe/Brussels' },
  { city: 'Luxembourg City', country: 'Luxembourg', timezone: 'Europe/Luxembourg' },
  
  // Southern Europe
  { city: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Barcelona', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Valencia', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Seville', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Zaragoza', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Málaga', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Bilbao', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Alicante', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Granada', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Palma', country: 'Spain', timezone: 'Europe/Madrid' },
  { city: 'Las Palmas', country: 'Spain', timezone: 'Atlantic/Canary' },
  { city: 'Santa Cruz de Tenerife', country: 'Spain', timezone: 'Atlantic/Canary' },
  { city: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon' },
  { city: 'Porto', country: 'Portugal', timezone: 'Europe/Lisbon' },
  { city: 'Braga', country: 'Portugal', timezone: 'Europe/Lisbon' },
  { city: 'Coimbra', country: 'Portugal', timezone: 'Europe/Lisbon' },
  { city: 'Faro', country: 'Portugal', timezone: 'Europe/Lisbon' },
  { city: 'Funchal', country: 'Portugal', timezone: 'Atlantic/Madeira' },
  { city: 'Rome', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Milan', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Naples', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Turin', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Palermo', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Genoa', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Bologna', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Florence', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Venice', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Verona', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Catania', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Bari', country: 'Italy', timezone: 'Europe/Rome' },
  { city: 'Athens', country: 'Greece', timezone: 'Europe/Athens' },
  { city: 'Thessaloniki', country: 'Greece', timezone: 'Europe/Athens' },
  { city: 'Patras', country: 'Greece', timezone: 'Europe/Athens' },
  { city: 'Heraklion', country: 'Greece', timezone: 'Europe/Athens' },
  { city: 'Rhodes', country: 'Greece', timezone: 'Europe/Athens' },
  { city: 'Valletta', country: 'Malta', timezone: 'Europe/Malta' },
  { city: 'Monaco', country: 'Monaco', timezone: 'Europe/Monaco' },
  { city: 'San Marino', country: 'San Marino', timezone: 'Europe/San_Marino' },
  { city: 'Andorra la Vella', country: 'Andorra', timezone: 'Europe/Andorra' },
  { city: 'Gibraltar', country: 'Gibraltar', timezone: 'Europe/Gibraltar' },
  
  // Northern Europe
  { city: 'Dublin', country: 'Ireland', timezone: 'Europe/Dublin' },
  { city: 'Cork', country: 'Ireland', timezone: 'Europe/Dublin' },
  { city: 'Galway', country: 'Ireland', timezone: 'Europe/Dublin' },
  { city: 'Limerick', country: 'Ireland', timezone: 'Europe/Dublin' },
  { city: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm' },
  { city: 'Gothenburg', country: 'Sweden', timezone: 'Europe/Stockholm' },
  { city: 'Malmö', country: 'Sweden', timezone: 'Europe/Stockholm' },
  { city: 'Uppsala', country: 'Sweden', timezone: 'Europe/Stockholm' },
  { city: 'Copenhagen', country: 'Denmark', timezone: 'Europe/Copenhagen' },
  { city: 'Aarhus', country: 'Denmark', timezone: 'Europe/Copenhagen' },
  { city: 'Odense', country: 'Denmark', timezone: 'Europe/Copenhagen' },
  { city: 'Oslo', country: 'Norway', timezone: 'Europe/Oslo' },
  { city: 'Bergen', country: 'Norway', timezone: 'Europe/Oslo' },
  { city: 'Trondheim', country: 'Norway', timezone: 'Europe/Oslo' },
  { city: 'Stavanger', country: 'Norway', timezone: 'Europe/Oslo' },
  { city: 'Helsinki', country: 'Finland', timezone: 'Europe/Helsinki' },
  { city: 'Espoo', country: 'Finland', timezone: 'Europe/Helsinki' },
  { city: 'Tampere', country: 'Finland', timezone: 'Europe/Helsinki' },
  { city: 'Turku', country: 'Finland', timezone: 'Europe/Helsinki' },
  { city: 'Reykjavik', country: 'Iceland', timezone: 'Atlantic/Reykjavik' },
  
  // Central Europe
  { city: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna' },
  { city: 'Graz', country: 'Austria', timezone: 'Europe/Vienna' },
  { city: 'Salzburg', country: 'Austria', timezone: 'Europe/Vienna' },
  { city: 'Innsbruck', country: 'Austria', timezone: 'Europe/Vienna' },
  { city: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { city: 'Geneva', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { city: 'Basel', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { city: 'Bern', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { city: 'Lausanne', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { city: 'Prague', country: 'Czech Republic', timezone: 'Europe/Prague' },
  { city: 'Brno', country: 'Czech Republic', timezone: 'Europe/Prague' },
  { city: 'Ostrava', country: 'Czech Republic', timezone: 'Europe/Prague' },
  { city: 'Warsaw', country: 'Poland', timezone: 'Europe/Warsaw' },
  { city: 'Kraków', country: 'Poland', timezone: 'Europe/Warsaw' },
  { city: 'Łódź', country: 'Poland', timezone: 'Europe/Warsaw' },
  { city: 'Wrocław', country: 'Poland', timezone: 'Europe/Warsaw' },
  { city: 'Poznań', country: 'Poland', timezone: 'Europe/Warsaw' },
  { city: 'Gdańsk', country: 'Poland', timezone: 'Europe/Warsaw' },
  { city: 'Budapest', country: 'Hungary', timezone: 'Europe/Budapest' },
  { city: 'Debrecen', country: 'Hungary', timezone: 'Europe/Budapest' },
  { city: 'Bratislava', country: 'Slovakia', timezone: 'Europe/Bratislava' },
  { city: 'Košice', country: 'Slovakia', timezone: 'Europe/Bratislava' },
  { city: 'Ljubljana', country: 'Slovenia', timezone: 'Europe/Ljubljana' },
  
  // Eastern Europe
  { city: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow' },
  { city: 'St. Petersburg', country: 'Russia', timezone: 'Europe/Moscow' },
  { city: 'Novosibirsk', country: 'Russia', timezone: 'Asia/Novosibirsk' },
  { city: 'Yekaterinburg', country: 'Russia', timezone: 'Asia/Yekaterinburg' },
  { city: 'Kazan', country: 'Russia', timezone: 'Europe/Moscow' },
  { city: 'Nizhny Novgorod', country: 'Russia', timezone: 'Europe/Moscow' },
  { city: 'Samara', country: 'Russia', timezone: 'Europe/Samara' },
  { city: 'Vladivostok', country: 'Russia', timezone: 'Asia/Vladivostok' },
  { city: 'Sochi', country: 'Russia', timezone: 'Europe/Moscow' },
  { city: 'Krasnoyarsk', country: 'Russia', timezone: 'Asia/Krasnoyarsk' },
  { city: 'Kyiv', country: 'Ukraine', timezone: 'Europe/Kiev' },
  { city: 'Kharkiv', country: 'Ukraine', timezone: 'Europe/Kiev' },
  { city: 'Odesa', country: 'Ukraine', timezone: 'Europe/Kiev' },
  { city: 'Lviv', country: 'Ukraine', timezone: 'Europe/Kiev' },
  { city: 'Dnipro', country: 'Ukraine', timezone: 'Europe/Kiev' },
  { city: 'Bucharest', country: 'Romania', timezone: 'Europe/Bucharest' },
  { city: 'Cluj-Napoca', country: 'Romania', timezone: 'Europe/Bucharest' },
  { city: 'Timișoara', country: 'Romania', timezone: 'Europe/Bucharest' },
  { city: 'Iași', country: 'Romania', timezone: 'Europe/Bucharest' },
  { city: 'Sofia', country: 'Bulgaria', timezone: 'Europe/Sofia' },
  { city: 'Plovdiv', country: 'Bulgaria', timezone: 'Europe/Sofia' },
  { city: 'Varna', country: 'Bulgaria', timezone: 'Europe/Sofia' },
  { city: 'Belgrade', country: 'Serbia', timezone: 'Europe/Belgrade' },
  { city: 'Novi Sad', country: 'Serbia', timezone: 'Europe/Belgrade' },
  { city: 'Zagreb', country: 'Croatia', timezone: 'Europe/Zagreb' },
  { city: 'Split', country: 'Croatia', timezone: 'Europe/Zagreb' },
  { city: 'Dubrovnik', country: 'Croatia', timezone: 'Europe/Zagreb' },
  { city: 'Sarajevo', country: 'Bosnia', timezone: 'Europe/Sarajevo' },
  { city: 'Skopje', country: 'North Macedonia', timezone: 'Europe/Skopje' },
  { city: 'Tirana', country: 'Albania', timezone: 'Europe/Tirane' },
  { city: 'Podgorica', country: 'Montenegro', timezone: 'Europe/Podgorica' },
  { city: 'Pristina', country: 'Kosovo', timezone: 'Europe/Belgrade' },
  { city: 'Chișinău', country: 'Moldova', timezone: 'Europe/Chisinau' },
  { city: 'Minsk', country: 'Belarus', timezone: 'Europe/Minsk' },
  { city: 'Vilnius', country: 'Lithuania', timezone: 'Europe/Vilnius' },
  { city: 'Kaunas', country: 'Lithuania', timezone: 'Europe/Vilnius' },
  { city: 'Riga', country: 'Latvia', timezone: 'Europe/Riga' },
  { city: 'Tallinn', country: 'Estonia', timezone: 'Europe/Tallinn' },
  { city: 'Tartu', country: 'Estonia', timezone: 'Europe/Tallinn' },
  
  // Middle East
  { city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul' },
  { city: 'Ankara', country: 'Turkey', timezone: 'Europe/Istanbul' },
  { city: 'Izmir', country: 'Turkey', timezone: 'Europe/Istanbul' },
  { city: 'Bursa', country: 'Turkey', timezone: 'Europe/Istanbul' },
  { city: 'Antalya', country: 'Turkey', timezone: 'Europe/Istanbul' },
  { city: 'Adana', country: 'Turkey', timezone: 'Europe/Istanbul' },
  { city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai' },
  { city: 'Abu Dhabi', country: 'UAE', timezone: 'Asia/Dubai' },
  { city: 'Sharjah', country: 'UAE', timezone: 'Asia/Dubai' },
  { city: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Jerusalem' },
  { city: 'Jerusalem', country: 'Israel', timezone: 'Asia/Jerusalem' },
  { city: 'Haifa', country: 'Israel', timezone: 'Asia/Jerusalem' },
  { city: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
  { city: 'Jeddah', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
  { city: 'Mecca', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
  { city: 'Medina', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
  { city: 'Dammam', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
  { city: 'Doha', country: 'Qatar', timezone: 'Asia/Qatar' },
  { city: 'Kuwait City', country: 'Kuwait', timezone: 'Asia/Kuwait' },
  { city: 'Manama', country: 'Bahrain', timezone: 'Asia/Bahrain' },
  { city: 'Muscat', country: 'Oman', timezone: 'Asia/Muscat' },
  { city: 'Amman', country: 'Jordan', timezone: 'Asia/Amman' },
  { city: 'Beirut', country: 'Lebanon', timezone: 'Asia/Beirut' },
  { city: 'Damascus', country: 'Syria', timezone: 'Asia/Damascus' },
  { city: 'Baghdad', country: 'Iraq', timezone: 'Asia/Baghdad' },
  { city: 'Erbil', country: 'Iraq', timezone: 'Asia/Baghdad' },
  { city: 'Tehran', country: 'Iran', timezone: 'Asia/Tehran' },
  { city: 'Isfahan', country: 'Iran', timezone: 'Asia/Tehran' },
  { city: 'Mashhad', country: 'Iran', timezone: 'Asia/Tehran' },
  { city: 'Tabriz', country: 'Iran', timezone: 'Asia/Tehran' },
  { city: 'Shiraz', country: 'Iran', timezone: 'Asia/Tehran' },
  { city: 'Baku', country: 'Azerbaijan', timezone: 'Asia/Baku' },
  { city: 'Tbilisi', country: 'Georgia', timezone: 'Asia/Tbilisi' },
  { city: 'Yerevan', country: 'Armenia', timezone: 'Asia/Yerevan' },
  { city: 'Nicosia', country: 'Cyprus', timezone: 'Asia/Nicosia' },
  
  // South Asia
  { city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Delhi', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Bangalore', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Hyderabad', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Chennai', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Kolkata', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Pune', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Ahmedabad', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Jaipur', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Surat', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Lucknow', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Kanpur', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Nagpur', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Indore', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Thane', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Bhopal', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Visakhapatnam', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Vadodara', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Goa', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Kochi', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Coimbatore', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Chandigarh', country: 'India', timezone: 'Asia/Kolkata' },
  { city: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi' },
  { city: 'Lahore', country: 'Pakistan', timezone: 'Asia/Karachi' },
  { city: 'Islamabad', country: 'Pakistan', timezone: 'Asia/Karachi' },
  { city: 'Faisalabad', country: 'Pakistan', timezone: 'Asia/Karachi' },
  { city: 'Rawalpindi', country: 'Pakistan', timezone: 'Asia/Karachi' },
  { city: 'Peshawar', country: 'Pakistan', timezone: 'Asia/Karachi' },
  { city: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka' },
  { city: 'Chittagong', country: 'Bangladesh', timezone: 'Asia/Dhaka' },
  { city: 'Khulna', country: 'Bangladesh', timezone: 'Asia/Dhaka' },
  { city: 'Colombo', country: 'Sri Lanka', timezone: 'Asia/Colombo' },
  { city: 'Kandy', country: 'Sri Lanka', timezone: 'Asia/Colombo' },
  { city: 'Kathmandu', country: 'Nepal', timezone: 'Asia/Kathmandu' },
  { city: 'Pokhara', country: 'Nepal', timezone: 'Asia/Kathmandu' },
  { city: 'Thimphu', country: 'Bhutan', timezone: 'Asia/Thimphu' },
  { city: 'Malé', country: 'Maldives', timezone: 'Indian/Maldives' },
  
  // Southeast Asia
  { city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore' },
  { city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur' },
  { city: 'George Town', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur' },
  { city: 'Johor Bahru', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur' },
  { city: 'Ipoh', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur' },
  { city: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok' },
  { city: 'Chiang Mai', country: 'Thailand', timezone: 'Asia/Bangkok' },
  { city: 'Phuket', country: 'Thailand', timezone: 'Asia/Bangkok' },
  { city: 'Pattaya', country: 'Thailand', timezone: 'Asia/Bangkok' },
  { city: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta' },
  { city: 'Surabaya', country: 'Indonesia', timezone: 'Asia/Jakarta' },
  { city: 'Bandung', country: 'Indonesia', timezone: 'Asia/Jakarta' },
  { city: 'Medan', country: 'Indonesia', timezone: 'Asia/Jakarta' },
  { city: 'Bali', country: 'Indonesia', timezone: 'Asia/Makassar' },
  { city: 'Yogyakarta', country: 'Indonesia', timezone: 'Asia/Jakarta' },
  { city: 'Makassar', country: 'Indonesia', timezone: 'Asia/Makassar' },
  { city: 'Manila', country: 'Philippines', timezone: 'Asia/Manila' },
  { city: 'Quezon City', country: 'Philippines', timezone: 'Asia/Manila' },
  { city: 'Cebu', country: 'Philippines', timezone: 'Asia/Manila' },
  { city: 'Davao', country: 'Philippines', timezone: 'Asia/Manila' },
  { city: 'Ho Chi Minh City', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
  { city: 'Hanoi', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
  { city: 'Da Nang', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
  { city: 'Nha Trang', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
  { city: 'Phnom Penh', country: 'Cambodia', timezone: 'Asia/Phnom_Penh' },
  { city: 'Siem Reap', country: 'Cambodia', timezone: 'Asia/Phnom_Penh' },
  { city: 'Vientiane', country: 'Laos', timezone: 'Asia/Vientiane' },
  { city: 'Yangon', country: 'Myanmar', timezone: 'Asia/Yangon' },
  { city: 'Mandalay', country: 'Myanmar', timezone: 'Asia/Yangon' },
  { city: 'Brunei', country: 'Brunei', timezone: 'Asia/Brunei' },
  { city: 'Dili', country: 'Timor-Leste', timezone: 'Asia/Dili' },
  
  // East Asia
  { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Yokohama', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Osaka', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Nagoya', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Sapporo', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Fukuoka', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Kobe', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Kyoto', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Kawasaki', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Hiroshima', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Sendai', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Okinawa', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul' },
  { city: 'Busan', country: 'South Korea', timezone: 'Asia/Seoul' },
  { city: 'Incheon', country: 'South Korea', timezone: 'Asia/Seoul' },
  { city: 'Daegu', country: 'South Korea', timezone: 'Asia/Seoul' },
  { city: 'Daejeon', country: 'South Korea', timezone: 'Asia/Seoul' },
  { city: 'Gwangju', country: 'South Korea', timezone: 'Asia/Seoul' },
  { city: 'Jeju', country: 'South Korea', timezone: 'Asia/Seoul' },
  { city: 'Beijing', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Guangzhou', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Shenzhen', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Chengdu', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Hangzhou', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Wuhan', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Xi\'an', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Chongqing', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Tianjin', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Nanjing', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Suzhou', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Qingdao', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Dalian', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Xiamen', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Kunming', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Harbin', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Shenyang', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
  { city: 'Macau', country: 'Macau', timezone: 'Asia/Macau' },
  { city: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei' },
  { city: 'Kaohsiung', country: 'Taiwan', timezone: 'Asia/Taipei' },
  { city: 'Taichung', country: 'Taiwan', timezone: 'Asia/Taipei' },
  { city: 'Tainan', country: 'Taiwan', timezone: 'Asia/Taipei' },
  { city: 'Ulaanbaatar', country: 'Mongolia', timezone: 'Asia/Ulaanbaatar' },
  { city: 'Pyongyang', country: 'North Korea', timezone: 'Asia/Pyongyang' },
  
  // Central Asia
  { city: 'Almaty', country: 'Kazakhstan', timezone: 'Asia/Almaty' },
  { city: 'Nur-Sultan', country: 'Kazakhstan', timezone: 'Asia/Almaty' },
  { city: 'Tashkent', country: 'Uzbekistan', timezone: 'Asia/Tashkent' },
  { city: 'Samarkand', country: 'Uzbekistan', timezone: 'Asia/Tashkent' },
  { city: 'Bishkek', country: 'Kyrgyzstan', timezone: 'Asia/Bishkek' },
  { city: 'Dushanbe', country: 'Tajikistan', timezone: 'Asia/Dushanbe' },
  { city: 'Ashgabat', country: 'Turkmenistan', timezone: 'Asia/Ashgabat' },
  { city: 'Kabul', country: 'Afghanistan', timezone: 'Asia/Kabul' },
  
  // Africa - North
  { city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo' },
  { city: 'Alexandria', country: 'Egypt', timezone: 'Africa/Cairo' },
  { city: 'Giza', country: 'Egypt', timezone: 'Africa/Cairo' },
  { city: 'Luxor', country: 'Egypt', timezone: 'Africa/Cairo' },
  { city: 'Sharm El Sheikh', country: 'Egypt', timezone: 'Africa/Cairo' },
  { city: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca' },
  { city: 'Marrakech', country: 'Morocco', timezone: 'Africa/Casablanca' },
  { city: 'Rabat', country: 'Morocco', timezone: 'Africa/Casablanca' },
  { city: 'Fez', country: 'Morocco', timezone: 'Africa/Casablanca' },
  { city: 'Tangier', country: 'Morocco', timezone: 'Africa/Casablanca' },
  { city: 'Agadir', country: 'Morocco', timezone: 'Africa/Casablanca' },
  { city: 'Algiers', country: 'Algeria', timezone: 'Africa/Algiers' },
  { city: 'Oran', country: 'Algeria', timezone: 'Africa/Algiers' },
  { city: 'Constantine', country: 'Algeria', timezone: 'Africa/Algiers' },
  { city: 'Tunis', country: 'Tunisia', timezone: 'Africa/Tunis' },
  { city: 'Sousse', country: 'Tunisia', timezone: 'Africa/Tunis' },
  { city: 'Tripoli', country: 'Libya', timezone: 'Africa/Tripoli' },
  { city: 'Benghazi', country: 'Libya', timezone: 'Africa/Tripoli' },
  { city: 'Khartoum', country: 'Sudan', timezone: 'Africa/Khartoum' },
  
  // Africa - West
  { city: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos' },
  { city: 'Kano', country: 'Nigeria', timezone: 'Africa/Lagos' },
  { city: 'Ibadan', country: 'Nigeria', timezone: 'Africa/Lagos' },
  { city: 'Abuja', country: 'Nigeria', timezone: 'Africa/Lagos' },
  { city: 'Port Harcourt', country: 'Nigeria', timezone: 'Africa/Lagos' },
  { city: 'Accra', country: 'Ghana', timezone: 'Africa/Accra' },
  { city: 'Kumasi', country: 'Ghana', timezone: 'Africa/Accra' },
  { city: 'Dakar', country: 'Senegal', timezone: 'Africa/Dakar' },
  { city: 'Abidjan', country: 'Ivory Coast', timezone: 'Africa/Abidjan' },
  { city: 'Bamako', country: 'Mali', timezone: 'Africa/Bamako' },
  { city: 'Ouagadougou', country: 'Burkina Faso', timezone: 'Africa/Ouagadougou' },
  { city: 'Conakry', country: 'Guinea', timezone: 'Africa/Conakry' },
  { city: 'Lomé', country: 'Togo', timezone: 'Africa/Lome' },
  { city: 'Cotonou', country: 'Benin', timezone: 'Africa/Porto-Novo' },
  { city: 'Niamey', country: 'Niger', timezone: 'Africa/Niamey' },
  { city: 'Nouakchott', country: 'Mauritania', timezone: 'Africa/Nouakchott' },
  { city: 'Freetown', country: 'Sierra Leone', timezone: 'Africa/Freetown' },
  { city: 'Monrovia', country: 'Liberia', timezone: 'Africa/Monrovia' },
  { city: 'Banjul', country: 'Gambia', timezone: 'Africa/Banjul' },
  { city: 'Bissau', country: 'Guinea-Bissau', timezone: 'Africa/Bissau' },
  { city: 'Praia', country: 'Cape Verde', timezone: 'Atlantic/Cape_Verde' },
  
  // Africa - East
  { city: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi' },
  { city: 'Mombasa', country: 'Kenya', timezone: 'Africa/Nairobi' },
  { city: 'Addis Ababa', country: 'Ethiopia', timezone: 'Africa/Addis_Ababa' },
  { city: 'Dar es Salaam', country: 'Tanzania', timezone: 'Africa/Dar_es_Salaam' },
  { city: 'Zanzibar', country: 'Tanzania', timezone: 'Africa/Dar_es_Salaam' },
  { city: 'Arusha', country: 'Tanzania', timezone: 'Africa/Dar_es_Salaam' },
  { city: 'Kampala', country: 'Uganda', timezone: 'Africa/Kampala' },
  { city: 'Kigali', country: 'Rwanda', timezone: 'Africa/Kigali' },
  { city: 'Bujumbura', country: 'Burundi', timezone: 'Africa/Bujumbura' },
  { city: 'Mogadishu', country: 'Somalia', timezone: 'Africa/Mogadishu' },
  { city: 'Asmara', country: 'Eritrea', timezone: 'Africa/Asmara' },
  { city: 'Djibouti', country: 'Djibouti', timezone: 'Africa/Djibouti' },
  { city: 'Juba', country: 'South Sudan', timezone: 'Africa/Juba' },
  { city: 'Antananarivo', country: 'Madagascar', timezone: 'Indian/Antananarivo' },
  { city: 'Port Louis', country: 'Mauritius', timezone: 'Indian/Mauritius' },
  { city: 'Victoria', country: 'Seychelles', timezone: 'Indian/Mahe' },
  
  // Africa - South & Central
  { city: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { city: 'Cape Town', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { city: 'Durban', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { city: 'Pretoria', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { city: 'Port Elizabeth', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { city: 'Bloemfontein', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { city: 'Windhoek', country: 'Namibia', timezone: 'Africa/Windhoek' },
  { city: 'Gaborone', country: 'Botswana', timezone: 'Africa/Gaborone' },
  { city: 'Harare', country: 'Zimbabwe', timezone: 'Africa/Harare' },
  { city: 'Lusaka', country: 'Zambia', timezone: 'Africa/Lusaka' },
  { city: 'Lilongwe', country: 'Malawi', timezone: 'Africa/Blantyre' },
  { city: 'Maputo', country: 'Mozambique', timezone: 'Africa/Maputo' },
  { city: 'Mbabane', country: 'Eswatini', timezone: 'Africa/Mbabane' },
  { city: 'Maseru', country: 'Lesotho', timezone: 'Africa/Maseru' },
  { city: 'Kinshasa', country: 'DR Congo', timezone: 'Africa/Kinshasa' },
  { city: 'Lubumbashi', country: 'DR Congo', timezone: 'Africa/Lubumbashi' },
  { city: 'Brazzaville', country: 'Congo', timezone: 'Africa/Brazzaville' },
  { city: 'Luanda', country: 'Angola', timezone: 'Africa/Luanda' },
  { city: 'Douala', country: 'Cameroon', timezone: 'Africa/Douala' },
  { city: 'Yaoundé', country: 'Cameroon', timezone: 'Africa/Douala' },
  { city: 'Libreville', country: 'Gabon', timezone: 'Africa/Libreville' },
  { city: 'Bangui', country: 'Central African Republic', timezone: 'Africa/Bangui' },
  { city: 'N\'Djamena', country: 'Chad', timezone: 'Africa/Ndjamena' },
  { city: 'Malabo', country: 'Equatorial Guinea', timezone: 'Africa/Malabo' },
  { city: 'São Tomé', country: 'São Tomé', timezone: 'Africa/Sao_Tome' },
  
  // Oceania
  { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
  { city: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne' },
  { city: 'Brisbane', country: 'Australia', timezone: 'Australia/Brisbane' },
  { city: 'Perth', country: 'Australia', timezone: 'Australia/Perth' },
  { city: 'Adelaide', country: 'Australia', timezone: 'Australia/Adelaide' },
  { city: 'Gold Coast', country: 'Australia', timezone: 'Australia/Brisbane' },
  { city: 'Newcastle', country: 'Australia', timezone: 'Australia/Sydney' },
  { city: 'Canberra', country: 'Australia', timezone: 'Australia/Sydney' },
  { city: 'Hobart', country: 'Australia', timezone: 'Australia/Hobart' },
  { city: 'Darwin', country: 'Australia', timezone: 'Australia/Darwin' },
  { city: 'Cairns', country: 'Australia', timezone: 'Australia/Brisbane' },
  { city: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland' },
  { city: 'Wellington', country: 'New Zealand', timezone: 'Pacific/Auckland' },
  { city: 'Christchurch', country: 'New Zealand', timezone: 'Pacific/Auckland' },
  { city: 'Hamilton', country: 'New Zealand', timezone: 'Pacific/Auckland' },
  { city: 'Queenstown', country: 'New Zealand', timezone: 'Pacific/Auckland' },
  { city: 'Suva', country: 'Fiji', timezone: 'Pacific/Fiji' },
  { city: 'Port Moresby', country: 'Papua New Guinea', timezone: 'Pacific/Port_Moresby' },
  { city: 'Noumea', country: 'New Caledonia', timezone: 'Pacific/Noumea' },
  { city: 'Papeete', country: 'French Polynesia', timezone: 'Pacific/Tahiti' },
  { city: 'Apia', country: 'Samoa', timezone: 'Pacific/Apia' },
  { city: 'Nuku\'alofa', country: 'Tonga', timezone: 'Pacific/Tongatapu' },
  { city: 'Port Vila', country: 'Vanuatu', timezone: 'Pacific/Efate' },
  { city: 'Honiara', country: 'Solomon Islands', timezone: 'Pacific/Guadalcanal' },
  { city: 'Tarawa', country: 'Kiribati', timezone: 'Pacific/Tarawa' },
  { city: 'Majuro', country: 'Marshall Islands', timezone: 'Pacific/Majuro' },
  { city: 'Palikir', country: 'Micronesia', timezone: 'Pacific/Pohnpei' },
  { city: 'Koror', country: 'Palau', timezone: 'Pacific/Palau' },
  { city: 'Hagåtña', country: 'Guam', timezone: 'Pacific/Guam' },
  { city: 'Saipan', country: 'Northern Mariana Islands', timezone: 'Pacific/Guam' },
];

// Helper functions
const getLocalTime = (timezone) => {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const getLocalHour = (timezone) => {
  const timeStr = new Date().toLocaleString('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    hour12: false
  });
  return parseInt(timeStr);
};

const isInAvailabilityWindow = (hour, windows) => {
  return windows.some(w => {
    if (w.start < w.end) {
      return hour >= w.start && hour < w.end;
    } else {
      return hour >= w.start || hour < w.end;
    }
  });
};

const isInFringeHours = (hour, windows) => {
  return windows.some(w => {
    const beforeStart = (w.start - 1 + 24) % 24;
    const afterEnd = w.end % 24;
    return hour === beforeStart || hour === afterEnd;
  });
};

const getMemberStatus = (member) => {
  const timezone = member.tempLocation?.timezone || member.homeLocation.timezone;
  const hour = getLocalHour(timezone);
  
  if (isInAvailabilityWindow(hour, member.availability)) {
    return 'available';
  }
  if (isInFringeHours(hour, member.availability)) {
    return 'fringe';
  }
  return 'offline';
};

const getStatusEmoji = (status) => {
  switch (status) {
    case 'available': return '☀️';
    case 'fringe': return '🌅';
    case 'offline': return '🌙';
    default: return '🌙';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'available': return 'Available';
    case 'fringe': return 'Almost there';
    case 'offline': return 'Offline';
    default: return 'Offline';
  }
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const getAvailableCount = (members) => {
  return members.filter(m => getMemberStatus(m) === 'available').length;
};

// Convert UTC hour to user's local time
const utcToLocalTime = (utcHour, userTimezone) => {
  const now = new Date();
  const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), utcHour));
  return utcDate.toLocaleTimeString('en-US', {
    timeZone: userTimezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Calculate overlap data
const calculateOverlap = (members) => {
  if (members.length === 0) return [];
  
  const hours = Array.from({ length: 24 }, (_, hour) => {
    let availableCount = 0;
    
    members.forEach(member => {
      const timezone = member.tempLocation?.timezone || member.homeLocation.timezone;
      const now = new Date();
      const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hour));
      const memberHour = parseInt(utcDate.toLocaleString('en-US', { timeZone: timezone, hour: 'numeric', hour12: false }));
      
      if (isInAvailabilityWindow(memberHour, member.availability)) {
        availableCount++;
      }
    });
    
    return { hour, availableCount };
  });
  
  return hours;
};

// Storage helpers
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('breakrooms-v5');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (rooms) => {
  localStorage.setItem('breakrooms-v5', JSON.stringify(rooms));
};

const loadProfile = () => {
  try {
    const data = localStorage.getItem('breakroom-profile-v2');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveProfile = (profile) => {
  localStorage.setItem('breakroom-profile-v2', JSON.stringify(profile));
};

const loadTags = () => {
  try {
    const data = localStorage.getItem('breakroom-tags');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveTags = (tags) => {
  localStorage.setItem('breakroom-tags', JSON.stringify(tags));
};

// Fuzzy search helper
const fuzzySearch = (query, items) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  return items
    .filter(item => {
      const cityMatch = item.city.toLowerCase().includes(q);
      const countryMatch = item.country.toLowerCase().includes(q);
      return cityMatch || countryMatch;
    })
    .sort((a, b) => {
      const aStarts = a.city.toLowerCase().startsWith(q);
      const bStarts = b.city.toLowerCase().startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.city.localeCompare(b.city);
    })
    .slice(0, 8);
};

// Avatar component
const Avatar = ({ name, status, size = 'md', isYou = false }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg'
  };
  
  const statusColors = {
    available: 'from-amber-400 to-orange-500 shadow-amber-500/30',
    fringe: 'from-purple-400 to-pink-500 shadow-purple-500/30',
    offline: 'from-slate-500 to-slate-600 shadow-slate-500/20'
  };
  
  return (
    <div className="relative">
      <div 
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${statusColors[status]} 
          flex items-center justify-center font-semibold text-white shadow-lg
          transition-all duration-500 ${isYou ? 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-900' : ''}`}
      >
        {initials}
      </div>
      {isYou && size !== 'sm' && (
        <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
          You
        </div>
      )}
    </div>
  );
};

// Room Avatar Picker
const RoomAvatarPicker = ({ isOpen, onClose, onSelect, currentAvatar }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-6 w-full max-w-md
        shadow-2xl shadow-black/50 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Choose Room Icon</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {ROOM_AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => { onSelect(avatar.id); onClose(); }}
              className={`aspect-square rounded-xl flex items-center justify-center text-3xl
                transition-all hover:scale-110 ${currentAvatar === avatar.id 
                  ? 'bg-amber-500/30 border-2 border-amber-500' 
                  : 'bg-slate-700/50 border border-slate-600 hover:border-slate-500'}`}
              title={avatar.label}
            >
              {avatar.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tag Filter Modal (for home screen filtering)
const TagFilterModal = ({ isOpen, onClose, tags, selectedTags, onToggleTag, onAddTag, onDeleteTag }) => {
  const [newTag, setNewTag] = useState('');
  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b));
  
  const handleAdd = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      onAddTag(newTag.trim().toLowerCase());
      setNewTag('');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter by Tags 🏷️">
      <div className="space-y-4">
        <p className="text-slate-400 text-sm">
          Select tags to filter your break rooms. Create new tags here, then assign them to rooms.
        </p>
        
        {/* Add new tag */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Create new tag..."
            className="flex-1 px-4 py-2 rounded-xl bg-slate-700/50 border border-slate-600 
              text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
          <button
            onClick={handleAdd}
            disabled={!newTag.trim()}
            className="px-4 py-2 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-400 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        
        {/* Tag list */}
        <div className="space-y-2">
          {sortedTags.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">
              No tags yet. Create one above, then assign it to your rooms!
            </p>
          ) : (
            sortedTags.map(tag => (
              <div key={tag} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
                <button
                  onClick={() => onToggleTag(tag)}
                  className="flex items-center gap-3 flex-1"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                    ${selectedTags.includes(tag) 
                      ? 'bg-amber-500 border-amber-500' 
                      : 'border-slate-500'}`}
                  >
                    {selectedTags.includes(tag) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <span className="text-white">{tag}</span>
                </button>
                <button
                  onClick={() => onDeleteTag(tag)}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                  title="Delete tag"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        
        {selectedTags.length > 0 && (
          <div className="pt-2 border-t border-slate-700">
            <button
              onClick={() => selectedTags.forEach(t => onToggleTag(t))}
              className="text-sm text-slate-400 hover:text-slate-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

// Room Tags Editor (for editing tags within a room)
const RoomTagsEditor = ({ roomTags = [], availableTags, onUpdateTags }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const toggleTag = (tag) => {
    if (roomTags.includes(tag)) {
      onUpdateTags(roomTags.filter(t => t !== tag));
    } else {
      onUpdateTags([...roomTags, tag]);
    }
  };
  
  if (!isEditing) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {roomTags.length > 0 ? (
          roomTags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg">
              {tag}
            </span>
          ))
        ) : (
          <span className="text-slate-500 text-sm">No tags</span>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs text-amber-400 hover:text-amber-300 ml-1"
        >
          {roomTags.length > 0 ? 'Edit' : '+ Add tags'}
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {availableTags.length === 0 ? (
          <p className="text-slate-500 text-sm">
            No tags created yet. Create tags from the Filter menu on the home screen.
          </p>
        ) : (
          availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                roomTags.includes(tag)
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
              }`}
            >
              {tag}
            </button>
          ))
        )}
      </div>
      <button
        onClick={() => setIsEditing(false)}
        className="text-xs text-slate-400 hover:text-slate-300"
      >
        Done
      </button>
    </div>
  );
};

// City Search Input
const CitySearch = ({ value, onChange, placeholder = "Search city..." }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const results = useMemo(() => fuzzySearch(query, CITY_DATABASE), [query]);
  
  useEffect(() => {
    if (value) {
      setQuery(`${value.city}, ${value.country}`);
    } else {
      setQuery('');
    }
  }, [value]);
  
  const handleSelect = (city) => {
    onChange({ city: city.city, country: city.country, timezone: city.timezone });
    setQuery(`${city.city}, ${city.country}`);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          if (!e.target.value) onChange(null);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 
          text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50
          transition-colors"
      />
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl 
          shadow-xl overflow-hidden">
          {results.map((city, i) => (
            <button
              key={`${city.city}-${city.country}-${i}`}
              onMouseDown={() => handleSelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors
                flex items-center justify-between"
            >
              <span className="text-white">{city.city}</span>
              <span className="text-slate-400 text-sm">{city.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Overlap Visualization
const OverlapChart = ({ members, userProfile }) => {
  const [threshold, setThreshold] = useState(2);
  const overlapData = useMemo(() => calculateOverlap(members), [members]);
  
  const maxMembers = members.length;
  const thresholds = Array.from({ length: maxMembers }, (_, i) => i + 1).filter(t => t >= 2);
  
  const hoursAboveThreshold = overlapData.filter(h => h.availableCount >= threshold).length;
  
  const getBestWindow = () => {
    let bestStart = -1;
    let bestLength = 0;
    let currentStart = -1;
    let currentLength = 0;
    
    for (let i = 0; i < 48; i++) {
      const hour = i % 24;
      if (overlapData[hour].availableCount >= threshold) {
        if (currentStart === -1) currentStart = hour;
        currentLength++;
      } else {
        if (currentLength > bestLength) {
          bestStart = currentStart;
          bestLength = currentLength;
        }
        currentStart = -1;
        currentLength = 0;
      }
    }
    if (currentLength > bestLength) {
      bestStart = currentStart;
      bestLength = currentLength;
    }
    
    if (bestStart === -1) return null;
    return { start: bestStart, end: (bestStart + Math.min(bestLength, 24)) % 24, length: Math.min(bestLength, 24) };
  };
  
  const bestWindow = getBestWindow();
  
  const formatHour = (h) => {
    if (h === 0) return '12am';
    if (h === 12) return '12pm';
    if (h < 12) return `${h}am`;
    return `${h - 12}pm`;
  };
  
  const getBarColor = (count) => {
    if (count === 0) return 'bg-slate-700/30';
    if (count < threshold) return 'bg-slate-600/50';
    const intensity = count / maxMembers;
    if (intensity >= 0.8) return 'bg-amber-400';
    if (intensity >= 0.6) return 'bg-amber-500';
    if (intensity >= 0.4) return 'bg-orange-500';
    return 'bg-orange-600';
  };
  
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Team Overlap</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Show when</span>
          <div className="flex gap-1">
            {thresholds.map(t => (
              <button
                key={t}
                onClick={() => setThreshold(t)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${threshold === t 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
              >
                {t}+
              </button>
            ))}
            <button
              onClick={() => setThreshold(maxMembers)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                ${threshold === maxMembers 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              All
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex mb-1">
        {[0, 6, 12, 18].map(h => (
          <div key={h} className="flex-1 text-xs text-slate-500">{formatHour(h)}</div>
        ))}
      </div>
      
      <div className="flex gap-0.5 h-16 items-end mb-4">
        {overlapData.map(({ hour, availableCount }) => (
          <div
            key={hour}
            className={`flex-1 rounded-t transition-all duration-300 ${getBarColor(availableCount)}
              ${availableCount >= threshold ? 'opacity-100' : 'opacity-40'}`}
            style={{ height: `${Math.max((availableCount / maxMembers) * 100, 8)}%` }}
            title={`${formatHour(hour)} UTC: ${availableCount} available`}
          />
        ))}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="text-slate-400">
            <span className="text-amber-400 font-semibold">{hoursAboveThreshold} hours</span>
            {' '}with {threshold}+ people available
          </div>
        </div>
        {bestWindow && (
          <div className="space-y-1">
            <div className="text-slate-400">
              Best window: <span className="text-white font-medium">
                {formatHour(bestWindow.start)}–{formatHour(bestWindow.end)} UTC
              </span>
            </div>
            {userProfile && (
              <div className="text-slate-400">
                Your time: <span className="text-teal-400 font-medium">
                  {utcToLocalTime(bestWindow.start, userProfile.homeLocation.timezone)}–{utcToLocalTime(bestWindow.end, userProfile.homeLocation.timezone)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Member card component
const MemberCard = ({ member, onEdit, onDelete, isYou = false }) => {
  const status = getMemberStatus(member);
  const currentLocation = member.tempLocation || member.homeLocation;
  const localTime = getLocalTime(currentLocation.timezone);
  
  const statusBg = {
    available: 'bg-amber-500/10 border-amber-500/30',
    fringe: 'bg-purple-500/10 border-purple-500/30',
    offline: 'bg-slate-500/10 border-slate-500/30'
  };
  
  const formatAvailability = (windows) => {
    return windows.map(w => `${w.start}:00–${w.end}:00`).join(', ');
  };
  
  return (
    <div className={`relative p-5 rounded-2xl border ${statusBg[status]} 
      backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] group
      ${isYou ? 'ring-1 ring-teal-500/30' : ''}`}>
      <div className="flex items-start gap-4">
        <Avatar name={member.name} status={status} size="lg" isYou={isYou} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg truncate">
            {member.name}
            {isYou && <span className="text-teal-400 text-sm font-normal ml-2">(You)</span>}
          </h3>
          <p className="text-slate-400 text-sm">{currentLocation.city}, {currentLocation.country}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl font-light text-white">{localTime}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg">{getStatusEmoji(status)}</span>
            <span className="text-sm text-slate-400">{getStatusLabel(status)}</span>
          </div>
          {member.tempLocation && (
            <div className="mt-2 px-2 py-1 bg-teal-500/20 border border-teal-500/30 rounded-lg inline-block">
              <span className="text-xs text-teal-300">
                🧭 On an adventure • back {member.tempUntil}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          onClick={() => onEdit(member)}
          className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-colors"
        >
          ✏️
        </button>
        {!isYou && (
          <button
            onClick={() => onDelete(member.id)}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/30 text-slate-300 hover:text-red-300 transition-colors"
          >
            ×
          </button>
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-700/50">
        <p className="text-xs text-slate-500">
          Available: {formatAvailability(member.availability)}
        </p>
      </div>
    </div>
  );
};

// Room card component - compact for grid layout
const RoomCard = ({ room, onClick, onAvatarClick }) => {
  const availableCount = getAvailableCount(room.members);
  const totalCount = room.members.length;
  const roomAvatar = ROOM_AVATARS.find(a => a.id === room.avatar) || ROOM_AVATARS[0];
  
  const vibeIntensity = totalCount > 0 ? availableCount / totalCount : 0;
  const vibeBg = vibeIntensity > 0.5 
    ? 'from-amber-900/30 to-orange-900/20' 
    : vibeIntensity > 0 
      ? 'from-purple-900/20 to-slate-900/30'
      : 'from-slate-800/50 to-slate-900/50';
  
  return (
    <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${vibeBg} border border-slate-700/50
      hover:border-slate-600 transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center gap-3">
        <button onClick={onClick} className="flex-1 text-left min-w-0">
          <h3 className="font-semibold text-white text-base truncate mb-1">{room.name}</h3>
          {room.tags && room.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {room.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs px-1.5 py-0.5 bg-slate-700/50 text-slate-400 rounded">
                  {tag}
                </span>
              ))}
              {room.tags.length > 2 && (
                <span className="text-xs text-slate-500">+{room.tags.length - 2}</span>
              )}
            </div>
          )}
          <div className="flex items-center gap-1 mb-2">
            {room.members.slice(0, 4).map((member) => (
              <Avatar key={member.id} name={member.name} status={getMemberStatus(member)} size="sm" />
            ))}
            {room.members.length > 4 && (
              <span className="text-slate-400 text-xs">+{room.members.length - 4}</span>
            )}
          </div>
          {totalCount > 0 ? (
            <p className="text-slate-400 text-xs">
              <span className={availableCount > 0 ? 'text-amber-400' : 'text-slate-500'}>
                {availableCount}/{totalCount}
              </span>
              {' '}available
            </p>
          ) : (
            <p className="text-slate-500 text-xs">Empty</p>
          )}
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onAvatarClick(); }}
          className="w-20 h-20 rounded-xl bg-slate-700/50 border border-slate-600 
            flex items-center justify-center text-4xl hover:bg-slate-600/50 
            hover:border-slate-500 transition-all shrink-0 self-center"
          title="Change icon"
        >
          {roomAvatar.emoji}
        </button>
      </div>
    </div>
  );
};

// Modal component
const Modal = ({ isOpen, onClose, title, children, wide = false }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-slate-800 border border-slate-700 rounded-3xl p-6 w-full 
        ${wide ? 'max-w-2xl' : 'max-w-md'}
        shadow-2xl shadow-black/50 max-h-[85vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-800 pb-2">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Input component
const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm text-slate-400 mb-2">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 
        text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50
        transition-colors"
    />
  </div>
);

// Help Modal
const HelpModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Welcome to Break Room ☕" wide>
    <div className="space-y-6">
      <p className="text-slate-300">
        Break Room helps you keep track of when your people are available across time zones. 
        No more mental math, no more accidentally pinging someone at 3am.
      </p>
      
      <div>
        <h3 className="text-white font-semibold mb-3">How it works</h3>
        <ol className="list-decimal list-inside space-y-2 text-slate-400">
          <li>Set up your profile with your name and location</li>
          <li>Create break rooms for different groups</li>
          <li>Add members with their locations and availability windows</li>
          <li>Check in anytime to see who's around</li>
        </ol>
      </div>
      
      <div>
        <h3 className="text-white font-semibold mb-3">Perfect for</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { emoji: '💼', title: 'Remote team standups', desc: 'Find the best time for async or sync meetings' },
            { emoji: '📹', title: 'Coworker Zoom calls', desc: 'Schedule 1:1s when everyone\'s awake' },
            { emoji: '👨‍👩‍👧‍👦', title: 'Family FaceTime', desc: 'Know when grandma is awake in another country' },
            { emoji: '🔐', title: 'Multisig signing', desc: 'Coordinate crypto transaction signing across timezones' },
            { emoji: '🎮', title: 'Gaming sessions', desc: 'Find overlap for multiplayer with global friends' },
            { emoji: '📚', title: 'Study groups', desc: 'Coordinate international study sessions' },
            { emoji: '🎵', title: 'Band practice', desc: 'Schedule remote jam sessions across continents' },
            { emoji: '🏢', title: 'Client calls', desc: 'Find reasonable hours for international clients' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-slate-700/30 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span>{item.emoji}</span>
                <span className="text-white font-medium">{item.title}</span>
              </div>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-white font-semibold mb-3">Status indicators</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span>☀️</span>
            <span className="text-slate-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌅</span>
            <span className="text-slate-400">Almost there</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌙</span>
            <span className="text-slate-400">Offline</span>
          </div>
        </div>
      </div>
      
      <p className="text-slate-500 text-sm">
        All data is stored locally in your browser. No account needed, no data leaves your device.
      </p>
    </div>
  </Modal>
);

// Contact Modal
const ContactModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Contact Us 💌">
    <div className="space-y-4">
      <p className="text-slate-300">
        Have feedback, found a bug, or want to request a feature? We'd love to hear from you!
      </p>
      <div className="p-4 bg-slate-700/30 rounded-xl">
        <p className="text-white font-medium mb-1">Email us at</p>
        <a href="mailto:hello@whoawake.com" className="text-amber-400 hover:text-amber-300">
          hello@whoawake.com
        </a>
      </div>
      <p className="text-slate-500 text-sm">
        We typically respond within 24-48 hours.
      </p>
    </div>
  </Modal>
);

// Stats Modal
const StatsModal = ({ isOpen, onClose, rooms, profile }) => {
  const allMembers = rooms.flatMap(r => r.members);
  
  // Deduplicate members by name for stats
  const uniqueMembersByName = useMemo(() => {
    const seen = new Map();
    allMembers.forEach(m => {
      if (!seen.has(m.name.toLowerCase())) {
        seen.set(m.name.toLowerCase(), m);
      }
    });
    return Array.from(seen.values());
  }, [allMembers]);
  
  const uniqueTimezones = [...new Set(uniqueMembersByName.map(m => m.tempLocation?.timezone || m.homeLocation.timezone))];
  const uniqueCountries = [...new Set(uniqueMembersByName.map(m => m.tempLocation?.country || m.homeLocation.country))];
  
  // Calculate most common availability hour
  const hourCounts = {};
  uniqueMembersByName.forEach(member => {
    member.availability.forEach(window => {
      for (let h = window.start; h < window.end; h++) {
        hourCounts[h] = (hourCounts[h] || 0) + 1;
      }
    });
  });
  const peakHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
  
  // Calculate global overlap
  const globalOverlap = calculateOverlap(uniqueMembersByName);
  const bestGlobalHours = globalOverlap.filter(h => h.availableCount >= Math.ceil(uniqueMembersByName.length * 0.5)).length;
  
  // Traveling count
  const travelingCount = uniqueMembersByName.filter(m => m.tempLocation).length;
  
  // Status distribution
  const statusCounts = {
    available: uniqueMembersByName.filter(m => getMemberStatus(m) === 'available').length,
    fringe: uniqueMembersByName.filter(m => getMemberStatus(m) === 'fringe').length,
    offline: uniqueMembersByName.filter(m => getMemberStatus(m) === 'offline').length,
  };
  
  const formatHour = (h) => {
    if (h === 0) return '12am';
    if (h === 12) return '12pm';
    if (h < 12) return `${h}am`;
    return `${h - 12}pm`;
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Your Stats 📊" wide>
      <div className="space-y-6">
        {rooms.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            Create some break rooms and add members to see your stats!
          </p>
        ) : (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-amber-400">{rooms.length}</div>
                <div className="text-slate-400 text-sm">Break Rooms</div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-teal-400">{uniqueMembersByName.length}</div>
                <div className="text-slate-400 text-sm">Unique People</div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">{uniqueTimezones.length}</div>
                <div className="text-slate-400 text-sm">Time Zones</div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-pink-400">{uniqueCountries.length}</div>
                <div className="text-slate-400 text-sm">Countries</div>
              </div>
            </div>
            
            {/* Status Distribution */}
            {uniqueMembersByName.length > 0 && (
              <div className="bg-slate-700/30 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-3">Right Now</h3>
                <div className="flex gap-2 h-8 rounded-lg overflow-hidden">
                  {statusCounts.available > 0 && (
                    <div 
                      className="bg-amber-500 flex items-center justify-center text-white text-sm font-medium"
                      style={{ width: `${(statusCounts.available / uniqueMembersByName.length) * 100}%` }}
                    >
                      {statusCounts.available} ☀️
                    </div>
                  )}
                  {statusCounts.fringe > 0 && (
                    <div 
                      className="bg-purple-500 flex items-center justify-center text-white text-sm font-medium"
                      style={{ width: `${(statusCounts.fringe / uniqueMembersByName.length) * 100}%` }}
                    >
                      {statusCounts.fringe} 🌅
                    </div>
                  )}
                  {statusCounts.offline > 0 && (
                    <div 
                      className="bg-slate-600 flex items-center justify-center text-white text-sm font-medium"
                      style={{ width: `${(statusCounts.offline / uniqueMembersByName.length) * 100}%` }}
                    >
                      {statusCounts.offline} 🌙
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Fun Facts */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Fun Facts</h3>
              
              {peakHour && (
                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <div className="text-white">Peak availability hour</div>
                    <div className="text-slate-400 text-sm">{formatHour(parseInt(peakHour[0]))} local time ({peakHour[1]} people)</div>
                  </div>
                </div>
              )}
              
              {bestGlobalHours > 0 && (
                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <div className="text-white">Global overlap</div>
                    <div className="text-slate-400 text-sm">{bestGlobalHours} hours where 50%+ of everyone is available</div>
                  </div>
                </div>
              )}
              
              {travelingCount > 0 && (
                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                  <span className="text-2xl">🧭</span>
                  <div>
                    <div className="text-white">On an adventure</div>
                    <div className="text-slate-400 text-sm">{travelingCount} {travelingCount === 1 ? 'person is' : 'people are'} currently traveling</div>
                  </div>
                </div>
              )}
              
              {uniqueCountries.length > 1 && (
                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <div className="text-white">Your reach</div>
                    <div className="text-slate-400 text-sm">Spanning {uniqueCountries.slice(0, 5).join(', ')}{uniqueCountries.length > 5 ? ` and ${uniqueCountries.length - 5} more` : ''}</div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

// Profile Setup Modal (without availability - that's per room)
const ProfileSetupModal = ({ isOpen, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    homeLocation: null,
  });
  
  const handleSave = () => {
    if (form.name.trim() && form.homeLocation) {
      onSave({
        id: 'user-profile',
        name: form.name.trim(),
        homeLocation: form.homeLocation,
        availability: [{ start: 9, end: 17 }], // Default, will be customized per room
        tempLocation: null,
        tempUntil: ''
      });
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Welcome to Break Room ☕">
      <p className="text-slate-400 mb-6">
        Let's set up your profile. You'll be automatically added to any break room you create, 
        and can customize your availability for each room.
      </p>
      
      <Input
        label="Your Name"
        placeholder="e.g., Alex, Jordan..."
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        autoFocus
      />
      
      <div className="mb-6">
        <label className="block text-sm text-slate-400 mb-2">Your Location</label>
        <CitySearch
          value={form.homeLocation}
          onChange={(loc) => setForm({ ...form, homeLocation: loc })}
          placeholder="Search your city..."
        />
      </div>
      
      <button
        onClick={handleSave}
        disabled={!form.name.trim() || !form.homeLocation}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 
          text-white font-semibold hover:from-amber-400 hover:to-orange-400 transition-all
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Get Started
      </button>
    </Modal>
  );
};

// Create Room Modal
const CreateRoomModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  
  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
      onClose();
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Break Room">
      <Input
        label="Room Name"
        placeholder="e.g., Design Team, Family, Project Alpha..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <p className="text-slate-500 text-sm mb-4">
        You can add tags to this room after creating it.
      </p>
      <button
        onClick={handleCreate}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 
          text-white font-semibold hover:from-amber-400 hover:to-orange-400 transition-all"
      >
        Create Room
      </button>
    </Modal>
  );
};

// Add/Edit Member Modal
const MemberModal = ({ isOpen, onClose, onSave, member = null, isProfile = false, isSelf = false }) => {
  const [form, setForm] = useState({
    name: '',
    homeLocation: null,
    availability: [{ start: 9, end: 17 }],
    tempLocation: null,
    tempUntil: ''
  });
  
  useEffect(() => {
    if (member) {
      setForm({
        name: member.name,
        homeLocation: member.homeLocation,
        availability: member.availability,
        tempLocation: member.tempLocation,
        tempUntil: member.tempUntil || ''
      });
    } else {
      setForm({
        name: '',
        homeLocation: null,
        availability: [{ start: 9, end: 17 }],
        tempLocation: null,
        tempUntil: ''
      });
    }
  }, [member, isOpen]);
  
  const handleSave = () => {
    if (form.name.trim() && form.homeLocation) {
      onSave({
        id: member?.id || generateId(),
        name: form.name.trim(),
        homeLocation: form.homeLocation,
        availability: form.availability,
        tempLocation: form.tempLocation,
        tempUntil: form.tempUntil
      });
      onClose();
    }
  };
  
  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: `${i}:00`
  }));
  
  const updateAvailability = (index, field, value) => {
    const updated = [...form.availability];
    updated[index] = { ...updated[index], [field]: parseInt(value) };
    setForm({ ...form, availability: updated });
  };
  
  const addAvailabilityWindow = () => {
    if (form.availability.length < 2) {
      setForm({ ...form, availability: [...form.availability, { start: 18, end: 22 }] });
    }
  };
  
  const removeAvailabilityWindow = (index) => {
    if (form.availability.length > 1) {
      setForm({ ...form, availability: form.availability.filter((_, i) => i !== index) });
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isProfile ? 'Edit Your Profile' : member ? 'Edit Member' : 'Add Member'}>
      <Input
        label="Name"
        placeholder="e.g., Maya, Jordan..."
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        autoFocus
      />
      
      <div className="mb-4">
        <label className="block text-sm text-slate-400 mb-2">Home Base</label>
        <CitySearch
          value={form.homeLocation}
          onChange={(loc) => setForm({ ...form, homeLocation: loc })}
          placeholder="Search city..."
        />
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm text-slate-400">Availability Windows</label>
          {form.availability.length < 2 && (
            <button
              onClick={addAvailabilityWindow}
              className="text-xs text-amber-400 hover:text-amber-300"
            >
              + Add window
            </button>
          )}
        </div>
        {form.availability.map((window, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <select
              value={window.start}
              onChange={(e) => updateAvailability(index, 'start', e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 
                text-white text-sm focus:outline-none focus:border-amber-500/50"
            >
              {hourOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="text-slate-500">to</span>
            <select
              value={window.end}
              onChange={(e) => updateAvailability(index, 'end', e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 
                text-white text-sm focus:outline-none focus:border-amber-500/50"
            >
              {hourOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {form.availability.length > 1 && (
              <button
                onClick={() => removeAvailabilityWindow(index)}
                className="p-2 text-slate-500 hover:text-red-400"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="mb-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🧭</span>
          <span className="text-sm text-slate-300 font-medium">On an adventure?</span>
        </div>
        <div className="mb-3">
          <label className="block text-xs text-slate-500 mb-1">
            {isSelf ? 'Where are you now?' : 'Where are they now?'}
          </label>
          <CitySearch
            value={form.tempLocation}
            onChange={(loc) => setForm({ ...form, tempLocation: loc })}
            placeholder={isSelf ? "Where are you now?" : "Where are they now?"}
          />
        </div>
        {form.tempLocation && (
          <Input
            label="Back by"
            type="date"
            value={form.tempUntil}
            onChange={(e) => setForm({ ...form, tempUntil: e.target.value })}
          />
        )}
        {form.tempLocation && (
          <button
            onClick={() => setForm({ ...form, tempLocation: null, tempUntil: '' })}
            className="text-xs text-slate-500 hover:text-slate-400"
          >
            Clear temporary location
          </button>
        )}
      </div>
      
      <button
        onClick={handleSave}
        disabled={!form.name.trim() || !form.homeLocation}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 
          text-white font-semibold hover:from-amber-400 hover:to-orange-400 transition-all
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProfile ? 'Save Profile' : member ? 'Save Changes' : 'Add Member'}
      </button>
    </Modal>
  );
};

// Empty state component
const EmptyState = ({ icon, title, subtitle, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400 mb-6 max-w-sm">{subtitle}</p>
    {action}
  </div>
);

// Buy Me a Coffee Button
const BuyMeCoffee = () => (
  <a
    href="https://buymeacoffee.com/whoawake"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 
      rounded-xl text-amber-400 hover:bg-amber-500/20 transition-colors text-sm"
  >
    <span>☕</span>
    <span>Buy me a coffee</span>
  </a>
);

// Footer component
const Footer = () => (
  <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-slate-900 to-transparent pointer-events-none">
    <div className="pointer-events-auto">
      <BuyMeCoffee />
    </div>
  </footer>
);

// Header component
const Header = ({ profile, onEditProfile, onHelp, onContact, onStats, onFilter, hasActiveFilters }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">
        Break Room
        <span className="ml-3 text-3xl">☕</span>
      </h1>
      <p className="text-slate-400">Check in on your teams across time zones</p>
    </div>
    <div className="flex items-center gap-3">
      {profile && (
        <button
          onClick={onEditProfile}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 
            rounded-xl hover:border-slate-600 transition-colors"
        >
          <Avatar name={profile.name} status={getMemberStatus(profile)} size="sm" />
          <span className="text-slate-300 text-sm">{profile.name}</span>
        </button>
      )}
      <button
        onClick={onHelp}
        className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 
          hover:text-white hover:border-slate-600 transition-colors text-sm flex items-center gap-1.5"
      >
        <span>Help</span>
        <span>❓</span>
      </button>
      <button
        onClick={onFilter}
        className={`px-3 py-2 rounded-xl bg-slate-800 border text-sm flex items-center gap-1.5 transition-colors
          ${hasActiveFilters 
            ? 'border-amber-500/50 text-amber-400 hover:border-amber-500' 
            : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}
      >
        <span>Filter</span>
        <span>⚙️</span>
      </button>
      <button
        onClick={onStats}
        className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 
          hover:text-white hover:border-slate-600 transition-colors text-sm flex items-center gap-1.5"
      >
        <span>Stats</span>
        <span>📊</span>
      </button>
      <button
        onClick={onContact}
        className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 
          hover:text-white hover:border-slate-600 transition-colors text-sm flex items-center gap-1.5"
      >
        <span>Contact</span>
        <span>💌</span>
      </button>
    </div>
  </div>
);

// Main App
export default function BreakRoom() {
  const [rooms, setRooms] = useState([]);
  const [profile, setProfile] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedFilterTags, setSelectedFilterTags] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    setRooms(loadFromStorage());
    setProfile(loadProfile());
    setTags(loadTags());
  }, []);
  
  useEffect(() => {
    if (rooms.length > 0 || localStorage.getItem('breakrooms-v5')) {
      saveToStorage(rooms);
    }
  }, [rooms]);
  
  useEffect(() => {
    if (profile) {
      saveProfile(profile);
    }
  }, [profile]);
  
  useEffect(() => {
    saveTags(tags);
  }, [tags]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const currentRoom = rooms.find(r => r.id === currentRoomId);
  
  // Filter rooms by selected tags
  const filteredRooms = useMemo(() => {
    if (selectedFilterTags.length === 0) return rooms;
    return rooms.filter(room => 
      selectedFilterTags.some(tag => room.tags?.includes(tag))
    );
  }, [rooms, selectedFilterTags]);
  
  const handleCreateRoom = (name) => {
    const newRoom = {
      id: generateId(),
      name,
      avatar: ROOM_AVATARS[Math.floor(Math.random() * ROOM_AVATARS.length)].id,
      tags: [],
      members: profile ? [{ ...profile, id: `${profile.id}-${generateId()}` }] : []
    };
    setRooms([...rooms, newRoom]);
  };
  
  const handleDeleteRoom = (roomId) => {
    setRooms(rooms.filter(r => r.id !== roomId));
    setCurrentRoomId(null);
  };
  
  const handleUpdateRoomAvatar = (roomId, avatarId) => {
    setRooms(rooms.map(r => r.id === roomId ? { ...r, avatar: avatarId } : r));
  };
  
  const handleUpdateRoomTags = (roomId, newTags) => {
    setRooms(rooms.map(r => r.id === roomId ? { ...r, tags: newTags } : r));
  };
  
  const handleAddTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };
  
  const handleDeleteTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
    // Also remove tag from all rooms
    setRooms(rooms.map(r => ({
      ...r,
      tags: r.tags?.filter(t => t !== tag) || []
    })));
    // Remove from filter if selected
    setSelectedFilterTags(selectedFilterTags.filter(t => t !== tag));
  };
  
  const handleToggleFilterTag = (tag) => {
    setSelectedFilterTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };
  
  const handleAddMember = (member) => {
    setRooms(rooms.map(r => 
      r.id === currentRoomId 
        ? { ...r, members: [...r.members, member] }
        : r
    ));
  };
  
  const handleEditMember = (member) => {
    setRooms(rooms.map(r => 
      r.id === currentRoomId 
        ? { ...r, members: r.members.map(m => m.id === member.id ? member : m) }
        : r
    ));
  };
  
  const handleDeleteMember = (memberId) => {
    setRooms(rooms.map(r => 
      r.id === currentRoomId 
        ? { ...r, members: r.members.filter(m => m.id !== memberId) }
        : r
    ));
  };
  
  const handleSaveMember = (member) => {
    if (editingMember) {
      handleEditMember(member);
      if (editingMember.id.startsWith('user-profile')) {
        setProfile({ ...profile, name: member.name, homeLocation: member.homeLocation, tempLocation: member.tempLocation, tempUntil: member.tempUntil });
      }
    } else {
      handleAddMember(member);
    }
    setEditingMember(null);
  };
  
  const handleSaveProfile = (profileData) => {
    setProfile(profileData);
  };
  
  const handleEditProfileFromHeader = () => {
    setEditingMember(profile);
    setShowProfileModal(true);
  };
  
  // Profile setup
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <ProfileSetupModal isOpen={true} onSave={handleSaveProfile} />
      </div>
    );
  }
  
  // Home Screen
  if (!currentRoomId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pb-20">
        <div className="max-w-4xl mx-auto p-8">
          <Header 
            profile={profile} 
            onEditProfile={handleEditProfileFromHeader}
            onHelp={() => setShowHelp(true)}
            onContact={() => setShowContact(true)}
            onStats={() => setShowStats(true)}
            onFilter={() => setShowTagFilter(true)}
            hasActiveFilters={selectedFilterTags.length > 0}
          />
          
          {/* Active filters indicator */}
          {selectedFilterTags.length > 0 && (
            <div className="mb-4 flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 text-sm">Filtering by:</span>
              {selectedFilterTags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-lg">
                  {tag}
                </span>
              ))}
              <button
                onClick={() => setSelectedFilterTags([])}
                className="text-sm text-slate-500 hover:text-slate-400"
              >
                Clear
              </button>
            </div>
          )}
          
          {rooms.length === 0 ? (
            <EmptyState
              icon="🌍"
              title="No break rooms yet"
              subtitle="Create your first break room to start tracking your distributed team's availability."
              action={
                <button
                  onClick={() => setShowCreateRoom(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 
                    text-white font-semibold hover:from-amber-400 hover:to-orange-400 transition-all"
                >
                  Create Break Room
                </button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onClick={() => setCurrentRoomId(room.id)}
                    onAvatarClick={() => setShowAvatarPicker(room.id)}
                  />
                ))}
              </div>
              {filteredRooms.length === 0 && selectedFilterTags.length > 0 && (
                <div className="text-center py-8 text-slate-500">
                  No rooms match the selected tags
                </div>
              )}
              <button
                onClick={() => setShowCreateRoom(true)}
                className="w-full p-4 rounded-2xl border-2 border-dashed border-slate-700 
                  text-slate-500 hover:border-slate-600 hover:text-slate-400 transition-colors"
              >
                + Create Break Room
              </button>
            </>
          )}
        </div>
        
        <Footer />
        
        <CreateRoomModal
          isOpen={showCreateRoom}
          onClose={() => setShowCreateRoom(false)}
          onCreate={handleCreateRoom}
        />
        
        <TagFilterModal
          isOpen={showTagFilter}
          onClose={() => setShowTagFilter(false)}
          tags={tags}
          selectedTags={selectedFilterTags}
          onToggleTag={handleToggleFilterTag}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
        />
        
        <MemberModal
          isOpen={showProfileModal}
          onClose={() => {
            setShowProfileModal(false);
            setEditingMember(null);
          }}
          onSave={(data) => {
            setProfile({ ...data, id: 'user-profile' });
            setShowProfileModal(false);
            setEditingMember(null);
          }}
          member={editingMember}
          isProfile={true}
          isSelf={true}
        />
        
        <RoomAvatarPicker
          isOpen={!!showAvatarPicker}
          onClose={() => setShowAvatarPicker(null)}
          onSelect={(avatarId) => handleUpdateRoomAvatar(showAvatarPicker, avatarId)}
          currentAvatar={rooms.find(r => r.id === showAvatarPicker)?.avatar}
        />
        
        <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
        <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
        <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} rooms={rooms} profile={profile} />
      </div>
    );
  }
  
  // Room Detail Screen
  const roomAvatar = currentRoom ? (ROOM_AVATARS.find(a => a.id === currentRoom.avatar) || ROOM_AVATARS[0]) : null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pb-20">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentRoomId(null)}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              ← Back to rooms
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHelp(true)}
                className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 
                  hover:text-white hover:border-slate-600 transition-colors text-sm flex items-center gap-1.5"
              >
                <span>Help</span>
                <span>❓</span>
              </button>
              <button
                onClick={() => setShowStats(true)}
                className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 
                  hover:text-white hover:border-slate-600 transition-colors text-sm flex items-center gap-1.5"
              >
                <span>Stats</span>
                <span>📊</span>
              </button>
              <button
                onClick={() => setShowContact(true)}
                className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 
                  hover:text-white hover:border-slate-600 transition-colors text-sm flex items-center gap-1.5"
              >
                <span>Contact</span>
                <span>💌</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAvatarPicker(currentRoom.id)}
                className="w-16 h-16 rounded-2xl bg-slate-700/50 border border-slate-600 
                  flex items-center justify-center text-3xl hover:bg-slate-600/50 
                  hover:border-slate-500 transition-all shrink-0"
                title="Change icon"
              >
                {roomAvatar.emoji}
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{currentRoom.name}</h1>
                <p className="text-slate-400 mb-2">
                  {getAvailableCount(currentRoom.members)} of {currentRoom.members.length} available now
                </p>
                <RoomTagsEditor
                  roomTags={currentRoom.tags || []}
                  availableTags={tags}
                  onUpdateTags={(newTags) => handleUpdateRoomTags(currentRoom.id, newTags)}
                />
              </div>
            </div>
            <button
              onClick={() => handleDeleteRoom(currentRoom.id)}
              className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 
                text-red-400 hover:bg-red-500/20 transition-colors text-sm"
            >
              Delete Room
            </button>
          </div>
        </header>
        
        {currentRoom.members.length >= 2 && (
          <OverlapChart members={currentRoom.members} userProfile={profile} />
        )}
        
        {currentRoom.members.length === 0 ? (
          <EmptyState
            icon="🌙"
            title="This break room is quiet..."
            subtitle="Add team members to see who's around and when."
            action={
              <button
                onClick={() => setShowMemberModal(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 
                  text-white font-semibold hover:from-amber-400 hover:to-orange-400 transition-all"
              >
                Add First Member
              </button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentRoom.members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  isYou={member.id.startsWith('user-profile')}
                  onEdit={(m) => {
                    setEditingMember(m);
                    setShowMemberModal(true);
                  }}
                  onDelete={handleDeleteMember}
                />
              ))}
            </div>
            <button
              onClick={() => {
                setEditingMember(null);
                setShowMemberModal(true);
              }}
              className="w-full p-4 rounded-2xl border-2 border-dashed border-slate-700 
                text-slate-500 hover:border-slate-600 hover:text-slate-400 transition-colors"
            >
              + Add Member
            </button>
          </>
        )}
      </div>
      
      <Footer />
      
      <MemberModal
        isOpen={showMemberModal}
        onClose={() => {
          setShowMemberModal(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        member={editingMember}
        isProfile={editingMember?.id?.startsWith('user-profile')}
        isSelf={editingMember?.id?.startsWith('user-profile')}
      />
      
      <RoomAvatarPicker
        isOpen={!!showAvatarPicker}
        onClose={() => setShowAvatarPicker(null)}
        onSelect={(avatarId) => handleUpdateRoomAvatar(showAvatarPicker, avatarId)}
        currentAvatar={currentRoom?.avatar}
      />
      
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} rooms={rooms} profile={profile} />
    </div>
  );
}
