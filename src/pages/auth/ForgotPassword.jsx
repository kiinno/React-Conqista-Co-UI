import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import SystemContext from "../../context";
import { toast } from "react-toastify";
import guard from "../../helpers/guard";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const system = useContext(SystemContext);
  const navigate = useNavigate();
  const { auth, forgot_password } = useForgotPassword();

  const initialValues = { email: "" };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("please fill this field")
      .email(
        "Invalid email address format, please enter a valid email address"
      ),
  });

  const onSubmit = (values, formikHelpers) => {
    forgot_password(values)
      .then(({ body }) => {
        navigate("/auth/verify_reset_code");
        toast.success(`Please check ${body.email}`);
      })
      .catch(({ error }) => {
        toast.error(
          error.message ??
            "error from server when trying to submit form data, check you connection"
        );
      });
    formikHelpers.setSubmitting(false);
  };
  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <h3 className="">Forgot Password</h3>
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
              <InputField name="email" placeholder="Email" />
              <div
                className="text-secondary mb-2"
                style={{ fontWeight: "300" }}
              >
                You don't have an account?{" "}
                <Link to={"/auth/signup"}>Create an account</Link> <b>or</b>{" "}
                <Link to={"/auth/login"}>Login</Link>
              </div>
              <Button
                type="submit"
                disabled={formState.isSubmitting || !formState.isValid}
                variant="dark"
              >
                {auth.forgotPassword.loading && (
                  <Spinner
                    animation="border"
                    size="sm"
                    variant={system.ui.theme === "light" ? "dark" : "light"}
                  />
                )}{" "}
                Send Code
              </Button>
            </FormikForm>
          );
        }}
      </Formik>
    </div>
  );
};

export default guard(
  ForgotPassword,
  {
    isAuthenticated: false,
  },
  "/",
  "You have already logged in"
);
