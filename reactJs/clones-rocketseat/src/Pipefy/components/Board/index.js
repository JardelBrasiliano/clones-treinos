/* BIBLIOTECAS AXILIARES */
import { useCallback, useState } from 'react';
import produce from 'immer';

/** API */
import { loadLists } from '../../services/api';
/** Components */
import List from '../List';
/** EStilizaçãp */
import * as Style from './styles';
/** CONTEXTOS */
import BoardContext from './context';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  const move = useCallback((fromList, toList, from, to) => {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  });

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Style.Container>
        {lists.map((item, index) => (
          <List key={item.title} index={index} data={item} />
        ))}
      </Style.Container>
    </BoardContext.Provider>
  );
}
