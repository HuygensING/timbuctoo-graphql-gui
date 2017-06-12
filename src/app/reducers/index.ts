import { fromJS, Map } from "immutable";
import { RmlJsonLd, rmlToView } from "../actions/rmlToViewState";
import { MappingProps, PredicateMap, RawDataCollections } from "../components/map.types";
import { assertNever } from "../support/assertNever";

type possiblePages = "default" | "mapping";

type Action =
  | {
      type: "setState";
      state: State;
    }
  | {
      type: "newPage";
      name: possiblePages;
      args: any;
    }
  | {
      type: "setValue";
      fieldName: string;
      value: string;
    }
  | {
      type: "gotoTab";
      tabName: string | undefined;
    }
  | {
      type: "setPredicateMap";
      predicateMap: PredicateMap;
    }
  | {
      type: "setPredicateValue";
      predicateMap: PredicateMap;
      property: string;
      value: string;
    }
  | {
      type: "setRml";
      rml: RmlJsonLd;
    }
  | {
      type: "setRawDataSets";
      rawDataSets: any;
    }
  | {
      type: "404";
      url: string;
    }
  | {
      type: "@@redux/INIT";
    }
  | {
      type: "@@INIT";
    };

export interface State {
  currentPage: possiblePages;
  global: {
    userId?: string;
  };
  pageSpecific: {
    create: {};
    index: {};
    upload: {};
    mapping: MappingProps;
    mappingPrivate: {
      keyCounter: number;
    };
  };
}

export interface Store {
  getState: () => State;
  dispatch: (action: Action) => void;
  subscribe: (subscription: () => void) => void;
}

const preloaded = {};

export const defaultState: State = {
  currentPage: "default",
  global: {
    userId: "DUMMY",
  },
  pageSpecific: {
    create: {},
    index: {},
    upload: {},
    mapping: {
      currentTab: Object.keys(preloaded)[0],
      mappings: preloaded,
      rawDataCollections: {},
    },
    mappingPrivate: {
      keyCounter: 0,
    },
  },
};

function initIndex(state: State) {
  return state;
}

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

function slowPatch(state: State, override: RecursivePartial<Readonly<State>>) {
  return fromJS(state).mergeDeep(override).toJS();
}

function initMapping(dataSetId: string, state: State) {
  return slowPatch(state, {
    currentPage: "mapping",
  });
}

function updateValue(fieldName: string, value: string, state: State) {
  let immState = fromJS(state);
  const mappingState = state.pageSpecific.mapping;
  if (fieldName === "collectionName") {
    if (mappingState.currentTab === undefined) {
      return immState
        .setIn(["pageSpecific", "mapping", "currentTab"], value)
        .setIn(["pageSpecific", "mapping", "mappings", value], fromJS({ mainCollection: {}, predicateMaps: [] }))
        .toJS();
    } else {
      const oldTab = mappingState.currentTab;
      return immState
        .setIn(["pageSpecific", "mapping", "currentTab"], value)
        .setIn(
          ["pageSpecific", "mapping", "mappings", value],
          immState.getIn(["pageSpecific", "mapping", "mappings", oldTab]),
        )
        .deleteIn(["pageSpecific", "mapping", "mappings", oldTab])
        .toJS();
    }
  } else {
    if (mappingState.currentTab === undefined) {
      immState = immState
        .setIn(["pageSpecific", "mapping", "currentTab"], "http://")
        .setIn(["pageSpecific", "mapping", "mappings", "http://"], fromJS({ mainCollection: {}, predicateMaps: [] }));
    }
    if (fieldName === "targetType") {
      return immState
        .setIn(
          ["pageSpecific", "mapping", "mappings", immState.getIn(["pageSpecific", "mapping", "currentTab"]), "type"],
          value,
        )
        .toJS();
    } else if (fieldName === "subjectTemplate") {
      return immState
        .setIn(
          [
            "pageSpecific",
            "mapping",
            "mappings",
            immState.getIn(["pageSpecific", "mapping", "currentTab"]),
            "mainCollection",
            "subjectTemplate",
          ],
          value,
        )
        .toJS();
    } else if (fieldName === "sourceCollection") {
      return immState
        .setIn(
          [
            "pageSpecific",
            "mapping",
            "mappings",
            immState.getIn(["pageSpecific", "mapping", "currentTab"]),
            "mainCollection",
            "sourceCollection",
          ],
          value,
        )
        .toJS();
    }
  }
  return state;
}

function markPropertiesInUse(predicateMap: PredicateMap, state: any) {
  const sourceCollection = state.getIn([
    "pageSpecific",
    "mapping",
    "mappings",
    state.getIn(["pageSpecific", "mapping", "currentTab"]),
    "mainCollection",
    "sourceCollection",
  ]);
  const properties = state
    .getIn(["pageSpecific", "mapping", "rawDataCollections", sourceCollection, "properties"])
    .toJS();
  switch (predicateMap.type) {
    case "template":
      break;
    case "expression":
      break;
    case "constant":
      break;
    case "join":
      break;
    case "property":
      let propertyIndex;
      for (let i = 0; i < properties.length; i++) {
        if (properties[i].name === predicateMap.propertyName) {
          propertyIndex = i;
          break;
        }
      }
      return state.setIn(
        ["pageSpecific", "mapping", "rawDataCollections", sourceCollection, "properties", propertyIndex, "inUse"],
        true,
      );
    case undefined:
      break;
    default:
      assertNever(predicateMap);
      break;
  }
  return state;
}

function setPredicateMap(predicateMap: PredicateMap, state: State) {
  const predMaps = state.pageSpecific.mapping.mappings[state.pageSpecific.mapping.currentTab || ""].predicateMaps;
  let index = -1;
  if (predicateMap.key !== null) {
    for (let i = 0; i < predMaps.length; i++) {
      if (predMaps[i].key === predicateMap.key) {
        index = i;
        break;
      }
    }
  }
  // const immState = markPropertiesInUse(predicateMap, fromJS(state));
  const immState = fromJS(state);
  if (index >= 0) {
    return immState
      .setIn(
        [
          "pageSpecific",
          "mapping",
          "mappings",
          immState.getIn(["pageSpecific", "mapping", "currentTab"]),
          "predicateMaps",
          index,
        ],
        predicateMap,
      )
      .toJS();
  } else {
    predicateMap.key = state.pageSpecific.mappingPrivate.keyCounter + 1 + "";
    let predList = immState.getIn([
      "pageSpecific",
      "mapping",
      "mappings",
      immState.getIn(["pageSpecific", "mapping", "currentTab"]),
      "predicateMaps",
    ]);
    predList = predList.push(predicateMap);
    const ret = immState
      .setIn(["pageSpecific", "mappingPrivate", "keyCounter"], state.pageSpecific.mappingPrivate.keyCounter + 1)
      .setIn(
        [
          "pageSpecific",
          "mapping",
          "mappings",
          immState.getIn(["pageSpecific", "mapping", "currentTab"]),
          "predicateMaps",
        ],
        predList,
      )
      .toJS();
    return ret;
  }
}

function setPredicateValue(predicateMap: PredicateMap, property: string, value: string, state: State) {
  return setPredicateMap(
    {
      ...predicateMap,
      [property]: value,
    },
    state,
  );
}

function setRawDataSets(rawDataSetsInput: any, state: State) {
  // const rawDataSetsEx = {
  //   data: {
  //     http___timbuctoo_collectionList: {
  //       items: [
  //         {
  //           uri: "http://timbuctoo/props/dierikx_ontwikkelingssamenwerking/file/GeboortedagTEMP",
  //           http___timbuctoo_com_thing_ofCollection_inverse: {
  //             items: [
  //               {
  //                 uri: "http://timbuctoo/props/dierikx_ontwikkelingssamenwerking/file/GeboortedagTEMP",
  //                 http___timpropname: {
  //                   value: "GeboortedagTEMP"
  //                 }
  //               }
  //             ]
  //           }
  //         }
  //       ]
  //     }
  //   }
  // };
  const rawDataSets: RawDataCollections = {};
  for (const collection of rawDataSetsInput.data.http___timbuctoo_collectionList.items) {
    rawDataSets[collection.uri] = {
      properties: collection.http___timbuctoo_com_thing_ofCollection_inverse.items.map(function(item: {
        http___timpropname: { value: string };
      }) {
        return {
          name: item.http___timpropname.value,
          inUse: false,
        };
      }),
    };
  }

  return fromJS(state).setIn(["pageSpecific", "mapping", "rawDataCollections"], rawDataSets).toJS();
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "404":
      alert("Page not found!");
      return state;
    case "setState":
      return action.state;
    case "setValue":
      return updateValue(action.fieldName, action.value, state);
    case "setPredicateMap":
      return setPredicateMap(action.predicateMap, state);
    case "setPredicateValue":
      return setPredicateValue(action.predicateMap, action.property, action.value, state);
    case "setRawDataSets":
      return setRawDataSets(action.rawDataSets, state);
    case "gotoTab":
      return fromJS(
        slowPatch(state, {
          pageSpecific: {
            mapping: {
              currentTab: action.tabName,
            },
          },
        }),
      ).toJS();
    case "newPage":
      switch (action.name) {
        case "default":
          return initIndex(state);
        case "mapping":
          return initMapping(action.args.dataSetId, state);
        default:
          assertNever(action.name);
          return state;
      }
    case "setRml":
      const converted = rmlToView(action.rml);
      return fromJS(state)
        .setIn(["pageSpecific", "mapping", "mappings"], converted)
        .setIn(["pageSpecific", "mapping", "currentTab"], converted[0].type)
        .toJS();
    case "@@INIT":
    case "@@redux/INIT":
      return state;
    default:
      assertNever(action);
      return state;
  }
}
