import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { setCookie } from 'cookies-next'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
})

const Login: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const getRedirect = () => '/appointments'

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = async (data: any) => {
    setSubmitting(true)
    const res = await axios.post('/api/login', data)
    if (res.status === 200) {
      setCookie('auth', res.data.access_token)
      router.push(getRedirect())
    }
    setSubmitting(false)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Sign In to your account</p>

                  <Form onSubmit={handleSubmit(login)}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...register('email')}
                        required
                        disabled={submitting}
                        placeholder="email"
                        aria-label="email"
                        isInvalid={
                          touchedFields?.email && Boolean(errors?.email)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.email?.message}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...register('password')}
                        type="password"
                        required
                        disabled={submitting}
                        placeholder="Password"
                        aria-label="Password"
                        isInvalid={
                          touchedFields?.password && Boolean(errors?.password)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.password?.message}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <Row>
                      <Col xs={6}>
                        <Button
                          className="px-4"
                          variant="primary"
                          type="submit"
                          disabled={submitting}
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
              <Col
                md={5}
                className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
              >
                <div className="text-center">
                  <h2>Sign up</h2>
                  <p>
                    welcome to our site.
                    <br />
                    You can manage your vaccination details using our site.
                    <br />
                    Not have an account?
                  </p>
                  <Link href="/register">
                    <button
                      className="btn btn-lg btn-outline-light mt-3"
                      type="button"
                    >
                      Register Now!
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
