import React, { useState, useRef, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";

const App = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");
  const [ordersInHand, setOrdersInHand] = useState("");
  const [monthlySales, setMonthlySales] = useState("");
  const [sessions, setSessions] = useState([]); // Store saved sessions
  const [sessionName, setSessionName] = useState("");
  const chartRef = useRef(null);

  // Load saved sessions from localStorage
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem("savedSessions")) || [];
    setSessions(savedSessions);
  }, []);

  // Function to Add Data Point
  const addDataPoint = () => {
    const trimmedMonth = month.trim();
    if (trimmedMonth && Number(ordersInHand) >= 0 && Number(monthlySales) >= 0) {
      const previousAnnualSales = data.length > 0 ? data[data.length - 1].annualSales : 0;
      const annualSales = previousAnnualSales + Number(monthlySales);

      setData([...data, { name: trimmedMonth, ordersInHand: Number(ordersInHand), monthlySales: Number(monthlySales), annualSales }]);

      setMonth("");
      setOrdersInHand("");
      setMonthlySales("");
    }
  };

  // Save Chart as Image
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

  // Save Session
  const saveSession = () => {
    if (!sessionName.trim()) return;

    const newSession = { name: sessionName.trim(), data };
    const updatedSessions = [...sessions, newSession];

    setSessions(updatedSessions);
    localStorage.setItem("savedSessions", JSON.stringify(updatedSessions));

    setSessionName("");
  };

  // Load Session
  const loadSession = (sessionData) => {
    setData(sessionData);
  };

  // Delete a Session
  const deleteSession = (sessionIndex) => {
    const updatedSessions = sessions.filter((_, index) => index !== sessionIndex);
    setSessions(updatedSessions);
    localStorage.setItem("savedSessions", JSON.stringify(updatedSessions));
  };

  return (
    <div style={{ textAlign: "center", padding: "30px", fontFamily: "Arial, sans-serif", backgroundColor: "#1B1F23", color: "#D4D700", minHeight: "100vh" }}>
      
      <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#00FF9F", textShadow: "2px 2px 10px rgba(0, 255, 159, 0.7)" }}>
        Stabiliant Business Analytics Dashboard
      </h2>

      {/* Input Form */}
      <div style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", width: "60%", margin: "auto", marginBottom: "20px" }}>
        <input type="text" placeholder="Month (e.g., Nov'19)" value={month} onChange={(e) => setMonth(e.target.value.trimStart())} style={inputStyle} />
        <input type="number" placeholder="Orders in Hand" value={ordersInHand} onChange={(e) => setOrdersInHand(e.target.value)} min="0.01" step="0.01" style={inputStyle} />
        <input type="number" placeholder="Monthly Sales" value={monthlySales} onChange={(e) => setMonthlySales(e.target.value)} min="0.01" step="0.01" style={inputStyle} />
        <button onClick={addDataPoint} style={buttonStyle}>➕ Add Data</button>
      </div>

      {/* Graph Section */}
      <div ref={chartRef} style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", width: "80%", margin: "auto" }}>
        <h3 style={{ color: "#00FF9F" }}>📊 Orders, Sales & Annual Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="name" stroke="#D4D700" />
            <YAxis stroke="#D4D700" />
            <Tooltip contentStyle={tooltipStyle} />
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
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Line type="monotone" dataKey="annualSales" stroke="#FFD700" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Session Management */}
      <div style={{ marginTop: "20px" }}>
        <input type="text" placeholder="Session Name" value={sessionName} onChange={(e) => setSessionName(e.target.value)} style={inputStyle} />
        <button onClick={saveSession} style={buttonStyle}>💾 Save Session</button>

        <h3 style={{ color: "#00FF9F" }}>📂 Saved Sessions</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sessions.map((session, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <button onClick={() => loadSession(session.data)} style={sessionButtonStyle}>{session.name}</button>
              <button onClick={() => deleteSession(index)} style={deleteButtonStyle}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Save Chart as JPG */}
      <button onClick={saveChartAsImage} style={buttonStyle}>📥 Save as JPG</button>
    </div>
  );
};

const inputStyle = { padding: "10px", margin: "5px", borderRadius: "5px", width: "150px" };
const buttonStyle = { padding: "10px", margin: "10px", backgroundColor: "#00FF9F", borderRadius: "5px", cursor: "pointer" };
const sessionButtonStyle = { margin: "5px", padding: "5px", backgroundColor: "#4682B4", borderRadius: "5px", cursor: "pointer" };
const deleteButtonStyle = { margin: "5px", padding: "5px", backgroundColor: "#FF5C5C", borderRadius: "5px", cursor: "pointer" };
const tooltipStyle = { backgroundColor: "#333", border: "1px solid #D4D700", color: "#FFF" };

export default App;
