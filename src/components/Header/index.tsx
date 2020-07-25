import React, { useEffect, useState, useCallback } from 'react';

import { FiSearch, FiPlusCircle } from 'react-icons/fi';

import Input from '../Input';

import { Container, Form } from './styles';
import api from '../../services/api';

interface IFilterFoodCard {
  type: string;
  minPrice: string;
  maxPrice: string;
  option: 'ASC' | 'DESC';
}

interface IFoodType {
  id: string;
  name: string;
}

interface IHeaderProps {
  openModal: () => void;
  search: ({ type, minPrice, maxPrice, option }: IFilterFoodCard) => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal, search }) => {
  const [foodType, setFoodTypes] = useState<IFoodType[]>([]);
  const [fromPrice, setfromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [order, setOrder] = useState('');

  useEffect(() => {
    async function loadFoodTypes(): Promise<void> {
      api.get('/foods').then(response => {
        setFoodTypes(response.data);
      });
    }

    loadFoodTypes();
  }, [foodType]);

  const handleSubmit = useCallback(
    async (data: IFilterFoodCard) => {
      search(data);
    },
    [search],
  );

  return (
    <Container>
      <header>
        <nav>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="type">
              Tipo de comida:
              <select id="type">
                {foodType.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </label>
            De:
            <Input name="minPrice" placeholder="R$/Pessoa" />
            a:
            <Input name="maxPrice" placeholder="R$/Pessoa" />
            <button type="button" onClick={() => {}}>
              <div className="icon-search">
                <FiSearch size={18} />
              </div>
              <div className="text">Buscar</div>
            </button>
          </Form>

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
