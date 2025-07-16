import { FormEvent, ChangeEvent, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from "./loginRegisterModal.module.scss";
import Image from 'next/image';
import authService from '@/services/authService';
import ToastComponent from '../toast/Toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ForgotPasswordModal from '../forgotPasswordModal/ForgotPasswordModal';
import InputMask from 'react-input-mask';

interface LoginRegisterModalProps {
  show: boolean
  handleClose: () => void
  initialMode: 'login' | 'register'
}

export default function LoginRegisterModal({ show, handleClose, initialMode }: LoginRegisterModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login')
  const [toastColor, setToastColor] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true)
    handleClose()
  }

  const { login } = useAuth()

  useEffect(() => {
    setIsLogin(initialMode === 'login')
  }, [initialMode])

  const handleSwitch = () => setIsLogin(!isLogin)

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const firstName = formData.get('firstName')!.toString()
    const lastName = formData.get('lastName')!.toString()
    const phone = formData.get('phone')!.toString()
    const email = formData.get('email')!.toString()
    const password = formData.get('password')!.toString()
    const repeatPassword = formData.get('repeatPassword')!.toString()
    const params = {
      firstName,
      lastName,
      phone,
      email,
      password
    }

    if (password != repeatPassword) {
      setToastColor('bg-danger')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)
      setToastMessage("As senhas não conferem.")

      return
    }

    const { data, status } = await authService.register(params)

    if (status === 201) {
      handleSwitch()

      setToastColor('bg-success')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)
      setToastMessage('Cadastro realizado com sucesso!')
    } else {
      setToastColor('bg-danger')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)
      setToastMessage(data.message)
    }
  }

  const router = useRouter()

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked)
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")!.toString()
    const password = formData.get("password")!.toString()
    const params = { email, password }

    const { status, data } = await authService.login(params)

    if (status === 200) {
      if (rememberMe) {
        localStorage.setItem('realEstate-token', data.token)
      } else {
        sessionStorage.setItem('realEstate-token', data.token)
      }

      setToastColor('bg-success')
      setToastShow(true)
      setTimeout(() => {
        login()
        setToastShow(false)
        handleClose()
        router.push('/')
      }, 1000)
      setToastMessage('Login realizado com sucesso!')

    } else {
      setToastColor('bg-danger')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
      }, 1000 * 3)
      setToastMessage('Email ou senha incorretos.')
    }
  }

  return (
    <>
      <Modal className={styles.modal} show={show} onHide={handleClose}>
        <Modal.Header className={styles.modalHeader} >
          <Modal.Title className={styles.modalTitle}>{isLogin ? 'Já possui uma conta? Entre agora mesmo!' : 'Ainda não possui uma conta? Registre-se agora!'}</Modal.Title>
          <div className='d-flex flex-column gap-2'>
            <Button className={`${styles.googleButton} ${styles.accountButton}`} type='button' variant='light'>
              <Image src="/socialMediasLogos/google-logo.svg" alt='logo Google' width={24} height={24} />
              {isLogin ? 'Entrar com o Google' : 'Registrar-se com o Google'}
            </Button>
            <Button className={`${styles.facebookButton} ${styles.accountButton}`} type='button'>
              <Image className='' src="/socialMediasLogos/face-logo.svg" alt='logo Facebook' width={12} height={24} />
              {isLogin ? 'Entrar com o Facebook' : 'Registrar-se com o Facebook'}
            </Button>
          </div>
          <p className={`${styles.textSmall} mb-0 mt-3`}>
            Ou {isLogin ? 'entre' : 'registre-se'} abaixo usando o seu email
          </p>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form className='d-flex flex-column' onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <div className="d-flex gap-3 mb-2">
                <Form.Group>
                  <Form.Label htmlFor='firstName' className={styles.textSmall}>Nome</Form.Label>
                  <Form.Control name='firstName' id='firstName' type="text" className={styles.input} placeholder="Digite seu nome" required />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor='lastName' className={styles.textSmall}>Sobrenome</Form.Label>
                  <Form.Control name='lastName' id='lastName' type="text" className={styles.input} placeholder="Digite seu sobrenome" required />
                </Form.Group>
              </div>
            )}
            {!isLogin && (
              <div>
                <Form.Group className='mb-2'>
                  <Form.Label htmlFor='phone' className={styles.textSmall}>Telefone</Form.Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="phone"
                        id="phone"
                        type="text"
                        className={styles.input}
                        placeholder="Digite seu telefone"
                        required
                      />
                    )}
                  </InputMask>
                </Form.Group>
              </div>
            )}
            <Form.Group className='mb-2'>
              <Form.Label htmlFor='email' className={styles.textSmall}>Email</Form.Label>
              <Form.Control name='email' id='email' type="email" autoComplete='on' className={styles.input} placeholder="Digite seu email" required />
            </Form.Group>
            <div className={`d-flex gap-3 ${isLogin ? 'flex-column' : ''} `}>
              <Form.Group>
                <Form.Label htmlFor='password' className={styles.textSmall}>Senha</Form.Label>
                <Form.Control name='password' id='password' type="password" className={styles.input} placeholder="Digite sua senha" required />
              </Form.Group>
              {isLogin && (
                <Button 
                  className={`${styles.linkButton} align-self-end`} 
                  variant='link' 
                  onClick={handleForgotPasswordClick}
                >
                  Esqueci minha senha
                </Button>)}
              {!isLogin && (
                <Form.Group>
                  <Form.Label htmlFor='repeatPassword' className={styles.textSmall}>Repetir Senha</Form.Label>
                  <Form.Control name='repeatPassword' id='repeatPassword' type="password" className={styles.input} placeholder="Repita a senha" required />
                </Form.Group>
              )}
            </div>
            <Form.Group className='mt-3'>
              <Form.Check 
                className={styles.textSmall} 
                id="remember" 
                label="Lembrar meus dados" 
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            <ToastComponent color={toastColor} show={toastShow} message={toastMessage} />
            <Button className={styles.button} type="submit" variant="primary" >
              {isLogin ? 'Entrar' : 'Registrar-se'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <div className="d-flex align-items-start mt-3 gap-1">
            <p className={styles.textSmall}>{isLogin ? 'Ainda não é cadastrado? ' : 'Já possui cadastro?'}</p>
            <Button className={styles.linkButton} variant="link" onClick={handleSwitch}>
              {isLogin ? 'Registre-se agora!' : 'Entre agora!'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ForgotPasswordModal
        show={showForgotPasswordModal}
        handleClose={() => setShowForgotPasswordModal(false)}
      />
    </>

  );
}