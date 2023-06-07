import * as yup from 'yup';

export const customerPreferenceValidationSchema = yup.object().shape({
  preference_key: yup.string().required(),
  preference_value: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  customer_id: yup.string().nullable().required(),
});
