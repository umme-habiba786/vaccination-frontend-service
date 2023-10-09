import useSWRAxios from '@hooks/useSWRAxios'
import { AdminLayout } from '@layout'
import axios from 'axios'
import { setCookie, getCookie } from 'cookies-next'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const AppointmentEdit: NextPage = () => {
  const router = useRouter()
  const { id: appointmentId } = router.query
  const [submitting, setSubmitting] = useState(false)

  const {
    data: { data: response },
    error: swrError,
  } = useSWRAxios<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
    hospitals: object[]
    vaccines: object[]
    appointment:
      | {
          id: number
          vaccine_id: number
          hospital_id: number
          appointment_datetime: number
          status: string
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | any
  }>(
    { url: !appointmentId ? undefined : `/api/appointment?id=${appointmentId}` },
    { data: { user: {}, hospitals: [], vaccines: [], appointment: {} } }
  )

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (response?.appointment?.appointment_datetime) {
      const date = new Date(response.appointment.appointment_datetime)
      reset({
        id: response.appointment.id,
        status: response.appointment.status,
        user_id: response.appointment.user_id,
        hospital_id: response.appointment.hospital_id,
        vaccine_id: response.appointment.vaccine_id,
        appointment_datetime: date.toISOString().slice(0, 16),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  if (swrError && swrError?.response?.status === 401) {
    setCookie('auth', '')
    router.push('/login')
    return <div />
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveAppointment = async (data: any) => {
    const authSession = getCookie('auth')
    setSubmitting(true)

    const formData = new FormData()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(data).forEach(([key, value]: any[]) => {
      formData.append(key, value)
    })

    formData.set('user_id', response?.user?.id)
    const res = await axios.post(
      `/api/appointment?id=${response.appointment.id}`,
      Object.fromEntries(formData),
      {
        headers: {
          Authorization: `Bearer ${authSession}`,
        },
      }
    )
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
              <form onSubmit={handleSubmit(saveAppointment)}>
                <InputGroup className="mb-3">
                  <Form.Select
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('vaccine_id')}
                    aria-label="select vaccine"
                  >
                    <option>select vaccine</option>
                    {vaccineListHtml()}
                  </Form.Select>
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Select
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('hospital_id')}
                    aria-label="select hospital"
                  >
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
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('appointment_datetime')}
                    required
                    disabled={submitting}
                    placeholder="Appointment datetime"
                    aria-label="Appointment datetime"
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <Form.Select
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('status')}
                    aria-label="select status"
                  >
                    <option>select status</option>
                    <option value="confirm">confirm</option>
                    <option value="pending">pending</option>
                  </Form.Select>
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

export default AppointmentEdit
