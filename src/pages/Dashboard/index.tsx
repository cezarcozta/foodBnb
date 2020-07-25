import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFoodCard from '../../components/ModalAddFoodCard';
import ModalEditFood from '../../components/ModalEditFoodCard';

import { FoodsContainer, Title } from './styles';

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
  const [foods, setFoods] = useState<IFoodCard[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodCard>({} as IFoodCard);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoodsCards(): Promise<void> {
      await api.get('/cards').then(response => {
        setFoods(response.data);
      });
    }

    loadFoodsCards();
  }, []);

  async function handleAddFoodCard(food: Omit<IFoodCard, 'id'>): Promise<void> {
    try {
      const { name, type, price } = food;

      const response = await api.post<IFoodCard>('/cards', {
        name,
        type,
        price,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function handleUpdateFoodCard(
    food: Omit<IFoodCard, 'id'>,
  ): Promise<void> {
    const foodsList = foods.map(f => {
      if (f.id !== editingFood.id) {
        return f;
      }

      return {
        ...food,
        id: editingFood.id,
      };
    });

    setFoods(foodsList);

    await api.put(`/foods/${editingFood.id}`, {
      ...food,
      id: editingFood.id,
    });
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/cards/${id}`);

    const filterFoods = foods.filter(food => food.id !== id);

    setFoods(filterFoods);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodCard): void {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFoodCard
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFoodCard={handleAddFoodCard}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFoodCard={handleUpdateFoodCard}
      />
      <Title>Cardápios</Title>
      <FoodsContainer>
        {foods.map(food => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEdit={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
