import { fromJS, Map } from "immutable";
import { RmlJsonLd, rmlToView } from "../actions/rmlToViewState";
import { MappingProps, PredicateMap, RawDataCollections } from "../components/map.types";
import config from "../config";
import { assertNever } from "../support/assertNever";

type possiblePages = "default" | "mapping" | "create" | "upload";
const defaultUriPrefix = "http://timbuctoo.huygens.knaw.nl/v5/data/";

type Action =
  | {
      type: "startFileUpload";
      fileType: "xlsx" | "csv" | "mdb" | "dataperfect" | "rs" | undefined;
    }
  | {
      type: "setDataSets";
      dataSets: { [key: string]: { [key: string]: string } };
    }
  | {
      type: "setDataSetId";
      dataSetId: string;
    }
  | {
      type: "setCreateTitle";
      newTitle: string;
    }
  | {
      type: "setLoginToken";
      hsid: string;
      persistentId: string;
      displayName: string;
    }
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

interface UploadData {
  title?: string;
  fileIsBeingAdded?: "xlsx" | "csv" | "mdb" | "dataperfect" | "rs";
  remoteSets: string[];
  remoteUri?: string;
  files: string[];
  description?: string;
  provenance?: string;
  color?: string;
}

export interface State {
  currentPage: possiblePages;
  global: {
    hsid?: string;
    userId?: string;
    dataSetId: string | undefined;
    displayName?: string;
    dataSets: { [key: string]: { [key: string]: string } };
  };
  pageSpecific: {
    create?: {
      dataSetId: string;
      title: string;
    };
    index: {};
    upload: UploadData;
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
    dataSetId: undefined,
    dataSets: {},
  },
  pageSpecific: {
    index: {},
    upload: {
      remoteSets: [],
      files: [],
    },
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
  return slowPatch(state, {
    currentPage: "default",
  });
}

function initCreate(state: State) {
  return slowPatch(state, {
    currentPage: "create",
  });
}

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

function slowPatch(state: State, override: RecursivePartial<Readonly<State>>) {
  return fromJS(state).mergeDeep(override).toJS();
}

function initMapping(dataSetId: string, state: State) {
  return slowPatch(state, {
    global: {
      dataSetId: dataSetId,
    },
    currentPage: "mapping",
  });
}

function initUpload(dataSetId: string, state: State) {
  return slowPatch(state, {
    global: {
      dataSetId: dataSetId,
    },
    currentPage: "upload",
  });
}

function updateValue(fieldName: string, value: string, state: State) {
  let immState = fromJS(state);
  const mappingState = state.pageSpecific.mapping;

  if (mappingState.currentTab === undefined) {
    const mappingUri =
      "http://timbuctoo.com/mappings/" +
      state.global.userId +
      "/" +
      state.global.dataSetId +
      "/" +
      new Date().getTime();
    immState = immState
      .setIn(["pageSpecific", "mapping", "currentTab"], mappingUri)
      .setIn(["pageSpecific", "mapping", "mappings", mappingUri], fromJS({ mainCollection: {}, predicateMaps: [] }));
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
    const rawMapping = state.pageSpecific.mapping.rawDataCollections[value];
    const label = rawMapping ? "/" + rawMapping.label : "";
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
      .setIn(
        [
          "pageSpecific",
          "mapping",
          "mappings",
          immState.getIn(["pageSpecific", "mapping", "currentTab"]),
          "collectionType",
        ],
        defaultUriPrefix + state.global.userId + "/" + state.global.dataSetId + label,
      )
      .setIn(
        [
          "pageSpecific",
          "mapping",
          "mappings",
          immState.getIn(["pageSpecific", "mapping", "currentTab"]),
          "mainCollection",
          "subjectTemplate",
        ],
        defaultUriPrefix + state.global.userId + "/" + state.global.dataSetId + label + "/{tim_id}",
      )
      .toJS();
  } else if (fieldName === "collectionType") {
    return immState
      .setIn(
        [
          "pageSpecific",
          "mapping",
          "mappings",
          immState.getIn(["pageSpecific", "mapping", "currentTab"]),
          "mainCollection",
          "collectionType",
        ],
        value,
      )
      .toJS();
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
  //     tim_collectionList: {
  //       items: [
  //         {
  //           uri: "http://timbuctoo/props/dierikx_ontwikkelingssamenwerking/file/GeboortedagTEMP",
  //           rdfs_label: {
  //             value: "Blad1"
  //           },
  //           tim_ofCollection_inverse: {
  //             items: [
  //               {
  //                 uri: "http://timbuctoo/props/dierikx_ontwikkelingssamenwerking/file/GeboortedagTEMP",
  //                 tim_timpropname: {
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
  for (const collection of rawDataSetsInput.data.tim_collectionList.items) {
    rawDataSets[collection.uri] = {
      label: collection.rdfs_label.value,
      properties: collection.tim_ofCollection_inverse.items.map(function(item: { tim_timpropname: { value: string } }) {
        return {
          name: item.tim_timpropname.value,
          inUse: false,
        };
      }),
    };
  }

  return fromJS(state).setIn(["pageSpecific", "mapping", "rawDataCollections"], rawDataSets).toJS();
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setLoginToken":
      return slowPatch(state, {
        global: { hsid: action.hsid, userId: action.persistentId, displayName: action.displayName },
      });
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
    case "setDataSetId":
      return slowPatch(state, {
        global: {
          dataSetId: action.dataSetId,
        },
      });
    case "setDataSets":
      return slowPatch(state, {
        global: {
          dataSets: action.dataSets,
        },
      });
    case "setCreateTitle":
      return slowPatch(state, {
        pageSpecific: {
          create: {
            title: action.newTitle,
            dataSetId: action.newTitle.replace(/[^a-zA-Z0-9_-]+/g, "-").toLowerCase(),
          },
        },
      });
    case "startFileUpload":
      return slowPatch(state, {
        pageSpecific: {
          upload: {
            fileIsBeingAdded: action.fileType,
          },
        },
      });
    case "newPage":
      switch (action.name) {
        case "default":
          return initIndex(state);
        case "mapping":
          return initMapping(action.args.dataSetId, state);
        case "create":
          return initCreate(state);
        case "upload":
          return initUpload(action.args.dataSetId, state);
        default:
          assertNever(action.name);
          return state;
      }
    case "setRml":
      const converted = rmlToView(action.rml);
      const firstCollection = converted[Object.keys(converted)[0]];
      return fromJS(state)
        .setIn(["pageSpecific", "mapping", "mappings"], converted)
        .setIn(["pageSpecific", "mapping", "currentTab"], firstCollection ? firstCollection.type : undefined)
        .toJS();
    case "@@INIT":
    case "@@redux/INIT":
      return state;
    default:
      assertNever(action);
      return state;
  }
}
