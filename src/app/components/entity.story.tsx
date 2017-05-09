import * as React from "react";
import {GraphQlDataRenderer} from "../support/graphqlDataRenderer";
import {Data, DataItem, FieldMetadataType, getMetadata, Metadata} from "../support/graphqlHelpers";
import {DefaultMappings, GraphQlRenderConfig, OverrideConfig} from "../support/graphqlRenderConfig";
import {DataRenderer, Entity} from "./api";
import {ComponentArguments, renderField, renderItemFields} from "./entity";
declare const module: any; // when webpack compiles it provides a module variable

/*
{
  __schema {
    types {
      name
      kind
      enumValues {
        name
      }
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
            ofType {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    }
  }
}
 */
const metadata: {data: Metadata} = {
  data: {
    __schema: {
      types: [
        {
          name: "Query",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "hero",
              type: {
                name: "Character",
                kind: "INTERFACE",
                ofType: null,
              },
            },
            {
              name: "reviews",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: "Review",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
            {
              name: "search",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: "SearchResult",
                  kind: "UNION",
                  ofType: null,
                },
              },
            },
            {
              name: "character",
              type: {
                name: "Character",
                kind: "INTERFACE",
                ofType: null,
              },
            },
            {
              name: "droid",
              type: {
                name: "Droid",
                kind: "OBJECT",
                ofType: null,
              },
            },
            {
              name: "human",
              type: {
                name: "Human",
                kind: "OBJECT",
                ofType: null,
              },
            },
            {
              name: "starship",
              type: {
                name: "Starship",
                kind: "OBJECT",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "Episode",
          kind: "ENUM",
          enumValues: [
            {
              name: "NEWHOPE",
            },
            {
              name: "EMPIRE",
            },
            {
              name: "JEDI",
            },
          ],
          fields: null,
        },
        {
          name: "Character",
          kind: "INTERFACE",
          enumValues: null,
          fields: [
            {
              name: "id",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "ID",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "name",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "String",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "friends",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: "Character",
                  kind: "INTERFACE",
                  ofType: null,
                },
              },
            },
            {
              name: "friendsConnection",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "FriendsConnection",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
            {
              name: "appearsIn",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: null,
                  kind: "LIST",
                  ofType: {
                    name: "Episode",
                    kind: "ENUM",
                    ofType: null,
                  },
                },
              },
            },
          ],
        },
        {
          name: "ID",
          kind: "SCALAR",
          enumValues: null,
          fields: null,
        },
        {
          name: "String",
          kind: "SCALAR",
          enumValues: null,
          fields: null,
        },
        {
          name: "Int",
          kind: "SCALAR",
          enumValues: null,
          fields: null,
        },
        {
          name: "FriendsConnection",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "totalCount",
              type: {
                name: "Int",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "edges",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: "FriendsEdge",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
            {
              name: "friends",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: "Character",
                  kind: "INTERFACE",
                  ofType: null,
                },
              },
            },
            {
              name: "pageInfo",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "PageInfo",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
          ],
        },
        {
          name: "FriendsEdge",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "cursor",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "ID",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "node",
              type: {
                name: "Character",
                kind: "INTERFACE",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "PageInfo",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "startCursor",
              type: {
                name: "ID",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "endCursor",
              type: {
                name: "ID",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "hasNextPage",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "Boolean",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
          ],
        },
        {
          name: "Boolean",
          kind: "SCALAR",
          enumValues: null,
          fields: null,
        },
        {
          name: "Review",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "stars",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "Int",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "commentary",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "SearchResult",
          kind: "UNION",
          enumValues: null,
          fields: null,
        },
        {
          name: "Human",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "id",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "ID",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "name",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "String",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "height",
              type: {
                name: "Float",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "mass",
              type: {
                name: "Float",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "friends",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: "Character",
                  kind: "INTERFACE",
                  ofType: null,
                },
              },
            },
            {
              name: "friendsConnection",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "FriendsConnection",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
            {
              name: "appearsIn",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: null,
                  kind: "LIST",
                  ofType: {
                    name: "Episode",
                    kind: "ENUM",
                    ofType: null,
                  },
                },
              },
            },
            {
              name: "starships",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: "Starship",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
          ],
        },
        {
          name: "LengthUnit",
          kind: "ENUM",
          enumValues: [
            {
              name: "METER",
            },
            {
              name: "FOOT",
            },
          ],
          fields: null,
        },
        {
          name: "Float",
          kind: "SCALAR",
          enumValues: null,
          fields: null,
        },
        {
          name: "Starship",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "id",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "ID",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "name",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "String",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "length",
              type: {
                name: "Float",
                kind: "SCALAR",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "Droid",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "id",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "ID",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "name",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "String",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "friends",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: "Character",
                  kind: "INTERFACE",
                  ofType: null,
                },
              },
            },
            {
              name: "friendsConnection",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "FriendsConnection",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
            {
              name: "appearsIn",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: null,
                  kind: "LIST",
                  ofType: {
                    name: "Episode",
                    kind: "ENUM",
                    ofType: null,
                  },
                },
              },
            },
            {
              name: "primaryFunction",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "Mutation",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "createReview",
              type: {
                name: "Review",
                kind: "OBJECT",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "ReviewInput",
          kind: "INPUT_OBJECT",
          enumValues: null,
          fields: null,
        },
        {
          name: "__Schema",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "types",
              type: {
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
              },
            },
            {
              name: "queryType",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "__Type",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
            {
              name: "mutationType",
              type: {
                name: "__Type",
                kind: "OBJECT",
                ofType: null,
              },
            },
            {
              name: "subscriptionType",
              type: {
                name: "__Type",
                kind: "OBJECT",
                ofType: null,
              },
            },
            {
              name: "directives",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: null,
                  kind: "LIST",
                  ofType: {
                    name: null,
                    kind: "NON_NULL",
                    ofType: {
                      name: "__Directive",
                      kind: "OBJECT",
                    },
                  },
                },
              },
            },
          ],
        },
        {
          name: "__Type",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "kind",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "__TypeKind",
                  kind: "ENUM",
                  ofType: null,
                },
              },
            },
            {
              name: "name",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "description",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "fields",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: null,
                  kind: "NON_NULL",
                  ofType: {
                    name: "__Field",
                    kind: "OBJECT",
                    ofType: null,
                  },
                },
              },
            },
            {
              name: "interfaces",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: null,
                  kind: "NON_NULL",
                  ofType: {
                    name: "__Type",
                    kind: "OBJECT",
                    ofType: null,
                  },
                },
              },
            },
            {
              name: "possibleTypes",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: null,
                  kind: "NON_NULL",
                  ofType: {
                    name: "__Type",
                    kind: "OBJECT",
                    ofType: null,
                  },
                },
              },
            },
            {
              name: "enumValues",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: null,
                  kind: "NON_NULL",
                  ofType: {
                    name: "__EnumValue",
                    kind: "OBJECT",
                    ofType: null,
                  },
                },
              },
            },
            {
              name: "inputFields",
              type: {
                name: null,
                kind: "LIST",
                ofType: {
                  name: null,
                  kind: "NON_NULL",
                  ofType: {
                    name: "__InputValue",
                    kind: "OBJECT",
                    ofType: null,
                  },
                },
              },
            },
            {
              name: "ofType",
              type: {
                name: "__Type",
                kind: "OBJECT",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "__TypeKind",
          kind: "ENUM",
          enumValues: [
            {
              name: "SCALAR",
            },
            {
              name: "OBJECT",
            },
            {
              name: "INTERFACE",
            },
            {
              name: "UNION",
            },
            {
              name: "ENUM",
            },
            {
              name: "INPUT_OBJECT",
            },
            {
              name: "LIST",
            },
            {
              name: "NON_NULL",
            },
          ],
          fields: null,
        },
        {
          name: "__Field",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "name",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "String",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "description",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "args",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: null,
                  kind: "LIST",
                  ofType: {
                    name: null,
                    kind: "NON_NULL",
                    ofType: {
                      name: "__InputValue",
                      kind: "OBJECT",
                    },
                  },
                },
              },
            },
            {
              name: "type",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "__Type",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
            {
              name: "isDeprecated",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "Boolean",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "deprecationReason",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "__InputValue",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "name",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "String",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "description",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "type",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "__Type",
                  kind: "OBJECT",
                  ofType: null,
                },
              },
            },
            {
              name: "defaultValue",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "__EnumValue",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "name",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "String",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "description",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "isDeprecated",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "Boolean",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "deprecationReason",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
          ],
        },
        {
          name: "__Directive",
          kind: "OBJECT",
          enumValues: null,
          fields: [
            {
              name: "name",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: "String",
                  kind: "SCALAR",
                  ofType: null,
                },
              },
            },
            {
              name: "description",
              type: {
                name: "String",
                kind: "SCALAR",
                ofType: null,
              },
            },
            {
              name: "locations",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: null,
                  kind: "LIST",
                  ofType: {
                    name: null,
                    kind: "NON_NULL",
                    ofType: {
                      name: "__DirectiveLocation",
                      kind: "ENUM",
                    },
                  },
                },
              },
            },
            {
              name: "args",
              type: {
                name: null,
                kind: "NON_NULL",
                ofType: {
                  name: null,
                  kind: "LIST",
                  ofType: {
                    name: null,
                    kind: "NON_NULL",
                    ofType: {
                      name: "__InputValue",
                      kind: "OBJECT",
                    },
                  },
                },
              },
            },
          ],
        },
        {
          name: "__DirectiveLocation",
          kind: "ENUM",
          enumValues: [
            {
              name: "QUERY",
            },
            {
              name: "MUTATION",
            },
            {
              name: "SUBSCRIPTION",
            },
            {
              name: "FIELD",
            },
            {
              name: "FRAGMENT_DEFINITION",
            },
            {
              name: "FRAGMENT_SPREAD",
            },
            {
              name: "INLINE_FRAGMENT",
            },
            {
              name: "SCHEMA",
            },
            {
              name: "SCALAR",
            },
            {
              name: "OBJECT",
            },
            {
              name: "FIELD_DEFINITION",
            },
            {
              name: "ARGUMENT_DEFINITION",
            },
            {
              name: "INTERFACE",
            },
            {
              name: "UNION",
            },
            {
              name: "ENUM",
            },
            {
              name: "ENUM_VALUE",
            },
            {
              name: "INPUT_OBJECT",
            },
            {
              name: "INPUT_FIELD_DEFINITION",
            },
          ],
          fields: null,
        },
      ],
    },
  },
};

const StringComponent = {
  render: (dataRenderer: DataRenderer) => {
    return (
      <span>
        <b>{dataRenderer.getData()}</b>
        <br/>
      </span>
    );
  },
};

const componentMappings: DefaultMappings = {
  String: StringComponent,
};

const DroidComponent = {
  render(dataRenderer: DataRenderer) {
    const properties: {[key: string]: any} = {};
    dataRenderer.fields().forEach((field) => properties[field] = dataRenderer.renderField(field));

    return (<div style={{border: "thin black solid"}}>
      <div>🤖</div>
      {Object.keys(properties).sort().map((key) => <span>{key}: {properties[key]}</span>)}
    </div>);
  },
};

const nonLeafCustomComponents: DefaultMappings = {
  Droid: DroidComponent,
};

const DefaultObjectOverride = {
  render(dataRenderer: DataRenderer): JSX.Element {
    const properties: {[key: string]: any} = {};
    dataRenderer.fields().forEach((field) => properties[field] = dataRenderer.renderField(field));

    return (
      <div style={{backgroundColor: "#EEE", border: "thin black solid"}}>
        {Object.keys(properties).sort().map((key) => <span>{key}: {properties[key]}</span>)}
      </div>
    );
  },
};

const DefaultScalarOverride = {
  render(dataRenderer: DataRenderer): JSX.Element {
    return <span style={{color: "red"}}>{dataRenderer.getData()}<br/></span>;
  },
};

const DefaultListOverride = {
  render(dataRenderer: DataRenderer): JSX.Element {
    const propElements: JSX.Element[] = [];

    for (let i = 0; i < dataRenderer.count(); i++) {
      propElements.push(dataRenderer.renderField(i));
    }

    return <ol>{propElements.map((el) => <li>{el}</li>)}</ol>;
  },
};

/*
{
  __typename
  human(id: "1000") {
    name
    height
    mass
    __typename
  }
}
*/
const data: {data: DataItem} = {
  data: {
    __typename: "Query",
    human: {
      name: "Luke Skywalker",
      height: 1.72,
      mass: 77,
      __typename: "Human",
    },
  },
};

/*
{
  __typename
  human(id: "1000") {
    name
    height
    mass
    __typename
    friends {
      name
      __typename
      friends {
      	name
      	__typename
    	}
    }
  }
}
*/
const dataWithNonLeafFields = {
  data: {
    __typename: "Query",
    human: {
      name: "Luke Skywalker",
      height: 1.72,
      mass: 77,
      __typename: "Human",
      friends: [
        {
          name: "Han Solo",
          __typename: "Human",
          friends: [
            {
              name: "Luke Skywalker",
              __typename: "Human",
            },
            {
              name: "Leia Organa",
              __typename: "Human",
            },
            {
              name: "R2-D2",
              __typename: "Droid",
            },
          ],
        },
        {
          name: "Leia Organa",
          __typename: "Human",
          friends: [
            {
              name: "Luke Skywalker",
              __typename: "Human",
            },
            {
              name: "Han Solo",
              __typename: "Human",
            },
            {
              name: "C-3PO",
              __typename: "Droid",
            },
            {
              name: "R2-D2",
              __typename: "Droid",
            },
          ],
        },
        {
          name: "C-3PO",
          __typename: "Droid",
          friends: [
            {
              name: "Luke Skywalker",
              __typename: "Human",
            },
            {
              name: "Han Solo",
              __typename: "Human",
            },
            {
              name: "Leia Organa",
              __typename: "Human",
            },
            {
              name: "R2-D2",
              __typename: "Droid",
            },
          ],
        },
        {
          name: "R2-D2",
          __typename: "Droid",
          friends: [
            {
              name: "Luke Skywalker",
              __typename: "Human",
            },
            {
              name: "Han Solo",
              __typename: "Human",
            },
            {
              name: "Leia Organa",
              __typename: "Human",
            },
          ],
        },
      ],
    },
  },
};

const renderConfiguration: OverrideConfig = {
  human: {
    friends: {
      0: {
        name: {
          renderer: StringComponent,
        },
      },
    },
  },
};

const objectRenderConfiguration: OverrideConfig = {
  human: {
    renderer: {
      render: (dataRenderer: DataRenderer) => {
        const objectData = dataRenderer.getData();
        for (const key in objectData) {
          if (objectData.hasOwnProperty(key)) {
            return (
              <div>
                <span>
                  Custom root object rendering <br/>
                  {key}: {objectData[key]}
                </span>
              </div>
            );
          }
        }
        return <div>No data</div>;
      },
    },
  },
};

const listRenderConfiguration: OverrideConfig = {
  human: {
    friends: {
      0: {
        friends: {
          renderer: DefaultListOverride,
        },
      },
    },
  },
};

export default function ({
    storiesOf,
    action,
    linkTo,
    knobs,
  }: any) {
  storiesOf("Entity", module)
    .add("without specific components", () => (
      <Entity datarenderer={
        new GraphQlDataRenderer(data.data, new GraphQlRenderConfig({defaults: {}}), metadata.data)
      }></Entity>
    ))
    .add("with custom component", () => (
      <Entity datarenderer={
        new GraphQlDataRenderer(data.data, new GraphQlRenderConfig({defaults: componentMappings}), metadata.data)
      }></Entity>
    ))
    .add("with non-leaf fields", () => (
      <Entity datarenderer={
        new GraphQlDataRenderer(dataWithNonLeafFields.data, new GraphQlRenderConfig({defaults: {}}), metadata.data)
      }></Entity>
    ))
    .add("with non-leaf fields with custom components", () => (
      <Entity datarenderer={new GraphQlDataRenderer(
        dataWithNonLeafFields.data,
        new GraphQlRenderConfig({defaults: nonLeafCustomComponents}),
        metadata.data,
      )}></Entity>
    ))
    .add("with custom default rendering of non-leaf fields", () => (
      <Entity datarenderer={new GraphQlDataRenderer(
        dataWithNonLeafFields.data,
        new GraphQlRenderConfig({defaults: {}, defaultObject: DefaultObjectOverride}),
        metadata.data,
      )}></Entity>
    ))
    .add("with custom default scalar rendering", () => (
      <Entity datarenderer={new GraphQlDataRenderer(
        dataWithNonLeafFields.data,
        new GraphQlRenderConfig({defaults: {}, defaultScalar: DefaultScalarOverride}),
        metadata.data,
      )}></Entity>
    ))
    .add("with custom default list rendering", () => (
      <Entity datarenderer={new GraphQlDataRenderer(
        dataWithNonLeafFields.data,
        new GraphQlRenderConfig({defaults: {}, defaultList: DefaultListOverride}),
        metadata.data,
      )}></Entity>
    ))
    .add("with custom rendering of a specific leaf field", () => (
      <Entity datarenderer={new GraphQlDataRenderer(
        dataWithNonLeafFields.data,
        new GraphQlRenderConfig({defaults: {}, overrides: renderConfiguration }),
        metadata.data,
      )}></Entity>
    ))
    .add("with custom rendering of a specific object field", () => (
      <Entity datarenderer={new GraphQlDataRenderer(
        dataWithNonLeafFields.data,
        new GraphQlRenderConfig({defaults: {}, overrides: objectRenderConfiguration }),
        metadata.data,
      )}></Entity>
    ))
    .add("with custom rendering of a specific list field", () => (
      <Entity datarenderer={new GraphQlDataRenderer(
        dataWithNonLeafFields.data,
        new GraphQlRenderConfig({defaults: {}, overrides: listRenderConfiguration }),
        metadata.data,
      )}></Entity>
    ))
    ;
}
