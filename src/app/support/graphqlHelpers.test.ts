import {getType} from "./graphqlHelpers";

function assertThat(test: boolean, message: string): void {
  if (!test) {
    throw new Error(message);
  }
}

export default function (describe: any, it: any) {
  describe("getType", function () {
    it("return object for a simple interface", function () {
      const result = getType({
        name: "Character",
        kind: "INTERFACE",
        ofType: null,
      });
      assertThat(result.name === "Character", `${result.name} !== Character`);
      assertThat(result.type === "object", `${result.type} !== object`);
    });
    it("return object for a very complex interface", function () {
      const result = getType({
        name: null,
        kind: "NON_NULL",
        ofType: {
          name: null,
          kind: "LIST",
          ofType: {
            name: null,
            kind: "NON_NULL",
            ofType: {
              name: "__Type",
              kind: "OBJECT",
            },
          },
        },
      });
      assertThat(result.name === "__Type", `${result.name} !== __Type`);
      assertThat(result.type === "list", `${result.type} !== list`);
      assertThat(result.ofType != null, `ofType missing for list`);
    });
  });
}
