import { Mapping, PredicateMap } from "../components/map.types";

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
  "rr:predicateObjectMap": PredObjMap[];
}

export interface RmlJsonLd {
  "@context": {
    "rr": "http://www.w3.org/ns/r2rml#";
    "rml": "http://semweb.mmlab.be/ns/rml#";
    "tim": "http://timbuctoo.huygens.knaw.nl/mapping#";
    "dataSet": string;
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
      return "http://timbuctoo.com/uri";
    }
  } else {
    if (termType["@id"] === "rr:BlankNode") {
      return "http://timbuctoo.com/uri";
    } else if (termType["@id"] === "rr:IRI") {
      return "http://timbuctoo.com/uri";
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
    const typeMap: { map: string; index: number } | undefined = mapping["rr:predicateObjectMap"]
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
    const predicateMaps: any = mapping["rr:predicateObjectMap"]
      .filter((map, index) => typeMap && index !== typeMap.index)
      .map(map => {
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
                  ? "http://timbuctoo.com/uri"
                  : dataType ? getUriValue(dataType) : "http://www.w3.org/2001/XMLSchema#string",
                expression: customFields[objMap["rr:column"]].expression,
              };
            } else {
              return {
                key: key + "",
                predicate: getUriValue(map["rr:predicate"]),
                type: "property",
                dataType: termtype && termtype["@id"] === "rr:IRI"
                  ? "http://timbuctoo.com/uri"
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
