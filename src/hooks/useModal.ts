import { useState, useCallback } from 'react';

type Mode = 'login' | 'register';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [initialMode, setInitialMode] = useState<Mode>('login');

  const handleShowModal = useCallback((mode: Mode) => {
    setInitialMode(mode);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  return {
    showModal,
    initialMode,
    handleShowModal,
    handleCloseModal,
  };
};