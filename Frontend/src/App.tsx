import { useEffect, useState } from "react";
import "./App.css";

type User = {
  id: number;
  name: string;
  email: string;
  birthday: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    birthday: "",
  });

  const handleDelete = async (id: number) => {
    try {
      const result = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      if (!result.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      console.error(message);
      alert(message);
    }
  };

  const handleCreate = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.birthday) {
        alert("Please fill in all fields");
        return;
      }
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
      setNewUser({ name: "", email: "", birthday: "" }); // Clear form
      await load(); // Call load to refresh the user list
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create user");
    }
  };

  const load = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="contentWidth">
        <div className="formRow">
          <div className="inputField">
            <label>Name</label>
            <input
              type="text"
              value={newUser.name || ""}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Name..."
            />
          </div>
          <div className="inputField">
            <label>Email</label>
            <input
              type="email"
              value={newUser.email || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Email....."
            />
          </div>
          <div className="inputField">
            <label>Birthday</label>
            <input
              type="date"
              value={newUser.birthday || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, birthday: e.target.value })
              }
            />
          </div>

          <button className="btnCreate" onClick={handleCreate}>
            + Create
          </button>
        </div>
        <table className="usersTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {new Date(user.birthday).toLocaleDateString("hu-HU", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>
                  <button
                    className={"btnDelete"}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
