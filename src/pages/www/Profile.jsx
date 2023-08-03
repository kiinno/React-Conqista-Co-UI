import React, { useContext, useEffect, useState } from "react";
import guard from "../../helpers/guard";
import InputField from "../../components/InputField/InputField";
import { Button, Spinner } from "react-bootstrap";
import { Formik, Form as FormikForm } from "formik";
import Loader from "../../components/Loader/Loader";
import defaultAvatar from "../../images/default_profile_avatar2.png";
import SystemContext from "../../context";
import useChangeAvatar from "../../hooks/useChangeAvatar";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useUpdateUserData from "../../hooks/useUpdateUserData";
import ResetPasswordModal from "../../components/ResetPasswordModal/ResetPasswordModal";

const Profile = () => {
  const { auth, ui } = useContext(SystemContext);
  const [show, setShow] = useState(false);
  const { changeAvatar } = useChangeAvatar();
  const { updateUserData } = useUpdateUserData();
  const [avatar, setAvatar] = useState({
    avatar: null,
    blob: null,
  });

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .optional()
      .min(2, "Too short first name")
      .max(24, "Too long first name"),
    lastName: Yup.string()
      .optional()
      .min(2, "Too short last name")
      .max(24, "Too long last name"),
    username: Yup.string()
      .optional()
      .min(6, "Too short username")
      .max(32, "Too long username"),
    email: Yup.string()
      .optional()
      .email("Invalid email address format, please enter a valid email address")
      .min(6, "Invalid email address format")
      .max(64, "Too long email address"),
  });

  useEffect(() => {
    const newInitialValues = {};
    Object.keys(initialValues).forEach((fieldName) => {
      newInitialValues[fieldName] = auth.user[fieldName];
    });
    setInitialValues(newInitialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const onSubmit = (formState, formikHelpers) => {
    const formData = new FormData();
    const fields = Object.keys(formState).filter(
      (fieldName) => auth.user[fieldName] !== formState[fieldName]
    );
    fields.forEach((fieldName) =>
      formData.append(fieldName, formState[fieldName])
    );

    updateUserData(formData)
      .then(() => {
        toast.success("Updated Successfully!");
      })
      .catch(({ error, auth, response }) => {
        toast.error(error.message);
      });

    formikHelpers.setSubmitting(false);
  };

  return auth.loading || auth.tokenLogin.loading ? (
    <Loader />
  ) : (
    <>
      <ResetPasswordModal show={show} handleClose={closeModal} />
      <div
        className={`bg-${ui.theme} w-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center`}
      >
        <input
          type="file"
          className="d-none"
          name="avatar"
          id="avatar"
          onChange={(ev) => {
            const image = ev.target.files[0];
            const formData = new FormData();
            formData.append("avatar", image);
            setAvatar({
              avatar: image,
              blob: URL.createObjectURL(image),
            });
            changeAvatar(formData)
              .then(({ auth, data, response }) => {
                toast.success("Successfully avatar changed");
              })
              .catch(({ error, auth, response }) => {
                toast.error(error.message);
              });
          }}
        />
        <label
          className="rounded-circle overflow-hidden border-warning p-1"
          htmlFor="avatar"
          style={{
            width: "150px",
            height: "150px",
            border: "2px solid",
            cursor: "pointer",
          }}
        >
          <img
            src={
              avatar.blob ??
              (auth.user.avatar
                ? `http://localhost:8000${auth.user.avatar}`
                : defaultAvatar)
            }
            crossOrigin="anonymous"
            alt="avatar"
            className="rounded-circle"
            style={{
              width: "140px",
              height: "140px",
            }}
          />
        </label>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
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
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                  />
                  <InputField
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                  />

                  <InputField
                    name="username"
                    placeholder="Username"
                    type="text"
                  />
                  <InputField
                    name="email"
                    placeholder="Email Address"
                    type="email"
                  />

                  <div className="d-flex gap-2">
                    <Button
                      variant={ui.theme === "dark" ? "light" : "dark"}
                      type="submit"
                      disabled={
                        !formState.dirty ||
                        formState.isSubmitting ||
                        !formState.isValid
                      }
                    >
                      {auth.updateUserLoading && (
                        <Spinner
                          animation="border"
                          size="sm"
                          variant={ui.theme === "light" ? "dark" : "light"}
                        />
                      )}{" "}
                      Update
                    </Button>
                    <Button
                      variant={ui.theme === "dark" ? "light" : "dark"}
                      type="button"
                      disabled={formState.isSubmitting}
                      onClick={() => showModal()}
                    >
                      Change Password
                    </Button>
                  </div>
                </FormikForm>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default guard(
  Profile,
  {
    isAuthenticated: true,
  },
  "/auth/login",
  "Please login first"
);
// export default Profile;
