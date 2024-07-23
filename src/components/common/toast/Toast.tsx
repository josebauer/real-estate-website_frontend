import { ToastBody } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'

interface props {
  show: boolean
  message: string
  color: string
}

export default function ToastComponent({ show, message, color }: props) {
  return (
    <>
      <Toast className={`${color} text-white align-self-center mt-3`} show={show}>
        <ToastBody className='text-center'>{message}</ToastBody>
      </Toast>
    </>
  )
}