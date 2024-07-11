import { Container } from "react-bootstrap";
import styles from "./footer.module.scss"
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <div className={`${styles.listsContainer} d-flex gap-5 mt-5`}>
            <div className={styles.listWithTitle}>
              <p className={styles.listTitle}>Venda</p>
              <ul className={styles.list}>
                <li>Casas</li>
                <li>Apartamentos</li>
                <li>Lotes</li>
                <li>Salas comerciais</li>
              </ul>
            </div>
            <div className={styles.listWithTitle}>
              <p className={styles.listTitle}>Locação</p>
              <ul className={styles.list}>
                <li>Casas</li>
                <li>Apartamentos</li>
                <li>Lotes</li>
                <li>Salas comerciais</li>
              </ul>
            </div>
            <div className={styles.listWithTitle}>
              <p className={styles.listTitle}>Minha Conta</p>
              <ul className={styles.list}>
                <li>
                  <Link href="/login" className={styles.link} >
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link href="/register" className={styles.link} >
                    Registrar
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
              <Image src="/logo-white.svg" alt="Logo da imobiliária JH" width={109} height={68} />
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
          <p className={styles.copyright}>Desenvolvido por José Henrique Bauer &copy; 2024 Todos os direitos reservados</p>
        </Container>
      </footer>
    </>
  )
}