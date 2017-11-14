# Poor Man's Xpath

Salesforce doesn't have great XML handling. It would be nice if there 
were full XPath support.

However, if you have a simple XML structure that's more JSON-ish
like the XML below, the code below should work.

```java
Xpath x = new Xpath(myxml);
System.debug(x.getString('ConsName.LastName'));
```

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

```java
public class Xpath {
  Dom.XmlNode root;
  public Xpath(String xml) {
    Dom.Document doc = new Dom.Document();
    doc.load(xml);
    this.root = doc.getRootElement();
  }
  public Object getObject(String path) {
    return getObject(path, this.root);
  }
  public Object getObject(String path, Dom.XmlNode o) {
    String[] pa = path.split('\\.');
    o = o.getChildElement(pa[0], null);
    if (o == null) {
      return null;
    }
    if (((Dom.XmlNode)o).getText().trim() == '') {
      pa.remove(0);
      return getObject(String.join(pa, '.'), o);
    } else {
      return ((Dom.XmlNode)o).getText().trim;
    }
  }
  public String getString(String path) {
    return (String) getObject(path);
  }
  public Integer getInteger(String path) {
    return Integer.valueOf(getObject(path));
  }
}
```
