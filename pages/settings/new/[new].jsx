import React, { useState } from "react";
import SettingsLayout from "../../../components/Settings/SettingsLayout";
import { NewComponents } from "../../../components/NewComponents/NewComponents";

export default function NewSomething({ new: newVar }) {
  const InnerComponent = NewComponents[newVar].Inner;
  return (
    <SettingsLayout {...NewComponents[newVar].header}>
      <InnerComponent />
    </SettingsLayout>
  );
}

NewSomething.getInitialProps = async (ctx) => {
  return { new: ctx?.query?.new || "combo" };
};
