import { Field } from "formik";
import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import SystemContext from "../../context";

const InputField = (props) => {
  const { ui } = useContext(SystemContext);
  return (
    <Field {...props}>
      {(fieldProps) => {
        const { field, meta } = fieldProps;
        return (
          <Form.Group className="mb-3">
            <Form.Control
              {...props}
              {...field}
              className={`${
                ui.theme === "dark" && "bg-dark text-light border-secondary"
              } ${props.className}`}
            />
            {meta.touched && meta.error ? (
              <div className="invalid-feedback d-block text-capitalize">
                {meta.error}
              </div>
            ) : undefined}
          </Form.Group>
        );
      }}
    </Field>
  );
};

export default InputField;
