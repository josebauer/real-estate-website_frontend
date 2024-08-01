"use client"

import styles from "./page.module.scss";
import { Button, Container } from "react-bootstrap";
import UserForm from "../../components/profilePage/userForm/UserForm";
import { useState } from "react";
import PasswordForm from "@/components/profilePage/passwordForm/PasswordForm";

export default function Profile() {
  const [form, setForm] = useState("userForm")

  return (
    <>
      <main>
        <Container className={styles.container}>
          <div className="d-flex flex-column gap-lg-5 align-items-center align-items-lg-start">
            <p className={styles.title}>Minha conta</p>
            <div className="d-flex gap-3 flex-column mb-5">
              <Button
                className={styles.button}
                style={{ backgroundColor: form === "userForm" ? "#2c31c7" : "#111350" }}
                onClick={() => { setForm("userForm") }}>
                Dados pessoais
              </Button>
              <Button
                className={styles.button}
                style={{ backgroundColor: form === "passwordForm" ? "#2c31c7" : "#111350" }}
                onClick={() => { setForm("passwordForm") }}>
                Alteração de Senha
              </Button>
            </div>
          </div>
            {form === "userForm" ? <UserForm /> : <PasswordForm />}
        </Container>
      </main>
    </>
  )
}