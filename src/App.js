import { TileLayout } from '@progress/kendo-react-layout';
import { useState } from 'react';
import './App.css';

const CandidatesApplies = () => <div>Applications</div>;
const ActiveJobs = () => <div>Active jobs</div>;

const ViewsPerJob = () => <div>Views per job</div>;

function App() {
  const [positions, setPositions] = useState([
    {
      col: 1,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 4,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      col: 2,
      colSpan: 2,
      rowSpan: 1,
    },
  ]);

  const widgets = [
    {
      header: 'Applied',
      body: <CandidatesApplies />,
    },
    {
      header: 'Active jobs',
      body: <ActiveJobs />,
    },
    {
      header: 'Views per job',
      body: <ViewsPerJob />,
    },
  ];

  const handleReposition = e => setPositions(e.value);

  return (
    <div className="App">
      <TileLayout
        columns={4}
        rowHeight={255}
        positions={positions}
        gap={{ rows: 10, columns: 10 }}
        items={widgets}
        onReposition={handleReposition}
      />
    </div>
  );
}

export default App;
