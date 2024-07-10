import { Container } from "react-bootstrap";
import styles from "./footer.module.scss"
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <div className="d-flex gap-5 mt-5">
            <ul className={`${styles.list} d-flex flex-column gap-4 ps-3`}>
              <p className={styles.listTitle}>Venda</p>
              <li>Casas</li>
              <li>Apartamentos</li>
              <li>Lotes</li>
              <li>Salas comerciais</li>
            </ul>
            <ul className={`${styles.list} d-flex flex-column gap-4`}>
              <p className={styles.listTitle}>Locação</p>
              <li>Casas</li>
              <li>Apartamentos</li>
              <li>Lotes</li>
              <li>Salas comerciais</li>
            </ul>
            <ul className={`${styles.list} d-flex flex-column gap-4`}>
              <p className={styles.listTitle}>Minha Conta</p>
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
            <ul className="d-flex flex-column gap-4 align-self-start">
              <p className={styles.listTitle}>Redes Sociais</p>
              <li className={styles.listItem}>
                <Image className="me-3" src="/socialMediasLogos/instagram-logo.svg" alt="logo da rede social Instagram" width={25} height={25} />
                <Link className={styles.link} href="https://www.instagram.com/imobiliaria_jh" target="_blank">
                  @imobiliaria_jh
                </Link>
              </li>
              <li className={styles.listItem}>
                <Image className="me-3" src="/socialMediasLogos/facebook-logo.svg" alt="logo da rede social Facebook" width={25} height={25} />
                <Link className={styles.link} href="https://www.facebook.com/imobiliariajh" target="_blank">
                  /imobiliariajh
                </Link>
              </li>
              <li className={styles.listItem}>
                <Image className="me-3" src="/socialMediasLogos/X-logo.svg" alt="logo da rede social X" width={25} height={25} />
                <Link className={styles.link} href="https://www.x.com/imobiliariajh" target="_blank">
                  @imobiliariajh
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.contactArea} d-flex align-items-center mt-5 gap-5`}>
            <Image src="/logo-white.svg" alt="Logo da imobiliária JH" width={109} height={68} />
            <div className={styles.realEstateData}>
              <p>CRECI nº 0.123-J</p>
              <p>Rua XxxxX, nº 000, Centro</p>
              <p className="mb-1">CEP - 00000-000 | Canoinhas-SC</p>
            </div>
            <div className="d-flex gap-3">
              <Image src="/icons/email-icon.svg" alt="ícone de email" width={25} height={25} />
              <Link className={styles.link} href="mailto:imobiliariajh@email.com">
                imobiliariajh@email.com
              </Link>
            </div>
            <div className="d-flex gap-3">
              <Image src="/icons/whatsapp-icon.svg" alt="ícone do aplicativo whatsapp" width={25} height={25} />
              <Link className={styles.link} href="tel:(47) 9 9999-9999">
                (47) 9 9999-9999
              </Link>
            </div>
            <div className="d-flex gap-3">
              <Image src="/icons/phone-icon.svg" alt="ícone de telefone" width={25} height={25} />
              <Link className={styles.link} href="tel:(47) 3622-0000">
                (47) 3622-0000
              </Link>
            </div>
          </div>
          <p className={styles.copyright}>Desenvolvido por José Henrique Bauer &copy; 2024 Todos os direitos reservados</p>
        </Container>
      </footer>
    </>
  )
}