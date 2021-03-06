import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { validateEmail } from "../../utils/RegexValidation";
import useFetchMutation from "../../hooks/useFetchMutation";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { AiFillBug } from "react-icons/ai";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TestUser from "../TestUser/TestUser";
import ButtonLink from "./../ButtonLink/ButtonLink";
import {
  FormWrapper,
  FormContainer,
  FormBox,
  FormTitle,
  FormError,
} from "../../styles/components/form";
// import { baseUrl } from "../../config";

export default function LoginForm({ setIsLoginForm }) {
  const [authState, setAuthState] = useContext(AuthContext);
  // one state instead of three slices of state
  let initialFormState = {
    identifier: "",
    password: "",
  };
  let initialFormErrors = {
    identifier: false,
    password: false,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [userLoginMutation, { data, loading, error }] = useFetchMutation(
    `http://localhost:8080/login`
  );
  useEffect(() => {
    if (data) {
      setAuthState(data);
    }
  }, [data, setAuthState, authState]);

  const handleOnChange = (e) => {
    // grab previous state no gurantee state rendered is the most updated since react schedules state updates
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    // call back function has access to latest state in updater
    const { name, value } = e.target;
    // setState function work asyncronously
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function validateIdentifier(identifier) {
    if (validateEmail(identifier)) {
      setFormErrors((prevState) => ({
        ...prevState,
        identifier: false,
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        identifier: true,
      }));
    }
  }

  function validatePassword(password) {
    if (password.length >= 8) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: false,
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        password: true,
      }));
    }
  }
  function validateForm() {
    if (formErrors.identifier || formErrors.password) {
      return false;
    } else {
      return true;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("form submited");
    const isFormValid = validateForm();
    if (isFormValid) {
      const dataObj = {
        email: formData.identifier,
        password: formData.password,
      };
      console.log(dataObj);
      userLoginMutation({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });
    }
  }
  return authState ? (
    <Navigate to="/dashboard" />
  ) : (
    <FormWrapper>
      <FormBox>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormBox>
              {error && (
                <FormError>
                  <div className="flex items-center">
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    {error.message}
                  </div>
                </FormError>
              )}
              {data && <CheckCircleIcon className="h-7 w-7 text-green-500" />}
              <div className="flex justify-center">
                <AiFillBug className="h-10 w-10 text-indigo-500" />
              </div>
            </FormBox>
            <FormTitle>Log in</FormTitle>
            <Input
              label="Email"
              name="identifier"
              type="email"
              placeholder="Enter email"
              value={formData.identifier}
              onBlur={(e) => validateIdentifier(e.target.value)}
              onChange={handleOnChange}
              error={formErrors.identifier && "Please enter a valid email"}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onBlur={(e) => validatePassword(e.target.value)}
              onChange={handleOnChange}
              error={
                formErrors.password && "Password must be at least 8 characters"
              }
              required
            />
            <TestUser />
            <Button disabled={loading} type="submit" className="mt-2 mb-2">
              {loading ? "Loading..." : "Sign In"}
            </Button>
            <div className="flex flex-col items-center lg:flex-row md:justify-between mt-5">
              <p>Don't have an account?</p>
              <ButtonLink onClick={() => setIsLoginForm(false)}>
                Sign Up
              </ButtonLink>
            </div>
          </form>
        </FormContainer>
      </FormBox>
    </FormWrapper>
  );
}
