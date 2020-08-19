import React, { useState } from "react";
import SettingsLayout from "../../../components/Settings/SettingsLayout";
import { NewComponents } from "./NewComponents";

export default function NewSomething({ slug }) {
  const InnerComponent = NewComponents[slug].Inner;
  return (
    <SettingsLayout {...NewComponents[slug].header}>
      <InnerComponent />
    </SettingsLayout>
  );
}

NewSomething.getInitialProps = async (ctx) => {
  console.log(ctx.query);
  return { slug: ctx?.query?.slug || "combo" };
};
