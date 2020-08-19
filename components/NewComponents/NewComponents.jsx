import React, { useState, useMemo, useEffect } from "react";
import { Input, Image, Select } from "../Modals/ModalHelpers";
import ReactMde from "react-mde";

import * as Showdown from "showdown";
import { formEventTOData } from "../../lib/helpers";
import { ComboMaker } from "../ComboParser";
import {
  useGames,
  useCharacters,
  useProperties,
} from "../../lib/hooks/useProperties";
import { useRequest, apiRoutes } from "../../lib/hooks/useRequest";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const MarkdownEditor = ({ name, value: initialValue = "" }) => {
  const [value, setValue] = useState(initialValue);
  const [tab, setTab] = useState("write");
  return (
    <>
      <div className="form-group">
        <textarea
          value={value}
          onChange={() => {}}
          style={{ display: "none" }}
          name={name}
        />
        <ReactMde
          value={value}
          selectedTab={tab}
          onChange={(e) => setValue(e)}
          onTabChange={(e) => setTab(e)}
          generateMarkdownPreview={(e) => {
            return Promise.resolve(converter.makeHtml(e));
          }}
        />
      </div>
    </>
  );
};

export const NewComponents = {
  post: {
    header: {
      title: "New Post",
      description: "Let's get some new postage goin on 😏",
    },
    Inner: () => {
      return (
        <form onSubmit={(e) => console.log(formEventTOJSON(e))}>
          <Input name="title" label="Title" />
          <Image name="image" label="Image" />
          <MarkdownEditor name="content" />
          <div className="form-group">
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      );
    },
  },
  combo: {
    header: {
      title: "New Combo",
      description: "Let's GOOOOOOOOOOOOOOOO 😠",
    },
    Inner: () => {
      const games = useGames({ options: true });
      const [game, setGame] = useState("");
      const characters = useCharacters({ options: true, game });
      const properties = useProperties();
      const [submitData, { loading, Message, errors }] = useRequest();
      console.log(properties);
      return (
        <form
          onSubmit={(e) => {
            const data = formEventTOData(e);
            submitData(apiRoutes.combos.new, data);
          }}
        >
          <Input errors={errors} name="name" label="Title" />
          <Image errors={errors} name="image" label="Image" />
          <Select
            errors={errors}
            name="game"
            label="Game"
            placeholder="Select a game"
            onChange={(e) => setGame(e.target.value)}
            options={games}
          />
          <Select
            errors={errors}
            name="character"
            label="Character"
            placeholder="Select a character"
            options={characters}
          />
          <ComboMaker errors={errors} name="combo" label="Combo" />
          {properties.map((singleProperty, i) => {
            return (
              <Input
                errors={errors}
                key={`property[${singleProperty.id}]`}
                name={`property[${singleProperty.id}]`}
                label={singleProperty.name}
              />
            );
          })}
          <MarkdownEditor errors={errors} name="content" />
          <Message />
          <div className="form-group">
            <button disabled={loading} type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      );
    },
  },
};
