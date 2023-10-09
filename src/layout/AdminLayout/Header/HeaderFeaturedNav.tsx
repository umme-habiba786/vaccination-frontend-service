import Link from 'next/link'
import { Nav } from 'react-bootstrap'

export default function HeaderFeaturedNav() {
  return (
    <Nav>
      <Nav.Item>
        <Link href="/appointments" passHref legacyBehavior>
          <Nav.Link className="p-2">My Appointments</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/appointments/create" passHref legacyBehavior>
          <Nav.Link className="p-2">New Appointment</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  )
}
