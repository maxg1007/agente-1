import React, { useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import AuthorizationForm from "./AuthorizationForm";
import AuthorizedUsersTable from "./AuthorizedUsersTable";

interface AuthPanelProps {
  onAuthorize?: (data: {
    email: string;
    expirationDate: Date;
  }) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  success?: string;
  users?: Array<{
    email: string;
    expirationDate: Date;
    status: "active" | "expired";
  }>;
}

const AuthPanel = ({
  onAuthorize = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
  isLoading = false,
  error = "",
  success = "",
  users = [
    {
      email: "demo.user@example.com",
      expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "active",
    },
    {
      email: "expired.user@example.com",
      expirationDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "expired",
    },
  ],
}: AuthPanelProps) => {
  const [activeTab, setActiveTab] = useState("authorize");

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg">
      <Tabs
        defaultValue="authorize"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="authorize">Authorize User</TabsTrigger>
          <TabsTrigger value="users">Authorized Users</TabsTrigger>
        </TabsList>

        <TabsContent value="authorize" className="space-y-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Authorize New User
            </h2>
            <p className="text-muted-foreground">
              Add a new user to the authorized users list by providing their
              email and setting an expiration date.
            </p>
          </div>
          <AuthorizationForm
            onSubmit={onAuthorize}
            isLoading={isLoading}
            error={error}
            success={success}
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Authorized Users
            </h2>
            <p className="text-muted-foreground">
              View and manage currently authorized users and their access
              status.
            </p>
          </div>
          <AuthorizedUsersTable users={users} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthPanel;
