import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createTableLayout } from 'apiSdk/table-layouts';
import { Error } from 'components/error';
import { tableLayoutValidationSchema } from 'validationSchema/table-layouts';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';
import { TableLayoutInterface } from 'interfaces/table-layout';

function TableLayoutCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TableLayoutInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTableLayout(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TableLayoutInterface>({
    initialValues: {
      layout_name: '',
      max_occupancy: 0,
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: tableLayoutValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Table Layout
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="layout_name" mb="4" isInvalid={!!formik.errors?.layout_name}>
            <FormLabel>Layout Name</FormLabel>
            <Input type="text" name="layout_name" value={formik.values?.layout_name} onChange={formik.handleChange} />
            {formik.errors.layout_name && <FormErrorMessage>{formik.errors?.layout_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="max_occupancy" mb="4" isInvalid={!!formik.errors?.max_occupancy}>
            <FormLabel>Max Occupancy</FormLabel>
            <NumberInput
              name="max_occupancy"
              value={formik.values?.max_occupancy}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('max_occupancy', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.max_occupancy && <FormErrorMessage>{formik.errors?.max_occupancy}</FormErrorMessage>}
          </FormControl>
          <FormControl id="created_at" mb="4">
            <FormLabel>Created At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <FormControl id="updated_at" mb="4">
            <FormLabel>Updated At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.updated_at}
              onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
            />
          </FormControl>
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'table_layout',
  operation: AccessOperationEnum.CREATE,
})(TableLayoutCreatePage);
