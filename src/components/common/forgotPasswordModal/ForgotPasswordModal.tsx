'use client'

import styles from "./forgotPasswordModal.module.scss";
import authService from '@/services/authService';
import { FormEvent, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ToastComponent from '../toast/Toast';

interface ForgotPasswordModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function ForgotPasswordModal({ show, handleClose }: ForgotPasswordModalProps) {
  const [toastColor, setToastColor] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email')
  const [code, setCode] = useState('')

  const handleSendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")!.toString()
    const { status, data } = await authService.forgotPassword(email)

    if (status === 200) {
      setToastColor('bg-success')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
        setStep('code')
        setUserEmail(email)
      }, 1000 * 3)
      setToastMessage(data.message)
    } else {
      setToastColor('bg-danger')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)
      setToastMessage(data.message)
    }
  };

  const handleVerifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const code = formData.get("code")!.toString()

    const { status, data } = await authService.verifyCode(userEmail, code)

    if (status === 200) {
      setToastColor('bg-success')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
        setStep('reset')
        setCode(code)
      }, 1000 * 3)
      setToastMessage(data.message)
    } else {
      setToastColor('bg-danger')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)
      setToastMessage(data.message)
    }
  }
  

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const newPassword = formData.get("newPassword")!.toString()

    const { status, data } = await authService.resetPassword(userEmail, code, newPassword)

    if (status === 200) {
      setToastColor('bg-success')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
        handleClose()
        setStep('email')
      }, 1000 * 3)
      setToastMessage(data.message)
    } else {
      setToastColor('bg-danger')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)
      setToastMessage(data.message)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={styles.modalHeader}> 
        <Modal.Title>Recuperar Senha</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {step === 'email' && (
          <Form onSubmit={handleSendEmail} className={styles.form}>
            <Form.Group controlId="formEmail">
              <p className={styles.info}>Digite seu email abaixo para receber o código de verificação.</p>
              <Form.Label className={styles.label}>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                required
              />
            </Form.Group>
            <ToastComponent color={toastColor} show={toastShow} message={toastMessage} />
            <Button className={styles.button} type='submit'>Enviar Código</Button>
          </Form>
        )}
        {step === 'code' && (
          <Form onSubmit={handleVerifyCode} className={styles.form}>
            <p className={styles.info}>Digite abaixo o código de verificação com 6 dígitos.</p>
            <Form.Group controlId="formCode">
              <Form.Label className={styles.label}>Código</Form.Label>
              <Form.Control
                type="text"
                name="code"
                maxLength={6}
                placeholder="Digite o código recebido"
                required
              />
            </Form.Group>
            <ToastComponent color={toastColor} show={toastShow} message={toastMessage} />
            <Button className={styles.button} type='submit'>Verificar Código</Button>
          </Form>
        )}
        {step === 'reset' && (
          <Form onSubmit={handleResetPassword} className={styles.form}>
            <Form.Group controlId="formNewPassword">
              <Form.Label className={styles.label}>Nova Senha</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                minLength={8}
                placeholder="Digite sua nova senha"
                required
              />
            </Form.Group>
            <ToastComponent color={toastColor} show={toastShow} message={toastMessage} />
            <Button className={styles.button} type='submit'>Redefinir Senha</Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  )
}