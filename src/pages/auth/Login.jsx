import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import SystemContext from "../../context";
import useLogin from "../../hooks/useLogin";
import { toast } from "react-toastify";
import guard from "../../helpers/guard";

const Login = () => {
  const system = useContext(SystemContext);
  const navigate = useNavigate();
  const { auth, login } = useLogin();

  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("please fill this field"),
    password: Yup.string().required("please fill this field"),
  });

  const onSubmit = (values, formikHelpers) => {
    login(values)
      .then(({ response, auth, data }) => {
        if (response.status === 200) {
          navigate("/");
          toast.success(`Welcome back ${data.user.firstName}`);
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
      <h3 className="">Login</h3>
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
            <FormikForm className="p-4 rounded" style={{ width: "600px" }}>
              <InputField name="username" placeholder="Username" />
              <InputField
                name="password"
                type="password"
                placeholder="Password"
              />
              <div
                className="text-secondary mb-2"
                style={{ fontWeight: "300" }}
              >
                You don't have an account?{" "}
                <Link to={"/auth/signup"}>Create an account</Link> <b>or</b>{" "}
                <Link to={"/auth/forgot_password"}>Forgot Password</Link>
              </div>
              <Button
                type="submit"
                disabled={formState.isSubmitting || !formState.isValid}
                variant="dark"
              >
                {auth.loading && (
                  <Spinner
                    animation="border"
                    size="sm"
                    variant={system.ui.theme === "light" ? "dark" : "light"}
                  />
                )}{" "}
                Login
              </Button>
            </FormikForm>
          );
        }}
      </Formik>
    </div>
  );
};

export default guard(
  Login,
  {
    isAuthenticated: false,
  },
  "/",
  "You are already logged in"
);
