import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const App = () => {
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      { data: [400, 600, 800, 700], color: () => "blue" },
      { data: [200, 300, 400, 350], color: () => "green" },
    ],
  });

  const [newLabel, setNewLabel] = useState("");
  const [newSales, setNewSales] = useState("");
  const [newProfit, setNewProfit] = useState("");

  const addDataPoint = () => {
    if (newLabel && newSales && newProfit) {
      setData({
        labels: [...data.labels, newLabel],
        datasets: [
          { data: [...data.datasets[0].data, Number(newSales)], color: () => "blue" },
          { data: [...data.datasets[1].data, Number(newProfit)], color: () => "green" },
        ],
      });

      setNewLabel("");
      setNewSales("");
      setNewProfit("");
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>📊 Sales & Profit Overview</Text>

      <LineChart
        data={data}
        width={350}
        height={250}
        yAxisSuffix="₹"
        chartConfig={{
          backgroundGradientFrom: "#f4f4f4",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{ marginVertical: 20 }}
      />

      <TextInput placeholder="Month" value={newLabel} onChangeText={setNewLabel} />
      <TextInput placeholder="Sales" value={newSales} onChangeText={setNewSales} keyboardType="numeric" />
      <TextInput placeholder="Profit" value={newProfit} onChangeText={setNewProfit} keyboardType="numeric" />
      <Button title="Add Data" onPress={addDataPoint} />
    </ScrollView>
  );
};

export default App;
