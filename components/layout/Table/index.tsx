import styles from "./Table.module.css";
import * as ri from "react-icons/ri";
import Flex from "../Flex";
import Button from "../../input/Button";
import { useEffect, useState } from "react";
import SortMenu from "./SortMenu";

interface TableProps {
  // the headers of the table
  headers: Array<string>;
  // the rows of the table
  data: Array<Array<string>>;
  // handle deleting a row from the data
  handleDeleteRow: (rowIndex: number) => void;
  // handle adding a row to the data
  handleAddRow: (newRowData: Array<string>) => void;
  // text to display in the button for adding a row
  addRowText: string
}

function Table(props: TableProps) {
  const [headersSort, setHeadersSort] = useState<{ header: string, direction: 1 | -1 }>();
  const [newRowOpen, setNewRowOpen] = useState(false);
  const [newRow, setNewRow] = useState<Array<string>>([])

  const updateNewRow = (newValue: string, atIndex: number) => {
    const prevRow = Array.from(newRow);
    prevRow[atIndex] = newValue;
    setNewRow(prevRow);
  }

  const addRow = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.handleAddRow(newRow);
      setNewRowOpen(false);
    }
  }

  useEffect(() => {
    setNewRow(props.data.map(_ => ""));
  }, [props.data, newRowOpen])

  return (
    <Flex direction="column" gap="gapMedium">
      <table className={styles.table}>
        <thead>
          <tr>
            {props.headers.map((header: string) => <th>
              {header}
              <div className={styles.sort}>
                <SortMenu handleSortAscending={() => setHeadersSort({ header: header, direction: 1 })} handleSortDescending={() => setHeadersSort({ header: header, direction: -1 })} />
              </div>
            </th>)}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row: Array<string>, i: number) => <tr key={i}>
            {row.map((datum: string, index: number) => <td key={row.length + (row.length * i + index)}>{datum} {index === row.length - 1 ? <ri.RiDeleteBinLine className={styles.delete} onClick={() => props.handleDeleteRow(i)} /> : null}</td>)}
          </tr>)}
          {newRowOpen ? <tr onKeyDown={event => addRow(event)}>{props.data.length > 0 ? props.data[0].map((_, i: number) => <td><input value={newRow[i]} placeholder={`New ${props.headers[i]}`} type="text" onChange={event => updateNewRow(event.target.value, i)} /></td>) : null}</tr> : null}
        </tbody>
      </table >
      {!newRowOpen ? <Button text={props.addRowText} type="normal" icon={<ri.RiAddLine />} handleOnClick={() => setNewRowOpen(true)} /> : <Button text="Cancel" type="warning" icon={<ri.RiCloseLine />} handleOnClick={() => setNewRowOpen(false)} />}
    </Flex>
  )
}

export default Table;
