import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IFoodType {
  id: string;
  name: string;
}

interface IFoodCard {
  id: number;
  name: string;
  type: IFoodType;
  price: string;
}

interface ICreateFoodData {
  name: string;
  type: IFoodType;
  price: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFoodCard: (card: Omit<IFoodCard, 'id'>) => void;
  editingFood: IFoodCard;
}

const ModalAddFoodCard: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateFoodCard,
  editingFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {
      handleUpdateFoodCard(data);
      setIsOpen();
    },
    [handleUpdateFoodCard, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Cardápio</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Churrasco Premium" />
        <Input name="price" placeholder="Ex: 99.90" />

        <Input name="type" type="select" placeholder="Ex: Chuurasco" />
        <button type="submit">
          <p className="text">Editar Cardápio</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFoodCard;
