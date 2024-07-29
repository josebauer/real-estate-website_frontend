import styles from "./userForm.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function UserForm() {
  return (
    <Form className={styles.form}>
      <Row>
        <Col sm>
          <Form.Group className='mb-3' >
            <Form.Label htmlFor='firstName' className={styles.label}>Nome</Form.Label>
            <Form.Control name='firstName' id='firstName' type="text" className={styles.input} placeholder="Digite seu nome" required value={"João"} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' >
            <Form.Label htmlFor='lastName' className={styles.label}>Sobrenome</Form.Label>
            <Form.Control name='lastName' id='lastName' type="text" className={styles.input} placeholder="Digite seu sobrenome" required value={"Power"} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className='mb-3' >
        <Form.Label htmlFor='phone' className={styles.label}>Telefone</Form.Label>
        <Form.Control name='phone' id='phone' type="text" className={styles.input} placeholder="(xx) 9xxxx-xxxx" required value={"(47) 9999-9999"} />
      </Form.Group>
      <Form.Group className='mb-3' >
        <Form.Label htmlFor='email' className={styles.label}>Email</Form.Label>
        <Form.Control name='email' id='email' type="email" className={styles.input} placeholder="Digite seu email" required value={"seuemail@gmail.com"} />
      </Form.Group> required
      <Button className={`${styles.button} mt-3`}>Salvar alterações</Button>
    </Form>
  )
}