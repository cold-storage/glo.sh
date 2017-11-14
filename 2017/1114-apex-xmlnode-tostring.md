# Apex XMLNode to String

Salesforce has a method to turn a `Dom.Document` into a `String`, but not 
an `XMLNode`.

If your XML is just elements with more elements or elements with text,
this will do the job.

**Sample Output**

The code below will output this string if you hand it an `XMLNode`.

```xml
<Record> 
  <ConsId>1164943</ConsId> 
  <ConsName> 
    <FirstName>Bertha</FirstName> 
    <LastName>Jacobs</LastName> 
  </ConsName> 
  <HomeAddress> 
    <Street1>226 Randolph Street</Street1> 
    <City>Syracuse</City> 
    <State>NY</State> 
    <Zip>13205-2360</Zip> 
  </HomeAddress> 
</Record>
```

**The Code**

```java
// We assume all nodes Either have text OR have more nodes.
// Nothing else.
public static String toXmlString(DOM.XMLNode node) {
  String result = '';
  if (node.getNodeType() == DOM.XMLNodeType.ELEMENT) {
    result += '\n<' + node.getName() + '>';
    if (node.getText().trim() != '') {
      result += node.getText().trim();
      return result + '</' + node.getName() + '>';
    } else {
      for (Dom.XMLNode child : node.getChildElements()) {
        result += toXmlString(child);
      }
      // Don't output empty elements.
      if (result == '\n<' + node.getName() + '>') {
        result = '';
      } else {
        result += '\n</' + node.getName() + '>';
      }
      return result;
    }
  }
  throw new MyException('Should never reach here.');
}
```
