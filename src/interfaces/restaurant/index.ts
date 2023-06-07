import { ReservationInterface } from 'interfaces/reservation';
import { TableLayoutInterface } from 'interfaces/table-layout';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  reservation?: ReservationInterface[];
  table_layout?: TableLayoutInterface[];
  user?: UserInterface;
  _count?: {
    reservation?: number;
    table_layout?: number;
  };
}
