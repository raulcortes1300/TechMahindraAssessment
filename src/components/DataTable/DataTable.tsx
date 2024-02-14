import React, { useState, useEffect } from "react";
import { deleteUser, fetchData } from "../../api/api";
import FilterInput from "../FilterInput/FilterInput";
import Pagination from "../Pagination/Pagination";
import UserRow from "../UserRow/UserRow";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const DataTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [deletedUserIds, setDeletedUserIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>("");

  const fetchDataAndSetState = async (pageNumber: number) => {
    try {
      const data = await fetchData(pageNumber);

      const filteredUsers = data.data.filter((user: User) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const email = user.email.toLowerCase();
        const filterLowerCase = filter.toLowerCase();

        return (
          (fullName.includes(filterLowerCase) ||
            email.includes(filterLowerCase)) &&
          !deletedUserIds.includes(user.id)
        );
      });

      setUsers(filteredUsers);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    // Handles the deletion of a user by invoking the deleteUser endpoint.
    // Since the deleteUser endpoint does not physically remove the user,
    // we simulate the deletion by updating the component's state.
    try {
      // Call the deleteUser endpoint (which may not physically delete the user)
      await deleteUser(userId);
      // Update the component's state by adding the deleted userId to the deletedUserIds array
      setDeletedUserIds((prevIds) => [...prevIds, userId]);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    fetchDataAndSetState(page);
  }, [page, deletedUserIds, filter]);

  return (
    <div>
      <div>
        <label htmlFor="filterInput">Filter:</label>
        <FilterInput onFilterChange={handleFilterChange} filterValue={filter} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={handleDeleteUser} />
          ))}
        </tbody>
      </table>
      <Pagination
        onPageChange={fetchDataAndSetState}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DataTable;
