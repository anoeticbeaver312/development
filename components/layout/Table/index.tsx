import styles from "./Table.module.css";
import * as ri from "react-icons/ri";

interface TableProps {
  // the headers of the table
  headers: Array<string>;
  // the rows of the table
  data: Array<Array<string>>;
  // handle deleting a row from the data
  handleDeleteRow: (rowIndex: number) => void;
  // handle adding a row to the data
  handleAddRow: (newRowData: Array<string>) => void;
}

function Table(props: TableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {props.headers.map((header: string) => <th>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row: Array<string>, i: number) => <tr key={i}>
          {row.map((datum: string, index: number) => <td key={row.length + (row.length * i + index)}>{datum} {index === row.length - 1 ? <ri.RiDeleteBinLine className={styles.delete} onClick={() => props.handleDeleteRow(i)} /> : null}</td>)}
        </tr>)}
      </tbody>
    </table >
  )
}

export default Table;
