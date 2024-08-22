import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AxiosService from '../utils/ApiService';

function BookForm({ onSuccess }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      ISBNnumber: "",
      publicationDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is Required'),
      author: Yup.string().required('Author is Required'),
      ISBNnumber: Yup.string().required('ISBN number required').matches(/^\d{13}$/, 'Enter a valid ISBN No'),
      publicationDate: Yup.date().max(new Date(), 'Select a date not in the future'),
    }),
    onSubmit: async (values) => {
        try {
          const res = await AxiosService.post('/formikbook', values);
          if (res.status === 201) {
            
            navigate("/dashboard");
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
        <Form.Control type="text" placeholder="Title" id="title" name="title" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} />
        {formik.touched.title && formik.errors.title ? (<div style={{ color: "red" }}>{formik.errors.title}</div>) : null}&nbsp;
        <br />
        <Form.Control type="text" placeholder="Author" id="author" name="author" onChange={formik.handleChange} value={formik.values.author} onBlur={formik.handleBlur} />
        {formik.touched.author && formik.errors.author ? (<div style={{ color: "red" }}>{formik.errors.author}</div>) : null}&nbsp;
        <br />
        <Form.Control type="text" placeholder="ISBN Number" id="ISBNnumber" name="ISBNnumber" onChange={formik.handleChange} value={formik.values.ISBNnumber} onBlur={formik.handleBlur} />
        {formik.touched.ISBNnumber && formik.errors.ISBNnumber ? (<div style={{ color: "red" }}>{formik.errors.ISBNnumber}</div>) : null}&nbsp;
        <br />
        <Form.Control type="date" placeholder="Publication Date" id="publicationDate" name="publicationDate" onChange={formik.handleChange} value={formik.values.publicationDate} onBlur={formik.handleBlur} />
        {formik.touched.publicationDate && formik.errors.publicationDate ? (<div style={{ color: "red" }}>{formik.errors.publicationDate}</div>) : null}&nbsp;
      </Form.Group>
      <Button variant="success" type='submit'>Submit</Button>
    </Form>
  );
}

export default BookForm;
