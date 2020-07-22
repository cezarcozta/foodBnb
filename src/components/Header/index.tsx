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
          <input />
          <select>
            <option>Churrasco</option>
            <option>Pizza</option>
            <option>Japonesa</option>
            <option>Crepe</option>
          </select>
          De: <input/> a: <input />
        </form>
        <button
          type="button"
          onClick={() => {
            openModal();
          }}
        >
          <div className="text">Buscar</div>
          <div className="icon">
            <FiSearch size={18} />
          </div>
        </button>
      </nav>
    </header>
  </Container>
);

export default Header;