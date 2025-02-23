import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AuthorizedUser {
  email: string;
  expirationDate: Date;
  status: "active" | "expired";
}

interface AuthorizedUsersTableProps {
  users?: AuthorizedUser[];
}

export default function AuthorizedUsersTable({
  users = [
    {
      email: "john.doe@example.com",
      expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "active",
    },
    {
      email: "jane.smith@example.com",
      expirationDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "expired",
    },
    {
      email: "bob.wilson@example.com",
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "active",
    },
  ] as AuthorizedUser[],
}: AuthorizedUsersTableProps) {
  return (
    <Card className="w-full bg-white p-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{format(user.expirationDate, "PPP")}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant={
                            user.status === "active" ? "default" : "destructive"
                          }
                          className="flex items-center gap-1"
                        >
                          {user.status === "active" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        {user.status === "active"
                          ? `Expires ${format(user.expirationDate, "PPP")}`
                          : `Expired on ${format(user.expirationDate, "PPP")}`}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
