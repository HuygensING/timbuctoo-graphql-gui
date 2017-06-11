import { unwrapNonNull } from "./graphqlHelpers";

function assertThat(test: boolean, message: string): void {
  if (!test) {
    throw new Error(message);
  }
}

export default function(describe: any, it: any) {
  describe("getType", function() {
    it("return object for a simple interface", function() {
      const result = unwrapNonNull({
        name: "Character",
        kind: "INTERFACE",
        ofType: null,
      });
      assertThat(result.kind === "INTERFACE", `${result.kind} !== INTERFACE`);
      assertThat(result.name === "Character", `${result.name} !== Character`);
      assertThat(result.ofType === null, `${result.ofType} !== null`);
    });
    it("return object for a very complex interface", function() {
      const result = unwrapNonNull({
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
      assertThat(result.name === null, `${result.name} !== null`);
      assertThat(result.kind === "LIST", `${result.kind} !== LIST`);
      if (result.ofType == null) {
        throw new Error("Result.ofType must be the inner object");
      } else {
        assertThat(result.ofType.name === null, `${result.ofType.name} !== null`);
        assertThat(result.ofType.kind === "NON_NULL", `${result.ofType.kind} !== NON_NULL`);
      }
    });
  });
}
