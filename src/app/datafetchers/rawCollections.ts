export async function getRawCollections(userId: string, dataSetId: string) {
  return await fetch("http://0.0.0.0:8080/v5/" + userId + "/" + dataSetId + "/graphql", {
    method: "post",
    body: `
    {
      http___timbuctoo_collectionList {
        items {
          uri
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
