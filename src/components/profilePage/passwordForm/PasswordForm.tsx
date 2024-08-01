import styles from "../profilePage.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function PasswordForm() {
  return (
    <>
      <Form className={`${styles.cardForm} shadow`}>
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
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='repeatNewPassword' className={styles.label}>Repetir nova senha</Form.Label>
                <Form.Control
                  name='repeatNewPassword'
                  id='repeatNewPassword'
                  type="password"
                  className={styles.input}
                  placeholder="********"
                  minLength={8}
                  maxLength={16}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" className={`${styles.button} mt-3`}>Salvar alterações</Button>
        </div>
      </Form>
    </>
  )
}