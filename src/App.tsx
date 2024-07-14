import Header from "./components/Header/Header.tsx";
import TemporaryDrawer from "./components/MenuDrawer/MenuDrawer.tsx";
import OutlinedCard from "./components/Tasks/Tasks.tsx";
import DeletedTasks from "./components/DeletedTasks/DeletedTasks.tsx";
function App() {
  return (
    <>
      <Header />
      <TemporaryDrawer />
      <OutlinedCard />
      <DeletedTasks />
    </>
  );
}

export default App;
