import { PlaceHolderPredicateMap, PredicateMap } from "../components/map.types";
import { Store } from "../reducers";

export interface Actions {
  performLogin: () => void;
  gotoCreate: () => void;
  gotoUpload: (dataSetId: string) => void;
  mapping: {
    gotoTab: (tabname: string | undefined) => void;
    setValue: (fieldName: string, value: string) => void;
    setPredicateMap: (predicateMap: PredicateMap) => void;
    setPredicateValue: (
      predicateMap: PredicateMap | PlaceHolderPredicateMap,
      property: string,
      value: string,
    ) => void;
  };
}

export function actionsFactory(store: Store): Actions {
  return {
    performLogin() {
      post("https://secure.huygens.knaw.nl/saml2/login", {
        hsurl: window.location.href,
      });
    },
    gotoCreate() {
      window.location.hash = "/create";
    },
    async gotoUpload(dataSetId: string) {
      window.location.hash = "/mapping/" + dataSetId;
    },
    mapping: {
      gotoTab: (tabName: string | undefined) =>
        store.dispatch({ type: "gotoTab", tabName }),
      setValue: (fieldName: string, value: string) => {
        store.dispatch({ type: "setValue", fieldName, value });
      },
      setPredicateMap: (predicateMap: PredicateMap) =>
        store.dispatch({ type: "setPredicateMap", predicateMap }),
      setPredicateValue: (
        predicateMap: PredicateMap,
        property: string,
        value: string,
      ) =>
        store.dispatch({
          type: "setPredicateValue",
          predicateMap,
          property,
          value,
        }),
    },
  };
}

export function fakeActionsFactory(
  dummy: (name: string) => (...args: any[]) => void,
): Actions {
  return {
    performLogin: dummy("performLogin"),
    gotoCreate: dummy("gotoCreate"),
    gotoUpload: dummy("gotoUpload"),
    mapping: {
      gotoTab: dummy("mapping.gotoTab"),
      setValue: dummy("mapping.setValue"),
      setPredicateMap: dummy("mapping.setPredicateMap"),
      setPredicateValue: dummy("mapping.setPredicateValue"),
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
