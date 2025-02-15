import { Button, Form, Modal } from "react-bootstrap";
import styles from "./scheduleModal.module.scss";
import { useState } from "react";
import scheduleService from "@/services/scheduleService";
import ToastComponent from "../toast/Toast";

interface ForgotPasswordModalProps {
  show: boolean;
  handleClose: () => void;
  realEstateId: number;
}

const today = new Date();
const twoWeeksLater = new Date();
twoWeeksLater.setDate(today.getDate() + 14);

// Formatando as datas no formato yyyy-mm-dd
const todayString = today.toISOString().split('T')[0];
const twoWeeksLaterString = twoWeeksLater.toISOString().split('T')[0];

export default function ScheduleModal({ show, handleClose, realEstateId }: ForgotPasswordModalProps) {
  const [toastColor, setToastColor] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const scheduledDate = new Date(`${date}T${time}:00`);

    try {
      await scheduleService.createSchedule(realEstateId, scheduledDate);

      setToastColor('bg-success')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
        handleClose()
      }, 1000 * 3)
      setToastMessage('Agendamento realizado com sucesso!')
    } catch (error) {
      setToastColor('bg-danger')
      setToastShow(true)
      setTimeout(() => {
        setToastShow(false)
        handleClose()
      }, 1000 * 3)
      setToastMessage('Erro ao realizar o agendamento!')
    }
  };

  return (
    <>
      <Modal className={styles.modal} show={show} onHide={handleClose}>
        <Modal.Header className={styles.modalHeader} >
          <Modal.Title className={styles.modalTitle}>
            Agendar Visita
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form className="d-flex flex-column p-3" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="date">Escolha uma data</Form.Label>
              <Form.Control 
                name="date" 
                id="date" 
                type="date" 
                min={todayString} 
                max={twoWeeksLaterString} 
                className={styles.input} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label htmlFor="time">Escolha um horário</Form.Label>
              <Form.Control 
                name="time" 
                id="time" 
                type="time" 
                min="08:00" 
                max="18:00" 
                className={styles.input} 
                onChange={(e) => setTime(e.target.value)} 
                required 
                />
            </Form.Group>
            <ToastComponent color={toastColor} show={toastShow} message={toastMessage} />
            <div className={styles.buttons}>
              <Button variant="success" type="submit" >Realizar Agendamento</Button>
              <Button variant="danger" onClick={handleClose}>Cancelar</Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}></Modal.Footer>
      </Modal >
    </>
  )
}