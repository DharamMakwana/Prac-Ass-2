import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Button, Group, Loader, Table, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";

const Students = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: () =>
      axios.get("http://localhost:8000/students", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }),
  });
  const qc = useQueryClient();

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: ({ name, age, grade }) =>
      axios.post(
        "http://localhost:8000/students/add",
        { name, age, grade },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      ),
  });
  const { mutate: mutateDelete, isLoading: mutateDeleteLoading } = useMutation({
    mutationFn: ({ id }) =>
      axios.post(
        "http://localhost:8000/students/delete",
        { id },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      ),
  });

  const [formValues, setFormValues] = useState({
    name: "",
    grade: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormValues((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <Group
        style={{ alignItems: "center", justifyContent: "center" }}
        padding={"1rem"}
        mt={"1rem"}
      >
        <TextInput
          required
          placeholder="Name"
          value={formValues.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <TextInput
          required
          placeholder="Age"
          value={formValues.age}
          name="age"
          onChange={(e) => handleChange(e)}
        />
        <TextInput
          required
          placeholder="Grade"
          value={formValues.username}
          name="grade"
          onChange={(e) => handleChange(e)}
        />

        <Button
          disabled={mutateLoading}
          loading={mutateLoading}
          color="blue"
          size="compact-md"
          onClick={() =>
            mutate(formValues, {
              onSuccess: () => {
                qc.invalidateQueries({ queryKey: ["students"] });
              },
            })
          }
        >
          Add Student
        </Button>
      </Group>
      <Table style={{ marginTop: "5rem" }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Grade</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {" "}
          {data?.data?.students.map((student) => (
            <Table.Tr key={student._id}>
              <Table.Td>{student.name}</Table.Td>
              <Table.Td>{student.grade}</Table.Td>
              <Table.Td>{student.age}</Table.Td>
              <Table.Td>
                <Button
                  component={Link}
                  to={`/update/${student._id}`}
                  style={{ marginRight: "1rem" }}
                  size="compact-sm"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="compact-sm"
                  onClick={() =>
                    mutateDelete(
                      { id: student._id },
                      {
                        onSuccess: () => {
                          qc.invalidateQueries({ queryKey: ["students"] });
                        },
                      }
                    )
                  }
                >
                  Delete
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default Students;
