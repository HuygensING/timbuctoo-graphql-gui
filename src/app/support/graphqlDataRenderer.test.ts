import {Metadata} from "../support/graphqlHelpers";
import {GraphQlDataRenderer} from "./graphqlDataRenderer";
import {GraphQlRenderConfig} from "./graphqlRenderConfig";

function assertThat(test: boolean, message: string): void {
  if (!test) {
    throw new Error(message);
  }
}

const graphqlRenderConfigMock: GraphQlRenderConfig = new GraphQlRenderConfig({});
const metadataMock: Metadata = {
  __schema: {
    types: [
    ],
  },
};

export default function (describe: any, it: any) {
  describe("GraphQlDataRenderer.fields()", function () {
    it("returns the fields of an object", function () {
      const instance = new GraphQlDataRenderer({test1: "test", test2: "test"}, graphqlRenderConfigMock,  metadataMock);

      assertThat(instance.fields().indexOf("test1") !== -1, "fields does not contain 'test1'");
      assertThat(instance.fields().indexOf("test2") !== -1, "fields does not contain 'test2'");
    });
    it("returns an empty array if the data is not an object", function () {
      const instance = new GraphQlDataRenderer("test", graphqlRenderConfigMock,  metadataMock);

      assertThat(instance.fields().length === 0, "fields is not empty");
    });
  });
  describe("GraphQlDataRenderer.subRenderer()", function () {
    it("returns a that contains part of the data", function () {
      const instance = new GraphQlDataRenderer(
        {test1: {subField: "test"}, test2: "test"},
        graphqlRenderConfigMock,
        metadataMock,
      );

      assertThat(instance.subRenderer("test1").fields().indexOf("subField") !== -1, "'subfield' does not exist");
    });
    it("returns a DataRenderer without fields for unknownFields", function () {
      const instance = new GraphQlDataRenderer(
        {test1: {subField: "test"}, test2: "test"},
        graphqlRenderConfigMock,
        metadataMock,
      );

      assertThat(instance.subRenderer("unknownField").fields().length === 0, "DataRenderer contains data");
    });
  });
  describe("GraphQlDataRenderer.count()", function () {
    it("returns the number of fields for a list", function () {
      const instance = new GraphQlDataRenderer(["bla", "bla1"], graphqlRenderConfigMock,  metadataMock);

      const count = instance.count();

      assertThat(count === 2, "count is not 2 but " + count);
    });
    // it("returns '0' for a scalar", function () {
    //   const instance = new GraphQlDataRenderer("test", graphqlRenderConfigMock,  metadataMock);

    //   assertThat(instance.fields().length === 0, "fields is not empty");
    // });
  });
}
