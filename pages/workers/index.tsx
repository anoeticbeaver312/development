import { useEffect, useState } from "react";
import Dropdown from "../../components/input/Dropdown";
import TextField from "../../components/input/TextField";
import Flex from "../../components/layout/Flex";
import Table from "../../components/layout/Table";
import DefaultHead from "../../components/page-elements/DefaultHead";
import Header from "../../components/page-elements/Header";
import WorkerListMenu from "../../components/page-elements/WorkerListMenu";

export default function Workers() {
  const [workers, setWorkers] = useState<Array<Array<string>>>([])
  const [filterValue, setFilterValue] = useState("");
  const [filterColumn, setFilterColumn] = useState("Name");
  const [filteredWorkers, setFilteredWorkers] = useState<Array<Array<string>>>([])

  const headers = ["Name", "Department", "Status", "Claimed By"]
  const headerOptions = new Map(headers.map(header => [header, header]))

  const handleDeleteRow = (index: number) => {
    setWorkers(prevWorkers => prevWorkers.filter((_, i: number) => i !== index));
  }

  const handleAddRow = (newData: Array<string>) => {
    const newDataIsEmpty = newData.reduce((prev, curr) => curr === "" && prev, true);
    if (newDataIsEmpty) {
      return;
    }
    const oldWorkers = Array.from(workers);
    oldWorkers.push(newData);
    setWorkers(oldWorkers);
  }

  useEffect(() => {
    setFilteredWorkers(workers);
  }, [workers])

  useEffect(() => {
    setFilteredWorkers(workers.filter(worker => {
      return worker[headers.findIndex(header => header === filterColumn)].includes(filterValue);
    }));
  }, [filterValue, filterColumn])

  useEffect(() => {
    setWorkers([
      ["Ron Swanson", "Quality Assurance", "Unclaimed", ""],
      ["Priti Naiv", "DevOps", "Unclaimed", ""],
      ["Felicity Bryer", "Engineering", "Signed Authorization Card", "John Dean"],
      ["Gandalf", "Engineering", "Claimed", "John Dean"],
    ])
  }, [])

  return (
    <div>
      <DefaultHead title="Worker Lists" />
      <Header />
      <Flex gap="gapLarge" padding>
        <WorkerListMenu lists={["Master"]} />
        <Flex direction="column" gap="gapLarge">
          <Flex gap="gapMedium">
            <TextField label="Search" placeholder="Search..." defaultValue={filterValue} handleOnChange={(newValue: string) => setFilterValue(newValue)} />
            <Dropdown label="By" options={headerOptions} defaultValue={filterColumn} handleOnChange={(newValue: string) => setFilterColumn(newValue)} />
          </Flex>
          <Table headers={headers} data={filteredWorkers} handleDeleteRow={handleDeleteRow} handleAddRow={handleAddRow} addRowText="Add a Worker" />
        </Flex>
      </Flex>
    </div>
  )
}
