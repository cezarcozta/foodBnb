/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, FormEvent } from 'react';

import { FiSearch, FiPlusCircle } from 'react-icons/fi';

import { Container, Form } from './styles';
import api from '../../services/api';

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

interface IFilterFoodCard {
  type: IFoodType;
  minPrice: string;
  maxPrice: string;
  option: boolean;
}

interface IHeaderProps {
  openModal: () => void;
  doFilter: (data: IFilterFoodCard) => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal, doFilter }) => {
  const [foodType, setFoodTypes] = useState<IFoodType[]>([]);
  const [card, setCards] = useState<IFoodCard[]>([]);

  const [formData, setFormData] = useState<IFilterFoodCard>({
    type: {
      id: '',
      name: '',
    },
    minPrice: '',
    maxPrice: '',
    option: true,
  });

  useEffect(() => {
    async function loadFoodTypes(): Promise<void> {
      await api.get('/foods').then(response => {
        setFoodTypes(response.data);
      });

      await api.get('/cards').then(response => {
        setCards(response.data);
      });
    }

    loadFoodTypes();
  }, []);

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const { type, minPrice, maxPrice, option } = formData;

    const data = new FormData();

    data.append('type', type.id);
    data.append('minPrice', minPrice);
    data.append('maxPrice', maxPrice);

    const response = await api.get('cards', { params: data });

    setCards(response.data);
  }

  return (
    <Container>
      <header>
        <nav>
          <form onSubmit={handleSubmit}>
            <label htmlFor="type">Tipo de comida:</label>
            <select name="type" id="type">
              <option value="0">Selecione o tipo de comida</option>
              {foodType &&
                foodType.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>
            <label htmlFor="minPrice">De:</label>
            <input name="minPrice" placeholder="R$/Pessoa" />
            <label htmlFor="max">a:</label>
            <input name="maxPrice" placeholder="R$/Pessoa" />
            <button
              type="submit"
              onClick={() => {
                doFilter(formData);
              }}
            >
              <div className="icon-search">
                <FiSearch size={18} />
              </div>
              <div className="text">Buscar</div>
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              openModal();
            }}
          >
            <div className="icon-add">
              <FiPlusCircle size={18} />
            </div>
            <div className="text">Adicionar</div>
          </button>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
