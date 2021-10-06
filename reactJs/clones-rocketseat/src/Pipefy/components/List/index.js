/** BIBLIOTECAS */
import React from 'react';
import PropTypes from 'prop-types';
/* UI-UX */
import { MdAdd } from 'react-icons/md';
/** COMPONENTS */
import Card from '../Card';
/** ESTILIZAÇÂO */
import * as Style from './styles';

const List = ({ data, index: listIndex }) => (
  <Style.Container done={data.done}>
    <header>
      {listIndex}
      <h2>{data.title}</h2>
      {data.creatable && (
        <button type="submit">
          <MdAdd size={24} color="#fff" />
        </button>
      )}
    </header>
    <ul>
      {data.cards.map((card, index) => (
        <Card key={card.id} listsIndex={listIndex} index={index} data={card} />
      ))}
    </ul>
  </Style.Container>
);

export default React.memo(List);

const card = PropTypes.shape({});

List.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    creatable: PropTypes.bool,
    cards: PropTypes.arrayOf(card),
    done: PropTypes.bool
  }).isRequired,
  index: PropTypes.number.isRequired
};
