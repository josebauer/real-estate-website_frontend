"use client"

import { Button, Container } from "react-bootstrap";
import styles from "./footer.module.scss"
import Image from "next/image";
import Link from "next/link";
import LoginRegisterModal from "../loginRegisterModal/LoginRegisterModal";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/services/categoriesService";

interface props {
  categories: CategoryType[]
}

export default function Footer({ categories }: props) {
  const { isAuthenticated, logout } = useAuth()

  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const {
    showModal,
    initialMode,
    handleShowModal,
    handleCloseModal
  } = useModal()

  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <div className={`${styles.listsContainer} d-flex gap-5 mt-5`}>
            <div className={styles.listWithTitle}>
              <p className={styles.listTitle}>Venda</p>
              <ul className={styles.list}>
                {Array.isArray(categories) && categories.map((category) => (
                  <li key={category.id}>{category.name.replace(/(^\w{1})/, firstLetter => firstLetter.toUpperCase())}</li>
                ))}
              </ul>
            </div>
            <div className={styles.listWithTitle}>
              <p className={styles.listTitle}>Locação</p>
              <ul className={styles.list}>
                {Array.isArray(categories) && categories.map((category) => (
                  <li key={category.id}>{category.name.replace(/(^\w{1})/, firstLetter => firstLetter.toUpperCase())}</li>
                ))}
              </ul>
            </div>
            <div className={styles.listWithTitle}>
              <p className={styles.listTitle}>Minha Conta</p>
              <ul className={styles.list}>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link href="/profile" className={styles.link} >
                        Meus dados
                      </Link>
                    </li>
                    <li>
                      <Link href="/favorites" className={styles.link} >
                        Favoritos
                      </Link>
                    </li>
                    <li>
                      <Link href="/schedules" className={styles.link} >
                        Agendamentos
                      </Link>
                    </li>
                    <li>
                      <p onClick={() => handleLogout()} className={styles.link} >
                        Sair
                      </p>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Button id={styles.linkLogin} variant="link" onClick={() => handleShowModal('login')} className={`${styles.link} p-0`} >
                        Entrar
                      </Button>
                    </li>
                    <li>
                      <Button id={styles.linkRegister} variant="link" onClick={() => handleShowModal('register')} className={`${styles.link} p-0`} >
                        Registrar
                      </Button>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="d-flex flex-column gap-4">
              <p className={`${styles.listTitle} text-lg-start`}>Redes Sociais</p>
              <ul className={`${styles.socialMediasList} d-flex justify-content-between flex-lg-column`}>
                <li className={styles.listItem}>
                  <Link className={`${styles.link} d-flex`} href="https://www.instagram.com/imobiliaria_jh" target="_blank">
                    <Image className="me-3" src="/socialMediasLogos/instagram-logo.svg" alt="logo da rede social Instagram" width={25} height={25} />
                    <p>@imobiliariajh</p>
                  </Link>
                </li>
                <li className={styles.listItem}>
                  <Link className={`${styles.link} d-flex`} href="https://www.facebook.com/imobiliariajh" target="_blank">
                    <Image className="me-3" src="/socialMediasLogos/facebook-logo.svg" alt="logo da rede social Facebook" width={25} height={25} />
                    <p>/imobiliariajh</p>
                  </Link>
                </li>
                <li className={styles.listItem}>
                  <Link className={`${styles.link} d-flex`} href="https://www.x.com/imobiliariajh" target="_blank">
                    <Image className="me-3" src="/socialMediasLogos/X-logo.svg" alt="logo da rede social X" width={25} height={25} />
                    <p>@imobiliariajh</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles.contactArea} d-flex flex-column flex-xl-row  align-items-xl-center mt-5 gap-5`}>
            <div className="d-flex flex-column flex-sm-row gap-5 align-items-center justify-content-center">
              <Image src="/logo-white.svg" alt="Logo da imobiliária JH" priority width={109} height={68} />
              <div className={styles.realEstateData}>
                <p>CRECI nº 0.123-J</p>
                <p>Rua XxxxX, nº 000, Centro</p>
                <p className="mb-1">CEP - 00000-000 | Canoinhas-SC</p>
              </div>
            </div>
            <div className="d-flex gap-5 justify-content-between">
              <Link className={`${styles.link} d-flex gap-3`} href="mailto:imobiliariajh@email.com">
                <Image src="/icons/email-icon.svg" alt="ícone de email" width={25} height={25} />
                <p>imobiliariajh@email.com</p>
              </Link>
              <Link className={`${styles.link} d-flex gap-3`} href="tel:(47) 9 9999-9999">
                <Image src="/icons/whatsapp-icon.svg" alt="ícone do aplicativo whatsapp" width={25} height={25} />
                <p>(47) 9 9999-9999</p>
              </Link>
              <Link className={`${styles.link} d-flex gap-3`} href="tel:(47) 3622-0000">
                <Image src="/icons/phone-icon.svg" alt="ícone de telefone" width={25} height={25} />
                <p>(47) 3622-0000</p>
              </Link>
            </div>
          </div>
          <p className={styles.copyright}>Desenvolvido por José Henrique Bauer &copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </Container>
      </footer>
      <LoginRegisterModal show={showModal} handleClose={handleCloseModal} initialMode={initialMode} />
    </>
  )
}