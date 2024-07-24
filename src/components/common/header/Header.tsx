"use client"

import Image from "next/image";
import Link from "next/link";
import { Button, Container, Nav, NavLink, Navbar, NavbarCollapse, NavbarToggle } from "react-bootstrap";
import styles from "./header.module.scss"
import LoginRegisterModal from "../loginRegisterModal/LoginRegisterModal";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import ReactModal from "react-modal";
import { useAuth } from "@/contexts/AuthContext";
import { handleLogout } from "@/utils/handleLogout";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  const handleOpenReactModal = () => {
    setModalOpen(true)
  }

  const handleCloseReactModal = () => {
    setModalOpen(false)
  }

  const {
    showModal,
    initialMode,
    handleShowModal,
    handleCloseModal
  } = useModal()

  return (
    <>
      <header className="fixed-top">
        <div className="bg-light">
          <Container className="d-flex align-items-center justify-content-between">
            <Link href="/admin">
              <Button className={styles.navBtn}>
                Área do corretor
              </Button>
            </Link>

            <Link href="tel:(47) 9 9759-4781">
              <Button className={styles.navBtn}>
                <Image src="/icons/whatsapp-icon.svg" alt="Ícone do whatsapp" width={15} height={15} className="me-2" />
                (47) 9 99769-4781
              </Button>
            </Link>
          </Container>
        </div>
        <Navbar expand="lg" className={styles.bgDarkBlue} >
          <Container>
            <Link href="/" className="navbar-brand">
              <Image src="/logo-white.svg" alt="Logo da imobiliária JH" priority width={109} height={68} />
            </Link>
            <NavbarToggle aria-controls="basic-navbar-nav" className={styles.navbarToggle} />
            <NavbarCollapse id="basic-navbar-nav">
              <Nav className="gap-2 gap-lg-5 mx-auto py-3">
                <Link href="/sale" className="text-light text-decoration-none">Venda</Link>
                <Link href="/rent" className="text-light text-decoration-none">Locação</Link>
                <Link href="/simulators" className="text-light text-decoration-none">Simuladores</Link>
                <Link href="/contact" className="text-light text-decoration-none">Contato</Link>
              </Nav>
              <div className="d-flex align-items-center gap-2 my-3 ">
                {isAuthenticated ? (
                  <>
                    <Image onClick={handleOpenReactModal} className={styles.userProfile} src="/icons/profile-icon.svg" alt="Ícone do perfil" width={25} height={25} />
                    <p className="m-0">Bem-vindo(a)!</p>
                  </>
                ) : (
                  <>
                    <Image src="/icons/profile-icon.svg" alt="Ícone do perfil" width={25} height={25} />
                    <NavLink onClick={() => handleShowModal('login')} className="text-light">Entrar</NavLink>
                    /
                    <NavLink onClick={() => handleShowModal('register')} className="text-light">Registrar</NavLink>
                  </>
                )}
              </div>
              <ReactModal
                isOpen={modalOpen}
                onRequestClose={handleCloseReactModal}
                shouldCloseOnEsc={true}
                className={styles.reactModal}
                overlayClassName={styles.overlayModal}
                ariaHideApp={false}
              >
                <Link className="text-decoration-none" href="/profile">
                  <p className={styles.modalLink}>Meus dados</p>
                </Link>
                <Link className="text-decoration-none" href="/schedules">
                  <p className={styles.modalLink}>Agendamentos</p>
                </Link>
                <Link className="text-decoration-none" href="/favorites">
                  <p className={styles.modalLink}>Favoritos</p>
                </Link>
                <p className={styles.modalLink} onClick={() => handleLogout(logout)}>Sair</p>
              </ReactModal>
            </NavbarCollapse>
          </Container>
        </Navbar>
      </header>
      <LoginRegisterModal show={showModal} handleClose={handleCloseModal} initialMode={initialMode} />
    </>
  )
}