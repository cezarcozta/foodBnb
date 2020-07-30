/* eslint-disable camelcase */
import React from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

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

interface IProps {
  card: IFoodCard;
  handleDelete: (id: string) => void;
  handleEdit: (card: IFoodCard) => void;
}

const Card: React.FC<IProps> = ({ card, handleDelete, handleEdit }: IProps) => {
  function setEditingCard(): void {
    handleEdit(card);
  }

  return (
    <Container>
      <header>
        <img src={card.img_url} alt={card.name} />
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
