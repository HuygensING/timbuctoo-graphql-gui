export async function getRawCollections(userId: string, dataSetId: string) {
  return await fetch("http://0.0.0.0:8080/v5/" + userId + "/" + dataSetId + "/graphql", {
    method: "post",
    headers: {
      accept: "application/json",
    },
    body: `
    {
      http___timbuctoo_collectionList {
        items {
          uri
          http___rdfs_label { value }
          http___timbuctoo_com_thing_ofCollection_inverse {
            items {
              http___timpropname { value }
            }
          }
        }
      }
    }`,
  }).then(response => response.json());
}
