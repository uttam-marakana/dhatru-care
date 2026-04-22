import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { createPatient, updatePatient } from '../../../api/patientApi';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required').min(10, 'Invalid phone'),
  email: Yup.string().email('Invalid email').optional(),
  age: Yup.number().min(0).max(120).optional(),
});

export default function PatientForm({ patient, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const isEdit = !!patient;

  const initialValues = patient || {
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    address: '',
    emergencyContact: { name: '', phone: '' },
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updatePatient(patient.id, values);
      } else {
        await createPatient(values);
      }
      onSuccess();
    } catch (error) {
      console.error('Patient save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Field
              as={Input}
              name="name"
              placeholder="John Doe"
              error={errors.name && touched.name}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <Field
              as={Input}
              name="phone"
              placeholder="1234567890"
              error={errors.phone && touched.phone}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Field as={Input} name="email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <Field as={Input} name="age" type="number" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <Field as={Input} name="address" placeholder="123 Hospital Road" />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field as={Input} name="emergencyContact.name" placeholder="Contact name" />
              <Field as={Input} name="emergencyContact.phone" placeholder="Contact phone" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={loading} className="flex-1">
              {isEdit ? 'Update Patient' : 'Create Patient'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
