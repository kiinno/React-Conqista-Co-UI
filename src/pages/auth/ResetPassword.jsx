import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import SystemContext from "../../context";
import { toast } from "react-toastify";
import guard from "../../helpers/guard";
import useResetPassword from "../../hooks/useResetPassword";

const ResetPassword = () => {
  const system = useContext(SystemContext);
  const navigate = useNavigate();
  const { auth, resetPassword } = useResetPassword();

  const initialValues = { password: "", confirmPassword: "" };
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Please fill this field")
      .min(10, "Too short password")
      .max(32, "Too long password"),
    confirmPassword: Yup.string()
      .required("Please fill this field")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const onSubmit = (values, formikHelpers) => {
    resetPassword({
      ...values,
      email: auth.forgotPassword.email,
      code: auth.forgotPassword.verify.code,
    })
      .then(({ response, auth, data }) => {
        if (response.status === 200) {
          navigate("/");
          toast.success(`Welcome back ${data.user.firstName}`);
        } else toast.error(auth.error.message);
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
      <h3 className="">Reset Password</h3>
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
              <Button
                type="submit"
                disabled={formState.isSubmitting || !formState.isValid}
                variant="dark"
              >
                {auth.forgotPassword.reset.loading && (
                  <Spinner
                    animation="border"
                    size="sm"
                    variant={system.ui.theme === "light" ? "dark" : "light"}
                  />
                )}{" "}
                Update
              </Button>
            </FormikForm>
          );
        }}
      </Formik>
    </div>
  );
};

export default guard(
  ResetPassword,
  {
    isAuthenticated: false,
    requested: true,
    verified: true,
  },
  "/"
);
