import History from "./History";
import Team from "./Team";
import TheChosenOne from "./TheChosenOne";
import {
  addPerson,
  getPeopleFromStorage,
  getHistoryFromStorage,
  Person,
  getMemberWhoWasLessChosen,
} from "./domain";
import storage from "./localStorage";
import { useState } from "react";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const ShowHistory = styled.p`
  font-size: 0.8rem;
  opacity: 0.5;
`;

function App() {
  const [chosen, setChosenMember] = useState<Person | undefined>();
  const [team, setTeam] = useState(getPeopleFromStorage());
  if (team) storage.people.set(JSON.stringify([...team]));

  const [history, setHistory] = useState(getHistoryFromStorage());
  if (history) storage.history.set(JSON.stringify(history));

  const [showHistory, setShowHistory] = useState(false);

  const handleAddMember = (person: Person): void => {
    console.log(`Adding a new member: ${person}`);
    setTeam(addPerson(team, person));
  };

  function handleAssignRandomMember(): void {
    const theChosenOne = getMemberWhoWasLessChosen(team, history);
    setChosenMember(theChosenOne);
    setHistory([...history, theChosenOne]);
  }

  function handleShowHideHistory(): void {
    setShowHistory(!showHistory);
  }

  return (
    <Page>
      <Team team={team} add={handleAddMember} />

      <h3>The chosen one</h3>
      <TheChosenOne person={chosen} />
      <button
        onSubmit={handleAssignRandomMember}
        onClick={handleAssignRandomMember}
      >
        Tell me the chosen one...
      </button>

      <ShowHistory onClick={handleShowHideHistory}>
        (click to {showHistory ? "hide" : "show"} history)
      </ShowHistory>
      {showHistory ? <History history={history} /> : null}
    </Page>
  );
}

export default App;
