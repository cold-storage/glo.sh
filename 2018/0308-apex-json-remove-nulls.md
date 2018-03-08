```java
/*

  Removes null keys and values out of a JSON string.

  { "Name": "Joe", "Age": null } becomes { "Name": "Joe" }

  I tried doing JSON.deserialize, serialize, deserialize with
  suppressApexObjectNulls, but that didn't remove the nulls. 

  https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_class_System_Json.htm

  Have to turn the json into a map, remove the nulls, then serialize,
  deserialize.

*/
public static SObject removeNulls(String jsonString, Type sobjectType) {
  Map<String, Object> m =
    (Map<String, Object>) JSON.deserializeUntyped(jsonString);
  for (String k : m.keySet()) {
    if (m.get(k) == null) {
      m.remove(k);
    }
  }
  return (SObject) JSON.deserialize(JSON.serialize(m), sobjectType);
}
```
