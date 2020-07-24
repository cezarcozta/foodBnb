import React from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import img from '../../assets/Churrasco_Tradicional.png';
import { Container } from './styles';

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

interface IProps {
  food: IFoodCard;
  handleDelete: (id: number) => void;
  handleEdit: (food: IFoodCard) => void;
}

const Food: React.FC<IProps> = ({ food, handleDelete, handleEdit }: IProps) => {
  function setEditingFood(): void {
    handleEdit(food);
  }
  return (
    <Container>
      <header>
        <img src={img} alt={food.name} />
      </header>
      <section className="body">
        <main>
          <h4>{food.type.name}</h4>
          <h2>{food.name}</h2>
        </main>
        <aside>
          <p className="price">
            <b>
              R$
              {food.price}
            </b>
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
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
          >
            <FiTrash size={20} />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default Food;
