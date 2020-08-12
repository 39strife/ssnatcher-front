import React from "react";
import { apiRoutes, useForm } from "../../lib/hooks/useRequest";
import { useModalContext } from "../../lib/globals/ModalContext";
import { Input, Consent } from "./ModalHelpers";

export const ModalRegister = () => {
  const { setLogin } = useModalContext();
  const form = useForm(apiRoutes.auth.register, true);
  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <div className="modal-title">
          <h2>Register</h2>
        </div>
        <Input
          name="email"
          type="text"
          label="Email"
          errors={form.errors}
          placeholder="your@email.com"
        />
        <Input
          name="username"
          type="text"
          label="Username"
          errors={form.errors}
          placeholder="fgcChampion"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          errors={form.errors}
          placeholder="y0uRpA55w0rD"
        />
        <Input
          name="password_confirmation"
          type="password"
          label="Password (confirmation)"
          errors={form.errors}
          placeholder="y0uRpA55w0rD (again)"
        />
        <Consent errors={form.errors} />
        <div className="form-group m-b-0">
          <button className="btn">Register</button>
        </div>
      </form>
      <div className="form-group m-b-0">
        <p className="m-b-0 text-center">
          Already have an account?{" "}
          <button className="link" onClick={() => setLogin(true)}>
            Login!
          </button>
        </p>
      </div>
    </>
  );
};
