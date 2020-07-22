import React from 'react';

import { FiSearch, FiPlusCircle } from 'react-icons/fi';

import { Container } from './styles';

interface IHeaderProps {
  openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <header>
      <nav>
        <form>
          <label htmlFor="type">
            Tipo de comida:
            <select id="type">
              <option value="churrasco">Churrasco</option>
              <option value="pizza">Pizza</option>
              <option value="japonesa">Japonesa</option>
              <option value="crepe">Crepe</option>
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

          <button type="button">
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

export default Header;
