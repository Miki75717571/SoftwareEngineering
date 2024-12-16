"use client";

import { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";

export default function Dashboard() {
  const [resources, setResources] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch Resources
  const fetchResources = async () => {
    const { data, error } = await supabase.from("resources").select("*");
    if (error) console.error("Error fetching resources:", error);
    else setResources(data);
  };

  // Add Resource
  const addResource = async () => {
    if (!name || !quantity) return;
    const { error } = await supabase
      .from("resources")
      .insert([{ name, quantity: parseInt(quantity) }]);
    if (error) console.error("Error adding resource:", error);
    else {
      fetchResources();
      setName("");
      setQuantity("");
    }
  };

  // Delete Resource
  const deleteResource = async (id) => {
    const { error } = await supabase.from("resources").delete().eq("id", id);
    if (error) console.error("Error deleting resource:", error);
    else fetchResources();
  };

  // Update Resource (Example: Increment Quantity)
  const updateResource = async (id, currentQuantity) => {
    const { error } = await supabase
      .from("resources")
      .update({ quantity: currentQuantity + 1 })
      .eq("id", id);
    if (error) console.error("Error updating resource:", error);
    else fetchResources();
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Resource Management Dashboard</h1>

      {/* Add Resource Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Resource Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addResource}>ADD</button>
      </div>

      {/* Resource Table */}
      <table border="1" width="100%" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>{resource.name}</td>
              <td>{resource.quantity}</td>
              <td>
                <button
                  onClick={() => deleteResource(resource.id)}
                  style={{ marginRight: "10px" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => updateResource(resource.id, resource.quantity)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}