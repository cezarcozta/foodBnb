/* eslint-disable camelcase */
import React, { useRef, useCallback, useEffect, useState } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../FilterForm/Input';
import Select from '../FilterForm/Select';
import InputImage from '../InputImage';

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
  handleAddFoodCard: (card: Omit<ICreateFoodData, 'id'>) => void;
}

const ModalAddFoodCard: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFoodCard,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [foodType, setFoodType] = useState<IFoodType[]>([]);

  const handleSubmit = useCallback(
    async ({ image, name, type, price }: ICreateFoodData) => {
      handleAddFoodCard({
        image,
        name,
        type,
        price,
      });

      setIsOpen();
    },
    [handleAddFoodCard, setIsOpen],
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Cardápio</h1>
        <InputImage name="image" />

        <Input name="name" placeholder="Ex: Churrasco Premium" />
        <Input name="price" placeholder="Ex: 99.90" />

        <Select name="type" placeholder="Escolha o tipo de comida">
          {foodType &&
            foodType.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </Select>
        <button type="submit">
          <p className="text">Adicionar Cardápio</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFoodCard;
