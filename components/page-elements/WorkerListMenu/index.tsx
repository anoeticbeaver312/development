import { useState } from "react";
import Flex from "../../layout/Flex";
import WorkerListMenuItem from "./WorkerListMenuItem";

interface WorkerListMenuProps {
  // all existing lists
  lists: Array<string>;
}

function WorkerListMenu(props: WorkerListMenuProps) {
  const [selectedList, setSelectedList] = useState("Master");

  return (
    <Flex direction="column" gap="gapMedium">
      <h3>All Lists</h3>
      {props.lists.map((listName: string) => <WorkerListMenuItem name={listName} handleOnClick={() => setSelectedList(listName)} selected={selectedList === listName} />)}
    </Flex>
  )
}

export default WorkerListMenu;
