import Image from "next/image";
import "../globals.scss";
import styles from './page.module.scss'
import Link from "next/link";

export default function Simulators() {
  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.title}>Simular Financiamento</h2>
        <p className="text-black text-center px-3">Escolha um banco abaixo para realizar uma simulação de financiamento do seu imóvel</p>
        <div className={styles.cards}>
          <Link className={styles.cardItem} href="https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso" target="_blank">
            <Image className={styles.cardImage} src="/simulators/Caixa.svg" alt="" width={140} height={80}/>
          </Link >
          <Link className={styles.cardItem} href="https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx" target="_blank" >
            <Image className={styles.cardImage} src="/simulators/BB.svg" alt="Card com o logo do Banco do Brasil" width={140} height={80}/>
          </Link >
          <Link className={styles.cardItem} href="https://www.negociosimobiliarios.santander.com.br/negociosimobiliarios/#/dados-pessoais?goal=3&ic=lpsimuladorci" target="_blank" >
            <Image className={styles.cardImage} src="/simulators/Santander.svg" alt="Card com o logo do banco Santander" width={140} height={80}/>
          </Link >
          <Link className={styles.cardItem} href="https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm" target="_blank" >
            <Image className={styles.cardImage} src="/simulators/Bradesco.svg" alt="Card com o logo do banco Bradesco" width={140} height={80}/>
          </Link >
          <Link className={styles.cardItem} href="https://credito-imobiliario.itau.com.br" target="_blank" >
            <Image className={styles.cardImage} src="/simulators/Itaú.svg" alt="Card com o logo do banco Itaú" width={140} height={80}/>
          </Link >
          <Link className={styles.cardItem} href="https://www.sicoob.com.br/web/creditoimobiliario/simulador?gad_source=1&gclid=Cj0KCQjwv7O0BhDwARIsAC0sjWMfupXedfq_Jc8yKVeNk7f9_mfX-_RYzFW9CwOShuBrNNa-a0WII9YaAjtaEALw_wcB" target="_blank" >
            <Image className={styles.cardImage} src="/simulators/Sicoob.svg" alt="Card com o logo da cooperativa financeira Sicoob" width={140} height={80}/>
          </Link >
        </div>
      </main>
    </>
  )
}