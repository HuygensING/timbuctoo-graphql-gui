import { Mapping, PredicateMap } from "../components/map.types";
import { assertNever } from "../support/assertNever";

interface Uri {
  "@id": string;
}

interface TermType {
  "@id": "rr:IRI" | "rr:BlankNode" | "rr:Literal";
}

interface ConstantMap {
  "rr:predicate": Uri;
  "rr:object": Uri | string;
}

interface ColumnObjMap {
  "rr:column": string;
  "rr:datatype"?: Uri;
  "rr:termType"?: TermType;
}

interface TemplateObjMap {
  "rr:template": string;
  "rr:datatype"?: Uri;
  "rr:termType"?: TermType;
}

interface ConstantObjMap {
  "rr:constant": Uri | string;
  "rr:datatype"?: Uri;
  "rr:termType"?: TermType;
}

interface ObjMap {
  "rr:predicate": Uri;
  "rr:objectMap": ConstantObjMap | TemplateObjMap | ColumnObjMap;
}

type PredObjMap = ConstantMap | ObjMap;

interface CustomField {
  "tim:expression": string;
  "tim:name": string;
}
interface RmlMapping {
  "@id": string;
  "rml:logicalSource": {
    "rml:source": {
      "tim:rawCollectionUri": Uri;
      "tim:customField"?: CustomField | CustomField[];
    };
  };
  "rr:subjectMap": {
    "rr:template": string;
    "rr:class"?: Uri;
  };
  "rr:predicateObjectMap": PredObjMap | PredObjMap[];
}

export interface RmlJsonLd {
  "@context": {
    "rr": "http://www.w3.org/ns/r2rml#";
    "rml": "http://semweb.mmlab.be/ns/rml#";
    "tim": "http://timbuctoo.huygens.knaw.nl/mapping#";
  };
  "@graph": RmlMapping[];
}

function isConstant(pet: PredObjMap): pet is ConstantMap {
  return (pet as ConstantMap)["rr:object"] !== undefined;
}

function isConstantObjMap(pet: ConstantObjMap | TemplateObjMap | ColumnObjMap): pet is ConstantObjMap {
  return (pet as ConstantObjMap)["rr:constant"] !== undefined;
}

function isTemplateObjMap(pet: ConstantObjMap | TemplateObjMap | ColumnObjMap): pet is TemplateObjMap {
  return (pet as TemplateObjMap)["rr:template"] !== undefined;
}

function isColumnObjMap(pet: ConstantObjMap | TemplateObjMap | ColumnObjMap): pet is ColumnObjMap {
  return (pet as ColumnObjMap)["rr:column"] !== undefined;
}

function getUriValue(obj: string | Uri) {
  if (typeof obj === "string") {
    return obj;
  } else {
    return obj["@id"];
  }
}

function getDataType(termType?: TermType, datatype?: Uri) {
  if (!termType) {
    if (datatype) {
      return "http://www.w3.org/2001/XMLSchema#string";
    } else {
      return "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri";
    }
  } else {
    if (termType["@id"] === "rr:BlankNode") {
      return "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri";
    } else if (termType["@id"] === "rr:IRI") {
      return "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri";
    } else if (termType["@id"] === "rr:Literal") {
      return datatype ? datatype["@id"] : "http://www.w3.org/2001/XMLSchema#string";
    }
  }
}

export function rmlToView(rml: RmlJsonLd): { [key: string]: Mapping } {
  const retVal: { [key: string]: Mapping } = {};
  for (const mapping of rml["@graph"]) {
    const customFields: { [key: string]: { name: string; expression: string } } = {};
    const customFieldsSource = mapping["rml:logicalSource"]["rml:source"]["tim:customField"];
    if (customFieldsSource) {
      if (customFieldsSource instanceof Array) {
        for (const expression of customFieldsSource) {
          customFields[expression["tim:name"]] = {
            name: expression["tim:name"],
            expression: expression["tim:expression"],
          };
        }
      } else {
        customFields[customFieldsSource["tim:name"]] = {
          name: customFieldsSource["tim:name"],
          expression: customFieldsSource["tim:expression"],
        };
      }
    }
    let predObjMaps: PredObjMap[];
    const predObjMapsSrc: PredObjMap | PredObjMap[] = mapping["rr:predicateObjectMap"];
    if (predObjMapsSrc instanceof Array) {
      predObjMaps = predObjMapsSrc;
    } else {
      predObjMaps = [predObjMapsSrc];
    }
    const typeMap: { map: string; index: number } | undefined = predObjMaps
      .map(function(v, i) {
        return { value: v, index: i };
      })
      .filter(({ value: map }) => {
        return map["rr:predicate"]["@id"] === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
      })
      .map(({ value: map, index }) => {
        if (isConstant(map)) {
          return { map: getUriValue(map["rr:object"]), index };
        } else {
          const objMap = map["rr:objectMap"];
          if (isConstantObjMap(objMap)) {
            return { map: getUriValue(objMap["rr:constant"]), index };
          } else if (isTemplateObjMap(objMap)) {
            return { map: objMap["rr:template"], index };
          } else if (isColumnObjMap(objMap)) {
            return { map: objMap["rr:column"], index };
          }
        }
      })
      .filter(map => map !== undefined) // we don't support type maps that are templates or columns
      .reduce(function getLast(prev, cur) {
        return cur;
      }, undefined);
    let key = 0;
    const predicateMaps: any = predObjMaps.filter((map, index) => typeMap && index !== typeMap.index).map(map => {
      key--;
      if (isConstant(map)) {
        return {
          key: key + "",
          predicate: getUriValue(map["rr:predicate"]),
          type: "constant",
          dataType: "http://timbuctoo/uri",
          constant: getUriValue(map["rr:object"]),
        };
      } else {
        const objMap = map["rr:objectMap"];
        if (isConstantObjMap(objMap)) {
          return {
            key: key + "",
            predicate: getUriValue(map["rr:predicate"]),
            type: "constant",
            dataType: getDataType(objMap["rr:termType"], objMap["rr:datatype"]),
            constant: getUriValue(objMap["rr:constant"]),
          };
        } else if (isTemplateObjMap(objMap)) {
          return {
            key: key + "",
            predicate: getUriValue(map["rr:predicate"]),
            type: "template",
            dataType: getDataType(objMap["rr:termType"], objMap["rr:datatype"]),
            template: objMap["rr:template"],
          };
        } else if (isColumnObjMap(objMap)) {
          const termtype = objMap["rr:termType"];
          const dataType = objMap["rr:datatype"];

          if (objMap["rr:column"] in customFields) {
            return {
              key: key + "",
              predicate: getUriValue(map["rr:predicate"]),
              type: "expression",
              dataType: termtype && termtype["@id"] === "rr:IRI"
                ? "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri"
                : dataType ? getUriValue(dataType) : "http://www.w3.org/2001/XMLSchema#string",
              expression: customFields[objMap["rr:column"]].expression,
            };
          } else {
            return {
              key: key + "",
              predicate: getUriValue(map["rr:predicate"]),
              type: "property",
              dataType: termtype && termtype["@id"] === "rr:IRI"
                ? "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri"
                : dataType ? getUriValue(dataType) : "http://www.w3.org/2001/XMLSchema#string",
              propertyName: objMap["rr:column"],
            };
          }
        } else {
          throw new Error("");
        }
      }
    });
    const resultMap: Mapping = {
      mainCollection: {
        sourceCollection: mapping["rml:logicalSource"]["rml:source"]["tim:rawCollectionUri"]["@id"],
        subjectTemplate: mapping["rr:subjectMap"]["rr:template"],
      },
      predicateMaps,
      collectionType: typeMap ? typeMap.map : undefined,
    };
    retVal[mapping["@id"]] = resultMap;
  }
  return retVal;
}

export function viewToRml(mappings: { [key: string]: Mapping }): RmlJsonLd {
  return {
    "@context": {
      rr: "http://www.w3.org/ns/r2rml#",
      rml: "http://semweb.mmlab.be/ns/rml#",
      tim: "http://timbuctoo.huygens.knaw.nl/mapping#",
    },
    "@graph": Object.keys(mappings).map(mappingId => {
      const mapping = mappings[mappingId];
      const namedExpressions: { [key: string]: string } = {};
      const customFields: CustomField[] = [];
      let expressionCounter = 0;
      mapping.predicateMaps.forEach(pm => {
        if (pm.type === "expression") {
          expressionCounter++;
          const expressionName = "expression" + expressionCounter;
          namedExpressions[pm.expression] = expressionName;
          customFields.push({
            "tim:expression": pm.expression,
            "tim:name": expressionName,
          });
        }
      });
      const rrClass = mapping.collectionType ? { "@id": mapping.collectionType } : undefined;

      const predObjMaps: PredObjMap[] = mapping.predicateMaps.map(pm => {
        const dataType: Uri | undefined = pm.dataType === "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri"
          ? undefined
          : { "@id": pm.dataType };
        const termType: TermType = {
          "@id": pm.dataType === "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri" ? "rr:IRI" : "rr:Literal",
        };
        switch (pm.type) {
          case "template":
            return {
              "rr:predicate": { "@id": pm.predicate },
              "rr:objectMap": {
                "rr:template": pm.template,
                "rr:datatype": dataType,
                "rr:termType": termType,
              },
            };
          case "expression":
            return {
              "rr:predicate": { "@id": pm.predicate },
              "rr:objectMap": {
                "rr:column": namedExpressions[pm.expression],
                "rr:datatype": dataType,
                "rr:termType": termType,
              },
            };
          case "join":
            return {
              "rr:predicate": { "@id": pm.predicate },
              "rr:objectMap": {
                "rr:column": "NonExistingColumnThatWillBeNullAndThusNotGenerateATriple (joins are not yet supported)",
              },
            };
          case "property":
            return {
              "rr:predicate": { "@id": pm.predicate },
              "rr:objectMap": {
                "rr:column": pm.propertyName,
                "rr:datatype": dataType,
                "rr:termType": termType,
              },
            };
          case "constant":
            return {
              "rr:predicate": { "@id": pm.predicate },
              "rr:objectMap": {
                "rr:constant": pm.constant,
                "rr:datatype": dataType,
                "rr:termType": termType,
              },
            };
          case undefined:
            return {
              "rr:predicate": { "@id": "http://example.org/thisShouldNotHappen" },
              "rr:objectMap": {
                "rr:column": "NonExistingColumnThatWillBeNullAndThusNotGenerateATriple",
              },
            };
          default:
            assertNever(pm);
            return {
              "rr:predicate": { "@id": "http://example.org/thisShouldNotHappen" },
              "rr:objectMap": {
                "rr:column": "NonExistingColumnThatWillBeNullAndThusNotGenerateATriple",
              },
            };
        }
      });
      return {
        "@id": mappingId,
        "rml:logicalSource": {
          "rml:source": {
            "tim:rawCollectionUri": {
              "@id": mapping.mainCollection.sourceCollection || "http://example.com/No-Source-Collection-Specified",
            },
            "tim:customField": customFields,
          },
        },
        "rr:subjectMap": {
          "rr:template":
            mapping.mainCollection.subjectTemplate || "http://example.com/No-Subject-Template-Specified/{tim_id}",
          "rr:class": rrClass,
        },
        "rr:predicateObjectMap": predObjMaps,
      };
    }),
  };
}
