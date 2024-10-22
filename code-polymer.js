var impact_factors={
"progress in polymer science":26,
"polymer reviews":11.1,
"carbohydrate polymers":10.7,
"advanced industrial and engineering polymer research":9.9,
"journal of membrane science":8.4,
"international journal of biological macromolecules":7.7,
"polymer degradation and stability":6.3,
"carbohydrate polymer technologies and applications":6.2,
"european polymer journal":5.8,
"biomacromolecules":5.5,
"giant":5.4,
"acs macro letters":5.1,
"macromolecules":5.1,
"polymer testing":5,
"gels":5,
"cellulose":4.9,
"polymer composites":4.8,
"acs polymers au":4.7,
"polymers":4.7,
"journal of polymers and the environment":4.7,
"polysaccharides":4.7,
"reactive & functional polymers":4.5,
"acs applied polymer materials":4.4,
"macromolecular bioscience":4.4,
"macromolecular rapid communications":4.2,
"macromolecular materials and engineering":4.2,
"polymer":4.1,
"polymer chemistry":4.1,
"chinese journal of polymer science":4.1,
"synthetic metals":4,
"journal of inorganic and organometallic polymers and materials":3.9,
"journal of polymer science":3.9,
"journal of vinyl & additive technology":3.8,
"journal of biomaterials science-polymer edition":3.6,
"international journal of polymer science":3.4,
"membranes":3.3,
"e-polymers":3.2,
"polymer engineering and science":3.2,
"journal of cellular plastics":3.2,
"polymers for advanced technologies":3.1,
"polymer bulletin":3.1,
"plasma processes and polymers":2.9,
"soft matter":2.9,
"polymer international":2.9,
"macromolecular research":2.8,
"express polymer letters":2.7,
"journal of applied polymer science":2.7,
"journal of polymer research":2.6,
"polymer-plastics technology and materials":2.6,
"macromolecular chemistry and physics":2.5,
"international journal of polymeric materials and polymeric biomaterials":2.5,
"iranian polymer journal":2.4,
"polymer journal":2.3,
"journal of reinforced plastics and composites":2.3,
"fibers and polymers":2.2,
"colloid and polymer science":2.2,
"korea-australia rheology journal":2.2,
"journal of macromolecular science part a-pure and applied chemistry":2.1,
"polymers & polymer composites":2.1,
"journal of bioactive and compatible polymers":2.1,
"plastics rubber and composites":2.1,
"advances in polymer technology":2,
"membranes and membrane technologies":2,
"polymer crystallization":1.9,
"designed monomers and polymers":1.8,
"high performance polymers":1.8,
"green materials":1.8,
"macromolecular theory and simulations":1.8,
"european physical journal e":1.8,
"macromolecular reaction engineering":1.8,
"acta polymerica sinica":1.7,
"international journal of polymer analysis and characterization":1.7,
"journal of polymer engineering":1.7,
"polymer science series c":1.6,
"mechanics of composite materials":1.5,
"journal of elastomers and plastics":1.4,
"cellular polymers":1.3,
"nihon reoroji gakkaishi":1.3,
"elastomers and composites":1.3,
"rubber chemistry and technology":1.2,
"journal of macromolecular science part b-physics":1.2,
"journal of rubber research":1.2,
"progress in rubber plastics and recycling technology":1.1,
"polimery":1.1,
"international polymer processing":1.1,
"polimeros-ciencia e tecnologia":1,
"polymer science series b":1,
"polymer science series a":1,
"journal of photopolymer science and technology":0.4,
"polymer-korea":0.4,
"kgk-kautschuk gummi kunststoffe":0.4,
"journal of fiber science and technology":0.3,
"journal of polymer materials":0.3,
"journal of polymer & composites":0.1
}

var fieldName = "series";
var newValue = "";

var fieldID = Zotero.ItemFields.getID(fieldName);
var s = new Zotero.Search();
s.libraryID = ZoteroPane.getSelectedLibraryID();
var ids = await s.search();
if (!ids.length) {
return "No items found";
}
await Zotero.DB.executeTransaction(async function () {
for (let id of ids) {
let item = await Zotero.Items.getAsync(id);
let mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(item.itemTypeID, fieldName);
var IF=impact_factors[item.getField('publicationTitle').toLowerCase()]
item.setField(mappedFieldID ? mappedFieldID : fieldID, newValue);
if(IF!=undefined){
    item.setField('series',IF)
}

await item.save();
}
});
return ids.length + " item(s) IF updated, and shown in series field!";
