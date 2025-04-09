import React, { useState, useRef, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";

const App = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");
  const [ordersInHand, setOrdersInHand] = useState("");
  const [monthlySales, setMonthlySales] = useState("");
  const [sessions, setSessions] = useState([]);
  const [sessionName, setSessionName] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem("savedSessions")) || [];
    setSessions(savedSessions);
  
    // Auto-select the last session (optional)
    if (savedSessions.length > 0) {
      const lastSession = savedSessions[savedSessions.length - 1];
      setSelectedSession(lastSession.name);
      setData(lastSession.data);
    }
  
    // Ping backend
    const pingBackend = async () => {
      try {
        const res = await fetch("http://localhost:5000/");
        const text = await res.text();
        console.log("🔁 Backend says:", text);
      } catch (err) {
        console.error("❌ Backend connection failed:", err.message);
      }
    };
  
    pingBackend();
  }, []);
  
  

  const addDataPoint = () => {
    if (month.trim() && Number(ordersInHand) >= 0 && Number(monthlySales) >= 0) {
      const prevAnnualSales = data.length > 0 ? data[data.length - 1].annualSales : 0;
      const annualSales = prevAnnualSales + Number(monthlySales);
      setData([...data, { name: month.trim(), ordersInHand: Number(ordersInHand), monthlySales: Number(monthlySales), annualSales }]);
      setMonth("");
      setOrdersInHand("");
      setMonthlySales("");
    }
  };

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

  const saveSession = async () => {
    if (!sessionName.trim()) return;
  
    const newSession = { name: sessionName.trim(), data };
    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    localStorage.setItem("savedSessions", JSON.stringify(updatedSessions));
    setSessionName("");
  
    try {
      const res = await fetch("http://localhost:5000/save-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSession),
      });
  
      const result = await res.json();
      console.log("✅ Backend response:", result.message);
    } catch (error) {
      console.error("❌ Failed to save session to backend:", error.message);
    }
  };
  

  const loadSession = () => {
    if (selectedSession) {
      const sessionData = sessions.find((s) => s.name === selectedSession);
      if (sessionData) setData(sessionData.data);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Stabiliant Business Dashboard</h2>

      {/* Compact Input Section */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>➕ Add Monthly Data</h3>
        <div style={styles.inputGroup}>
          <input type="text" placeholder="Month (e.g., Nov'19)" value={month} onChange={(e) => setMonth(e.target.value.trimStart())} style={styles.input} />
          <input type="number" placeholder="Orders in Hand" value={ordersInHand} onChange={(e) => setOrdersInHand(e.target.value)} min="0" style={styles.input} />
          <input type="number" placeholder="Monthly Sales" value={monthlySales} onChange={(e) => setMonthlySales(e.target.value)} min="0" style={styles.input} />
          <button onClick={addDataPoint} style={styles.addButton}>Add</button>
        </div>
      </div>

      {/* Charts */}
      <div ref={chartRef} style={styles.chartContainer}>
        <h3 style={styles.cardTitle}>📊 Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ordersInHand" fill="#FF6347" />
            <Bar dataKey="monthlySales" fill="#4682B4" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="annualSales" stroke="#FFD700" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Session Management */}
      <div style={styles.sessionContainer}>
        <h3 style={styles.cardTitle}>💾 Manage Sessions</h3>
        <div style={styles.sessionGroup}>
          <input type="text" placeholder="Session Name" value={sessionName} onChange={(e) => setSessionName(e.target.value)} style={styles.input} />
          <button onClick={saveSession} style={styles.button}>Save</button>
        </div>

        <div style={styles.sessionGroup}>
          <select onChange={(e) => setSelectedSession(e.target.value)} value={selectedSession} style={styles.input}>
            <option value="">Select Session</option>
            {sessions.map((session, index) => (
              <option key={index} value={session.name}>{session.name}</option>
            ))}
          </select>
          <button onClick={loadSession} style={styles.button}>Load</button>
        </div>
      </div>

      {/* Save Chart Button */}
      <button onClick={saveChartAsImage} style={styles.saveButton}>📥 Save as JPG</button>
    </div>
  );
};




const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#1B1F23", color: "#D4D700", minHeight: "100vh" },
  title: { fontSize: "24px", fontWeight: "bold", color: "#00FF9F", marginBottom: "10px" },
  card: { backgroundColor: "#222", padding: "15px", borderRadius: "8px", width: "60%", margin: "10px auto" },
  cardTitle: { fontSize: "18px", color: "#00FF9F", marginBottom: "10px" },
  inputGroup: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" },
  input: { padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "130px", backgroundColor: "#333", color: "#FFF" },
  addButton: { padding: "8px 12px", backgroundColor: "#00FF9F", borderRadius: "5px", cursor: "pointer" },
  chartContainer: { backgroundColor: "#222", padding: "15px", borderRadius: "8px", width: "80%", margin: "10px auto" },
  sessionContainer: { backgroundColor: "#222", padding: "15px", borderRadius: "8px", width: "60%", margin: "10px auto" },
  sessionGroup: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "5px" },
  button: { padding: "8px 12px", backgroundColor: "#4682B4", borderRadius: "5px", cursor: "pointer" },
  saveButton: { padding: "10px", backgroundColor: "#FFD700", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }
};

export default App;
