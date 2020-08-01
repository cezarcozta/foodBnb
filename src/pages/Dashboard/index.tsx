/* eslint-disable camelcase */
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
  image: File;
  img_url: string;
  type: IFoodType;
  price: string;
}

interface IAddFoodCard {
  image: File;
  name: string;
  type: IFoodType;
  price: string;
}

interface IUpdateFoodCard {
  id: string;
  image: File;
  name: string;
  img_url: string;
  type: IFoodType;
  price: string;
}

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<IFoodCard[]>([]);
  const [editingCard, setEditingCard] = useState<IUpdateFoodCard>(
    {} as IUpdateFoodCard,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoodsCards(): Promise<void> {
      const response = await api.get<IFoodCard[]>('/cards/');

      setCards(response.data);
    }

    loadFoodsCards();
  }, []);

  const handleAddFoodCard = useCallback(
    async (foodCard: IAddFoodCard): Promise<void> => {
      try {
        const { name, type, price, image } = foodCard;

        const data = new FormData();

        data.append('image', image);
        data.append('name', name);
        data.append('type', String(type.id));
        data.append('price', price);

        const response = await api.post('/cards', data);

        setCards([...cards, response.data]);
      } catch (err) {
        throw new Error(err.message);
      }
    },
    [cards],
  );

  const handleUpdateFoodCard = useCallback(
    async (foodCard: IUpdateFoodCard): Promise<void> => {
      try {
        const cardsList = cards.map(card => {
          if (card.id !== editingCard.id) {
            return card;
          }

          return {
            ...card,
            id: editingCard.id,
          };
        });

        setCards(cardsList);

        const data = new FormData();

        data.append('image', foodCard.image);
        data.append('name', foodCard.name);
        data.append('type', String(foodCard.type));
        data.append('price', foodCard.price);

        const response = await api.put(`/cards/${editingCard.id}`, data);

        setCards([...cards, response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [cards, editingCard],
  );

  const handleDeleteFood = useCallback(
    async (id: string): Promise<void> => {
      await api.delete(`/cards/${id}`);

      const filterCards = cards.filter(card => card.id !== id);

      setCards(filterCards);
    },
    [cards],
  );

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

  function handleEditFood(card: IUpdateFoodCard): void {
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
        editingCard={editingCard}
        handleUpdateFoodCard={handleUpdateFoodCard}
      />

      <Title>Cardápios</Title>

      <CardsContainer>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleDelete={handleDeleteFood}
            handleEdit={handleEditFood}
          />
        ))}
      </CardsContainer>
    </>
  );
};

export default Dashboard;
