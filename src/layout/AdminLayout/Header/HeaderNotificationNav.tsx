import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faEnvelope,
} from '@fortawesome/free-regular-svg-icons'
import {
  faList,
} from '@fortawesome/free-solid-svg-icons'
import { Badge, Dropdown, Nav, NavLink } from 'react-bootstrap'
import React from 'react'

// type ItemWithIconProps = {
//   icon: IconDefinition
// } & PropsWithChildren

// const ItemWithIcon = (props: ItemWithIconProps) => {
//   const { icon, children } = props

//   return (
//     <>
//       <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
//       {children}
//     </>
//   )
// }

export default function HeaderNotificationNav() {
  return (
    <Nav>
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle
            as={NavLink}
            bsPrefix="hide-caret"
            id="dropdown-notification"
          >
            <FontAwesomeIcon icon={faBell} size="lg" />
            <Badge pill bg="danger" className="position-absolute top-0 right-0">
              5
            </Badge>
          </Dropdown.Toggle>
        </Dropdown>
      </Nav.Item>
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle
            as={NavLink}
            bsPrefix="hide-caret"
            id="dropdown-task"
          >
            <FontAwesomeIcon icon={faList} size="lg" />
            <Badge
              pill
              bg="warning"
              className="position-absolute top-0 right-0"
            >
              5
            </Badge>
          </Dropdown.Toggle>
        </Dropdown>
      </Nav.Item>
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle
            as={NavLink}
            bsPrefix="hide-caret"
            id="dropdown-mail"
          >
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            <Badge
              pill
              bg="primary"
              className="position-absolute top-0 right-0"
            >
              7
            </Badge>
          </Dropdown.Toggle>
        </Dropdown>
      </Nav.Item>
    </Nav>
  )
}
