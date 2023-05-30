import { useState, useEffect } from "react";
import { allUsers } from "../../utils/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    allUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {
        setErr(error.response.data.message);
      });
  });
  return err ? (
    <p>{err}</p>
  ) : (
    <div>
      {users.map((user) => {
        return (
          <div key={user.user_id}>
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
}
