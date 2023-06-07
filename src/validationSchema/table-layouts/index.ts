import * as yup from 'yup';

export const tableLayoutValidationSchema = yup.object().shape({
  layout_name: yup.string().required(),
  max_occupancy: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  restaurant_id: yup.string().nullable().required(),
});
