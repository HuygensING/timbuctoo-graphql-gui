import config from "../config";

export async function getRawCollections(userId: string, dataSetId: string) {
  return await fetch(config.apiUrl + "/v5/" + userId + "/" + dataSetId + "/graphql", {
    method: "post",
    headers: {
      accept: "application/json",
    },
    body: `
    {
      tim_collectionList {
        items {
          uri
          rdfs_label { value }
          tim_ofCollection_inverse {
            items {
              tim_timpropname { value }
            }
          }
        }
      }
    }`,
  }).then(response => response.json());
}
