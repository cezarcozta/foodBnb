import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import img from '../../assets/Churrasco_Tradicional.png';
import { Container } from './styles';

interface IFoodCard {
  id: number;
  name: string;
  type: string;
  image: string;
  price: string;
  available: boolean;
}

interface IProps {
  food: IFoodCard;
  handleDelete: (id: number) => void;
  handleEdit: (food: IFoodCard) => void;
}

const Food: React.FC<IProps> = ({ food, handleDelete, handleEdit }) => {
  const [isAvailable, setIsAvailable] = useState(food.available);

  async function toggleAvailable(): Promise<void> {
    setIsAvailable(!isAvailable);
  }

  function setEditingFood(): void {
    handleEdit(food);
  }
  return (
    <Container available={isAvailable}>
      <header>
        <img src={img} alt="churras" />
      </header>
      <section className="body">
        <main>
          <h4>Churrasco</h4>
          <h2>Churrasco Premium</h2>
        </main>
        <aside>
          <p className="price">
            <b>R$ 100</b>
            <br />
            <small>/pessoa</small>
          </p>
        </aside>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood()}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
