/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';

import { FiSearch, FiPlusCircle } from 'react-icons/fi';

import Input from './Input';
import Select from './Select';

import { Container } from './styles';
import api from '../../services/api';

interface IFoodType {
  id: string;
  name: string;
}

interface IFoodCard {
  id: string;
  name: string;
  image: string;
  img_url: string;
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
  handleSubmit: (data: any) => void;
}

const FilterForm: React.FC<IHeaderProps> = ({ openModal, handleSubmit }) => {
  const [foodType, setFoodTypes] = useState<IFoodType[]>([]);

  useEffect(() => {
    async function loadFoodTypes(): Promise<void> {
      await api.get('/foods').then(response => {
        setFoodTypes(response.data);
      });
    }

    loadFoodTypes();
  }, []);

  return (
    <Container>
      <header>
        <nav>
          <Form name="formData" onSubmit={handleSubmit}>
            <label htmlFor="type">Tipo de comida:</label>

            <Select type="select" name="type">
              <option value="0">Selecione o tipo de comida</option>
              {foodType &&
                foodType.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </Select>

            <label htmlFor="minPrice">De:</label>
            <Input type="text" name="minPrice" placeholder="Mínimo R$/Pessoa" />
            <label htmlFor="maxPrice">a:</label>
            <Input type="text" name="maxPrice" placeholder="Máximo R$/Pessoa" />

            <button type="submit" name="searchBtn">
              <div className="icon-search">
                <FiSearch size={18} />
              </div>
              <div className="text">Buscar</div>
            </button>
          </Form>

          <button
            name="addButton"
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

export default FilterForm;
