import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.contactContainer}>
          <div className={styles.map}>
            <iframe className={styles.iframe} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28644.203223619967!2d-50.41242263645696!3d-26.179581727732092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e7127e5e9ea279%3A0x35cef8ef1c2e7669!2sCanoinhas%2C%20SC%2C%2089460-000!5e0!3m2!1spt-BR!2sbr!4v1721072218418!5m2!1spt-BR!2sbr" width="100%"></iframe>
          </div>
          <div className={`${styles.contact} shadow`}>
            <p className={styles.title}>Como chegar até nós?</p>
            <p className="mb-0">Estamos na Rua Xxxxx, nº000, Centro</p>
            <p>CEP - 00000-000 | Canoinhas-SC</p>
            <ul className="pt-3">
              <li className={styles.listItem}>
                <Link className={styles.linkItem} href="tel:(47) 3622-0000">
                  <Image className="" src="/icons/phone-icon-black.svg" alt="" width={25} height={25} />
                  <p>(47) 3622-0000</p>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link className={styles.linkItem} href="tel:(47) 9 9999-9999">
                  <Image className="" src="/icons/whatsapp-icon-black.svg" alt="" width={25} height={25} />
                  <p>(47) 9 9999-9999</p>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link className={styles.linkItem} href="mailto:imobiliariajh@email.com">
                  <Image className="" src="/icons/email-icon-black.svg" alt="" width={25} height={25} />
                  <p>imobiliariajh@email.com</p>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}