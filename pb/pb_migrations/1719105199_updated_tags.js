/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("trz6q3nzg50ptk4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o84otj7z",
    "name": "userid",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("trz6q3nzg50ptk4")

  // remove
  collection.schema.removeField("o84otj7z")

  return dao.saveCollection(collection)
})
