import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import SystemContext from "../../context";
import { toast } from "react-toastify";
import guard from "../../helpers/guard";
import useVerifyResetCode from "../../hooks/useVerifyResetCode";

const VerifyResetCode = () => {
  const system = useContext(SystemContext);
  const navigate = useNavigate();
  const { auth, verifyResetCode } = useVerifyResetCode();

  const initialValues = { code: "" };
  const validationSchema = Yup.object({
    code: Yup.string()
      .required("please fill this field")
      .length(6, "Invalid Reset Code Format"),
  });

  const onSubmit = (values, formikHelpers) => {
    verifyResetCode(values.code)
      .then(() => {
        toast.success("You can now reset your password");
        navigate("/auth/reset_password");
      })
      .catch(({ error }) => {
        toast.error(
          error.message ??
            "Error from server when trying to submit form data, check your connection"
        );
      });
    formikHelpers.setSubmitting(false);
  };
  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <h3 className="">Verify Reset Code</h3>
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
              <InputField name="code" placeholder="Reset Code" />
              <Button
                type="submit"
                disabled={formState.isSubmitting || !formState.isValid}
                variant="dark"
              >
                {auth.forgotPassword.verify.loading && (
                  <Spinner
                    animation="border"
                    size="sm"
                    variant={system.ui.theme === "light" ? "dark" : "light"}
                  />
                )}{" "}
                Verify
              </Button>
            </FormikForm>
          );
        }}
      </Formik>
    </div>
  );
};

export default guard(
  VerifyResetCode,
  {
    isAuthenticated: false,
    requested: true,
  },
  "/"
);
