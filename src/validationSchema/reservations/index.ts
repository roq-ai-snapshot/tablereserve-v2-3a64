import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  date: yup.date().required(),
  party_size: yup.number().integer().required(),
  status: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  restaurant_id: yup.string().nullable().required(),
  customer_id: yup.string().nullable().required(),
});
