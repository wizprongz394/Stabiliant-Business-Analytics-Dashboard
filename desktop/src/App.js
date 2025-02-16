import React, { useState, useRef } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";

const App = () => {
  const [data, setData] = useState([]); // Empty Graph Initially
  const [month, setMonth] = useState("");
  const [ordersInHand, setOrdersInHand] = useState("");
  const [monthlySales, setMonthlySales] = useState("");
  const chartRef = useRef(null);

  const addDataPoint = () => {
    const trimmedMonth = month.trim();
    if (trimmedMonth && Number(ordersInHand) >= 0 && Number(monthlySales) >= 0) { // Allow both values to be 0
      const previousAnnualSales = data.length > 0 ? data[data.length - 1].annualSales : 0;
      const annualSales = previousAnnualSales + Number(monthlySales);
  
      setData([...data, { 
        name: trimmedMonth, 
        ordersInHand: Number(ordersInHand), 
        monthlySales: Number(monthlySales), 
        annualSales 
      }]);
  
      setMonth("");
      setOrdersInHand("");
      setMonthlySales("");
    }
  };
  

  // Function to Save Chart as Image (Captures Both Graphs)
  const saveChartAsImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current, { backgroundColor: "#1B1F23" }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "Stabiliant.jpg";
        link.click();
      });
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "30px", fontFamily: "Arial, sans-serif", backgroundColor: "#1B1F23", color: "#D4D700", minHeight: "100vh" }}>
      
      <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#00FF9F", textShadow: "2px 2px 10px rgba(0, 255, 159, 0.7)" }}>
        Stabiliant Business Analytics Dashboard
      </h2>

      {/* Input Form */}
      <div style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,255,159,0.3)", width: "60%", margin: "auto", marginBottom: "20px" }}>
        <input type="text" placeholder="Month (e.g., Nov'19)" value={month} onChange={(e) => setMonth(e.target.value.trimStart())} 
          style={{ padding: "10px", margin: "5px", border: "1px solid #00FF9F", background: "#333", color: "#D4D700", borderRadius: "5px", fontSize: "16px", width: "150px" }} />

        <input type="number" placeholder="Orders in Hand" value={ordersInHand} onChange={(e) => setOrdersInHand(e.target.value)} min="0.01" step="0.01"
          style={{ padding: "10px", margin: "5px", border: "1px solid #00FF9F", background: "#333", color: "#D4D700", borderRadius: "5px", fontSize: "16px", width: "150px" }} />

        <input type="number" placeholder="Monthly Sales" value={monthlySales} onChange={(e) => setMonthlySales(e.target.value)} min="0.01" step="0.01"
          style={{ padding: "10px", margin: "5px", border: "1px solid #00FF9F", background: "#333", color: "#D4D700", borderRadius: "5px", fontSize: "16px", width: "150px" }} />

        <button onClick={addDataPoint} 
          style={{ padding: "10px 15px", margin: "10px", backgroundColor: "#00FF9F", color: "#222", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", transition: "0.3s" }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#00D68F"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#00FF9F"}>
          ➕ Add Data
        </button>
      </div>

      {/* Graph Section */}
      <div ref={chartRef} style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,255,159,0.3)", width: "80%", margin: "auto", border: "1px solid #00FF9F" }}>
        <h3 style={{ color: "#00FF9F" }}>📊 Orders, Sales & Annual Performance</h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="name" stroke="#D4D700" />
            <YAxis stroke="#D4D700" />
            <Tooltip contentStyle={{ backgroundColor: "#333", border: "1px solid #D4D700", color: "#FFF" }} />
            <Legend />
            <Bar dataKey="ordersInHand" fill="#FF6347" barSize={40} />
            <Bar dataKey="monthlySales" fill="#4682B4" barSize={40} />
          </BarChart>
        </ResponsiveContainer>

        <h3 style={{ color: "#00FF9F", marginTop: "20px" }}>📈 Annual Sales Trend</h3>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="name" stroke="#D4D700" />
            <YAxis stroke="#D4D700" />
            <Tooltip contentStyle={{ backgroundColor: "#333", border: "1px solid #D4D700", color: "#FFF" }} />
            <Legend />
            <Line type="monotone" dataKey="annualSales" stroke="#FFD700" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Save Button */}
      <button onClick={saveChartAsImage} 
        style={{ padding: "10px 20px", margin: "20px", backgroundColor: "#FF5C5C", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", transition: "0.3s" }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#D43F3F"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#FF5C5C"}>
        📥 Save as JPG
      </button>

    </div>
  );
};

export default App;
