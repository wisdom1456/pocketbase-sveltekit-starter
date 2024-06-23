/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oj1dzilhs1honp6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4g026xij",
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
  const collection = dao.findCollectionByNameOrId("oj1dzilhs1honp6")

  // remove
  collection.schema.removeField("4g026xij")

  return dao.saveCollection(collection)
})
