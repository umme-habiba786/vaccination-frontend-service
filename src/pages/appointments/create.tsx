import useSWRAxios from '@hooks/useSWRAxios'
import { AdminLayout } from '@layout'
import axios from 'axios'
import { setCookie, getCookie } from 'cookies-next'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap'

const AppointmentCreate: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const {
    data: { data: response },
    error: swrError,
  } = useSWRAxios<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
    hospitals: object[]
    vaccines: object[]
  }>(
    { url: '/api/appointment' },
    { data: { user: {}, hospitals: [], vaccines: [] } }
  )

  if (swrError && swrError?.response?.status === 401) {
    setCookie('auth', '')
    router.push('/login')
    return <div />
  }

  const saveAppointment = async (e: SyntheticEvent<HTMLFormElement>) => {
    const authSession = getCookie('auth')

    e.stopPropagation()
    e.preventDefault()
    setSubmitting(true)

    const formdata = new FormData(e.currentTarget)
    formdata.set('user_id', response?.user?.id)
    const res = await axios.post('/api/appointment', Object.fromEntries(formdata), {
      headers: { Authorization: `Bearer ${authSession}` },
    })
    if (res.status === 200) {
      router.push('/appointments')
    }
    setSubmitting(false)
  }

  const vaccineListHtml = () => (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {response &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.vaccines.map((item: any) => (
          <option value={item.id} key={item.name}>
            {item.name}
          </option>
        ))}
    </>
  )

  const hospitalListHtml = () => (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {response &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.hospitals.map((item: any) => (
          <option value={item.id} key={item.name}>
            {item.name}
          </option>
        ))}
    </>
  )

  return (
    <AdminLayout>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mb-4 rounded-0">
            <Card.Body className="p-4">
              <h3 className="mb-3">Create new appointment</h3>
              <form onSubmit={saveAppointment}>
                <InputGroup className="mb-3">
                  <Form.Select name="vaccine_id" aria-label="select vaccine">
                    <option>select vaccine</option>
                    {vaccineListHtml()}
                  </Form.Select>
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Select name="hospital_id" aria-label="select hospital">
                    <option>select hospital</option>
                    {hospitalListHtml()}
                  </Form.Select>
                </InputGroup>

                <InputGroup className="mb-3">
                  <Form.Label className="w-100">
                    Appointment date and time
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="appointment_datetime"
                    required
                    disabled={submitting}
                    placeholder="Appointment datetime"
                    aria-label="Appointment datetime"
                  />
                </InputGroup>

                <Button
                  type="submit"
                  className="d-block w-100"
                  disabled={submitting}
                  variant="success"
                >
                  Create Appointment
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default AppointmentCreate
