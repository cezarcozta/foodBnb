import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';
import Card from '../../components/Card';
import ModalAddFoodCard from '../../components/ModalAddFoodCard';
import ModalEditFood from '../../components/ModalEditFoodCard';

import { CardsContainer, Title } from './styles';

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

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<IFoodCard[]>([]);
  const [foodTypes, setFoodTypes] = useState<IFoodType[]>([]);
  const [editingCard, setEditingCard] = useState<IFoodCard>({} as IFoodCard);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  /**
   * USECALLBACK PRA AÇÃO DE CHAMAR A ROTA DE FILTRO,]
   * RECEBER A RESPOSTA E SETAR POR CIMA DO QUE ESTA APRESENTADO
   */
  // const handleSearch = useCallback(() => {
  //   api.get(`/cards/?type=${}&price=${}`).then(response => {
  //     setCards(response.data);
  //   });
  // }, []);

  useEffect(() => {
    async function loadFoodsCards(): Promise<void> {
      await api.get('/cards').then(response => {
        setCards(response.data);
      });
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
    food: Omit<IFoodCard, 'id'>,
  ): Promise<void> {
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

    await api.put(`/cards/${editingCard.id}`, {
      ...cards,
      id: editingCard.id,
    });
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/cards/${id}`);

    const filterCards = cards.filter(card => card.id !== id);

    setCards(filterCards);
  }

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
      <Header openModal={toggleModal} search={() => {}} />

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
