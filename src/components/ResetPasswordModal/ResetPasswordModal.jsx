import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { Form as FormikForm, Formik } from "formik";
import InputField from "../../components/InputField/InputField";
import { toast } from "react-toastify";

function ResetPasswordModal({ show, handleClose }) {
  const initialValues = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Please fill this field")
      .min(10, "Too short password")
      .max(32, "Too long password"),
    confirmPassword: Yup.string()
      .required("Please fill this field")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const onSubmit = (formState, formikHelpers) => {
    // updateUserData(formData)
    //   .then(({ auth, data, response }) => {
    //     toast.success("Updated Successfully!");
    //   })
    //   .catch(({ error, auth, response }) => {
    //     toast.error(error.message);
    //   });

    formikHelpers.setSubmitting(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            // onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnBlur={true}
            validateOnMount={true}
            validateOnChange={true}
          >
            {(formState) => {
              return (
                <FormikForm className="p-4 rounded" autoComplete={false}>
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
                </FormikForm>
              );
            }}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;
