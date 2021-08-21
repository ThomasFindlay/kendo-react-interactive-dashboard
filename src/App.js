import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useMemo, useState } from "react";
import "./App.css";
import ActiveJobs from "./components/ActiveJobs";
import TotalJobViews from "./components/TotalJobViews";
import MostPopularJob from "./components/MostPopularJob";
import JobCredits from "./components/JobCredits";
import { Switch } from "@progress/kendo-react-inputs";

const initialPositions = [
  {
    widgetId: "1",
    col: 1,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    widgetId: "2",
    col: 3,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    widgetId: "3",
    col: 4,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    widgetId: "4",
    col: 3,
    colSpan: 2,
    rowSpan: 2,
  },
];

const getPositions = initialPositions => {
  // Try to get positions from local storage
  // If we have none in the storage then default to initial positions
  return (
    JSON.parse(localStorage.getItem("dashboard-positions")) || initialPositions
  );
};

const widgetsConfig = [
  {
    id: "1",
    header: "Total job views",
    body: <TotalJobViews />,
    active: true,
  },
  {
    id: "2",
    header: "Active jobs",
    body: <ActiveJobs />,
    active: true,
  },
  {
    id: "3",
    header: "Job Credits",
    body: <JobCredits />,
    active: true,
  },
  {
    id: "4",
    header: "Most popular job",
    body: <MostPopularJob />,
    active: true,
  },
];

function App() {
  const [positions, setPositions] = useState(getPositions(initialPositions));
  const [widgets, setWidgets] = useState(widgetsConfig);

  // Filter out widgets that are inactive
  const activeWidgets = useMemo(() => {
    return widgets.reduce((acc, widget) => {
      // Bail out if widget is not active
      if (!widget.active) return acc;
      // Widget is active, so add it
      acc.push(widget);
      return acc;
    }, []);
  }, [widgets]);

  // Get positions only for active widgets
  // We use position.widgetId to get only active widgets
  const filteredPositions = useMemo(() => {
    return positions.filter(position => {
      // Find a matching widget using the id in the position id and return its active value
      return activeWidgets.find(widget => widget.id === position.widgetId)
        ?.active;
    });
  }, [activeWidgets, positions]);

  const handleReposition = e => {
    setPositions(e.value);
    localStorage.setItem("dashboard-positions", JSON.stringify(e.value));
  };

  const onResetLayout = () => {
    setPositions(initialPositions);
    localStorage.setItem(
      "dashboard-positions",
      JSON.stringify(initialPositions)
    );
  };

  const onToggleWidget = e => {
    const { id } = e.target.props;
    const { value } = e.target;
    const updatedWidgets = widgets.map(widget => {
      if (widget.id === id) {
        return {
          ...widget,
          active: value,
        };
      }
      return widget;
    });

    setWidgets(updatedWidgets);
  };

  return (
    <div className="App">
      <h1>Creating the React UI Template for Our Jobs Dashboard</h1>
      <div className="k-display-flex">
        <TileLayout
          columns={4}
          rowHeight={255}
          positions={filteredPositions}
          gap={{ rows: 10, columns: 10 }}
          items={activeWidgets}
          onReposition={handleReposition}
          className="tileLayout"
        />
        <aside className="k-ml-4 dashboardAside">
          <div className="k-mb-6">
            <button className="k-button" onClick={onResetLayout}>
              Reset layout
            </button>
          </div>
          <div>
            <h2 className="k-mb-4">Toggle Widgets</h2>
            <div>
              {widgets.map(widget => {
                return (
                  <div className="k-mb-2" key={widget.id}>
                    <Switch
                      checked={widget.active}
                      onChange={onToggleWidget}
                      id={widget.id}
                    />
                    <label className="k-ml-3">{widget.header}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
