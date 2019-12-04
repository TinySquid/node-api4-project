import React, { useState } from "react";
import { axiosWithAuth } from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, reorderColors, logout }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    code: {
      hex: ''
    }
  });

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/colors', newColor)
      .then(response => {
        updateColors(response.data);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setNewColor({
          color: '',
          code: {
            hex: ''
          }
        });
      })
  }

  const handleAddColor = e => {
    if (e.target.name === "code") {
      setNewColor({
        ...newColor,
        [e.target.name]: { hex: e.target.value }
      });
    } else {
      setNewColor({
        ...newColor,
        [e.target.name]: e.target.value
      });
    }
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        updateColors(colors.map(color => {
          if (color.id === response.data.id) {
            return response.data
          } else {
            return color;
          }
        }));
      })
      .catch(error => console.log(error))
      .finally(() => {
        setEditing(false);
      })
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(response => {
        updateColors(colors.filter(color => color.id !== response.data));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form className="add-bubbles" onSubmit={addColor}>
        <legend>Add color</legend>
        <label>
          color name:
        <input type="text" name="color" value={newColor.color} onChange={handleAddColor} placeholder="Color Name" required />
        </label>
        <label>
          hex code:
        <input type="text" name="code" value={newColor.code.hex} onChange={handleAddColor} placeholder="Color Value" required />
        </label>
        <div className="button-row">
          <button type="submit">Add New Color</button>
        </div>
      </form>
      <div className="reorder">
        <button onClick={reorderColors}>Reload Bubbles!</button>
      </div>
      <div className="logout">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default ColorList;
