export type PredicateMapTypes = "template" | "expression" | "join" | "property" | "constant";

export interface MappingProps {
  currentTab?: string;
  mappings: {
    [key: string]: Mapping;
  };
  rawDataCollections: RawDataCollections;
}

export interface Mapping {
  type?: string;
  mainCollection: {
    subjectTemplate?: string;
    sourceCollection?: string;
  };
  predicateMaps: PredicateMap[];
}

export interface RawDataCollections {
  [key: string]: RawDataCollection;
}

export interface RawDataCollection {
  label: string;
  properties: Array<{
    name: string;
    inUse: boolean;
  }>;
}

export type PredicateMap =
  | {
      key: string | null;
      predicate: string;
      type: "template";
      dataType: string;
      template: string;
    }
  | {
      key: string | null;
      predicate: string;
      type: "expression";
      dataType: string;
      expression: string;
    }
  | {
      key: string | null;
      predicate: string;
      dataType: string;
      type: "join";
    }
  | {
      key: string | null;
      predicate: string;
      type: "constant";
      dataType: string;
      constant: string;
    }
  | {
      key: string | null;
      predicate: string;
      type: "property";
      dataType: string;
      propertyName: string;
    };

export interface PlaceHolderPredicateMap {
  // this one is for the placeholder default type properties
  key: null;
  predicate?: string;
  type: undefined;
  dataType: string;
}
