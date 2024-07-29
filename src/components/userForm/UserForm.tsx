import { FormEvent, useEffect, useState } from "react";
import styles from "./userForm.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";
import profileService from "@/services/profileService";
import ToastComponent from "../common/toast/Toast";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const router = useRouter()
  const [color, setColor] = useState("")
  const [toastShow, setToastShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [initialEmail, setInitialEmail] = useState(email)

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setPhone(user.phone)
      setEmail(user.email)
      setInitialEmail(user.email)
    })
  }, [])

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const res = await profileService.userUpdate({
      firstName,
      lastName,
      phone,
      email
    })

    if (res === 200) {
      setToastShow(true)
      setErrorMessage("Informações alteradas com sucesso!")
      setColor("bg-success")
      setTimeout(() => setToastShow(false), 1000 * 3)
      if (email !== initialEmail) {
        sessionStorage.clear()
        setTimeout(() => router.push('/'), 1000 * 2)
        setTimeout(() => location.reload(), 1000 * 3)        

      }
    } else {
      setToastShow(true)
      setErrorMessage("Você não pode alterar para esse email!")
      setColor("bg-danger")
      setTimeout(() => setToastShow(false), 1000 * 3)
    }
  }

  return (
    <>
      <Form onSubmit={handleUserUpdate} className={`${styles.cardForm} shadow`}>
        <div className={styles.cardHeader}>
          <p className={styles.profileIcon}>{firstName?.slice(0, 1).toUpperCase()}{lastName?.slice(0, 1).toUpperCase()}</p>
          <p className={styles.userName}>{firstName?.toUpperCase()} {lastName?.toUpperCase()}</p>
        </div>
        <div className={styles.form}>
          <Row>
            <Col sm>
              <Form.Group className='mb-3' >
                <Form.Label htmlFor='firstName' className={styles.label}>Nome</Form.Label>
                <Form.Control
                  name='firstName'
                  id='firstName'
                  type="text"
                  className={styles.input}
                  placeholder="Digite seu nome"
                  required
                  value={firstName}
                  onChange={(event) => { setFirstName(event.target.value) }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' >
                <Form.Label htmlFor='lastName' className={styles.label}>Sobrenome</Form.Label>
                <Form.Control
                  name='lastName'
                  id='lastName'
                  type="text"
                  className={styles.input}
                  placeholder="Digite seu sobrenome"
                  required
                  value={lastName}
                  onChange={(event) => { setLastName(event.target.value) }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mb-3' >
            <Form.Label htmlFor='phone' className={styles.label}>Telefone</Form.Label>
            <Form.Control
              name='phone'
              id='phone'
              type="text"
              className={styles.input}
              placeholder="(xx) 9xxxx-xxxx"
              required
              value={phone}
              onChange={(event) => { setPhone(event.target.value) }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='email' className={styles.label}>Email</Form.Label>
            <Form.Control
              name='email'
              id='email'
              type="email"
              className={styles.input}
              placeholder="Digite seu email"
              required
              value={email}
              onChange={(event) => { setEmail(event.target.value) }}
            />
          </Form.Group>
          <ToastComponent color={color} show={toastShow} message={errorMessage} />
          <Button type="submit" className={`${styles.button} mt-3`}>Salvar alterações</Button>
        </div>
      </Form>
    </>
  )
}