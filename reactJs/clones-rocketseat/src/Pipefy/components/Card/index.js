/* eslint-disable */
/** BIBLIOTECAS */
import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
/** CONTEXTO */
import BoardContext from '../Board/context';
/** ESTILIZAÇÂO */
import * as Style from './styles';

const Card = ({ data, index, listsIndex }) => {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: () => ({ index, listsIndex }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      console.log(item);
      const draggedListIndex = item.listsIndex;
      const targetListIndex = listsIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listsIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Style.Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map((label) => (
          <Style.Label key={label} color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="" />}
    </Style.Container>
  );
};

export default React.memo(Card);

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  listIndex: PropTypes.arrayOf(PropTypes.string).isRequired
};
