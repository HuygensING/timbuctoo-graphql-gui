import { action, storiesOf } from "@kadira/storybook";
import * as React from "react";
import Entity from "./entity";
import {Metadata} from "./entity";
import {DataItem} from "./entity";
declare const module: any; // when webpack compiles it provides a module variable



const metadata: {data: Metadata} = {
  "data": {
    "__schema": {
      "types": [
        {
          "name": "Query",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "hero",
              "type": {
                "name": "Character",
                "kind": "INTERFACE",
                "ofType": null
              }
            },
            {
              "name": "reviews",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": "Review",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            {
              "name": "search",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": "SearchResult",
                  "kind": "UNION",
                  "ofType": null
                }
              }
            },
            {
              "name": "character",
              "type": {
                "name": "Character",
                "kind": "INTERFACE",
                "ofType": null
              }
            },
            {
              "name": "droid",
              "type": {
                "name": "Droid",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            {
              "name": "human",
              "type": {
                "name": "Human",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            {
              "name": "starship",
              "type": {
                "name": "Starship",
                "kind": "OBJECT",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "Episode",
          "kind": "ENUM",
          "enumValues": [
            {
              "name": "NEWHOPE"
            },
            {
              "name": "EMPIRE"
            },
            {
              "name": "JEDI"
            }
          ],
          "fields": null
        },
        {
          "name": "Character",
          "kind": "INTERFACE",
          "enumValues": null,
          "fields": [
            {
              "name": "id",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "ID",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "name",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "friends",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": "Character",
                  "kind": "INTERFACE",
                  "ofType": null
                }
              }
            },
            {
              "name": "friendsConnection",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "FriendsConnection",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            {
              "name": "appearsIn",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": null,
                  "kind": "LIST",
                  "ofType": {
                    "name": "Episode",
                    "kind": "ENUM"
                  }
                }
              }
            }
          ]
        },
        {
          "name": "ID",
          "kind": "SCALAR",
          "enumValues": null,
          "fields": null
        },
        {
          "name": "String",
          "kind": "SCALAR",
          "enumValues": null,
          "fields": null
        },
        {
          "name": "Int",
          "kind": "SCALAR",
          "enumValues": null,
          "fields": null
        },
        {
          "name": "FriendsConnection",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "totalCount",
              "type": {
                "name": "Int",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "edges",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": "FriendsEdge",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            {
              "name": "friends",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": "Character",
                  "kind": "INTERFACE",
                  "ofType": null
                }
              }
            },
            {
              "name": "pageInfo",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "PageInfo",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            }
          ]
        },
        {
          "name": "FriendsEdge",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "cursor",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "ID",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "node",
              "type": {
                "name": "Character",
                "kind": "INTERFACE",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "PageInfo",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "startCursor",
              "type": {
                "name": "ID",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "endCursor",
              "type": {
                "name": "ID",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "hasNextPage",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "Boolean",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            }
          ]
        },
        {
          "name": "Boolean",
          "kind": "SCALAR",
          "enumValues": null,
          "fields": null
        },
        {
          "name": "Review",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "stars",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "Int",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "commentary",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "SearchResult",
          "kind": "UNION",
          "enumValues": null,
          "fields": null
        },
        {
          "name": "Human",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "id",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "ID",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "name",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "height",
              "type": {
                "name": "Float",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "mass",
              "type": {
                "name": "Float",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "friends",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": "Character",
                  "kind": "INTERFACE",
                  "ofType": null
                }
              }
            },
            {
              "name": "friendsConnection",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "FriendsConnection",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            {
              "name": "appearsIn",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": null,
                  "kind": "LIST",
                  "ofType": {
                    "name": "Episode",
                    "kind": "ENUM"
                  }
                }
              }
            },
            {
              "name": "starships",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": "Starship",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            }
          ]
        },
        {
          "name": "LengthUnit",
          "kind": "ENUM",
          "enumValues": [
            {
              "name": "METER"
            },
            {
              "name": "FOOT"
            }
          ],
          "fields": null
        },
        {
          "name": "Float",
          "kind": "SCALAR",
          "enumValues": null,
          "fields": null
        },
        {
          "name": "Starship",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "id",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "ID",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "name",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "length",
              "type": {
                "name": "Float",
                "kind": "SCALAR",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "Droid",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "id",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "ID",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "name",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "friends",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": "Character",
                  "kind": "INTERFACE",
                  "ofType": null
                }
              }
            },
            {
              "name": "friendsConnection",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "FriendsConnection",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            {
              "name": "appearsIn",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": null,
                  "kind": "LIST",
                  "ofType": {
                    "name": "Episode",
                    "kind": "ENUM"
                  }
                }
              }
            },
            {
              "name": "primaryFunction",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "Mutation",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "createReview",
              "type": {
                "name": "Review",
                "kind": "OBJECT",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "ReviewInput",
          "kind": "INPUT_OBJECT",
          "enumValues": null,
          "fields": null
        },
        {
          "name": "__Schema",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "types",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": null,
                  "kind": "LIST",
                  "ofType": {
                    "name": null,
                    "kind": "NON_NULL"
                  }
                }
              }
            },
            {
              "name": "queryType",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "__Type",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            {
              "name": "mutationType",
              "type": {
                "name": "__Type",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            {
              "name": "subscriptionType",
              "type": {
                "name": "__Type",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            {
              "name": "directives",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": null,
                  "kind": "LIST",
                  "ofType": {
                    "name": null,
                    "kind": "NON_NULL"
                  }
                }
              }
            }
          ]
        },
        {
          "name": "__Type",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "kind",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "__TypeKind",
                  "kind": "ENUM",
                  "ofType": null
                }
              }
            },
            {
              "name": "name",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "description",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "fields",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": null,
                  "kind": "NON_NULL",
                  "ofType": {
                    "name": "__Field",
                    "kind": "OBJECT"
                  }
                }
              }
            },
            {
              "name": "interfaces",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": null,
                  "kind": "NON_NULL",
                  "ofType": {
                    "name": "__Type",
                    "kind": "OBJECT"
                  }
                }
              }
            },
            {
              "name": "possibleTypes",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": null,
                  "kind": "NON_NULL",
                  "ofType": {
                    "name": "__Type",
                    "kind": "OBJECT"
                  }
                }
              }
            },
            {
              "name": "enumValues",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": null,
                  "kind": "NON_NULL",
                  "ofType": {
                    "name": "__EnumValue",
                    "kind": "OBJECT"
                  }
                }
              }
            },
            {
              "name": "inputFields",
              "type": {
                "name": null,
                "kind": "LIST",
                "ofType": {
                  "name": null,
                  "kind": "NON_NULL",
                  "ofType": {
                    "name": "__InputValue",
                    "kind": "OBJECT"
                  }
                }
              }
            },
            {
              "name": "ofType",
              "type": {
                "name": "__Type",
                "kind": "OBJECT",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "__TypeKind",
          "kind": "ENUM",
          "enumValues": [
            {
              "name": "SCALAR"
            },
            {
              "name": "OBJECT"
            },
            {
              "name": "INTERFACE"
            },
            {
              "name": "UNION"
            },
            {
              "name": "ENUM"
            },
            {
              "name": "INPUT_OBJECT"
            },
            {
              "name": "LIST"
            },
            {
              "name": "NON_NULL"
            }
          ],
          "fields": null
        },
        {
          "name": "__Field",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "name",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "description",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "args",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": null,
                  "kind": "LIST",
                  "ofType": {
                    "name": null,
                    "kind": "NON_NULL"
                  }
                }
              }
            },
            {
              "name": "type",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "__Type",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            {
              "name": "isDeprecated",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "Boolean",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "deprecationReason",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "__InputValue",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "name",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "description",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "type",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "__Type",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            {
              "name": "defaultValue",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "__EnumValue",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "name",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "description",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "isDeprecated",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "Boolean",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "deprecationReason",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            }
          ]
        },
        {
          "name": "__Directive",
          "kind": "OBJECT",
          "enumValues": null,
          "fields": [
            {
              "name": "name",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              }
            },
            {
              "name": "description",
              "type": {
                "name": "String",
                "kind": "SCALAR",
                "ofType": null
              }
            },
            {
              "name": "locations",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": null,
                  "kind": "LIST",
                  "ofType": {
                    "name": null,
                    "kind": "NON_NULL"
                  }
                }
              }
            },
            {
              "name": "args",
              "type": {
                "name": null,
                "kind": "NON_NULL",
                "ofType": {
                  "name": null,
                  "kind": "LIST",
                  "ofType": {
                    "name": null,
                    "kind": "NON_NULL"
                  }
                }
              }
            }
          ]
        },
        {
          "name": "__DirectiveLocation",
          "kind": "ENUM",
          "enumValues": [
            {
              "name": "QUERY"
            },
            {
              "name": "MUTATION"
            },
            {
              "name": "SUBSCRIPTION"
            },
            {
              "name": "FIELD"
            },
            {
              "name": "FRAGMENT_DEFINITION"
            },
            {
              "name": "FRAGMENT_SPREAD"
            },
            {
              "name": "INLINE_FRAGMENT"
            },
            {
              "name": "SCHEMA"
            },
            {
              "name": "SCALAR"
            },
            {
              "name": "OBJECT"
            },
            {
              "name": "FIELD_DEFINITION"
            },
            {
              "name": "ARGUMENT_DEFINITION"
            },
            {
              "name": "INTERFACE"
            },
            {
              "name": "UNION"
            },
            {
              "name": "ENUM"
            },
            {
              "name": "ENUM_VALUE"
            },
            {
              "name": "INPUT_OBJECT"
            },
            {
              "name": "INPUT_FIELD_DEFINITION"
            }
          ],
          "fields": null
        }
      ]
    }
  }
};

const componentMappings = {
  "String": StringElement
};

const nonLeafCustomComponents = {
  "Droid": DroidElement
}

const data = {
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 1.72,
      "mass": 77,
      "__typename": "Human"
    }
  }
};

const dataWithNonLeafFields = {
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 1.72,
      "mass": 77,
      "friends": [
        {
          "name": "Han Solo",
          "__typename": "Human",
          "friends": [
            {
              "name": "Luke Skywalker",
              "__typename": "Human"
            },
            {
              "name": "Leia Organa",
              "__typename": "Human"
            },
            {
              "name": "R2-D2",
              "__typename": "Droid"
            }
          ]
        },
        {
          "name": "Leia Organa",
          "__typename": "Human",
          "friends": [
            {
              "name": "Luke Skywalker",
              "__typename": "Human"
            },
            {
              "name": "Han Solo",
              "__typename": "Human"
            },
            {
              "name": "C-3PO",
              "__typename": "Droid"
            },
            {
              "name": "R2-D2",
              "__typename": "Droid"
            }
          ]
        },
        {
          "name": "C-3PO",
          "__typename": "Droid",
          "friends": [
            {
              "name": "Luke Skywalker",
              "__typename": "Human"
            },
            {
              "name": "Han Solo",
              "__typename": "Human"
            },
            {
              "name": "Leia Organa",
              "__typename": "Human"
            },
            {
              "name": "R2-D2",
              "__typename": "Droid"
            }
          ]
        },
        {
          "name": "R2-D2",
          "__typename": "Droid",
          "friends": [
            {
              "name": "Luke Skywalker",
              "__typename": "Human"
            },
            {
              "name": "Han Solo",
              "__typename": "Human"
            },
            {
              "name": "Leia Organa",
              "__typename": "Human"
            }
          ]
        }
      ],
      "__typename": "Human"
    }
  }
};


storiesOf("Button", module)
  .add("with text", () => (
    <button>Hello Button</button>
  ))
  .add("with some emoji", () => (
    <button onClick={action("clicked")}>😀 😎 👍 💯</button>
  ))
  .add("entity without specific components", () => (
    <Entity data={data.data} metadata={metadata.data} componentMappings={{}}></Entity>
  ))
  .add("entity with custom component", () => (
    <Entity data={data.data} metadata={metadata.data} componentMappings={componentMappings}></Entity>
  ))
  .add("entity with non-leaf fields", () => (
    <Entity data={dataWithNonLeafFields.data} metadata={metadata.data} componentMappings={componentMappings}></Entity>
  ))
  .add("entity with non-leaf fields with custom components", () => (
    <Entity data={dataWithNonLeafFields.data} metadata={metadata.data} componentMappings={nonLeafCustomComponents}>
    </Entity>
  ));

function StringElement(props: {propName: string, value: any}) {
  return (
    <span>
      {props.propName}: <b>{props.value}</b>
      <br/>
    </span>
  );
}

function DroidElement(props: {propName: string, value: any}) {
  const properties: JSX.Element[] = [];
  
  for(let key in props.value) {
    if(props.value[key] != null) {
      const value = props.value[key];      
      if(typeof value != "object" && key !== "__typename") {
        properties.push(
          <span>
            {key}: {props.value[key]}
          </span>
        );
      }
    }
  }
  return (
    <div style={{paddingLeft: "20px"}}>
      <u>{properties}</u>
    </div>
  );
}
