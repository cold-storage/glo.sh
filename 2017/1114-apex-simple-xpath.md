# Apex Poor Man's Xpath

Salesforce doesn't have great XML handling. It would be nice if there 
were full XPath support.

However, if you have a simple XML structure that's more JSON-ish
like the XML below, the code below should work.

**Example Usage**

```java
public Contact contactFromXml(String xml) {
  Xpath xp = new Xpath(xml);
  Contact c = new Contact();
  c.FirstName = xp.getString('ConsName.FirstName');
  c.LastName = xp.getString('ConsName.LastName');
  c.Convio_ID__c = xp.getString('ConsId');
  String[] streets = new String[] {
    xp.getString('HomeAddress.Street1'),
    xp.getString('HomeAddress.Street2'),
    xp.getString('HomeAddress.Street3')
  };
  c.MailingStreet = join(streets, '\n');
  c.MailingCity = xp.getString('HomeAddress.City');
  c.MailingState = xp.getString('HomeAddress.State');
  c.MailingPostalCode = xp.getString('HomeAddress.Zip');
  return c;
}
```

**Sample XML**

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
