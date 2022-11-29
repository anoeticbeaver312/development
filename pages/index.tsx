import {useMemo, useEffect, useState} from "react";
import Dropdown from "../components/input/Dropdown";
import TextField from "../components/input/TextField";
import Flex from "../components/layout/Flex";
import Table from "../components/layout/Table";
import DefaultHead from "../components/page-elements/DefaultHead";
import Header from "../components/page-elements/Header";
import WorkerListMenu from "../components/page-elements/WorkerListMenu";
import Button from "../components/input/Button";
import PieChart from "../components/visualization/PieChart";

export default function Workers() {
  const [workers, setWorkers] = useState<Array<Array<string>>>([])
  const [filterValue, setFilterValue] = useState("");
  const [filterColumn, setFilterColumn] = useState("Name");
  const [filteredWorkers, setFilteredWorkers] = useState<Array<Array<string>>>([])
  const [sortOn, setSortOn] = useState(true);
  const [statusSegments, setStatusSegments] = useState<Map<string, { num: number, color: string }>>(new Map())

  const headers: Array<{ name: string, type: "image" | "text" }> = useMemo(() => [
    {name: "", type: "image"},
    {name: "Name", type: "text"},
    {name: "Department", type: "text"},
    {name: "Status", type: "text"},
    {name: "Claimed By", type: "text"}
  ], [])
  const headerOptions = new Map(headers.filter(header => header.type === "text").map(header => [header.name, header.name]))
  const colors = useMemo(() => ["green", "blue", "red"], [])

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
    const unique = Array.from(new Set(workers.map(worker => worker[3])))
    setStatusSegments(new Map(unique.map((u, i) => [u, {num: workers.reduce((prev, curr) => (curr[3] === u ? 1 : 0) + prev, 0), color: colors[i]}])))
  }, [colors, workers])

  useEffect(() => {
    setFilteredWorkers(workers);
  }, [workers])

  useEffect(() => {
    setFilteredWorkers(workers.filter(worker => {
      return worker[headers.findIndex(header => header.name === filterColumn)].includes(filterValue);
    }));
  }, [headers, workers, filterValue, filterColumn])

  useEffect(() => {
    setWorkers([
      ["/howl.jpg", "Ron Swanson", "Quality Assurance", "Unclaimed", ""],
      ["/howl.jpg", "Priti Naiv", "DevOps", "Unclaimed", ""],
      ["/howl.jpg", "Felicity Bryer", "Engineering", "Signed Authorization Card", "John Dean"],
      ["/howl.jpg", "Gandalf", "Engineering", "Claimed", "John Dean"],
      ["/howl.jpg", "Rich Harris", "Janitorial Squad", "Claimed", "Rick Sanchez"],
      ["/howl.jpg", "Lulu", "Janitorial Squad", "Unclaimed", ""],
      ["/howl.jpg", "Seagull Marvin", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "Pancake Tony", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "Magoi Dude", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "Mark Whifflebat", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "Stinging Seaslug", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "Plug Me In", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "Lark Top", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "McElligot's Pool", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "Space Engineer", "Engineering", "Unclaimed", ""],
      ["/howl.jpg", "Riggotoni Larry", "Engineering", "Unclaimed", ""],
    ])
  }, [])

  return (
    <div>
      <DefaultHead title="Worker Lists"/>
      <Header/>
      <Flex gap="gapLarge" padding>
        <WorkerListMenu lists={["Master"]}/>
        <Flex direction="column" gap="gapLarge">
          <Flex gap="gapMedium">
            <TextField label="Search" placeholder="Search..." defaultValue={filterValue}
                       handleOnChange={(newValue: string) => setFilterValue(newValue)}/>
            <Dropdown label="By" options={headerOptions} defaultValue={filterColumn}
                      handleOnChange={(newValue: string) => setFilterColumn(newValue)}/>
          </Flex>
          <Button text="Reset Filters and Sort" type="normal" handleOnClick={() => {
            setFilteredWorkers(workers);
            setFilterValue("");
            setSortOn(false);
          }}/>
          <Table setSortOn={setSortOn} sortOn={sortOn} headers={headers} data={filteredWorkers}
                 handleDeleteRow={handleDeleteRow} handleAddRow={handleAddRow}
                 addRowText="Add a Worker"/>
        </Flex>
        <Flex direction="column">
          <h3>Status Percentages</h3>
          <PieChart metricName="Status" segments={statusSegments} />
        </Flex>
      </Flex>
    </div>
  )
}
