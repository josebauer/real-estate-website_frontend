"use client"

import Image from "next/image";
import Link from "next/link";
import { Button, Container, Nav, NavDropdown, NavLink, Navbar, NavbarCollapse, NavbarToggle } from "react-bootstrap";
import styles from "./header.module.scss"
import LoginRegisterModal from "../loginRegisterModal/LoginRegisterModal";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useAuth } from "@/contexts/AuthContext";
import profileService from "@/services/profileService";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/services/categoriesService";

interface props {
  categories: CategoryType[]
}


export default function Header({ categories }: props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const { isAuthenticated, logout } = useAuth()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName)
      setLastName(user.lastName)
    })
  })

  useEffect(() => {
    setModalOpen(false)
  }, [pathname])

  const handleOpenReactModal = () => {
    setModalOpen(true)
  }

  const handleCloseReactModal = () => {
    setModalOpen(false)
  }

  const handleLogout = () => {
    setModalOpen(false)
    setTimeout(() => {
      logout()
      setFirstName("")
      setLastName("")
      router.push('/')
    }, 100)
  }

  const {
    showModal,
    initialMode,
    handleShowModal,
    handleCloseModal
  } = useModal()

  return (
    <>
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
      <header className={styles.test}>
        <Navbar expand="lg" className={styles.bgDarkBlue} >
          <Container>
            <Link href="/" className={`${styles.logo} navbar-brand`}>
              <Image src="/logo-white.svg" alt="Logo da imobiliária JH" priority width={109} height={68} />
            </Link>
            <NavbarToggle className={styles.navbarToggle} aria-controls="basic-navbar-nav" />
            <NavbarCollapse className={styles.navbarCollapse} id="basic-navbar-nav">
              <Nav className="align-items-lg-center gap-2 gap-lg-5 mx-auto py-3">
                <NavDropdown title="Venda" className={`${styles.dropdown} text-light`} id="dropdown-sale">
                  {Array.isArray(categories) && categories.map((category) => (
                    <NavDropdown.Item as="div" className={styles.dropdownItem} key={category.id}>
                      <Link href="/" className={styles.dropdownLink}>
                        {category.name.replace(/(^\w{1})/, firstLetter => firstLetter.toUpperCase())}
                      </Link>
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown title="Locação" className={`${styles.dropdown}`} id="dropdown-rent">
                  {Array.isArray(categories) && categories.map((category) => (
                    <NavDropdown.Item as="div" className={styles.dropdownItem} key={category.id}>
                      <Link href="/rent" className={styles.dropdownLink}>
                        {category.name.replace(/(^\w{1})/, firstLetter => firstLetter.toUpperCase())}
                      </Link>
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <Link href="/simulators" className="py-2 p-lg-0 text-light text-decoration-none">Simuladores</Link>
                <Link href="/contact" className="py-2 p-lg-0 text-light text-decoration-none">Contato</Link>
              </Nav>
            </NavbarCollapse>
            <div className="d-flex align-items-center gap-2 my-3 ">
              {isAuthenticated ? (
                <>
                  <p onClick={handleOpenReactModal} className={styles.profileIcon}>{firstName?.slice(0, 1).toUpperCase()}{lastName?.slice(0, 1).toUpperCase()}</p>
                  <p className={`${styles.welcome} m-0`}>Olá, {firstName}!</p>
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
              <Link className="text-decoration-none" onClick={handleCloseReactModal} href="/profile">
                <p className={styles.modalLink}>Meus dados</p>
              </Link>
              <Link className="text-decoration-none" onClick={handleCloseReactModal} href="/schedules">
                <p className={styles.modalLink}>Agendamentos</p>
              </Link>
              <Link className="text-decoration-none" onClick={handleCloseReactModal} href="/favorites">
                <p className={styles.modalLink}>Favoritos</p>
              </Link>
              <p className={styles.modalLink} onClick={() => handleLogout()}>Sair</p>
            </ReactModal>
          </Container>
        </Navbar>
      </header>
      <LoginRegisterModal show={showModal} handleClose={handleCloseModal} initialMode={initialMode} />
    </>
  )
}