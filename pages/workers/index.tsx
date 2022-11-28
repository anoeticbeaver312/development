import { useEffect, useState } from "react";
import Button from "../../components/input/Button";
import Flex from "../../components/layout/Flex";
import Table from "../../components/layout/Table";
import DefaultHead from "../../components/page-elements/DefaultHead";
import Header from "../../components/page-elements/Header";
import WorkerListMenu from "../../components/page-elements/WorkerListMenu";
import * as ri from "react-icons/ri";

export default function Workers() {
  const [workers, setWorkers] = useState<Array<Array<string>>>([])

  const headers = ["Name", "Department", "Status", "Claimed By"]

  const handleDeleteRow = (index: number) => {
    setWorkers(prevWorkers => prevWorkers.filter((_, i: number) => i !== index));
  }

  useEffect(() => {
    console.log("Resetting workers")
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
          <Table headers={headers} data={workers} handleDeleteRow={handleDeleteRow} handleAddRow={(data) => console.log("Adding")} />
          <Button text="Add a Worker" type="normal" icon={<ri.RiAddLine />} />
        </Flex>
      </Flex>
    </div>
  )
}
