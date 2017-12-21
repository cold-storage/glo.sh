# Apex XMLNode to String

Salesforce has a method to turn a `Dom.Document` into a `String`, but not 
an `XMLNode`.

If your XML is super crazy this will do the job.

**Sample Output**

The code below will output this string if you hand it an `XMLNode`.

```xml
<Record someAttr="foo"> 
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
  public static String getAttrString(Dom.XMLNode node) {
    String s = '';
    for (Integer i = 0, l = node.getAttributeCount(); i < l; i++) {
      s += ' ' + node.getAttributeKeyAt(i) + '="'
           + node.getAttributeValue(node.getAttributeKeyAt(i), null)
           + '"';
    }
    return s;
  }
  /*
    Doesn't handle fancy stuff like CDATA and mixed content.
  */
  public static String toXmlString(DOM.XMLNode node) {
    String result = '';
    if (node.getNodeType() == DOM.XMLNodeType.ELEMENT) {
      result += '\n<' + node.getName();
      String attrStr = getAttrString(node);
      result += attrStr;
      if (node.getChildElements().size() > 0 || node.getText().trim() != '') {
        result += '>';
      }
      if (node.getText().trim() != '') {
        result += node.getText().trim().replace('&', '&amp;').replace('<', '&lt;');
        return result + '</' + node.getName() + '>';
      } else {
        for (Dom.XMLNode child : node.getChildElements()) {
          result += toXmlString(child);
        }
        if (node.getChildElements().size() > 0 || node.getText().trim() != '') {
            result += '\n</' + node.getName() + '>';
        } else {
          result += ' />';
        }
        return result;
      }
    }
    throw new MyException('Should never reach here.');
  }
```
