"use client"

import Image from "next/image";
import Link from "next/link";
import { Button, Container, Nav, NavLink, Navbar, NavbarCollapse, NavbarToggle } from "react-bootstrap";
import styles from "./header.module.scss"
import LoginRegisterModal from "../loginRegisterModal/LoginRegisterModal";
import { useModal } from "@/app/hooks/useModal";

export default function Header() {
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
            <Image src="/logo-white.svg" alt="Logo da imobiliária JH" width={109} height={68} />
          </Link>
          <NavbarToggle aria-controls="basic-navbar-nav" className={styles.navbarToggle} />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="gap-2 gap-lg-5 mx-auto py-3">
              <NavLink href="/sale" className="text-light">Venda</NavLink>
              <NavLink href="/rent" className="text-light">Locação</NavLink>
              <NavLink href="/simulators" className="text-light">Simuladores</NavLink>
              <NavLink href="/contact" className="text-light">Contato</NavLink>
            </Nav>
            <div className="d-flex align-items-center gap-2 my-3 ">
              <Image src="/icons/profile-icon.svg" alt="Ícone do perfil" width={25} height={25} />
              <NavLink onClick={() => handleShowModal('login')} className="text-light">Entrar</NavLink>
              /
              <NavLink onClick={() => handleShowModal('register')} className="text-light">Registrar</NavLink>
            </div>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
    <LoginRegisterModal show={showModal} handleClose={handleCloseModal} initialMode={initialMode}/>
  </>
  )
}