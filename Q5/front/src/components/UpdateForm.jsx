import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Text,
  Group,
  Title,
  Container,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UpdateForm = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  const { id } = useParams();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, age, grade }) =>
      axios.post(
        "http://localhost:8000/students/update",
        {
          id,
          name,
          age,
          grade,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      ),
  });
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    grade: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formValues, {
      onSuccess: () => {
        navigate("/students");
        qc.invalidateQueries({ queryKey: ["students"] });
      },
    });
  };

  return (
    <Container
      style={{
        maxWidth: "400px",
      }}
    >
      <Paper
        p="md"
        shadow="sm"
        styles={(theme) => ({
          position: "relative",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Title order={4} ta="center">
          Upadte Form
        </Title>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextInput
            required
            placeholder="Name"
            label="name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <TextInput
            required
            placeholder="Age"
            label="age"
            name="age"
            onChange={(e) => handleChange(e)}
          />
          <TextInput
            required
            placeholder="Grade"
            label="grade"
            name="grade"
            onChange={(e) => handleChange(e)}
          />

          <Group mt="md">
            <Button
              disabled={isLoading}
              loading={isLoading}
              color="blue"
              type="submit"
              fullWidth
            >
              Update
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateForm;
