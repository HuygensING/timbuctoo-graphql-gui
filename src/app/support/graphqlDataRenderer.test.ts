import { Metadata } from "../support/graphqlHelpers";
import { GraphQlDataRenderer } from "./graphqlDataRenderer";
import { GraphQlRenderConfig } from "./graphqlRenderConfig";

function assertThat(test: boolean, message: string): void {
  if (!test) {
    throw new Error(message);
  }
}

const graphqlRenderConfigMock: GraphQlRenderConfig = new GraphQlRenderConfig({
  defaults: {},
});
const metadataMock: Metadata = {
  __schema: {
    types: [],
  },
};

export default function(describe: any, it: any) {
  describe("GraphQlDataRenderer.fields()", function() {
    it("returns the fields of the metadata in the object", function() {
      const metadata: Metadata = {
        __schema: {
          types: [
            {
              name: "testType",
              kind: "OBJECT",
              fields: [
                {
                  name: "test1",
                  type: {
                    name: "String",
                    kind: "SCALAR",
                    ofType: null,
                  },
                },
                {
                  name: "test2",
                  type: {
                    name: "String",
                    kind: "SCALAR",
                    ofType: null,
                  },
                },
              ],
            },
          ],
        },
      };
      const data = {
        __typename: "testType",
        test1: "test",
        test2: "test",
        test3: "test",
      };
      const instance = new GraphQlDataRenderer(data, graphqlRenderConfigMock, metadata);

      const fields = instance.fields();

      assertThat(fields.indexOf("test1") !== -1, "fields does not contain 'test1'");
      assertThat(fields.indexOf("test2") !== -1, "fields does not contain 'test2'");
      assertThat(fields.indexOf("test3") === -1, "fields does contain 'test3'");
    });
    it("does not return fields that are not in the data", function() {
      const metadata: Metadata = {
        __schema: {
          types: [
            {
              name: "testType",
              kind: "OBJECT",
              fields: [
                {
                  name: "test1",
                  type: {
                    name: "String",
                    kind: "SCALAR",
                    ofType: null,
                  },
                },
                {
                  name: "test2",
                  type: {
                    name: "String",
                    kind: "SCALAR",
                    ofType: null,
                  },
                },
              ],
            },
          ],
        },
      };
      const data = { __typename: "testType", test1: "test" };
      const instance = new GraphQlDataRenderer(data, graphqlRenderConfigMock, metadata);

      const fields = instance.fields();

      assertThat(fields.indexOf("test1") !== -1, "fields does not contain 'test1'");
      assertThat(fields.indexOf("test2") === -1, "fields does contain 'test2'");
    });
    it("returns an empty array if the data is not an object", function() {
      const instance = new GraphQlDataRenderer("test", graphqlRenderConfigMock, metadataMock);

      assertThat(instance.fields().length === 0, "fields is not empty");
    });
  });
  describe("GraphQlDataRenderer.subRenderer()", function() {
    it("returns a renderer that contains part of the data", function() {
      const metadata: Metadata = {
        __schema: {
          types: [
            {
              name: "testType",
              kind: "OBJECT",
              fields: [
                {
                  name: "test1",
                  type: {
                    name: "subType",
                    kind: "OBJECT",
                    ofType: null,
                  },
                },
                {
                  name: "test2",
                  type: {
                    name: "String",
                    kind: "SCALAR",
                    ofType: null,
                  },
                },
              ],
            },
            {
              name: "subType",
              kind: "OBJECT",
              fields: [
                {
                  name: "subField",
                  type: {
                    name: "String",
                    kind: "SCALAR",
                    ofType: null,
                  },
                },
              ],
            },
          ],
        },
      };
      const data = {
        __typename: "testType",
        test1: {
          __typename: "subType",
          subField: "test",
        },
        test2: "test",
      };
      const instance = new GraphQlDataRenderer(data, graphqlRenderConfigMock, metadata);

      assertThat(instance.subRenderer("test1").fields().indexOf("subField") !== -1, "'subfield' does not exist");
    });
    it("returns a DataRenderer without fields for unknownFields", function() {
      const metadata: Metadata = {
        __schema: {
          types: [
            {
              name: "testType",
              kind: "OBJECT",
              fields: [
                {
                  name: "test1",
                  type: {
                    name: "subType",
                    kind: "OBJECT",
                    ofType: null,
                  },
                },
                {
                  name: "test2",
                  type: {
                    name: "String",
                    kind: "SCALAR",
                    ofType: null,
                  },
                },
              ],
            },
            {
              name: "subType",
              kind: "OBJECT",
              fields: [
                {
                  name: "subField",
                  type: {
                    name: "String",
                    kind: "SCALAR",
                    ofType: null,
                  },
                },
              ],
            },
          ],
        },
      };
      const data = {
        __typename: "testType",
        test1: {
          __typename: "subType",
          subField: "test",
        },
        test2: "test",
      };
      const instance = new GraphQlDataRenderer(data, graphqlRenderConfigMock, metadata);

      assertThat(instance.subRenderer("unknownField").fields().length === 0, "DataRenderer contains data");
    });
  });
  describe("GraphQlDataRenderer.count()", function() {
    it("returns the number of fields for a list", function() {
      const instance = new GraphQlDataRenderer(["bla", "bla1"], graphqlRenderConfigMock, metadataMock);

      const count = instance.count();

      assertThat(count === 2, "count is not 2 but " + count);
    });
  });
}
