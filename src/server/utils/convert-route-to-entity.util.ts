const mapping: Record<string, string> = {
  'customer-preferences': 'customer_preference',
  reservations: 'reservation',
  restaurants: 'restaurant',
  'table-layouts': 'table_layout',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
