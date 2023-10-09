import { NextPage } from 'next'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
  password_retype: yup
    .string()
    .required('Confirm password is required')
    .min(6)
    .max(32)
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
  gender: yup
    .number()
    .required('Gender is required')
    .integer('Please select you gender'),
  first_name: yup.string().required('first name is required'),
  last_name: yup.string().required('last name is required'),
  date_of_birth: yup.string().required('date of birth is required'),
  nid: yup
    .string()
    .required('NID id required')
    .test('len', 'Must be exactly 16 characters of number', (val) =>
      Boolean(val.match(/^\d{16}$/))
    ),
  mobile: yup
    .string()
    .required('Mobile is required')
    .test('len', 'Must be exactly 11 characters of number', (val) =>
      Boolean(val.match(/^\d{11}$/))
    ),
})

const Register: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const getRedirect = () => '/login'

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registerHandler = async (data: any) => {
    setSubmitting(true)

    const res = await axios.post('/api/register', data)
    if (res.status === 200) {
      toast('Registration successfull', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      router.push(getRedirect())
    }
    setSubmitting(false)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mb-4 rounded-0">
              <Card.Body className="p-4">
                <h1>Register</h1>
                <p className="text-black-50">Create your account</p>

                <Form onSubmit={handleSubmit(registerHandler)}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('email')}
                      disabled={submitting}
                      placeholder="Email"
                      aria-label="Email"
                      isInvalid={Boolean(errors?.email)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.email?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('password')}
                      type="password"
                      disabled={submitting}
                      placeholder="Password"
                      aria-label="Password"
                      isInvalid={Boolean(errors?.password)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.password?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control
                      type="password"
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('password_retype')}
                      disabled={submitting}
                      placeholder="Repeat password"
                      aria-label="Repeat password"
                      isInvalid={Boolean(errors?.password_retype)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.password_retype?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Label className="me-3">Gender</Form.Label>
                    <Form.Control
                      type="hidden"
                      disabled
                      isInvalid={Boolean(errors?.gender)}
                    />
                    <Form.Check
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('gender')}
                      value="1"
                      className="me-3"
                      type="radio"
                      label="Male"
                      isInvalid={
                        touchedFields?.gender && Boolean(errors?.gender)
                      }
                    />
                    <Form.Check
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('gender')}
                      value="2"
                      type="radio"
                      label="Female"
                      isInvalid={
                        touchedFields?.gender && Boolean(errors?.gender)
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.gender?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('first_name')}
                      disabled={submitting}
                      placeholder="First name"
                      aria-label="First name"
                      isInvalid={Boolean(errors?.first_name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.first_name?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('last_name')}
                      disabled={submitting}
                      placeholder="Last name"
                      aria-label="Last name"
                      isInvalid={Boolean(errors?.last_name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.last_name?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Label className="w-100">Date of birth</Form.Label>
                    <Form.Control
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('date_of_birth')}
                      type="date"
                      disabled={submitting}
                      placeholder="Date of birth"
                      aria-label="Date of birth"
                      isInvalid={Boolean(errors?.date_of_birth)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.date_of_birth?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('nid')}
                      name="nid"
                      disabled={submitting}
                      placeholder="NID Number"
                      aria-label="NID Number"
                      isInvalid={Boolean(errors?.nid)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.nid?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('mobile')}
                      disabled={submitting}
                      placeholder="Mobile Number"
                      aria-label="Mobile Number"
                      isInvalid={Boolean(errors?.mobile)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.mobile?.message}
                    </Form.Control.Feedback>
                  </InputGroup>

                  <Button
                    type="submit"
                    className="d-block w-100"
                    disabled={submitting}
                    variant="success"
                  >
                    Create Account
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
