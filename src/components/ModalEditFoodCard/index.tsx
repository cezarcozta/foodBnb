/* eslint-disable camelcase */
import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../Modal';
import Input from '../FilterForm/Input';
import Select from '../FilterForm/Select';
import InputImage from '../InputImage';

import { Form } from './styles';

import api from '../../services/api';

interface IFoodType {
  id: string;
  name: string;
}

interface IFoodCard {
  id: string;
  name: string;
  img_url: string;
  type: IFoodType;
  price: string;
}

interface ICreateFoodData {
  name: string;
  image: File;
  type: IFoodType;
  price: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFoodCard: (card: Omit<IFoodCard, 'id'>) => void;
  editingFood: IFoodCard;
}

const ModalEditFoodCard: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateFoodCard,
  editingFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [foodType, setFoodType] = useState<IFoodType[]>([]);

  const handleSubmit = useCallback(
    async (data: IFoodCard) => {
      handleUpdateFoodCard(data);
      setIsOpen();
    },
    [handleUpdateFoodCard, setIsOpen],
  );

  useEffect(() => {
    async function loadFoodTypes(): Promise<void> {
      const response = await api.get('/foods');

      setFoodType(response.data);
    }

    loadFoodTypes();
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Cardápio</h1>
        <InputImage type="file" name="image" />

        <Input name="name" placeholder="Ex: Churrasco Premium" />
        <Input name="price" placeholder="Ex: 99.90" />

        <Select
          name="type"
          type="select"
          placeholder="Escolha: o tipo de comida: "
        >
          {foodType &&
            foodType.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </Select>
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

export default ModalEditFoodCard;
