import { Store } from "../reducers";

export interface Actions {
  performLogin: () => void;
  gotoUpload: () => void;
}

export function actionsFactory(store: Store): Actions {
  return {
    performLogin() {
      post("https://secure.huygens.knaw.nl/saml2/login", {
        hsurl: window.location.href,
      });
    },
    gotoUpload() {
      window.location.href = "#/upload";
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
