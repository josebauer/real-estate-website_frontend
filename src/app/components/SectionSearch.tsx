import { Button, Container, FormSelect, Image } from "react-bootstrap";
import styles from "./sectionSearch.module.scss";

export default function SectionSearch() {
  return (
    <>
      <section className={styles.sectionSearch}>
        <Container className={`${styles.search} mx-2`}>
          <Container className={styles.formSelect}>
            <FormSelect className={styles.select} aria-label="Default select example" >
              <option className={styles.selectOption}>Tipo de negociação</option>
              <option value="sale" className={styles.selectOption}>Venda</option>
              <option value="rent" className={styles.selectOption}>Locação</option>
            </FormSelect>
            <FormSelect className={styles.select} aria-label="Default select example">
              <option className={styles.selectOption}>Imóvel</option>
              <option value="1" className={styles.selectOption}>Apartamentos</option>
              <option value="2" className={styles.selectOption}>Casas</option>
              <option value="3" className={styles.selectOption}>Salas Comerciais</option>
              <option value="4" className={styles.selectOption}>Terrenos</option>
            </FormSelect>
            <FormSelect className={styles.select} aria-label="Default select example">
              <option className={styles.selectOption}>Cidade</option>
              <option value="1" className={styles.selectOption}>Canoinhas</option>
              <option value="2" className={styles.selectOption}>Três Barras</option>
              <option value="3" className={styles.selectOption}>Chapecó</option>
            </FormSelect>
            <FormSelect className={styles.select} aria-label="Default select example">
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