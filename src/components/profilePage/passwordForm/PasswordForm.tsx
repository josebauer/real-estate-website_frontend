import { FormEvent, useEffect, useState } from "react";
import styles from "../profilePage.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";
import profileService from "@/services/profileService";
import ToastComponent from "@/components/common/toast/Toast";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [color, setColor] = useState("")
  const [toastShow, setToastShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    profileService.fetchCurrent().then((password) => {
      setCurrentPassword(password.currentPassword)
      setNewPassword(password.newPassword)
    })
  }, [])

  const handlePasswordUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (newPassword !== confirmNewPassword) {
      setToastShow(true)
      setErrorMessage('As senhas não conferem!')
      setColor('bg-danger')
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)

      return
    }

    if (currentPassword === newPassword) {
      setToastShow(true)
      setErrorMessage('A senha nova não pode ser igual a senha atual.')
      setColor('bg-danger')
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)

      return
    }

    const res = await profileService.passwordUpdate({
      currentPassword,
      newPassword
    })

    if (res === 204) {
      setToastShow(true)
      setErrorMessage('Senha alterada com sucesso!')
      setColor('bg-success')
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)

      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    }

    if (res === 400) {
      setToastShow(true)
      setErrorMessage('Senha atual incorreta.')
      setColor('bg-danger')
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)
    }
  }

  return (
    <>
      <Form onSubmit={handlePasswordUpdate} className={`${styles.cardForm} shadow`}>
        <div className={styles.cardHeader}>
          <p className={styles.formTitle}>ALTERAR SENHA</p>
        </div>
        <div className={styles.form}>
          <Form.Group className='mb-3' >
            <Form.Label htmlFor='currentPassword' className={styles.label}>Senha atual</Form.Label>
            <Form.Control
              name='currentPassword'
              id='currentPassword'
              type="password"
              className={styles.input}
              placeholder="********"
              minLength={8}
              maxLength={16}
              required
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.currentTarget.value)
              }}
            />
          </Form.Group>
          <Row>
            <Col sm>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='newPassword' className={styles.label}>Nova senha</Form.Label>
                <Form.Control
                  name='newPassword'
                  id='newPassword'
                  type="password"
                  className={styles.input}
                  placeholder="********"
                  minLength={8}
                  maxLength={16}
                  required
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.currentTarget.value)
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='confirmNewPassword' className={styles.label}>Repetir nova senha</Form.Label>
                <Form.Control
                  name='confirmNewPassword'
                  id='confirmNewPassword'
                  type="password"
                  className={styles.input}
                  placeholder="********"
                  minLength={8}
                  maxLength={16}
                  required
                  value={confirmNewPassword}
                  onChange={(event) => {
                    setConfirmNewPassword(event.currentTarget.value)
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <ToastComponent color={color} show={toastShow} message={errorMessage} />
          <Button type="submit" className={`${styles.button} mt-3`}>Salvar alterações</Button>
        </div>
      </Form>
    </>
  )
}