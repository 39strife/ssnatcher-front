import React, { useState, useEffect } from "react";
import { getData, apiRoutes } from "./useRequest";
import { transformToSelects } from "../helpers";

export function useProperties({ options = false } = {}) {
  const [properties, setProperties] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  useEffect(() => {
    getData(apiRoutes.list.properties).then((e) => {
      return options
        ? setPropertyOptions(transformToSelects(e))
        : setProperties(e);
    });
  }, []);
  return options ? propertyOptions : properties;
}

export function useCharacters({ options = false, game = "" } = {}) {
  const [state, setState] = useState([]);
  const [optionState, setOptionState] = useState([]);
  useEffect(() => {
    if (game) {
      getData(
        game
          ? apiRoutes.characters.charactersByGame(game)
          : apiRoutes.characters.all
      ).then((e) => {
        return options ? setOptionState(transformToSelects(e)) : setState(e);
      });
    }
  }, [game]);
  return options ? optionState : state;
}
export function useGames({ options = false }) {
  const [state, setState] = useState([]);
  const [optionState, setOptionState] = useState([]);
  useEffect(() => {
    getData(apiRoutes.games.all).then((e) => {
      return options ? setOptionState(transformToSelects(e)) : setState(e);
    });
  }, []);
  return options ? optionState : state;
}
