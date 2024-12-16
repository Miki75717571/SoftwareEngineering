"use client";

import { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";

export default function Dashboard() {
  const [resources, setResources] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch Resources
  const fetchResources = async () => {
    try {
      const { data, error } = await supabase.from("resources").select("*");
      if (error) {
        console.error("Error fetching resources:", error);
        alert("Error fetching resources: " + error.message);
      } else {
        setResources(data);
        console.log("Fetched resources:", data);
      }
    } catch (e) {
      console.error("Unexpected error fetching resources:", e);
    }
  };
  
  const addResource = async () => {
    if (!name || !quantity) {
      alert("Please fill in both Resource Name and Quantity");
      return;
    }
  
    try {
      const { error } = await supabase
        .from("resources")
        .insert([{ name, quantity: parseInt(quantity) }]);
  
      if (error) {
        console.error("Error adding resource:", error);
        alert("Error adding resource: " + error.message);
      } else {
        fetchResources();
        setName("");
        setQuantity("");
        alert("Resource added successfully!");
      }
    } catch (e) {
      console.error("Unexpected error adding resource:", e);
    }
  };
  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <main style={styles.container}>
      <h1 style={styles.header}>Resource Management Dashboard</h1>

      {/* Add Resource Form */}
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Resource Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />
        <button onClick={addResource} style={styles.addButton}>
          ADD
        </button>
      </div>

      {/* Resource Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Quantity</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{resource.name}</td>
              <td style={styles.tableCell}>{resource.quantity}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.actionButton}
                  onClick={() => console.log("Update clicked")}
                >
                  Update
                </button>
                <button
                  style={styles.actionButton}
                  onClick={() => console.log("Delete clicked")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const styles = {
  container: {
    backgroundColor: "#121212", // Dark background
    color: "#FFFFFF", // White text
    height: "100vh",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "200px",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "#1E90FF",
    color: "#FFFFFF",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "80%",
    margin: "0 auto",
    borderCollapse: "collapse",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    borderRadius: "8px",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#333333",
    padding: "10px",
    textTransform: "uppercase",
  },
  tableRow: {
    borderBottom: "1px solid #444444",
  },
  tableCell: {
    padding: "10px",
    textAlign: "center",
  },
  actionButton: {
    margin: "0 5px",
    padding: "5px 10px",
    fontSize: "0.9rem",
    border: "none",
    backgroundColor: "#FF6347",
    color: "#FFFFFF",
    borderRadius: "5px",
    cursor: "pointer",
  },
};