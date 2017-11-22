# Salesforce Set Ids in a List from External Ids

In Salesforce migrations and integrations, sometimes you want to update 
objects if they exist and do nothing or fail if they don't.

Upsert would be nice, but there's no way to tell upsert, "Hey do nothing
or fail if this object doesn't exist."

This Salesforce APEX code will do the trick.

Might be nice to add optional parameter to remove the item from 
the list if there's no existing object in Salesforce.

```java
//
// Takes a list of objects that have their external id set, and sets
// the id field if an object is found with a matching external id.
//
// newObjects:  list of any objects that have their external id set.
// objectName:  the Salesforce API name of the object.
// externalId:  the name of the external id field.
public static void setIdFromExternalId(
  SObject[] newObjects,
  String objectName,
  String externalId) {
  Map<String, SObject> m = new Map<String, SObject>();
  for (SObject o : newObjects) {
    m.put((String) o.get(externalId), null);
  }
  Set<String> externalIds = m.keySet();
  String q = '';
  q += '  select Id, ' + externalId;
  q += '  from ' + objectName;
  q += '  where ' + externalId + ' in :externalIds';
  SObject[] existingObjects = Database.query(q);
  for (SObject o : existingObjects) {
    m.put((String) o.get(externalId), o);
  }
  for (SObject newObject : newObjects) {
    SObject existingObject = m.get((String) newObject.get(externalId));
    if (existingObject != null) {
      newObject.Id = existingObject.Id;
    }
  }
}
```
