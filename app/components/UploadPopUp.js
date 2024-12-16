import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function UploadPopUp({ resource, onSave, onCancel }) {
  const [name, setName] = useState(resource.name);
  const [quantity, setQuantity] = useState(resource.quantity);
  const [description, setDescription] = useState(resource.description);


  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("resources")
        .update({ name, quantity: parseInt(quantity), description })
        .eq("id", resource.id);

      if (error) {
        console.error("Error updating resource:", error);
        alert("Error updating resource: " + error.message);
      } else {
        onSave();
      }
    } catch (e) {
      console.error("Unexpected error updating resource:", e);
    }
  };

  return (
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
       <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSave} style={styles.saveButton}>
        Save
      </button>
      <button onClick={onCancel} style={styles.cancelButton}>
        Cancel
      </button>
    </div>
  );
}

const styles = {
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
    color: "black",
  },
  saveButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "#32CD32",
    color: "#FFFFFF",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "#FF6347",
    color: "#FFFFFF",
    borderRadius: "5px",
    cursor: "pointer",
  },
};