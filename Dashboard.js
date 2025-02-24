import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Table } from "./components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";

export default function Dashboard() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", class: "Grade 5", feesPaid: true },
    { id: 2, name: "Jane Smith", class: "Grade 6", feesPaid: false },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const users = {
    admin: { password: "admin123", role: "Admin" },
    teacher: { password: "teacher123", role: "Teacher" },
    student: { password: "student123", role: "Student" },
  };

  const handleLogin = () => {
    if (users[username] && users[username].password === password) {
      setIsAuthenticated(true);
      setRole(users[username].role);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-2" />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2" />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">School Management Dashboard</h1>
      <h2 className="text-lg">Role: {role}</h2>
      <Tabs defaultValue="students" className="mt-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          {role === "Admin" && <TabsTrigger value="teachers">Teachers</TabsTrigger>}
          {role !== "Student" && <TabsTrigger value="fees">Fee Management</TabsTrigger>}
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold">Student List</h2>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Fees Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.class}</td>
                      <td>{student.feesPaid ? "✅ Paid" : "❌ Pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}