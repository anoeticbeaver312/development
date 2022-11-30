import styles from "./Table.module.css";
import Image from "next/image";
import * as ri from "react-icons/ri";
import Flex from "../Flex";
import Button from "../../input/Button";
import React, {Dispatch, useEffect, useState} from "react";
import SortMenu from "./SortMenu";

interface TableProps {
  // the headers of the table
  headers: Array<{ name: string, type: "text" | "image" }>;
  // the rows of the table
  data: Array<Array<string>>;
  // handle deleting a row from the data
  handleDeleteRow: (rowIndex: number) => void;
  // handle adding a row to the data
  handleAddRow: (newRowData: Array<string>) => void;
  // text to display in the button for adding a row
  addRowText: string
  setSortOn: Dispatch<boolean>;
  sortOn: boolean;
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

  const sortWorkers = (worker1: Array<string>, worker2: Array<string>) => {
    if (!headersSort) {
      return 0;
    }
    const headerIndex = props.headers.findIndex(header => header.name === headersSort.header);
    const worker1Value = worker1[headerIndex];
    const worker2Value = worker2[headerIndex];
    return worker1Value.localeCompare(worker2Value) * headersSort.direction;
  }

  useEffect(() => {
    setNewRow(props.data.map(_ => ""));
  }, [props.data, newRowOpen])

  useEffect(() => {
    console.log("Sort on:", props.sortOn)
    if (!props.sortOn) {
      setHeadersSort(undefined);
    }
  }, [props.sortOn])

  return (
    <Flex direction="column" gap="gapMedium">
      <table className={styles.table}>
        <thead>
        <tr>
          {props.headers.map((header, i) => <th key={i}>
            {header.name}
            {header.type !== "image" ?
              <div className={styles.sort}>
                <SortMenu handleSortAscending={() => {
                  setHeadersSort({header: header.name, direction: 1})
                  props.setSortOn(true);
                }} handleSortDescending={() => {
                  setHeadersSort({header: header.name, direction: -1})
                  props.setSortOn(true);
                }}/>
              </div> : null
            }
          </th>)}
        </tr>
        </thead>
        <tbody>
        {props.sortOn ? Array.from(props.data).sort(sortWorkers).map((row: Array<string>, i: number) => <tr key={i}>
          {row.map((datum: string, index: number) =>
            <td key={i}>
              {props.headers[index].type === "text" ? datum :
              <div className={styles.imageContainer}><Image alt="Profile Image" width={100} height={100} src={datum}/>
              </div>} {index === row.length - 1 ?
              <ri.RiDeleteBinLine className={styles.delete} onClick={() => props.handleDeleteRow(i)}/> : null}
            </td>)}
        </tr>) : props.data.map((row: Array<string>, i: number) => <tr key={`row-${i}`}>
          {row.map((datum: string, index: number) =>
            <td key={`cell-${row.length * i + index}`}>{props.headers[index].type === "text" ? datum :
              <div className={styles.imageContainer}><Image width={100} height={100} alt="Profile Image" src={datum}/>
              </div>} {index === row.length - 1 ?
              <ri.RiDeleteBinLine className={styles.delete} onClick={() => props.handleDeleteRow(i)}/> : null}
            </td>)}
        </tr>)}
        {newRowOpen ?
          <tr onKeyDown={event => addRow(event)}>{props.data.length > 0 ? props.data[0].map((_, i: number) => <td
            key={`new-row-${i}`}><input
            value={newRow[i]} placeholder={`New ${props.headers[i].name}`} type="text"
            onChange={event => updateNewRow(event.target.value, i)}/></td>) : null}</tr> : null}
        </tbody>
      </table>
      {!newRowOpen ? <Button text={props.addRowText} type="normal" icon={<ri.RiAddLine/>}
                             handleOnClick={() => setNewRowOpen(true)}/> :
        <Button text="Cancel" type="warning" icon={<ri.RiCloseLine/>} handleOnClick={() => setNewRowOpen(false)}/>}
    </Flex>
  )
}

export default Table;
