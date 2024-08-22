import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AxiosService from '../utils/ApiService';

function AuthorForm({ onSuccess }) {
  const formik = useFormik({
    initialValues: {
      authorsname: "",
      birthdate: "",
      shortbio: "",
    },
    validationSchema: Yup.object({
      authorsname: Yup.string().required('Author\'s Name is Required'),
      birthdate: Yup.date().max(new Date(), 'Select a date not in the future'),
      shortbio: Yup.string().required('Enter a biography'),
    }),
    onSubmit: async (values) => {
        try {
          const res = await AxiosService.post('/formikauthor', values);
          if (res.status === 201) {
            onSuccess();
          } else {
            console.log('Unexpected response status:', res.status);
          }
        } catch (error) {
          if (error.response) {
            console.log('Error response:', error.response.data);
          } else if (error.request) {
            console.log('Error request:', error.request);
          } else {
            console.log('Error message:', error.message);
          }
        }
      }
      ,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label><b></b></Form.Label>
        <br />
        <Form.Control type="text" placeholder="Author's Name" id="authorsname" name="authorsname" onChange={formik.handleChange} value={formik.values.authorsname} onBlur={formik.handleBlur} />
        {formik.touched.authorsname && formik.errors.authorsname ? (<div style={{ color: "red" }}>{formik.errors.authorsname}</div>) : null}&nbsp;
        <br />
        <Form.Control type="date" placeholder="Birthdate" id="birthdate" name="birthdate" onChange={formik.handleChange} value={formik.values.birthdate} onBlur={formik.handleBlur} />
        {formik.touched.birthdate && formik.errors.birthdate ? (<div style={{ color: "red" }}>{formik.errors.birthdate}</div>) : null}&nbsp;
        <br />
        <Form.Control type="text" placeholder="Biography" id="shortbio" name="shortbio" onChange={formik.handleChange} value={formik.values.shortbio} onBlur={formik.handleBlur} />
        {formik.touched.shortbio && formik.errors.shortbio ? (<div style={{ color: "red" }}>{formik.errors.shortbio}</div>) : null}&nbsp;
      </Form.Group>
      <Button variant="success" type='submit'>Submit</Button>
    </Form>
  );
}

export default AuthorForm;
