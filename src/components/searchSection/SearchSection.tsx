import { Button, Container, FormSelect } from "react-bootstrap";
import styles from "./searchSection.module.scss";

export default function SearchSection() {
  return (
    <>
      <section className={styles.searchSection}>
        <Container className={`${styles.search} mx-2 shadow`}>
          <Container className={styles.formSelect}>
            <FormSelect id="negotiation" className={styles.select} aria-label="Selecionar tipo de negociação" >
              <option className={styles.selectOption}>Tipo de negociação</option>
              <option value="sale" className={styles.selectOption}>Venda</option>
              <option value="rent" className={styles.selectOption}>Locação</option>
            </FormSelect>
            <FormSelect id="realEstate" className={styles.select} aria-label="Selecionar imóvel">
              <option className={styles.selectOption}>Imóvel</option>
              <option value="1" className={styles.selectOption}>Apartamentos</option>
              <option value="2" className={styles.selectOption}>Casas</option>
              <option value="3" className={styles.selectOption}>Salas Comerciais</option>
              <option value="4" className={styles.selectOption}>Terrenos</option>
            </FormSelect>
            <FormSelect id="city" className={styles.select} aria-label="Selecionar cidade">
              <option className={styles.selectOption}>Cidade</option>
              <option value="1" className={styles.selectOption}>Canoinhas</option>
              <option value="2" className={styles.selectOption}>Três Barras</option>
              <option value="3" className={styles.selectOption}>Chapecó</option>
            </FormSelect>
            <FormSelect id="district" className={styles.select} aria-label="Selecionar bairro">
              <option className={styles.selectOption}>Bairro</option>
              <option value="1" className={styles.selectOption}>Alto da Tijuca</option>
              <option value="2" className={styles.selectOption}>Centro</option>
              <option value="3" className={styles.selectOption}>Efapi</option>
            </FormSelect>
          </Container>

          <Button className={styles.searchButton}>
            Pesquisar
          </Button>
        </Container>

      </section>
    </>
  )
}