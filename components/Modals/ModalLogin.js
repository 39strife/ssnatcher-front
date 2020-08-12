import React from "react";
import { apiRoutes, useForm } from "../../lib/hooks/useRequest";
import { useModalContext } from "../../lib/globals/ModalContext";
import { Input } from "./ModalHelpers";

export const ModalLogin = () => {
  const { setRegister } = useModalContext();
  const form = useForm(apiRoutes.auth.login);
  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <div className="modal-title">
          <h2>Login</h2>
        </div>
        <Input
          errors={form.errors}
          label="Email or username"
          autoComplete="off"
          type="text"
          name="username"
          placeholder="your@email.com"
        />
        <Input
          errors={form.errors}
          autoComplete="off"
          id="password"
          type="password"
          label="Password"
          placeholder="y0uRpA55w0rD"
          name="password"
        />
        <div className="form-group m-b-0">
          <button className="btn">Login</button>
        </div>
      </form>
      <div className="form-group m-b-0">
        <p className="m-b-0 text-center">
          Don't have an account?{" "}
          <button className="link" onClick={() => setRegister(true)}>
            Sign up!
          </button>
        </p>
      </div>
    </>
  );
};
