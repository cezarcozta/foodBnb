import React, { useEffect, useState } from 'react';

import { FiSearch, FiPlusCircle } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface IFoodType {
  id: string;
  name: string;
}
interface IHeaderProps {
  openModal: () => void;
  search: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal, search }) => {
  const [foodType, setFoodTypes] = useState<IFoodType[]>([]);

  useEffect(() => {
    async function loadFoodTypes(): Promise<void> {
      api.get('/foods').then(response => {
        setFoodTypes(response.data);
      });
    }
    loadFoodTypes();
  }, [foodType]);

  return (
    <Container>
      <header>
        <nav>
          <form>
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

            <label htmlFor="from">
              De:
              <input placeholder="R$/Pessoa" />
            </label>
            <label htmlFor="to">
              a:
              <input placeholder="R$/Pessoa" />
            </label>

            <button
              type="button"
              onClick={() => {
                search();
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
