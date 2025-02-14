"use client"

import { Button, Card, Container } from "react-bootstrap";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import scheduleService, { ScheduleType } from "@/services/scheduleService";

export default function Schedules () {
  const [schedules, setSchedules] = useState<ScheduleType[]>([])

  const fetchSchedules = async () => {
    const data = await scheduleService.getUserSchedules();
    setSchedules(data.schedules || []);
  };
  
  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDeleteSchedule = async (scheduleId: number) => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      try {
        await scheduleService.deleteSchedule(scheduleId);
        alert("Agendamento excluído com sucesso!");
        // Atualizar estado removendo o agendamento excluído
        setSchedules((prev) => prev.filter((schedule) => schedule.id !== scheduleId));
      } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        alert("Não foi possível excluir o agendamento.");
      }
    }
  };

  return (
    <main>
      <Container className="pb-4">
        <p className={styles.title}>Meus Agendamentos</p>
        <div className={styles.schedules}>
        {schedules?.length === 0 ? (
            <p className={styles.schedulesNotFound}>Você ainda não possui agendamentos!</p>
          ) : (
            schedules.map((schedule) => (
              <Card key={schedule.id} className={styles.scheduleCard}>
                <Card.Img 
                  variant="top" 
                  src={`${process.env.NEXT_PUBLIC_BASEURL}/${schedule.realEstate.imagesUrl?.[0]}`} 
                  className={styles.realEstateImage} 
                />
                <Card.Body>
                  <Card.Title>{schedule.realEstate?.title}</Card.Title>
                  <Card.Text className="text-dark">
                    Cidade: {schedule.realEstate?.city}, {schedule.realEstate?.state.toUpperCase()}
                    <br />
                    Bairro: {schedule.realEstate?.district}
                    <br />
                    Data Agendada: {new Date(schedule.scheduledDate).toLocaleDateString()}
                    <br />
                    Status: <strong className={styles.status}>{schedule.status.toUpperCase()}</strong>
                  </Card.Text>
                  <Button variant="primary" href={`/real-estate/${schedule.realEstate?.id}`}>
                    Ver Imóvel
                  </Button>
                  <Button 
                    className="mt-1"
                    variant="danger" 
                    onClick={() => handleDeleteSchedule(schedule.id)}
                  >
                    Excluir agendamento
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Container>
    </main>
  )
}