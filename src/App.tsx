import { DataTable } from "./components/DataTable/DataTable";
import { generateMockCustomers } from "./data/generateMockData";

const customers = generateMockCustomers(500);

function App() {
  return <DataTable data={customers} />;
}

export default App;
