import { RestaurantInterface } from 'interfaces/restaurant';
import { UserInterface } from 'interfaces/user';

export interface ReservationInterface {
  id?: string;
  restaurant_id: string;
  customer_id: string;
  date: Date;
  party_size: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;

  restaurant?: RestaurantInterface;
  user?: UserInterface;
  _count?: {};
}
