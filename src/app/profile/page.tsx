"use client"

import styles from "./page.module.scss";
import { Button, Container } from "react-bootstrap";
import UserForm from "../../components/userForm/UserForm";

export default function Profile() {
  return (
    <>
      <main>
        <Container className={styles.container}>
          <div className="d-flex flex-column gap-lg-5 align-items-center align-items-lg-start">
            <p className={styles.title}>Minha conta</p>
            <div className="d-flex gap-3 flex-column mb-5">
              <Button className={styles.button}>Minha conta</Button>
              <Button className={styles.button}>Alteração de Senha</Button>
            </div>
          </div>
          <UserForm />
        </Container>
      </main>
    </>
  )
}