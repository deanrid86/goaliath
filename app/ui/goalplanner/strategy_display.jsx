// StrategyDisplay.js
export default function StrategyDisplay({ jsonData }) {
    const renderStrategySteps = () => {
      // Accessing the strategy array from jsonData
      const strategySteps = jsonData.strategy;
  
      // Mapping over the array to create list items for each step
      return strategySteps.map((stepItem, index) => (
        <div key={index}>
          <p><strong>{stepItem.step}</strong>: {stepItem.action}</p>
          <p>{stepItem.details}</p>
        </div>
      ));
    };
  
    return <div>{renderStrategySteps()}</div>;
  }