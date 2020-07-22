import React from 'react';

import {FiSearch} from 'react-icons/fi';

import {Container} from './styles';

interface IHeaderProps {
  openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({openModal}) => (
  <Container>
    <header>
      <nav>
        <form>
          <label>
            Tipo de comida: <select id="type">
              <option value="churrasco">Churrasco</option>
              <option value="pizza">Pizza</option>
              <option value="japonesa">Japonesa</option>
              <option value="crepe">Crepe</option>
            </select>
          </label>
          
          <label>
            De: <input placeholder="R$/Pessoa"/> a: <input placeholder="R$/Pessoa"/>
          </label>
        </form>
        <button
          type="button"
          onClick={() => {
            openModal();
          }}
        >
          <div className="icon">
            <FiSearch size={18} />
          </div>
          <div className="text">Buscar</div>
        </button>
      </nav>
    </header>
  </Container>
);

export default Header;