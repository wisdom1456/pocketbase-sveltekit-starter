/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oj1dzilhs1honp6")

  collection.name = "subposts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oj1dzilhs1honp6")

  collection.name = "subpost"

  return dao.saveCollection(collection)
})
