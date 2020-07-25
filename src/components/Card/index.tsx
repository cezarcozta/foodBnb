import React, { useEffect, useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import img from '../../assets/Churrasco_Tradicional.png';
import { Container } from './styles';

import api from '../../services/api';

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
  card: IFoodCard;
  types: IFoodType;
  handleDelete: (id: number) => void;
  handleEdit: (card: IFoodCard) => void;
}

const Card: React.FC<IProps> = ({
  card,
  types,
  handleDelete,
  handleEdit,
}: IProps) => {
  const [foodTypes, setFoodTypes] = useState<IFoodType[]>([]);

  useEffect(() => {
    async function loadFoodTypes(): Promise<void> {
      await api.get('/foods').then(response => {
        setFoodTypes(response.data);
      });
    }

    loadFoodTypes();
  }, []);

  function setEditingCard(): void {
    handleEdit(card);
  }

  return (
    <Container>
      <header>
        <img src={img} alt={card.name} />
      </header>
      <section className="body">
        <main>
          <h4>{card.type.name}</h4>
          <h2>{card.name}</h2>
        </main>
        <aside>
          <p className="price">
            <b>
              R$
              {card.price}
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
            onClick={() => setEditingCard()}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(card.id)}
          >
            <FiTrash size={20} />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default Card;
