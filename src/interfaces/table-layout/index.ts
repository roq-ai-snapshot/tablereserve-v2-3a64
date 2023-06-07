import { RestaurantInterface } from 'interfaces/restaurant';

export interface TableLayoutInterface {
  id?: string;
  restaurant_id: string;
  layout_name: string;
  max_occupancy: number;
  created_at?: Date;
  updated_at?: Date;

  restaurant?: RestaurantInterface;
  _count?: {};
}
