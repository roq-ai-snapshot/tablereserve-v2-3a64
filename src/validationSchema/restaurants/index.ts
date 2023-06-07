import * as yup from 'yup';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { tableLayoutValidationSchema } from 'validationSchema/table-layouts';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  reservation: yup.array().of(reservationValidationSchema),
  table_layout: yup.array().of(tableLayoutValidationSchema),
});
