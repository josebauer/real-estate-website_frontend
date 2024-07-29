"use client"

import Image from "next/image";
import styles from "./page.module.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import UserForm from "@/components/userForm/userForm";

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
          <div className={`${styles.cardForm} shadow`}>
            <div className={styles.cardHeader}>
              <Image src="/icons/profile-icon.svg" alt="Ícone de perfil" className={styles.profileIcon} width={45} height={45} />
              <p className={styles.userName}>Nome do usuário</p>
            </div>
            <UserForm />
          </div>
        </Container>
      </main>
    </>
  )
}