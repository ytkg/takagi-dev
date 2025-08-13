import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is the description for Product 1. It features an innovative design and amazing functionality.',
    siteUrl: 'https://example.com/product1',
    repoUrls: ['https://github.com/example/product1-frontend', 'https://github.com/example/product1-backend'],
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is the description for Product 2. It is designed to improve user productivity.',
    siteUrl: 'https://example.com/product2',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is the description for Product 3. A simple, yet powerful tool for everyone.',
    siteUrl: 'https://example.com/product3',
    repoUrls: ['https://github.com/example/product3'],
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is the description for Product 4. A next-generation solution using the latest technology.',
    siteUrl: 'https://example.com/product4',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'This is the newly added Product 5. It provides the best user experience.',
    siteUrl: 'https://example.com/product5',
  },
];
