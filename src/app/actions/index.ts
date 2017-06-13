import { PlaceHolderPredicateMap, PredicateMap } from "../components/map.types";
import config from "../config";
import { Store } from "../reducers";
import { viewToRml } from "./rmlToViewState";

export interface Actions {
  performLogin: () => void;
  gotoCreate: () => void;
  gotoUpload: (dataSetId: string) => void;
  gotoMapping: (dataSetId: string) => void;
  gotoGraphiql: () => void;
  loadDataSets: () => void;
  mapping: {
    execute: () => void;
    gotoTab: (tabname: string | undefined) => void;
    setValue: (fieldName: string, value: string) => void;
    setPredicateMap: (predicateMap: PredicateMap) => void;
    setPredicateValue: (predicateMap: PredicateMap | PlaceHolderPredicateMap, property: string, value: string) => void;
  };
  create: {
    onTitleChange: (newTitle: string) => void;
    onCreateClick: () => void;
  };
  upload: {
    showModal: (key: "xlsx" | "csv" | "mdb" | "dataperfect" | "rs") => void;
    cancelModal: () => void;
    startUpload: () => void;
    getResourceSyncData: (url: string) => void;
    downloadRsFile: (url: string) => void;
  };
}

export function actionsFactory(store: Store): Actions {
  const actions: Actions = {
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
    gotoMapping(dataSetId: string) {
      window.location.hash = "/mapping/" + dataSetId;
    },
    gotoGraphiql() {
      const state = store.getState();
      window.location.href = config.apiUrl + "/static/graphiql#" + state.global.userId + "/" + state.global.dataSetId;
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
      execute: () => {
        const state = store.getState();
        const userId = state.global.userId;
        const dataSetId = state.global.dataSetId;
        if (userId && dataSetId) {
          const rml = viewToRml(state.pageSpecific.mapping.mappings);
          console.log(JSON.stringify(rml, undefined, 2));
          fetch(config.apiUrl + `/v5/${userId}/${dataSetId}/rml`, {
            method: "post",
            headers: {
              Authorization: state.global.hsid,
            },
            body: JSON.stringify(rml),
          })
            .then(function(response) {
              if (response.status < 300) {
                alert("Mapping executed successfully!");
              } else {
                console.log(response);
                alert("Something went wrong during the mapping");
              }
            })
            .catch(function() {
              console.log(arguments);
              alert("Something went wrong during the mapping");
            });
        }
      },
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
    upload: {
      downloadRsFile: (uri: string) => {
        const state = store.getState();
        const userId = state.global.userId;
        const dataSetId = state.global.dataSetId;
        if (userId && dataSetId) {
          actions.upload.cancelModal();
          fetch(config.apiUrl + `/v2.1/remote/rs/import`, {
            method: "post",
            headers: {
              Authorization: state.global.hsid,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              source: uri,
              userId: userId,
              dataSetId: dataSetId,
            }),
          })
            .then(function(response) {
              if (response.status !== 200) {
                alert("something went wrong while getting the list of resources");
              } else {
                alert("import succeeded!");
              }
            })
            .catch(function() {
              console.log(arguments);
              alert("something went wrong while getting the list of resources");
            });
        }
      },
      getResourceSyncData: (uri: string) => {
        fetch(config.apiUrl + `/v2.1/remote/rs/discover/listgraphs/${encodeURIComponent(uri)}`)
          .then(function(response) {
            if (response.status !== 200) {
              alert("something went wrong while getting the list of resources");
            } else {
              return response.json();
            }
          })
          .then(function(json) {
            store.dispatch({ type: "setRsResources", setDetails: json.setDetails });
          })
          .catch(function() {
            console.log(arguments);
            alert("something went wrong while getting the list of resources");
          });
      },
      showModal: (action: "xlsx" | "csv" | "mdb" | "dataperfect" | "rs") => {
        store.dispatch({ type: "startFileUpload", fileType: action });
      },
      cancelModal: () => {
        store.dispatch({ type: "startFileUpload", fileType: undefined });
      },
      startUpload: () => {
        console.log("start");
        const state = store.getState();
        const userId = state.global.userId;
        const dataSetId = state.global.dataSetId;
        if (userId && dataSetId) {
          const formData = new FormData();

          formData.append("type", state.pageSpecific.upload.fileIsBeingAdded || "");
          formData.append("file", (document.getElementById("TheFileInput") as any).files[0]);

          fetch(config.apiUrl + `/v5/${userId}/${dataSetId}/upload/table`, {
            method: "post",
            headers: {
              Authorization: state.global.hsid,
            },
            body: formData,
          })
            .then(function(response) {
              if (response.status < 300) {
                alert("File uploaded successfully!");
              } else {
                alert("Something went wrong during the upload");
              }
            })
            .catch(function() {
              console.log(arguments);
              alert("Something went wrong during the upload");
            });
        } else {
          window.location.hash = "/";
        }
      },
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
    gotoMapping: dummy("gotoMapping"),
    gotoGraphiql: dummy("gotoMapping"),
    loadDataSets: dummy("loadDataSets"),
    mapping: {
      execute: dummy("mapping.execute"),
      gotoTab: dummy("mapping.gotoTab"),
      setValue: dummy("mapping.setValue"),
      setPredicateMap: dummy("mapping.setPredicateMap"),
      setPredicateValue: dummy("mapping.setPredicateValue"),
    },
    create: {
      onTitleChange: dummy("create.onTitleChange"),
      onCreateClick: dummy("create.onCreateClick"),
    },
    upload: {
      showModal: dummy("upload.showModal"),
      cancelModal: dummy("upload.cancelModal"),
      startUpload: dummy("upload.startUpload"),
      getResourceSyncData: dummy("upload.getResourceSyncData"),
      downloadRsFile: dummy("upload.downloadRsFile"),
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
