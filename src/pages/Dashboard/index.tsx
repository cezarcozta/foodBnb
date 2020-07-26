/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';

import FilterForm from '../../components/FilterForm';
import Card from '../../components/Card';
import ModalAddFoodCard from '../../components/ModalAddFoodCard';
import ModalEditFood from '../../components/ModalEditFoodCard';

import { CardsContainer, Title } from './styles';

interface IFoodType {
  id: string;
  name: string;
}

interface IFoodCard {
  id: string;
  name: string;
  type: IFoodType;
  price: string;
}

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<IFoodCard[]>([]);
  const [editingCard, setEditingCard] = useState<IFoodCard>({} as IFoodCard);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoodsCards(): Promise<void> {
      const response = await api.get<IFoodCard[]>('/cards/');
      setCards(response.data);
    }

    loadFoodsCards();
  }, []);

  async function handleAddFoodCard(
    foodCard: Omit<IFoodCard, 'id'>,
  ): Promise<void> {
    try {
      const { name, type, price } = foodCard;

      const response = await api.post<IFoodCard>('/cards', {
        name,
        type,
        price,
      });

      setCards([...cards, response.data]);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function handleUpdateFoodCard(
    card: Omit<IFoodCard, 'id'>,
  ): Promise<void> {
    const cardsList = cards.map(c => {
      if (c.id !== editingCard.id) {
        return c;
      }

      return {
        ...card,
        id: editingCard.id,
      };
    });

    setCards(cardsList);

    await api.put(`/cards/${editingCard.id}`, {
      ...cards,
      id: editingCard.id,
    });
  }

  async function handleDeleteFood(id: string): Promise<void> {
    await api.delete(`/cards/${id}`);

    const filterCards = cards.filter(card => card.id !== id);

    setCards(filterCards);
  }

  const handleSubmit = useCallback(async data => {
    const { type, minPrice, maxPrice } = data;
    const response = await api.get<IFoodCard[]>('/cards/', {
      params: {
        type,
        price: `${minPrice},${maxPrice}`,
      },
    });
    setCards(response.data);
  }, []);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(card: IFoodCard): void {
    setEditingCard(card);
    toggleEditModal();
  }

  return (
    <>
      <FilterForm openModal={toggleModal} handleSubmit={handleSubmit} />

      <ModalAddFoodCard
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFoodCard={handleAddFoodCard}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingCard}
        handleUpdateFoodCard={handleUpdateFoodCard}
      />

      <Title>Cardápios</Title>

      <CardsContainer>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            types={card.type}
            handleDelete={handleDeleteFood}
            handleEdit={handleEditFood}
          />
        ))}
      </CardsContainer>
    </>
  );
};

export default Dashboard;
