import {get} from './index';
import {Product} from '../../domain/models/Product';

const starshipImages = [
  require('../../dls/assets/starships/starships1.png'),
  require('../../dls/assets/starships/starships2.png'),
  require('../../dls/assets/starships/starships3.png'),
  require('../../dls/assets/starships/starships4.png'),
  require('../../dls/assets/starships/starships5.png'),
  require('../../dls/assets/starships/starships6.png'),
  require('../../dls/assets/starships/starships7.png'),
  require('../../dls/assets/starships/starships8.png'),
  require('../../dls/assets/starships/starships9.png'),
  require('../../dls/assets/starships/starships10.png'),
  require('../../dls/assets/starships/starships11.png'),
  require('../../dls/assets/starships/starships12.png'),
  require('../../dls/assets/starships/starships14.png'),
  require('../../dls/assets/starships/starships16.png'),
  require('../../dls/assets/starships/starships17.png'),
  require('../../dls/assets/starships/starships18.png'),
  require('../../dls/assets/starships/starships19.png'),
  require('../../dls/assets/starships/starships20.png'),
  require('../../dls/assets/starships/starships21.png'),
  require('../../dls/assets/starships/starships22.png'),
];

interface StarWarsStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  url: string;
}

interface StarWarsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: StarWarsStarship[];
}

const getImageIndexForStarship = (name: string): number => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = hash + name.charCodeAt(i);
  }
  return hash % starshipImages.length;
};

const convertCreditsToAED = (credits: string): number => {
  if (!credits) {
    return Math.floor(Math.random() * 900) + 100;
  }

  const creditAmount = parseFloat(credits.replace(/,/g, ''));
  if (isNaN(creditAmount)) {
    return Math.floor(Math.random() * 900) + 100;
  }

  return Math.round(creditAmount / 10000);
};

const extractIdFromUrl = (url: string): string => {
  const matches = url.match(/\/(\d+)\//);
  return matches ? matches[1] : url;
};

const transformStarshipToProduct = (starship: StarWarsStarship): Product => {
  const id = extractIdFromUrl(starship.url);
  const imageIndex = getImageIndexForStarship(starship.name);

  return {
    id,
    name: starship.name,
    price: convertCreditsToAED(starship.cost_in_credits),
    images: [starshipImages[imageIndex]],
    model: starship.model,
    manufacturer: starship.manufacturer,
    costInCredits: starship.cost_in_credits,
    passengers: starship.passengers,
    cargoCapacity: starship.cargo_capacity,
    description: `${starship.starship_class} class starship. Crew: ${starship.crew}, Passengers: ${starship.passengers}, Cargo: ${starship.cargo_capacity}`,
    category: starship.starship_class,
  };
};

export const fetchStarships = async (
  page: number = 1,
): Promise<{products: Product[]; hasMore: boolean; total: number}> => {
  const response = await get<StarWarsResponse>(`starships/?page=${page}`);
  const products = response.results.map(transformStarshipToProduct);

  return {
    products,
    hasMore: response.next !== null,
    total: response.count,
  };
};

export const searchStarships = async (query: string): Promise<Product[]> => {
  if (!query.trim()) {
    return [];
  }

  const response = await get<StarWarsResponse>(
    `starships/?search=${encodeURIComponent(query)}`,
  );

  return response.results.map(transformStarshipToProduct);
};

