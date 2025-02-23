import React, { useEffect, useState } from "react";
import AuthPanel from "./AuthPanel";
import {
  addAuthorizedUser,
  getAuthorizedUsers,
  type AuthorizedUser,
} from "@/lib/authorizedUsers";

export default function Home() {
  const [users, setUsers] = useState<AuthorizedUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const loadedUsers = await getAuthorizedUsers();
    setUsers(loadedUsers);
  };

  const handleAuthorize = async (data: {
    email: string;
    expirationDate: Date;
  }) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    const result = await addAuthorizedUser(data.email, data.expirationDate);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("User authorized successfully");
      await loadUsers();
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          StudySync Authorization
        </h1>
        <AuthPanel
          onAuthorize={handleAuthorize}
          isLoading={isLoading}
          error={error}
          success={success}
          users={users}
        />
      </div>
    </div>
  );
}
