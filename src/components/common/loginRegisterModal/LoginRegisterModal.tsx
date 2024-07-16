import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from "./loginRegisterModal.module.scss";
import Image from 'next/image';

interface LoginRegisterModalProps {
  show: boolean
  handleClose: () => void
  initialMode: 'login' | 'register'
}

export default function LoginRegisterModal({ show, handleClose, initialMode }: LoginRegisterModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const handleSwitch = () => setIsLogin(!isLogin);

  return (
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
        <Form>
          {!isLogin && (
            <div className="d-flex gap-3 mb-2">
              <Form.Group controlId="name">
                <Form.Label className={styles.textSmall}>Nome</Form.Label>
                <Form.Control type="text" placeholder="Digite seu nome" required />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label className={styles.textSmall}>Sobrenome</Form.Label>
                <Form.Control type="text" placeholder="Digite seu sobrenome" required />
              </Form.Group>
            </div>
          )}
          {!isLogin && (
            <div>
              <Form.Group className='mb-2' controlId="phone">
                <Form.Label className={styles.textSmall}>Telefone</Form.Label>
                <Form.Control type="number" placeholder="Digite seu telefone" required />
              </Form.Group>
            </div>
          )}
          <Form.Group className='mb-2' controlId="email">
            <Form.Label className={styles.textSmall}>Email</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" required />
          </Form.Group>
          <div className={`d-flex gap-3 ${isLogin ? 'flex-column' : ''} `}>
            <Form.Group controlId="password">
              <Form.Label className={styles.textSmall}>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha" required />
            </Form.Group>
            {isLogin && (<Button className={`${styles.linkButton} align-self-end`} variant='link'>Esqueci minha senha</Button>)}
            {!isLogin && (
              <Form.Group controlId="repeatPassword">
                <Form.Label className={styles.textSmall}>Repetir Senha</Form.Label>
                <Form.Control type="password" placeholder="Repita a senha" required />
              </Form.Group>
            )}
          </div>
          <Form.Group className='mt-3' controlId="remember">
            <Form.Check className={styles.textSmall} label="Lembrar meus dados" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button className={styles.button} variant="primary" onClick={handleClose}>
          {isLogin ? 'Entrar' : 'Registrar-se'}
        </Button>
        <div className="d-flex align-items-start mt-3 gap-1">
          <p className={styles.textSmall}>{isLogin ? 'Ainda não é cadastrado? ' : 'Já possui cadastro?'}</p>
          <Button className={styles.linkButton} variant="link" onClick={handleSwitch}>
            {isLogin ? 'Registre-se agora!' : 'Entre agora!'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}