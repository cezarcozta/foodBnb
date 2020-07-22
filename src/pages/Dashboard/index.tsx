import React, { useState, useEffect } from 'react';

import Food from '../../components/Food';

import {FoodsContainer} from './styles';

interface IFoodCard {
  id: number;
  name: string;
  type: string;
  price: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodCard[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodCard>({} as IFoodCard);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditingModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      //API
    }

    //load da listagem inicial do mongo
    loadFoods();
  }, []);

  const Foods = {
    id: 111,
    name: "Churras Premium",
    type: "Churrasco",
    price: "100",
    image: "image.png",
    available: true,
  }

  function handleDeleteFood(id: number): void {
    //await api.delete(`/foods/${id}`);

    const filterFoods = foods.filter(food => food.id !== id);
    
    setFoods(filterFoods);
  }

  function handleEditFood(food: IFoodCard): void {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
    setEditingFood(food);
  }

  return (
    <>
      <FoodsContainer>
        <Food
          food={Foods}
          handleDelete={handleDeleteFood}
          handleEdit={handleEditFood}
        />
      </FoodsContainer>
    </>
  );
};

export default Dashboard;