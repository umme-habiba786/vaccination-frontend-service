import { NextPage } from 'next'
import { Card, Table } from 'react-bootstrap'
import React from 'react'
import { AdminLayout } from '@layout'
import { useSWRAxios } from '@hooks'
import { THSort } from '@components/TableSort'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Appointments: NextPage = () => {
  const router = useRouter()
  const {
    data: { data: resource },
    error: swrError,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useSWRAxios<{ user: any; appointments: any[] }>(
    { url: '/api/appointments' },
    { data: { user: {}, appointments: [] } }
  )

  if (swrError && swrError?.response?.status === 401) {
    setCookie('auth', '')
    router.push('/login')
    return <div />
  }

  return (
    <AdminLayout>
      <Card>
        <Card.Header>Appointments</Card.Header>
        <Card.Body>
          <Table responsive bordered hover>
            <thead className="bg-light">
              <tr>
                <th>
                  <THSort name="id">#</THSort>
                </th>
                <th>
                  <THSort name="name">Name</THSort>
                </th>
                <th className="text-center">vaccine</th>
                <th className="text-end">
                  <THSort name="hp">Hospital</THSort>
                </th>
                <th className="text-end">
                  <THSort name="attack">DateTime</THSort>
                </th>
                <th className="text-end">
                  <THSort name="status">Status</THSort>
                </th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {resource &&
                resource.appointments.map((item, index) => (
                  <tr key={item.vaccine.id}>
                    <td>{index}</td>
                    <td>
                      {resource.user.first_name} {resource.user.last_name}
                    </td>
                    <td>{item.vaccine.name}</td>
                    <td className="text-center" style={{ whiteSpace: 'pre' }}>
                      {item.hospital.name}
                    </td>
                    <td className="text-end">{item.appointment_datetime}</td>
                    <td className="text-end">{item.status}</td>
                    <td>
                      <Link href={`/appointments/${item.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </AdminLayout>
  )
}

export default Appointments
