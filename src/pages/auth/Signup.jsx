import React from "react";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { Form as FormikForm, Formik } from "formik";
import InputField from "../../components/InputField/InputField";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import guard from "../../helpers/guard";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useSignup();
  const initialValues = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Please fill this field")
      .min(2, "Too short first name")
      .max(24, "Too long first name"),
    lastName: Yup.string()
      .required("Please fill this field")
      .min(2, "Too short last name")
      .max(24, "Too long last name"),
    username: Yup.string()
      .required("Please fill this field")
      .min(6, "Too short username")
      .max(32, "Too long username"),
    email: Yup.string()
      .required("Please fill this field")
      .email("Invalid email address format, please enter a valid email address")
      .min(6, "Invalid email address format")
      .max(64, "Too long email address"),
    password: Yup.string()
      .required("Please fill this field")
      .min(10, "Too short password")
      .max(32, "Too long password"),
    confirmPassword: Yup.string()
      .required("Please fill this field")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const onSubmit = (values, formikHelpers) => {
    signup(values)
      .then(({ response, auth, data }) => {
        if (response.status === 200) {
          navigate("/");
          toast.success(`Welcome ${data.user.firstName}`);
        } else toast.error(auth.error.message);
      })
      .catch(({ error, auth, response }) => {
        toast.error(
          error.message ??
            "error from server when trying to submit form data, check you connection"
        );
      });
    formikHelpers.setSubmitting(false);
  };
  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <h3 className="">Signup</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnMount={true}
        validateOnChange={true}
      >
        {(formState) => {
          return (
            <FormikForm
              className="p-4 rounded"
              style={{ width: "600px" }}
              autoComplete={false}
            >
              <InputField
                name="firstName"
                placeholder="First Name"
                type="text"
              />
              <InputField name="lastName" placeholder="Last Name" type="text" />

              <InputField name="username" placeholder="Username" type="text" />
              <InputField
                name="email"
                placeholder="Email Address"
                type="email"
              />
              <InputField
                name="password"
                placeholder="Password"
                type="password"
              />
              <InputField
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
              />
              <div
                className="text-secondary mb-2"
                style={{ fontWeight: "300" }}
              >
                Already have an account?{" "}
                <Link to={"/auth/login"}>Login Now</Link>
              </div>
              <Button
                type="submit"
                disabled={
                  !formState.dirty ||
                  formState.isSubmitting ||
                  !formState.isValid
                }
              >
                Signup
              </Button>
            </FormikForm>
          );
        }}
      </Formik>
    </div>
  );
};

export default guard(
  Signup,
  {
    isAuthenticated: false,
  },
  "/",
  "You are already signed up."
);
