import { Mapping, PredicateMap } from "../components/map.types";
import { RmlJsonLd, rmlToView, viewToRml } from "./rmlToViewState";

const userId = "DUMMY";
const dataSetId = "dierikx_ontwikkelingssamenwerking";
export const dierikx: RmlJsonLd = {
  "@context": {
    rr: "http://www.w3.org/ns/r2rml#",
    rml: "http://semweb.mmlab.be/ns/rml#",
    tim: "http://timbuctoo.huygens.knaw.nl/mapping#",
  },
  "@graph": [
    {
      "@id": "http://example.org/foo",
      "rml:logicalSource": {
        "rml:source": {
          "tim:customField": {
            "tim:expression":
              "(v['PerVoornamen'] == null ? (v['PerVoorletters'] == null ? '' : v['PerVoorletters']) : (v['PerVoorletters'] == null ? v['PerVoornamen'] : v['PerVoorletters'] + ' (' + v['PerVoornamen'] + ')' ) ) + (v['PerTussenvoegsel'] == null ? '' : ' ' + v['PerTussenvoegsel'] ) + (v['PerAchternaam'] == null ? '' : ' ' + v['PerAchternaam'] )",
            "tim:name": "combinedNameValue",
          },
          "tim:rawCollectionUri": {
            "@id": "http://timbuctoo/collections/${dataSetId}/file/1",
          },
        },
      },
      "rr:predicateObjectMap": [
        {
          "rr:object": {
            "@id": "dataSet:Persons",
          },
          "rr:predicate": {
            "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          },
        },
        {
          "rr:objectMap": {
            "rr:column": "combinedNameValue",
            "rr:datatype": {
              "@id": "http://timbuctoo.huygens.knaw.nl/datatypes/person-name",
            },
          },
          "rr:predicate": {
            "@id": "http://timbuctoo.huygens.knaw.nl/names",
          },
        },
        {
          "rr:objectMap": {
            "rr:column": "GeboortedatumEDTF",
            "rr:datatype": {
              "@id": "http://timbuctoo.huygens.knaw.nl/types/datable",
            },
          },
          "rr:predicate": {
            "@id": "http://timbuctoo.huygens.knaw.nl/birthDate",
          },
        },
        {
          "rr:objectMap": {
            "rr:template": "http://timbuctoo.huygens.knaw.nl/mapping/${userId}/Places/{PerGeboorteplaats}",
            "rr:termType": {
              "@id": "rr:IRI",
            },
          },
          "rr:predicate": {
            "@id": "http://timbuctoo.huygens.knaw.nl/birthPlace",
          },
        },
        {
          "rr:objectMap": {
            "rr:column": "SterfdatumEDTF",
            "rr:datatype": {
              "@id": "http://timbuctoo.huygens.knaw.nl/types/datable",
            },
          },
          "rr:predicate": {
            "@id": "http://timbuctoo.huygens.knaw.nl/deathDate",
          },
        },
        {
          "rr:objectMap": {
            "rr:template": "http://timbuctoo.huygens.knaw.nl/mapping/${userId}/Places/{PerSterfplaats}",
            "rr:termType": {
              "@id": "rr:IRI",
            },
          },
          "rr:predicate": {
            "@id": "http://timbuctoo.huygens.knaw.nl/deathPlace",
          },
        },
      ],
      "rr:subjectMap": {
        "rr:template": "http://timbuctoo.huygens.knaw.nl/mapping/${userId}/Persons/{PerIdOntw}",
      },
    },
    {
      "@id": "http://example.org/foo2",
      "rml:logicalSource": {
        "rml:source": {
          "tim:rawCollectionUri": {
            "@id": "http://timbuctoo/collections/${dataSetId}/file/1",
          },
        },
      },
      "rr:predicateObjectMap": [
        {
          "rr:object": {
            "@id": "dataSet:Places",
          },
          "rr:predicate": {
            "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          },
        },
        {
          "rr:objectMap": {
            "rr:column": "PerGeboorteplaats",
          },
          "rr:predicate": {
            "@id": "http://timbuctoo.huygens.knaw.nl/placename",
          },
        },
      ],
      "rr:subjectMap": {
        "rr:template": "http://timbuctoo.huygens.knaw.nl/mapping/${userId}/Places/{PerGeboorteplaats}",
      },
    },
    {
      "@id": "http://example.org/foo3",
      "rml:logicalSource": {
        "rml:source": {
          "tim:rawCollectionUri": {
            "@id": "http://timbuctoo/collections/${dataSetId}/file/1",
          },
        },
      },
      "rr:predicateObjectMap": [
        {
          "rr:object": {
            "@id": "dataSet:Places",
          },
          "rr:predicate": {
            "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          },
        },
        {
          "rr:objectMap": {
            "rr:column": "PerSterfplaats",
          },
          "rr:predicate": {
            "@id": "http://timbuctoo.huygens.knaw.nl/placename",
          },
        },
      ],
      "rr:subjectMap": {
        "rr:template": "http://timbuctoo.huygens.knaw.nl/mapping/${userId}/Places/{PerSterfplaats}",
      },
    },
  ],
};

export default function(describe: any, it: any) {
  describe("rmlToViewState", function() {
    it("dierikx", function() {
      console.groupCollapsed("first");
      console.log(JSON.stringify(dierikx, undefined, 2));
      console.groupEnd();
      console.groupCollapsed("second");
      console.log(JSON.stringify(viewToRml(rmlToView(dierikx)), undefined, 2));
      console.groupEnd();
    });
  });
}
