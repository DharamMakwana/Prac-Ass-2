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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LoginForm = () => {
  const { user } = useAuth();
  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: ({ username, password }) =>
      axios.post(
        "http://localhost:8000/auth/login",
        { username, password },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      ),
  });
  const [formValues, setFormValues] = useState({
    username: "sanjana",
    password: "sarda",
  });
  const { setUserToken } = useAuth();
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
      onSuccess: (data) => {
        setUserToken(data.data?.token);
        navigate("/students");
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
          Login Form
        </Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            mt="md"
            required
            placeholder="Your Username"
            label="Username"
            value={formValues.username}
            name="username"
            onChange={(e) => handleChange(e)}
          />

          <PasswordInput
            mt="md"
            required
            value={formValues.password}
            placeholder="Your Password"
            label="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          {isError && (
            <Text color="red" size="sm" mt="sm" ta="center" fw={500}>
              {error.data?.response?.message}
            </Text>
          )}

          <Group mt="md">
            <Button
              disabled={isLoading}
              loading={isLoading}
              color="blue"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
