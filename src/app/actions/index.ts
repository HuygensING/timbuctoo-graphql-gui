import { PlaceHolderPredicateMap, PredicateMap } from "../components/map.types";
import config from "../config";
import { Store } from "../reducers";

export interface Actions {
  performLogin: () => void;
  gotoCreate: () => void;
  gotoUpload: (dataSetId: string) => void;
  loadDataSets: () => void;
  mapping: {
    gotoTab: (tabname: string | undefined) => void;
    setValue: (fieldName: string, value: string) => void;
    setPredicateMap: (predicateMap: PredicateMap) => void;
    setPredicateValue: (predicateMap: PredicateMap | PlaceHolderPredicateMap, property: string, value: string) => void;
  };
  create: {
    onTitleChange: (newTitle: string) => void;
    onCreateClick: () => void;
  };
}

export function actionsFactory(store: Store): Actions {
  const actions = {
    performLogin() {
      post("https://secure.huygens.knaw.nl/saml2/login", {
        hsurl: window.location.href,
      });
    },
    gotoCreate() {
      window.location.hash = "/create";
    },
    gotoUpload(dataSetId: string) {
      window.location.hash = "/upload/" + dataSetId;
    },
    loadDataSets() {
      fetch(config.apiUrl + "/v5/dataSets/", {})
        .then(function(response) {
          return response.json();
        })
        .then(function(response: any) {
          store.dispatch({
            type: "setDataSets",
            dataSets: response,
          });
        });
    },
    mapping: {
      gotoTab: (tabName: string | undefined) => store.dispatch({ type: "gotoTab", tabName }),
      setValue: (fieldName: string, value: string) => {
        store.dispatch({ type: "setValue", fieldName, value });
      },
      setPredicateMap: (predicateMap: PredicateMap) => store.dispatch({ type: "setPredicateMap", predicateMap }),
      setPredicateValue: (predicateMap: PredicateMap, property: string, value: string) =>
        store.dispatch({
          type: "setPredicateValue",
          predicateMap,
          property,
          value,
        }),
    },
    create: {
      onTitleChange: (newTitle: string) =>
        store.dispatch({
          type: "setCreateTitle",
          newTitle,
        }),
      onCreateClick: () => {
        const state = store.getState();
        if (state.pageSpecific.create) {
          const userId = state.global.userId;
          const dataSetId = state.pageSpecific.create.dataSetId;
          if (userId && dataSetId) {
            fetch(config.apiUrl + `/v5/dataSets/${userId}/${dataSetId}/create`, {
              headers: {
                Authorization: state.global.hsid,
              },
              method: "post",
            }).then(function() {
              store.dispatch({ type: "setDataSetId", dataSetId });
              actions.gotoUpload(dataSetId);
            });
            return;
          }
        }
        console.error("Could not create dataSet. Not all data present", state);
      },
    },
  };
  return actions;
}

export function fakeActionsFactory(dummy: (name: string) => (...args: any[]) => void): Actions {
  return {
    performLogin: dummy("performLogin"),
    gotoCreate: dummy("gotoCreate"),
    gotoUpload: dummy("gotoUpload"),
    loadDataSets: dummy("loadDataSets"),
    mapping: {
      gotoTab: dummy("mapping.gotoTab"),
      setValue: dummy("mapping.setValue"),
      setPredicateMap: dummy("mapping.setPredicateMap"),
      setPredicateValue: dummy("mapping.setPredicateValue"),
    },
    create: {
      onTitleChange: dummy("create.onTitleChange"),
      onCreateClick: dummy("create.onCreateClick"),
    },
  };
}

function post(path: string, params: { [key: string]: string }) {
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", path);

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
