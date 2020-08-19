import React, { useState, useMemo, useEffect } from "react";
import { Input, Image, Select } from "../../../components/Modals/ModalHelpers";
import ReactMde from "react-mde";

import * as Showdown from "showdown";
import { formEventTOJSON, transformToSelects } from "../../../lib/helpers";
import { getGames, getCharactersByGame } from "../../../lib/requests";
import { ComboMaker } from "../../../components/ComboParser";

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
      const [characters, setCharacters] = useState([]);
      const [games, setGames] = useState([]);
      useEffect(() => {
        getGames().then((e) => setGames(transformToSelects(e)));
      }, []);
      return (
        <form onSubmit={(e) => console.log(formEventTOJSON(e))}>
          <Input name="title" label="Title" />
          <Image name="image" label="Image" />
          <Select
            label="Game"
            placeholder="Select a game"
            onChange={(e) =>
              getCharactersByGame(e.target.value).then((e) =>
                setCharacters(transformToSelects(e))
              )
            }
            options={games}
          />
          <Select
            label="Character"
            placeholder="Select a character"
            options={characters}
          />
          <ComboMaker name="combo" label="Combo" />
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
};
