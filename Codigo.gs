/*
       20180727(08:37)-DEBERÍA ESTAR YA CORREGIDO EL PROBLEMA, ERRORENCONTRADO >= 0 EN VEZ DE != FALSE y checkError devuelve -1 si no hay fallos.
       -No muestra los errores WTF?
       -Ahora en el mensaje de error se muestra la primera cita que falla.
       -CORRECTA Y NO SE TOCA!!
       
       
*/ 


/* ----------------------------------------------------------------------------

                              Funciones de Pruebas

   ---------------------------------------------------------------------------- */




/* ----------------------------------------------------------------------------

                              Programa Principal

   ---------------------------------------------------------------------------- */


/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */
 
/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {

  DocumentApp.getUi().createMenu('Información').addItem('Show information', 'showInfo').addToUi();
  //DocumentApp.getUi().createMenu('Información').addItem('Show information', 'showInfo2').addToUi();
  DocumentApp.getUi().createAddonMenu()
      .addItem('Comenzar', 'showSidebar')
      .addToUi();
      
  
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Gestor Bibliográfico');
      
  //var info = HtmlService.createHtmlOutput('Info').setTitle('Información');
  DocumentApp.getUi().showSidebar(ui);
  //DocumentApp.getUi().showModalDialog(info, 'AAAAA');
}

/*function showMiModal(){
  DocumentApp.getUi().createMenu('Información').addItem('Show information', 'showInfo').addToUi();
}*/

/*function showInfo(){
  var html = HtmlService.createHtmlOutputFromFile('Info').setWidth(400).setHeight(300);
  DocumentApp.getUi().showModalDialog(html, 'Information');
}*/


function showInfo() {
  //var doc = 1JdUbmEqmPZi1ZP5EpxoXlddx0Wxl5o8UoaxtL0XB-U9YAXECRiFkCzYb
  //var doc = DocumentApp.getActiveDocument();
  //var name = doc.getName();


  var html = HtmlService.createHtmlOutputFromFile('Info')
  .setWidth(600)
  .setHeight(425)
  //.setSandboxMode(HtmlService.SandboxMode.IFRAME);
  //html.append(name);
  
  DocumentApp.getUi().showModalDialog(html, 'Añadir entrada');
  
  //var template = HtmlService.createTemplateFromFile('Info').evaluate();
  //return template;
  //return template.evaluate().setTitle("Información")
}



/*function showInfo(html){
  DocumentApp.getUi().showModalDialog(html, 'AAAAA');
  return ;
}*/


/**
* @NotOnlyCurrentDoc
*/

function showInfo2(aux){

  var html = HtmlService.createHtmlOutputFromFile('Info')
        .setWidth(600)
        .setHeight(425)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  html.variable = aux;
  html.append(aux);
  DocumentApp.getUi().showModalDialog(html, 'Información');
  
  window.onload() = function(){
        var variable = "HEYYYYY";
        var documento = '1bdul7r4W5O01saLW15UlsNzclJWjhxqV605ssvl8vgQ';
        google.script.run.pruebaEscritura(documento, variable);
      }
 /* var uiInstance = UiApp.createApplication()
  .setWidth(250)
  .setHeight(300);
  uiInstance.add(uiInstance.createLabel('Selecciona un documento para mostrar su información'));
  //uiInstance.createTextBox();
  //uiInstance.add(textbox);
  /*uiInstance.add(uiInstance.createButton('Click me too!',
      uiInstance.createClientHandler().forEventSource().setText('Clicked!')));*/
      
  /*var button = uiInstance.createButton("a button");
  var panel = uiInstance.createAbsolutePanel();
  // add a widget at position (10, 20)
  panel.add(button, 10, 20);
  uiInstance.add(panel);
  DocumentApp.getUi().showModelessDialog(uiInstance, 'Información');*/
  
  //return HtmlService.createHtmlOutputFromFile('Info');
}

/*******************************************************************************************/

function compruebaId(idDoc, idToCheck){
  var exito = true;
  
  var docBib = DriveApp.getFileById(idDoc);
  
  var objetoBib = new BibTex();
  objetoBib.content = docBib.getBlob().getDataAsString();
  objetoBib.parse();
  if(idToCheck == null || idToCheck === undefined){
    exito = false;
  }
  else{
    for(i=0; i<objetoBib.data.length; i++){
       if(objetoBib.data[i].cite == idToCheck){
         exito = false;;
       }
     }
  }
  
  return exito;
}


function pruebaEscritura(idDoc, campos, option){
 
   var docBib = DriveApp.getFileById(idDoc);
   //docBib.setContent(content)
   
   var existe = false;
   var exito = true;
   
   /*var rangeElem = body.findText(campos[0]);//Comprobamos si existe ya el ID, a lo mejor se puede hacer al pasar el doc a BibTex();
   if(rangeElem == null){
   }else{
     existe = true;
   }*/
   //var texto = body.getText();
   /************************************************************/
   //Crearemos un objeto BibTex con el documento a modificar
   
   //var existe = false;
   var error = false;
   var numberError = 99; //Error para ID repetido
   
   var objetivo = new BibTex();
   var objetivoComp = new BibTex();
   objetivo.content = docBib.getBlob().getDataAsString();
   objetivoComp.content = docBib.getBlob().getDataAsString();
   
   objetivoComp.parse();
   for(i=0; i<objetivoComp.data.length; i++){
     if(objetivoComp.data[i].cite == campos[0]){
       existe = true;
     }
   }
   
   if(existe == true){
     //exito = false;
     return numberError;
   }
   else{
     var fallo = false;
     switch(option){
       case "book":
         //comprobar atributos obligatorios, para los opcionales habrá que hacer que sólo se comprueben los campos[0]-campos[4]
         for(i=0; i<5; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n   author={' + campos[1] + '},\n   title={'
           + campos[2] + '},\n   publisher={' + campos[3] + '},\n   year={' + campos[4] + '}';
           //Campos opcionales
           if(campos[5]){
             datFin = datFin + ',\n   volume={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n   series={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n   address={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n   edition={' + campos[8] + '}';
           }
           if(campos[9]){
             datFin = datFin + ',\n   month={' + campos[9] + '}';
           }
           if(campos[10]){
             datFin = datFin + ',\n   note={' + campos[10] + '}';
           }
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
       break;
       
       case "article":
         //comprobar atributos obligatorios
         for(i=0; i<5; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;

           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n   author={' + campos[1] + '},\n   title={'
           + campos[2] + '},\n   journal={' + campos[3] + '},\n   year={' + campos[4] + '}';
           //comprobar campos opcionales
           if(campos[5]){
             datFin = datFin + ',\n   volume={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n   number={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n   pages={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n   month={' + campos[8] + '}';
           }
           if(campos[9]){
             datFin = datFin + ',\n   note={' + campos[9] + '}';
           }
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
       break;
       
       case "techreport":
         //comprobar atributos obligatorios
         for(i=0; i<5; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n   author={' + campos[1] + '},\n   title={'
           + campos[2] + '},\n   institution={' + campos[3] + '},\n   year={' + campos[4] + '}';
           //Campos opcionales
           if(campos[5]){
             datFin = datFin + ',\n   type={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n   address={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n   month={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n   note={' + campos[8] + '}';
           }
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
       break;
       
       case "misc":
         //comprobar que hay un ID
         
         if(campos[0] == "" || campos[0] === undefined){
           fallo = true;
         }
         
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0];
           if(campos[1]){
             datFin = datFin + ',\n   author={' + campos[1] + '}';  
           }
           if(campos[2]){
             datFin = datFin + ',\n   title={' + campos[2] + '}';
           }
           if(campos[3]){
             datFin = datFin + ',\n   howpublished={' + campos[3] + '}';
           }
           if(campos[4]){
             datFin = datFin + ',\n   month={' + campos[4] + '}';
           }
           if(campos[5]){
             datFin = datFin + ',\n   year={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n   note={' + campos[6] + '}';
           }
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
       break;
       
       case "booklet":
          for(i=0; i<2; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n  title={' + campos[1] + '}';
           //Campos opcionales
           if(campos[2]){
             datFin = datFin + ',\n  author={' + campos[2] + '}';
           }
           if(campos[3]){
             datFin = datFin + ',\n  howpublished={' + campos[3] + '}';
           }
           if(campos[4]){
             datFin = datFin + ',\n  address={' + campos[4] + '}';
           }
           if(campos[5]){
             datFin = datFin + ',\n  month={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n  year={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n  note={' + campos[7] + '}';
           }
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
         
       break;
       
       case "conference":
          for(i=0; i<5; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n  author={' + campos[1] + '},\n  title={' + campos[2] 
           + '},\n  booktitle={' + campos[3] + '},\n  year={' + campos[4] + '}';
           //Campos opcionales
           if(campos[5]){
             datFin = datFin + ',\n  editor={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n  volume={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n  series={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n  pages={' + campos[8] + '}';
           }
           if(campos[9]){
             datFin = datFin + ',\n  address={' + campos[9] + '}';
           }
           if(campos[10]){
             datFin = datFin + ',\n  month={' + campos[10] + '}';
           }
           if(campos[11]){
             datFin = datFin + ',\n  organization={' + campos[11] + '}';
           }
           if(campos[12]){
             datFin = datFin + ',\n  publisher={' + campos[12] + '}';
           }
           if(campos[13]){
             datFin = datFin + ',\n  note={' + campos[13] + '}';
           }
           
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
         
       break;
       
       case "inbook":
          for(i=0; i<6; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n  author={' + campos[1] + '},\n  title={' + campos[2] 
           + '},\n  chapter={' + campos[3] + '},\n  publisher={' + campos[4] + '},\n  year={' + campos[5] +'}';
           //Campos opcionales
           if(campos[6]){
             datFin = datFin + ',\n  volume={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n  series={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n  type={' + campos[8] + '}';
           }
           if(campos[9]){
             datFin = datFin + ',\n  address={' + campos[9] + '}';
           }
           if(campos[10]){
             datFin = datFin + ',\n  edition={' + campos[10] + '}';
           }
           if(campos[11]){
             datFin = datFin + ',\n  month={' + campos[11] + '}';
           }
           if(campos[12]){
             datFin = datFin + ',\n  note={' + campos[12] + '}';
           }
           
           
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
         
       break;
       
       case "incollection":
          for(i=0; i<6; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n  author={' + campos[1] + '},\n  title={' + campos[2] 
           + '},\n  booktitle={' + campos[3] + '},\n  publisher={' + campos[4] + '},\n  year={' + campos[5] +'}';
           //Campos opcionales
           if(campos[6]){
             datFin = datFin + ',\n  editor={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n  volume={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n  series={' + campos[8] + '}';
           }
           if(campos[9]){
             datFin = datFin + ',\n  type={' + campos[9] + '}';
           }
           if(campos[10]){
             datFin = datFin + ',\n  chapter={' + campos[10] + '}';
           }
           if(campos[11]){
             datFin = datFin + ',\n  pages={' + campos[11] + '}';
           }
           if(campos[12]){
             datFin = datFin + ',\n  address={' + campos[12] + '}';
           }
           if(campos[13]){
             datFin = datFin + ',\n  edition={' + campos[13] + '}';
           }
           if(campos[14]){
             datFin = datFin + ',\n  month={' + campos[14] + '}';
           }
           if(campos[15]){
             datFin = datFin + ',\n  note={' + campos[15] + '}';
           }
           
           
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
         
       break;
       //inproceedings
       case "inproceedings":
          for(i=0; i<5; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n  author={' + campos[1] + '},\n  title={' + campos[2] 
           + '},\n  booktitle={' + campos[3] + '},\n  year={' + campos[4] + '}';
           //Campos opcionales
           if(campos[5]){
             datFin = datFin + ',\n  editor={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n  volume={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n  series={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n  pages={' + campos[8] + '}';
           }
           if(campos[9]){
             datFin = datFin + ',\n  address={' + campos[9] + '}';
           }
           if(campos[10]){
             datFin = datFin + ',\n  month={' + campos[10] + '}';
           }
           if(campos[11]){
             datFin = datFin + ',\n  organization={' + campos[11] + '}';
           }
           if(campos[12]){
             datFin = datFin + ',\n  publisher={' + campos[12] + '}';
           }
           if(campos[13]){
             datFin = datFin + ',\n  note={' + campos[13] + '}';
           }
           
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
         
       break;
       
       case "mastersthesis":
         //comprobar atributos obligatorios
         for(i=0; i<5; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n   author={' + campos[1] + '},\n   title={'
           + campos[2] + '},\n   school={' + campos[3] + '},\n   year={' + campos[4] + '}';
           //Campos opcionales
           if(campos[5]){
             datFin = datFin + ',\n   type={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n   address={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n   month={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n   note={' + campos[8] + '}';
           }
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
       break;
       
       case "phdthesis":
         //comprobar atributos obligatorios
         for(i=0; i<5; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n   author={' + campos[1] + '},\n   title={'
           + campos[2] + '},\n   school={' + campos[3] + '},\n   year={' + campos[4] + '}';
           //Campos opcionales
           if(campos[5]){
             datFin = datFin + ',\n   type={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n   address={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n   month={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n   note={' + campos[8] + '}';
           }
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
       break;
       
       case "proceedings":
          for(i=0; i<3; i++){
           if(campos[i] == "" || campos[i] === undefined){
             fallo = true;
           }
         }
         
         if(fallo == true){
           exito = false;
         }
         else{
           var datFin = objetivo.content + '\n\n' + '@' + option + '{' + campos[0] + ',\n  title={' + campos[1] + '},\n  year={' + campos[2] 
           + '}';
           //Campos opcionales
           if(campos[3]){
             datFin = datFin + ',\n  editor={' + campos[3] + '}';
           }
           if(campos[4]){
             datFin = datFin + ',\n  volume={' + campos[4] + '}';
           }
           if(campos[5]){
             datFin = datFin + ',\n  series={' + campos[5] + '}';
           }
           if(campos[6]){
             datFin = datFin + ',\n  address={' + campos[6] + '}';
           }
           if(campos[7]){
             datFin = datFin + ',\n  month={' + campos[7] + '}';
           }
           if(campos[8]){
             datFin = datFin + ',\n  organization={' + campos[8] + '}';
           }
           if(campos[9]){
             datFin = datFin + ',\n  publisher={' + campos[9] + '}';
           }
           if(campos[10]){
             datFin = datFin + ',\n  note={' + campos[10] + '}';
           }
           
           
           datFin = datFin + '\n}';
           
           docBib.setContent(datFin);
         }
         
         
       break;
     }
   }
 
   
   return exito;
}

function nombreDocumento(){
  var actual = DocumentApp.getActiveDocument();
  var nombre = actual.getName();
  
  
  return nombre;
}

/*******************************************************************************************/

//FUNCION PRINCIPAL QUE QUE ES LLAMA TRAS PULSAR EL BOTON DE "combinar documentos"

function getBibtexAndDoc(/*e,e2,*/docsBib, estilo, filtros, option){ //docsBib es el array de ids de documentos (funciona)
  //init the return vars
  /*var docsBib = [];
  docsBib[0] = "12NOXY0tANtmngONEVWJexAgO-hpfmsYn";
  estilo = 'unsrt';
  var filtros = [];
  var option = '2';*/
  
  
  //e = "1nvTRkIZ0dbHamwv_H9ovn_uPdveB6CRo"; //utilizado para el proceso de testing
  var bibtex_dict = []; //FIJA
  //var e = docsBib[0]; 
  //var e2 = docsBib[1];
  //1klWk8P4l275FA2tUQcd9805rIPJKc4Tv
  //1UhHmfUbnoE5Ls8ecNDN1z1gZj5SDBsx_
  /*var estilo = 'unsrt';
  var filtros = [];
  filtros[2] = "David"
  var option = '2'
  var documentos = [];
  documentos[1] = DriveApp.getFileById('1UhHmfUbnoE5Ls8ecNDN1z1gZj5SDBsx_');
  documentos[0] = DriveApp.getFileById('1klWk8P4l275FA2tUQcd9805rIPJKc4Tv');*/
  /****************************************************/
  
  var documentos = []; //array de docs de Drive
  for(i=0; i<docsBib.length; i++){
    documentos[i] = DriveApp.getFileById(docsBib[i]);
  }
  
  var objetosBib = []; //array de objetos de la clase BibTex
  for(i=0; i<documentos.length; i++){
    objetosBib[i] = new BibTex();
    objetosBib[i].content = documentos[i].getBlob().getDataAsString();
    
    /*try{*/
    objetosBib[i].parse();
    /*}
    catch(error){
      throw new Error( "More meaningful error." );
    }*/
    
    /*var libro = new BibTex();
    libro.content = documentos[i].getBlob().getDataAsString();
    libro.parse();
    objetosBib[i] = libro;*/
  }
  
  var exito = true;
  for(i=0; i<objetosBib.length; i++){
    var errorEncontrado = checkErrors(objetosBib[i]);
    if(errorEncontrado >= 0/*!= false*/ /*|| errorEncontrado != false*/){/*ALGO FALLA POR AQUI*/
      
      exito = errorEncontrado;
      var codError = "-XÇXÜ- ";
      var falla = codError.concat(objetosBib[i].data[exito].cite);
      return falla;
      /*var Vuelta = new BibTex();
      Vuelta = objetosBib[i];
      return exito = Vuelta.data[i].cite;*/
    }
  }
  
  if(exito == true){
    var biblioExist = checkBibliography();
    var reportExist = checkReport();
  }
  if((exito == true && biblioExist) || (exito == true && reportExist)){
    
    var aux = 0;
    var allIdCitas = [];
    var index = 0;
    
   
    
    for(i=0; i<objetosBib.length; i++){
      //Para documento, lo añadimos al diccionario
      var Objeto = new BibTex();
      Objeto = objetosBib[i]; //Objeto contiene todas las entradas del documento .bib correspondiente
      
      
      //var aux2 = objetosBib[i].length;
      //var total = aux + aux2;
      
      for(x=0; x<Objeto.data.length; x++){ //Para cada entrada del Objeto
        /*if(Objeto.data[x].entryType == "manual"){}
        else{*/
          var autores = [];
          autores = Objeto.data[x].author;
          //aux++;
          
          if(compruebaYear(Objeto.data[x].year, filtros[1]) && compruebaTipo(Objeto.data[x].entryType, filtros[0]) &&
          compruebaAutor(autores, filtros[2]) && compruebaSeries(Objeto.data[x].series, filtros[3]) && compruebaEditorial(Objeto.data[x].publisher, filtros[4])){
            
            var outobj = Objeto.google(x);
            bibtex_dict[Objeto.data[x].cite] = outobj;
            allIdCitas[index] = Objeto.data[x].cite;
            
            index++;
          }
        //}/**/
      }
      
    }
  }
  
  
  /*for(x=0; x < filesBib.length; x++){
    ficheros = DriveApp.getFileById(filesBib[x]);
  }*/
  //var bibtex_doc = DriveApp.getFileById(filesBib[0]);
  //var bibtex_doc2 = DriveApp.getFileById(filesBib[1]);
  
  /****************************************************/
  //descomentar para que siga funcionando con 2 .bib
  
  /*var bibtex_doc = DriveApp.getFileById(e);
  var bibtex_doc2 = DriveApp.getFileById(e2);
  
  
  //usa la nueva clase "BibTex" que se encuentra al final del script
  var bibtex = new BibTex();
  bibtex.content = bibtex_doc.getBlob().getDataAsString(); //El contenido de bibtex como un string
  bibtex.parse();
  
  //segundo objeto BibTex
  var bibtex2 = new BibTex();
  bibtex2.content = bibtex_doc2.getBlob().getDataAsString(); //Contenido del segundo bibtex como un string
  bibtex2.parse();
  
  var errorEncontrado2 = checkErrors(bibtex2); //comprueba el segundo bibtex
  var errorEncontrado = checkErrors(bibtex); // comprueba si hubo exito en todos los documentos encontrados
  var exito = false;
  if(!errorEncontrado && !errorEncontrado2){
    var biblioExist = checkBibliography();
  }
  if(!errorEncontrado && biblioExist && !errorEncontrado2){
    var aux = bibtex.data.length;
        var aux2 = bibtex2.data.length;
        var total = aux+aux2;
        var cont = 0;
    //Crea un diccionario con todos los documentos
    for(var i=0; i<bibtex.data.length; ++i){ //Primer .bib
       
       var autores = [];
       autores = bibtex.data[i].author;
       /*var obj = bibtex.google(i);
       autores = bibtex._extractAuthors(obj);
       
        //bibtex.data[i].entryType == 'article' --> FUNCIONA!
       if(compruebaYear(bibtex.data[i].year, filtros[1]) && compruebaTipo(bibtex.data[i].entryType, filtros[0]) && compruebaAutor(autores, filtros[2])
         && compruebaSeries(bibtex.data[i].series, filtros[3]) && compruebaEditorial(bibtex.data[i].publisher, filtros[4])){
          var outobj = bibtex.google(i);
          bibtex_dict[bibtex.data[i].cite] = outobj;
        }  
     }
   
    
    for(var j=aux; j<total; j++){
      var autores2 = [];
      autores2 = bibtex2.data[cont].author;
    
      if(compruebaYear(bibtex2.data[cont].year, filtros[1]) && compruebaTipo(bibtex2.data[cont].entryType, filtros[0]) && compruebaAutor(autores2, filtros[2])
        && compruebaSeries(bibtex2.data[cont].series, filtros[3]) && compruebaEditorial(bibtex2.data[cont].publisher, filtros[4])){//filtro para un año
        var outobj2 = bibtex2.google(cont);
        bibtex_dict[bibtex2.data[cont].cite] = outobj2;
      }
      cont++;
    }
   }*/
   /****************************************************/
   //Lo de debajo es fijo
    
    if(option == 1){
      var arrayCites = getCites();
      var arrayCitesId = getId(arrayCites);
    }
   
    
    
    //var textCites = getText();  // transforma el array en un texto
    
    var idDoc = DocumentApp.getActiveDocument().getId(); //id del documento abierto
    
    var file = DriveApp.getFileById(idDoc); //archivo que representa el doc abierto
    /*var newIdDoc = file.makeCopy("New Document").getId(); //copia del documento, renombrandolo y obteniendo su id
    //var newFile = DriveApp.getFileById(newIdDoc);
    var doc = DocumentApp.openById(newIdDoc);
    var body = doc.getBody();
    var texto = body.getText();*/
    
    if(option == 1){
      var newIdDoc = file.makeCopy("New Document").getId(); //copia del documento, renombrandolo y obteniendo su id
      //var newFile = DriveApp.getFileById(newIdDoc);
      var doc = DocumentApp.openById(newIdDoc);
      var body = doc.getBody();
      var texto = body.getText();
      exito = sustitute(arrayCites, arrayCitesId, body, bibtex_dict, doc, estilo);
    }
    else if(option == 2){
      var nombre = file.getName();
      var newIdDoc = file.makeCopy(nombre+"-Report").getId(); //copia del documento, renombrandolo y obteniendo su id
      //var newFile = DriveApp.getFileById(newIdDoc);
      var doc = DocumentApp.openById(newIdDoc);
      var body = doc.getBody();
      var texto = body.getText();
      /*try{*/
        exito = report(/*arrayCitesId*/allIdCitas, bibtex_dict, doc, estilo, body);
      /*}
      catch(error){
        throw new Error (errorEncontrado);
        //return error;
      }*/
      if(exito){
        var joker = DocumentApp.getActiveDocument();
        var harley = joker.getName();
        return harley;
      }
    }
  
  return exito;
 }

function compruebaSeries(serieBib, dato){ //Aquellos que no tengan series, no se muestran
  if(dato /*&& serieBib*/){
    //serieBib = checkTildes(serieBib);
    if(dato.indexOf(",") > -1){
      var series = dato.split(",");
      for(i=0; i<series.length; i++){
        series[i] = series[i].trim();
        if(serieBib == series[i]){
          return true;
        }
      }
      return false;
    }
    else{
      dato = dato.trim();
      if(serieBib == dato){
        return true;
      }
      return false;
    }
  }
  return true;
}

function compruebaEditorial(editorialBib, dato){ //Aquellos que no tengan editorial, no se muestran
  if(dato /*&& editorialBib*/){
    if(dato.indexOf(",") > -1){
      var editoriales = dato.split(",");
      for(i=0; i<editoriales.length; i++){
        editoriales[i] = editoriales[i].trim();
        if(editorialBib == editoriales[i]){
          return true;
        }
      }
      return false;
    }
    else{
      dato = dato.trim();
      if(editorialBib == dato){
        return true;
      }
      return false;
    }
  }
  return true;
}

function compruebaTipo(tipoBib, dato){
  if(dato && tipoBib){
    if(dato.indexOf(",") > -1){ //Varios tipos
      var tipos = dato.split(",");
      for(i=0; i<tipos.length; i++){
        tipos[i] = tipos[i].trim();
        if(tipoBib == tipos[i]){
          return true;
        }
      }
      return false;
    }
    else{ //Sólo un tipo
      dato = dato.trim();
      if(tipoBib == dato){
        return true;
      }
      return false;
    } 
  }
  return true;
}

function compruebaYear(yearBib, dato){
  /*if (dato <= yearBib){
    return true;
  }*/
  if(dato && yearBib){
    if(dato.indexOf(",") > -1){ //Hay más de un año/franja
      var subFiltro = dato.split(",");
      for(i=0; i<subFiltro.length; i++){
        if(subFiltro[i].indexOf("-") > -1){ //tenemos una franja
          var rango = subFiltro[i].split("-"); //separamos la franja
          rango[0] = rango[0].trim();
          rango[1] = rango[1].trim();
          if(yearBib >= rango[0] && yearBib <= rango[1]){
            return true;
          }
        }
        else{ //tenemos un año
          subFiltro[i] = subFiltro[i].trim();
          if(subFiltro[i] == yearBib){
            return true;
          }
        }
      }
      return false;
    }
    else{ //Sólo hay un año/franja
      if(dato.indexOf("-") > -1){ //Franja única
        var rango = dato.split("-");
        rango[0] = rango[0].trim();
        rango[1] = rango[1].trim();
        if(yearBib >= rango[0] && yearBib <= rango[1]){
            return true;
        }
        return false;
      }
      else{ //Año único
        dato = dato.trim();
        if(dato == yearBib){
          return true;
        }
        return false;
      }
    }
   }
   return true;
    /*if(dato.indexOf("-") > -1){
      var rango = dato.split("-");
      if(yearBib >= rango[0] && yearBib <= rango[1]){
        return true;
      }
    }
    else if(dato.indexOf(",") > -1){
      var rango = dato.split(",");
      if(yearBib >= rango[0] && yearBib <= rango[1]){
        return true;
      }
    }
    else{
      if (dato <= yearBib){
        return true;
      }
    }
  
  return false;
  }
  else{
    return true;
  }*/
}

function compruebaAutor2(autores, dato){
  if(dato && autores){
    if(autores.length > 1){ //varios autores en la entrada
      /**/return false;
    }
    else{ //Sólo tiene un autor
      if(dato.indexOf(" AND ") > -1 || dato.indexOf(" and ") > -1){ //varios datos a buscar
        var subFiltro = dato.split(" AND ");
        for(s=0; s<subFiltro.length; s++){
          subFiltro[s] = subFiltro[s].trim(); //Quitamos espacios
          if(autores[0]['first'].indexOf(subFiltro[s]) > -1 || autores[0]['last'].indexOf(subFiltro[s]) > -1){
            //no hacemos nada, seguimos buscando
          }
          else{
            return false;
          }
        }
        //hemos buscado y hemos encontrado todo
        return true;
      }//and
      else if(dato.indexOf(" OR ") > -1 || dato.indexOf(" or ") > -1){ //varios datos pero con encontrar uno vale
        var mod = dato.replace(' OR ', ',');
        var subFiltro = mod.split(",");
        for(s=0; s<subFiltro.length; s++){
          subFiltro[s] = subFiltro[s].trim();
          if(autores[0]['first'].indexOf(subFiltro[s]) > -1 || autores[0]['last'].indexOf(subFiltro[s]) > -1){
          //if(autores[0]['first'].indexOf(dato) > -1 || autores[0]['last'].indexOf(dato) > -1){
            return true;
          }
          else{
            //no hacemos nada, seguimos buscando
          }
        }
        //hemos buscado y no hay ni una coincidencia
        return false;
      }
      else{ //único dato a buscar
        dato = dato.trim(); //quitamos espacios, por lo que NO se permite poner David Hervás, tendría que ser David AND Hervás
        if(autores[0]['first'].indexOf(dato) > -1 || autores[0]['last'].indexOf(dato) > -1){
          //coincide
          return true;
        }
        else{
          return false;
        }
      }
    }
    
  }
  return true;
}

function checkNot(autores, dato){
  //var encontrado = false;
  var target = dato.slice(4); //Quitamos los primero 4 caracteres (NOT )
  /*if(target.indexOf(" AND ") > -1 || target.indexOf(" and ") > -1){ //NOT (a AND b)
    var RegNot = 
  }
  else if(target.indexOf(" OR ") > -1 || target.indexOf(" or ") > -1){ //NOT (a OR b)
    
  }
  else{ *///NOT a
    for(t=0; t<autores.length; t++){
      if(autores[t]['first'].indexOf(target) > -1 || autores[t]['last'].indexOf(target) > -1){
        return false;
      }
    }
    return true;
  //}
  
}

function compruebaAutor(autores, dato){
  if(dato && autores){
    /**/
    if(dato.indexOf("(") > -1 && dato.indexOf(")") > -1){//Si existen paréntesis
      var regExp = /\(([^(][^)]+)\)/; //Coger lo que haya entre los paréntesis
      var matches = regExp.exec(dato);
      
      if(dato.indexOf("NOT ") > -1 || dato.indexOf("not ") > -1){ //NOT (a AND b)
        if(compruebaAutor(autores, matches[1])){
          return false;
        }
        else{
          return true;
        }
      }
      
      if(matches[1].indexOf(" OR ") > -1 || matches[1].indexOf(" or ") > -1){ //(b OR c)
        if(dato.indexOf(" AND ") > -1){
          var test = dato.split(" AND "); //a;(b OR c)
        }
        else if(dato.indexOf(" and ") > -1){
          var test = dato.split(" and "); //a;(b or c)
        }
        
        if(test[0].indexOf(" OR ") > -1 || test[0].indexOf(" or ") > -1){//(b OR c);a
           if(compruebaAutor(autores, test[1]) && compruebaAutor(autores, matches[1])){
             return true;
           }
           else{
             return false;
           }
        }
        else{
          if(compruebaAutor(autores, test[0]) && compruebaAutor(autores, matches[1])){
             return true;
           }
           else{
             return false;
           }
        }
        
        /*if(compruebaAutor(autores, test[0]) && compruebaAutor(autores, matches[1])){
          return true;
        }
        else{
          return false;
        }*/
      }
      else if(matches[1].indexOf(" AND ") > -1 || matches[1].indexOf(" and ") > -1){ //(b and c)
        if(dato.indexOf(" OR ") > -1){
          var test = dato.split(" OR "); //a;(b AND c)
        }
        else if(dato.indexOf(" or ") > -1){
          var test = dato.split(" or "); //a;(b and c)
        }
        
        if(test[0].indexOf(" AND ") > -1 || test[0].indexOf(" and ") > -1){ //(a AND b);c
          test[1] = test[1].trim();
          if(compruebaAutor(autores, test[1]) || compruebaAutor(autores, matches[1])){
            return true;
          }
          else{
            return false;
          }
        }
        else{ //c;(a AND b)
        
          if(compruebaAutor(autores, test[0]) || compruebaAutor(autores, matches[1])){
            return true;
          }
          else{
            return false;
          }
        }
        
      }
    }
    /**/
    
    if(dato.indexOf(" AND ") > -1 || dato.indexOf(" and ") > -1){ //Varios datos en el filtro y que estén en el mismo documento "AND"
      if(dato.indexOf(" AND ") > -1){
        var subFiltro = dato.split(" AND ");
      }
      else if(dato.indexOf(" and ") > -1){
        var subFiltro = dato.split(" and ");
      }
      var bool = true;
      
      if(autores.length > 1){ //varios autores en el documento
        for(s=0; s<subFiltro.length; s++){
          //subFiltro[s] = subFiltro[s].trim();
          /*COMPRUEBO SI EXISTE UN OR ADICIONAL*/
          //var regExp2 = /\(([^(][^)]+)\)/;
          //var matches = regExp2.exec(valor)
          
          
          /**/
          /*Compruebo si existe un NOT en el subFiltro*/
          if(subFiltro[s].indexOf("NOT ") > -1 || subFiltro[s].indexOf("not ") > -1){ //Sólo los que no tengan ese autor
            if(checkNot(autores, subFiltro[s])){
              //no tiene el autor que no queremos, por lo que sigo ejecutando
            }
            else{
              bool = false;
            }
          }
          else{
            /**/
            //subFiltro[s] = subFiltro[s].trim();
            var encontrado = false; //Para cada sub-filtro, indico si se ha encontrado en algún autor (para el mismo documento)
            for(j=0; j<autores.length; j++){
              //¿contador veces encontrado?
              if(autores[j]['first'].indexOf(subFiltro[s]) > -1 || autores[j]['last'].indexOf(subFiltro[s]) > -1){ //alguno de los autores se corresponde con el parámetro
                if(encontrado==false){encontrado = true;}
              }
              /*else{
                bool = false;
              }*/
            }
            if(encontrado){
              //no hacemos nada
            }
            else{ //no se ha encotrado el parámetro en NINGÚN autor de todos los que hay en ese documento
              //return false;
              bool = false;
            }
         }
        }
        //return true;
      }
      else{ //Único autor en el documento
        for(s=0; s<subFiltro.length; s++){
          if(subFiltro[s].indexOf("NOT ") > -1 || subFiltro[s].indexOf("not ") > -1){ //Sólo los que no tengan ese autor
            if(checkNot(autores, subFiltro[s])){
              //no tiene el autor que no queremos, por lo que sigo ejecutando
            }
            else{
              bool = false;
            }
          }
          else{
        
            subFiltro[s] = subFiltro[s].trim();
            if(autores[0]['first'].indexOf(subFiltro[s]) > -1 || autores[0]['last'].indexOf(subFiltro[s]) > -1){
              //no hacemos nada
            }
            else{
              bool = false;
            }
          }/**/
        }
        /*if(autores[0]['first'].indexOf(dato) > -1 || autores[0]['last'].indexOf(dato) > -1){
          
        }
        else{
          bool = false;
        }*/
      }
      return bool;
      
    }// indexOf(" AND ")
    else if(dato.indexOf(" OR ") > -1 || dato.indexOf(" or ") > -1){ //Varios datos en el filtro pero que uno esté y el resto no importa "OR"
      if(dato.indexOf(" OR ") > -1){
        var subFiltro = dato.split(" OR ");
      }
      else if(dato.indexOf(" or ") > -1){
        var subFiltro = dato.split(" or ");
      }
      var bool = false;
      
       if(autores.length > 1){ //varios autores en el documento
        for(s=0; s<subFiltro.length; s++){
          /**/
          if(subFiltro[s].indexOf("NOT ") > -1 || subFiltro[s].indexOf("not ") > -1){ //Sólo los que no tengan ese autor
            if(checkNot(autores, subFiltro[s])){
              return true;
            }
            else{
              //bool = false;
              return false;
            }
          }
          else{
          /**/
            //subFiltro[s] = subFiltro[s].trim();
            var encontrado = false; //Para cada sub-filtro, indico si se ha encontrado en algún autor (para el mismo documento)
            for(j=0; j<autores.length; j++){
              //¿contador veces encontrado?
              if(autores[j]['first'].indexOf(subFiltro[s]) > -1 || autores[j]['last'].indexOf(subFiltro[s]) > -1){ //alguno de los autores se corresponde con el parámetro
                //if(encontrado==false){encontrado = true;}
                return true;
              }
              /*else{
                bool = false;
              }*/
            }
            if(encontrado){// se ha encontrado alguno de los parámetros
              bool = true;
            }
            else{ //no se ha encotrado el parámetro en NINGÚN autor de todos los que hay en ese documento
              return false;
              //bool = false;
            }
          }
        }
        //return true;
      }
      else{ //Único autor en el documento
        for(s=0; s<subFiltro.length; s++){
          /**/
          if(subFiltro[s].indexOf("NOT ") > -1 || subFiltro[s].indexOf("not ") > -1){ //Sólo los que no tengan ese autor
            if(checkNot(autores, subFiltro[s])){
              return true;
            }
            else{
              //bool = false;
              return false;
            }
          }
          else{
          /**/
            subFiltro[s] = subFiltro[s].trim();
            if(autores[0]['first'].indexOf(subFiltro[s]) > -1 || autores[0]['last'].indexOf(subFiltro[s]) > -1){
              return true;
            }
          }
          
        }
        /*if(autores[0]['first'].indexOf(dato) > -1 || autores[0]['last'].indexOf(dato) > -1){
          
        }
        else{
          bool = false;
        }*/
      }
      return bool;
      
    }//indexOf(" OR ")
    else if(dato.indexOf("NOT ") > -1 || dato.indexOf("not ") > -1){ //Sólo los que no tengan ese autor
      if(checkNot(autores, dato)){
        return true;
      }
      else{
        return false;
      }
    }
    else{ //Sólo un dato a buscar sin NOT
      /**
      if(dato.indexOf("NOT ") > -1 || dato.indexOf("not ") > -1){
        var check = checkNot(autores, dato);
      }
      if(check == false){
        return false;
      }
      **/
      dato = dato.trim();
      if(autores.length > 1){ //Varios autores en el mismo documento
        var encontrado = false;
        for(s=0; s<autores.length; s++){
          autores[s]['first'] = autores[s]['first'].trim();
          autores[s]['last'] = autores[s]['last'].trim();
          if(autores[s]['first'].indexOf(dato) > -1 || autores[s]['last'].indexOf(dato) > -1){
            if(encontrado == false){encontrado = true;}
          }
        }
        if(encontrado){ //Se ha encontrado la palabra en ALGÚN autor del mismo documento
        
        }
        else{
          bool = false;
        }
      }
      else{ //Sólo hay un autor
       for(w=0; w<autores.length; w++){ 
          autores[w]['first'] = autores[w]['first'].trim();
          autores[w]['last'] = autores[w]['last'].trim();
          if(autores[w]['first'].indexOf(dato) > -1 || autores[w]['last'].indexOf(dato) > -1){
            return true;
          }
          //var bool = false;
       }
      }
      //return bool;
    }//
    /*
    Por si no cumple ninguna condición (ni and, ni or, ni único en el filtro), pese a existir el filtro y los autores devolvemos false
    */
    //return bool;
    return false;
  }
  return true;
}


function getCites(){ //Obtiene todos los \cite encontrados en el documento actual
  var body = DocumentApp.getActiveDocument().getBody();
  var text = body.getText();
  
  /*
  
  EXPLICACION DE LA REGEX: 
  
  - .*  ---> cualquier carácter excepto 'line terminators' (\u , \w , ....)
  
  */
  
  
  // NO FUNCIONA 
  var r = /\\cite{.*?}/gmi;
  
  //var r = /\\cite{(\w{1,40}:\d{1,40}|\w{1,40}|\w{1,40}\d{1,40}|\w{1,40}\d{1,40}\w{1,40}|\w{1,40}:\d{1,40}:\w{1,40}|\w{1,40}-\w{1,40}|\w{1,40}_\w{1,40}|\w{1,40}\d{1,40}:\w{1,40}|\w{1,40}:\w{1,40}\d{1,40})}/gmi;
  //var regex = new RegExp(r);
  
  var solutionArray = [];
  
  solutionArray = text.match(r);
  
  var body = DocumentApp.getActiveDocument().getBody();
  var text = body.editAsText();
  text.insertText(0, 'Inserted text.\n');
  
  return solutionArray;
}

function getId(solutionArray){  //obtiene todas las claves de los \cites encontrados en el documento actual
  var newArray = [];
  for(var i = 0; i < solutionArray.length; i++){
    var strL = solutionArray[i].length;
    newArray[i] = solutionArray[i].slice(6, strL - 1);
    var auxArray = newArray[i].split(",");
    newArray[i] = auxArray; 
  }
  return newArray;
}

/*function getIdAll(){ //Obtiene las claves de todas las entradas del documento
  var newAllArray = [];
}*/

function getText(){  //transforma todas las citas en una cadena
  var i = 0;
  var auxArray = [];
  var cad = ""; // cad contiene todos los \cite (usado para testear) 
  var length  = 0;
  length = solutionArray.length;
  
  while(i < length){
    auxArray[i] = solutionArray[i];
    cad = cad + solutionArray[i] + "\n";
    i++;
    
  }
  
  return cad;
}


//COMPRUEBA SI EN TODOS LOS DOCUMENTOS ENCONTRADOS HUBO EXITO EN SU CREACIÓN (NO FALTA NINGÚN CAMPO OBLIGATORIO)

function checkErrors(bibtex){
  var i = 0;
  var errorEncontrado = false;
  while(i<bibtex.data.length && !errorEncontrado){
    var outobj = bibtex.google(i);
    if(outobj['exito'] === false){
      errorEncontrado = true;
      return i;
    }
    
    
    i++;
  } 
  return -1;
}

function checkBibliography(){
  var body = DocumentApp.getActiveDocument().getBody();
  var rangeElem = body.findText("\\\\bibliography");
  var exito;
  
  if(rangeElem === null){
    exito = false;
  }else{
    exito = true;
  }
  
  return exito;
}

function checkReport(){
  var body = DocumentApp.getActiveDocument().getBody();
  var rangeElem = body.findText("\\\\report");
  var exito;
  
  if(rangeElem === null){
    exito = false;
  }else{
    exito = true;
  }
  
  return exito;
}



//bibtexDoc[i] = JSON.stringify(bibtex_dict[clave]);  //transforma a el documento .bib a texto apartir de las citas encontradas en el documento.




function sustitute(arrayCites, arrayCitesId, body2, bibtex_dict, doc, estilo){ //remplaza todos los \cite{id} 
 
  var lo = arrayCitesId.length;
  var exito = true;
  var clavesEncontradas = []; //contendrá todas aquellas claves del documento actual que se encuentren en el .bib
  var clavesNoEncontradas = []; //contendrá todas aquellas claves del documento actual que NO se encuentren en el .bib
  var listaTuplas = [];
  var contNE = 0;
  var contE = 0;
  for(var i = 0; i < arrayCitesId.length; i++){  //para cada clave encuentro su informacion correspondiente del .bib
    var claves = arrayCitesId[i];
    for(var j = 0; j < claves.length; j++){
      var clave = claves[j];
      if(bibtex_dict[clave] === undefined){ //si es undefined es que la clave no existe en el archivo .bib
        clavesNoEncontradas[contNE] = clave;
        contNE++;
      }
      else{
        clavesEncontradas[contE] = clave;
        listaTuplas[contE] = {};
        listaTuplas[contE].cite = clave;
        listaTuplas[contE].info = bibtex_dict[clave];
        contE++;
      }
    }
  }
 
  
  /*
  
  CREAMOS LA SECCION DE LA BIBLIOGRAFÍA Y REEMPLAZAMOS LAS CITAS
  
  */
  
  var exitoBiblio = setBiblio(body2, clavesNoEncontradas, listaTuplas, estilo, clavesEncontradas, arrayCitesId);  
  
  
  
  doc.saveAndClose();
 
  return exito;
}

function report(allIdCitas, bibtex_dict, doc, estilo, body2){
  /* lista para el reporte */
   var listaTuplasReporte = []; //Información de todas las citas que hayan pasado los filtros
   //var aux;
   
   /*for(i=0; i<arrayCitesId.length; i++){
     var clavesConj = arrayCitesId[i];
     for(j=0; j<clavesConj.length; j++){
       var claveUnitaria = clavesConj[j];
       
       listaTuplasReporte[j] = {};
       listaTuplasReporte[j].cite = claveUnitaria;
       listaTuplasReporte[j].info = bibtex_dict[claveUnitaria];
     }
   }*/
   
   
   
   var exito = true;
   
   for(i=0; i<allIdCitas.length; i++){
     var ClaveUnitaria = allIdCitas[i];
     listaTuplasReporte[i] = {};
     listaTuplasReporte[i].cite = ClaveUnitaria;
     listaTuplasReporte[i].info = bibtex_dict[ClaveUnitaria];
     
   }
   /*for(i=0; i<bibtex_dict.length; i++){
     var ClaveUnitaria = bibtex_dict[i].cite;
     listaTuplasReporte[i] = {};
     listaTuplasReporte[i].cite = ClaveUnitaria;
     listaTuplasReporte[i].info = bibtex_dict[ClaveUnitaria];
   }*/
   
   /* SECCIÓN PARA EL REPORTE DE LAS CITAS */
  
  var exitoReporte = setReport(body2, listaTuplasReporte, estilo/*, arrayCitesId*/);
  
  doc.saveAndClose();
 
  return exito;
}


// INSERTA UN PÁRRAFO EN EL LUGAR DONDE SE ENCUENTRA \bibliography

//PD: si \bibliography esta en medio de un párrafo de texto elimina dicho párrafo entero!!!

function setBiblio(body, clavesNoEncontradas, listaTuplas, estilo, clavesEncontradas, arrayCitesId){
    
  var rangeElem = body.findText("\\\\bibliography");
  var exito;
  
  if(rangeElem === null){
    exito = false;
  }else{
    exito = true;
    var elem = rangeElem.getElement();
    var parent = elem.getParent();
    var index = parent.getParent().getChildIndex(parent);
    
    var style = {};
    style[DocumentApp.Attribute.FONT_SIZE] = 10;
    style[DocumentApp.Attribute.BOLD] = true;
    
    var miParagraph = body.insertParagraph(index, "References");
    
    index++;
    miParagraph.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    var arrayCitesInserted = constructInfo(listaTuplas, estilo, body, index, clavesNoEncontradas);
    
     /* ------- REEMPLAZAR LAS CLAVES ENCONTRADAS POR [identificador] QUE CONTIENE LA INFORMACION DE CADA CITE ------- */
     
     /* ------- REEMPLAZAR LAS CLAVES NO ENCONTRADAS POR [??] -------- */
    
    for(var j = 0; j < arrayCitesId.length; j++){
      var claves = arrayCitesId[j];
      if(claves.length > 1){
        var keys = "";         //contendrá todo lo dentro del cite
        var replacement = "";  //contendrá todo lo que remplazará el \cite
        var ultimaClave = claves.length - 1;
        
        for(var z = 0; z < claves.length; z++){
          var clave = claves[z];
          keys = keys + clave;
          
          if(z < ultimaClave){   //si no es la ultima clave se separan las claves por comas
            keys = keys + ",";
          }
          
          var index = clavesEncontradas.indexOf(clave);
          
          if(index >= 0){ //si es una clave que existe en el fichero .bib
            var k = 0;
            var encontrado = false;
            while(!encontrado && k < arrayCitesInserted.length){
              if(arrayCitesInserted[k].cite == clave){
                encontrado = true;
                var replacement = replacement + arrayCitesInserted[k].name;
              }else{
                k++;
              }
            } 
          }else{
            replacement = replacement + "??";
          }
          
          if(z < ultimaClave){   //si no es la ultima clave se separan las claves por comas
            replacement = replacement + ",";
          }
        }
       
        var toSearch = "\\\\cite{" + keys + "}";
        replacement = "[" + replacement + "]";
        
        body.editAsText().replaceText(toSearch,replacement);
        
      }else{
        var clave = claves[0];
        var toSearch = "\\\\cite{" + clave + "}";
        
        var index = clavesEncontradas.indexOf(clave);
          
        if(index >= 0){  //si es una clave que existe en el .bib se sustituye por [identificador]
          var encontrado = false;      
          var k = 0;
          
          while(!encontrado && k < arrayCitesInserted.length){
            if(arrayCitesInserted[k].cite == clave){
              encontrado = true;
              var replacement = "[" + arrayCitesInserted[k].name + "]";
            }else{
              k++;
            }
          }  
        }else{   //si es una clave que NO existe en el .bib se sustituye por [??]
          var replacement = "[??]";
        }
        
        body.editAsText().replaceText(toSearch,replacement); 
      }     
    }    
    
    elem.removeFromParent();
  }
  //exito = true;
  return exito;
}

//Insertamos el informe en donde aparezca el \report

function setReport(body, listaTuplasReporte, estilo/*, arrayCitesId*/){
  
  /* PÁRRAFO PARA EL INFORME/REPORTE */
  
  var rangeElem = body.findText("\\\\report");
  var exito;
  
  if(rangeElem === null){ //No se encontró \report en el texto
    exito = false;
  }else{
    exito = true;
    var elem = rangeElem.getElement(); //Cogemos el elemento
    var parent = elem.getParent(); //Cogemos al padre
    var index = parent.getParent().getChildIndex(parent); //Índice del hijo
    
    var style = {}; 
    style[DocumentApp.Attribute.FONT_SIZE] = 10;
    style[DocumentApp.Attribute.BOLD] = true;
    
    var miReport = body.insertParagraph(index, "Report");
    
    index++;
    miReport.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    /***
    var miReport0 = body.insertParagraph(index, listaTuplasReporte[0].cite);
    
    index++;
    miReport0.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    var miReport1 = body.insertParagraph(index, listaTuplasReporte[1].cite);
    
    index++;
    miReport1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    var miReport2 = body.insertParagraph(index, listaTuplasReporte[2].cite);
    
    index++;
    miReport2.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    var miReport3 = body.insertParagraph(index, listaTuplasReporte[3].cite);
    
    index++;
    miReport3.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    ***/
    
    //elem.removeFromParent(); //Quitamos el \report
    var arrayCitesInserted = constructReporte(listaTuplasReporte, estilo, body, index); 
    //body.editAsText().removeFromParent(elem);
    elem.removeFromParent();
  }
  return exito;
}

function constructReporte(listaTuplasReporte, estilo, body, index){ 
  
  /* --------------------- Estilos ------------------------ */
  
  var boldStyle = {};
  boldStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
  boldStyle[DocumentApp.Attribute.BOLD] = true;
  boldStyle[DocumentApp.Attribute.ITALIC] = false;
  boldStyle[DocumentApp.Attribute.FONT_FAMILY] = "Times New Roman";
  
  var italicStyle = {};
  italicStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
  italicStyle[DocumentApp.Attribute.BOLD] = false;
  italicStyle[DocumentApp.Attribute.ITALIC] = true;
  italicStyle[DocumentApp.Attribute.FONT_FAMILY] = "Times New Roman";
  
  var normalStyle = {};
  normalStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
  normalStyle[DocumentApp.Attribute.BOLD] = false;
  normalStyle[DocumentApp.Attribute.ITALIC] = false;
  normalStyle[DocumentApp.Attribute.FONT_FAMILY] = "Times New Roman";
  
  
  /* ----------------- Construcción de la Tabla ---------------------- */ 
  /*var tiposEntrada = [];//array con los tipos de todos los documentos sin repeticiones
  var indicesTipo = []; //array con los indices de las tablas y el tipo de entrada para cada indice
  var cont = 0;
  for(i=0; i<listaTuplasReporte.length; i++){
    if(tiposEntrada.indexOf(listaTuplasReporte[i].info.entryType) > -1){ //ya tenemos anotada ese tipo de entrada
      //no hacemos nada
    }else{
      tiposEntrada[cont] = listaTuplasReporte[i].info.entryType; //añadimos el tipo de entrada
      cont++;
    }
  }
  for(j=0; j<tiposEntrada.length; j++){
    var aux = body.insertParagraph(index, tiposEntrada[j]) //la variable aux va a ser chafada cada iteración
    index++;
    aux.setHeading(DocumentApp.ParagraphHeading.HEADING2);
    
    var obj = {};
    var table = body.insertTable(index);
    table.setBorderWidth(0);
    index++;
    
    var tr = table.appendTableRow(); 
    var td = tr.appendTableCell();
    var paraInCell = td.getChild(0).asParagraph();
    var text = paraInCell.appendText("prueba");
  }*/
  
  //tiposEntrada[0] = listaTuplasReporte[0].info.entryType;
  //Dividimos las citas por entryType
  //var parrafo1 = body.insertParagraph(index, tiposEntrada[0]);
  //index++;
  
  //parrafo1.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  /**********************************************************************/
  var table = body.insertTable(index);
  table.setBorderWidth(0);
  
  estilo = "unsrt";
  switch(estilo){
    case "abbrv":
      
    break;
    case "acm":
      
    break;
    
    case "alpha":
      
    break;
    case "plain":
      
    break;
    case "apalike":
      
    break;
    case "unsrt":
      /**********************************/
      var tiposEntrada = [];//array con los tipos de todos los documentos sin repeticiones
      //var indicesTipo = []; //array con los indices de las tablas y el tipo de entrada para cada indice
      var cont = 0;
      for(i=0; i<listaTuplasReporte.length; i++){
        if(listaTuplasReporte[i].cite === undefined || listaTuplasReporte[i].info === undefined){}
        else{
          if(tiposEntrada.indexOf(listaTuplasReporte[i].info.entryType) > -1){ //ya tenemos anotada ese tipo de entrada
            //no hacemos nada
          }else{
            tiposEntrada[cont] = listaTuplasReporte[i].info.entryType; //añadimos el tipo de entrada
            cont++;
          }
        }
      }
      
      //AQUI SE DEBEN ORDENAR LAS TUPLAS DE LISTATUPLASREPORTE POR AÑO DESCENDENTE
      //var listaOrdenTuplasRep = ordenarPorYear(listaTuplasReporte);
      listaTuplasReporte.sort(compare);
      //
      
      for(j=0; j<tiposEntrada.length; j++){
        var aux = body.insertParagraph(index, tiposEntrada[j]) //la variable aux va a ser chafada cada iteración
        index++;
        aux.setHeading(DocumentApp.ParagraphHeading.HEADING2);
        
        
        var table = body.insertTable(index);
        table.setBorderWidth(0);
        index++;
        
        
        //Comprobacion de si existe o no
        for(var i=0; i<listaTuplasReporte.length; i++){
        var elemento = {};
        var arrayCitesInserted = [];
        var existe = checkIfExist(arrayCitesInserted,listaTuplasReporte[i].cite);
        var cont = 0;
        if(listaTuplasReporte[i].cite === undefined || listaTuplasReporte[i].info === undefined){
          
          var encontrado = false;
          var k = 0;
          
          while(k < arrayCitesInserted.length && !encontrado){
            if(arrayCitesInserted[k].cite == listaTuplasReporte[i].cite){
              elemento.name = arrayCitesInserted[k].name;
              elemento.cite = listaTuplasReporte[i].cite;
              encontrado = true;
            }else{
              k++;
            }
          }
        }else{//Existe y comprobamos que este es su párrafo
          if(listaTuplasReporte[i].info.entryType == tiposEntrada[j]){
            elemento.name = constructName(cont,listaTuplasReporte[i],estilo);
            elemento.cite = listaTuplasReporte[i].cite;
            cont++;
            
            
            //for(var j=0; j<2; j++){      
              
              
              
             // if(j === 0){                                              //1ª celda, con el [foo]
                /*paraInCell.appendText("[" + elemento.name + "]");
                paraInCell.setAttributes(boldStyle);*/
                
              //Antes de insertar la fila y la celda, insertaremos un subheader en función del tipo de documento(entryType)
              
              
              //Insertamos la tabla para las entradas de un tipo
              //var table = body.insertTable(index);
              //table.setBorderWidth(0);
              
              var tr = table.appendTableRow(); 
              var td = tr.appendTableCell();
              var paraInCell = td.getChild(0).asParagraph();   //párrafo para la celda
                
                var finalElem = constructObj(listaTuplasReporte[i].info); //las informaciones para cada tipo, necesita un array de 
                
                for(var key in finalElem){
                  if((key == "title" && listaTuplasReporte[i].info.entryType != "article") || (key == "journal") || (key == "booktitle")){
                    var text = paraInCell.appendText(finalElem[key]);
                    text.setAttributes(italicStyle);
                  }else{
                    var text = paraInCell.appendText(finalElem[key]);
                    text.setAttributes(normalStyle);
                  }
                }
            }
         }
        
        //Insertamos la columna para esa entrada
        /*var tr = table.appendTableRow(); 
        var td = tr.appendTableCell();
        var paraInCell = td.getChild(0).asParagraph();
        var text = paraInCell.appendText("prueba");*/
      }//for
     }
     break;
   }
 }
     
    
      /**********************************/
      //ANTERIOR 
      /*for(var i=0; i<listaTuplasReporte.length; i++){
        var elemento = {};
        var arrayCitesInserted = [];
        var existe = checkIfExist(arrayCitesInserted,listaTuplasReporte[i].cite);
        var cont = 0;
        if(listaTuplasReporte[i].cite === undefined || listaTuplasReporte[i].info === undefined){
          
          var encontrado = false;
          var k = 0;
          
          while(k < arrayCitesInserted.length && !encontrado){
            if(arrayCitesInserted[k].cite == listaTuplasReporte[i].cite){
              elemento.name = arrayCitesInserted[k].name;
              elemento.cite = listaTuplasReporte[i].cite;
              encontrado = true;
            }else{
              k++;
            }
          }
        }else{
        
          elemento.name = constructName(cont,listaTuplasReporte[i],estilo);
          elemento.cite = listaTuplasReporte[i].cite;
          cont++;*/ 
       //ANTERIOR
          
          
          //for(var j=0; j<2; j++){      
            
            
            
           // if(j === 0){                                              //1ª celda, con el [foo]
              /*paraInCell.appendText("[" + elemento.name + "]");
              paraInCell.setAttributes(boldStyle);*/
              
            //Antes de insertar la fila y la celda, insertaremos un subheader en función del tipo de documento(entryType)
            
            
            //Insertamos la tabla para las entradas de un tipo
            //var table = body.insertTable(index);
            //table.setBorderWidth(0);
            
            //ANTERIOR
            /*var tr = table.appendTableRow(); 
            var td = tr.appendTableCell();
            var paraInCell = td.getChild(0).asParagraph();   //párrafo para la celda
              
              var finalElem = constructObj(listaTuplasReporte[i].info); //las informaciones para cada tipo, necesita un array de 
              
              for(var key in finalElem){
                if((key == "title" && listaTuplasReporte[i].info.entryType != "article") || (key == "journal") || (key == "booktitle")){
                  var text = paraInCell.appendText(finalElem[key]);
                  text.setAttributes(italicStyle);
                }else{
                  var text = paraInCell.appendText(finalElem[key]);
                  text.setAttributes(normalStyle);
                }
              }*/  
            //ANTERIOR
            
            //}else if(j == 1){                                        //2ª celda, con la información de la cita
              
              /*var finalElem = constructObj(listaTuplasReporte[i].info);
              
              for(var key in finalElem){
                if((key == "title" && listaTuplasReporte[i].info.entryType != "article") || (key == "journal") || (key == "booktitle")){
                  var text = paraInCell.appendText(finalElem[key]);
                  text.setAttributes(italicStyle);
                }else{
                  var text = paraInCell.appendText(finalElem[key]);
                  text.setAttributes(normalStyle);
                }
              }*/
           // }
       /* }   
      }
      break;
    }
  }*/
  
/*function ordenarPorYear(listaTuplasReporte){
  
}*/


function compare(a,b) {
  if (a.info === undefined || a.cite === undefined /*|| isNaN(a.info.year) == false*/)return -1;
  else if (b.info === undefined || b.cite === undefined || isNaN(b.info.year) == false || isNaN(a.info.year) == false)return 1;
  else{
    if (a.info.year < b.info.year)
      return 1;
    if (a.info.year >= b.info.year)
      return -1;

    return 0;
  }
}


function constructInfo(listaTuplas, estilo, body, index, clavesNoEncontradas){
  
  /* --------------------- Estilos ------------------------ */
  
  var boldStyle = {};
  boldStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
  boldStyle[DocumentApp.Attribute.BOLD] = true;
  boldStyle[DocumentApp.Attribute.ITALIC] = false;
  boldStyle[DocumentApp.Attribute.FONT_FAMILY] = "Times New Roman";
  
  var italicStyle = {};
  italicStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
  italicStyle[DocumentApp.Attribute.BOLD] = false;
  italicStyle[DocumentApp.Attribute.ITALIC] = true;
  italicStyle[DocumentApp.Attribute.FONT_FAMILY] = "Times New Roman";
  
  var normalStyle = {};
  normalStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
  normalStyle[DocumentApp.Attribute.BOLD] = false;
  normalStyle[DocumentApp.Attribute.ITALIC] = false;
  normalStyle[DocumentApp.Attribute.FONT_FAMILY] = "Times New Roman";
  
  
  /* ----------------- Construcción de la Tabla ---------------------- */ 
    
  var table = body.insertTable(index);
  table.setBorderWidth(0);
  
  estilo = "unsrt";
  switch(estilo){
    case "abbrv":
      
    break;
    case "acm":
      
    break;
    
    case "alpha":
      
    break;
    case "plain":
      
    break;
    case "apalike":
      
    break;
    case "unsrt":
      var arrayCitesInserted = [];
      var contador = 0;
      for(var i = 0; i < listaTuplas.length; i++){
        var existe = checkIfExist(arrayCitesInserted,listaTuplas[i].cite);
        var obj = {};
        if(existe){
          
          var encontrado = false;
          var k = 0;
          
          while(k < arrayCitesInserted.length && !encontrado){
            if(arrayCitesInserted[k].cite == listaTuplas[i].cite){
              obj.name = arrayCitesInserted[k].name;
              obj.cite = listaTuplas[i].cite;
              encontrado = true;
            }else{
              k++;
            }
          }
        }else{
          
          obj.name = constructName(contador,listaTuplas[i],estilo);
          obj.cite = listaTuplas[i].cite;
          
          contador++;
          
          var posArray = arrayCitesInserted.length;
          arrayCitesInserted[posArray] = obj;
          
          var tr = table.appendTableRow(); 
          
          for(var j=0; j<2; j++){      
            
            var td = tr.appendTableCell();
            var paraInCell = td.getChild(0).asParagraph();   //párrafo del la celda
            
            if(j === 0){                                              //celda1
              paraInCell.appendText("[" + obj.name + "]");
              paraInCell.setAttributes(boldStyle);
            }else if(j == 1){                                        //celda2
              
              var finalObj = constructObj(listaTuplas[i].info);
              
              for(var key in finalObj){
                if((key == "title" && listaTuplas[i].info.entryType != "article") || (key == "journal") || (key == "booktitle")){
                  var text = paraInCell.appendText(finalObj[key]);
                  text.setAttributes(italicStyle);
                }else{
                  var text = paraInCell.appendText(finalObj[key]);
                  text.setAttributes(normalStyle);
                }
              }
            }            
          }
        } //else
      } //for
    break;
  }
  
  if(clavesNoEncontradas.length > 0){
    var tr = table.appendTableRow(); 
    
    for(var j=0; j<2; j++){      
      
      var td = tr.appendTableCell();
      var paraInCell = td.getChild(0).asParagraph();   //párrafo del la celda
      if(j === 0){
        paraInCell.appendText("[??]");
        paraInCell.setAttributes(boldStyle);
      }else if(j == 1){ 
        var text1 = paraInCell.appendText("Claves no encontradas");
        text1.setAttributes(italicStyle);
      }
    }  
  }
  
  var cell = table.getCell(0, 0);
  cell.setWidth(100);
  
  return arrayCitesInserted;
}


function checkIfExist(arrayCitesInserted,cite){
  var exito = false;
  var i = 0; 
  while(i < arrayCitesInserted.length && !exito){
    if(arrayCitesInserted[i].cite == cite){
       exito = true;
    }else{
       i++;  
    }
  }    
  return exito;
}


function constructName(pos,tupla,estilo){
  var name = "[";
  switch(estilo){
    case "abbrv":
      
      break;
    case "acm":
      
      break;        
    case "alpha":
      /*if(tupla.info['entryType'] == 'book'){
        if(tupla.info['author'] !== undefined){
          if(tupla.info['author'].length > 1){
            for(var i = 0; i < tupla.info['author'].length; i++){
              var author = tupla.info['author'][i];
              var firstChar = author['last'].substr(0, 1);
              name = name + firstChar;
            }
          }else{
            var author = tupla.info['author'][0];
            var firstChars = author['last'].substr(0, 3);
          }
        }else if(tupla.info['editor'] !== undefined){
          if(tupla.info['editor'].length > 1){
            for(var i = 0; i < tupla.info['editor'].length; i++){  //NO SOPORTADO AUN ESTE ESTILO
              var author = tupla.info['editor'][i];
              var firstChar = author['last'].substr(0, 1);
              name = name + firstChar;
            }
          }else{
            var author = tupla.info['editor'][0];
            var firstChars = author['last'].substr(0, 3);
          }
        }
      }else{
        if(tupla.info['author'] !== undefined){
          if(tupla.info['author'].length > 1){
            for(var i = 0; i < tupla.info['author'].length; i++){
              var author = tupla.info['author'][i];
              var firstChar = author['last'].substr(0, 1);
              name = name + firstChar;
            }
          }else{
            var author = tupla.info['author'][0];
            var firstChars = author['last'].substr(0, 3);
          }
        }
      }
      
      if(tupla.info['year'] !== undefined){
        var year = tupla.info['year'];
        name = name + year.substr(2, 3);
      }
      
      name = name + "]"; */
      
      break;
    case "plain":
      
      break;
    case "apalike":
      
      break;
    case "unsrt":
      name = pos;
      break;
  }
  
  return name;
}


function constructObj(info){
  switch(info.entryType){
    case 'manual':
      /*
      Required fields: title.
      Optional fields: author, organization, address, edition, month, year, note.
      */
      var obj = {authors: "", title: "", organization: "", address: "", edition: "", month: "", year: "", note: "", entryType: "manual"};
         
      break;
    case 'unpublished':
      /*
      Required fields: author, title, note.
      Optional fields: month, year.
      */
      var obj = {authors: "", title: "", note: "", month: "", year: "", entryType: "unpublished"};
         
      break;
    case 'booklet':
      /*
      Required fields: title.
      Optional fields: author, howpublished, address, month, year, note.
      */
      var obj = {authors: "", title: "", howpublished: "", address: "", month: "", year: "", note: "", entryType: "booklet"};
         
      break;
    case 'conference':
      /*
      Required fields: author, title, booktitle, year.
      Optional fields: editor, volume, series, pages, address, month, organization, publisher, note.
      */
      var obj = {authors: "", title: "", booktitle: "", year: "", editor: "", volume: "", series: "", pages: "", address: "", month: "", organization: "", publisher: "", note: "", entryType: "conference"};
         
      break;
    case 'inbook':
      /*
      Required fields: author or editor, title, chapter or pages, publisher, year.
      Optional fields: volume, series, type, address, edition, month, note.
      */
      var obj = {authors: ""/**/, editor: ""/**/, title: "", chapter: ""/**/, pages:""/**/, publisher: "", year: "", volume: "", series: "", type: "", address: "", edition: "", month: "", note: "", entryType: "inbook"};
         
      break;
    case 'book':
      /*
      Required fields: author or editor, title, publisher, year.
      Optional fields: volume or number, series, address, edition, month, note.
      */
      var obj = {authors: "", editor: "", title: "", volume: "", number: "", series: "", publisher: "", address: "", edition: "", month: "", year: "", note: "", entryType: "book"};
         
      break;
    case 'article':
      /*
      Required fields: author, title, journal, year.
      Optional fields: volume, number, pages, month, note.
      */
      
      var obj = {authors: "", title: "", journal: "", volume: "", number: "", pages: "", month: "", year: "", note: "", entryType: "article"};
           
    break;
    case 'mastersthesis':
      /*
      Required fields: author, title, school, year.
      Optional fields: type, address, month, note.
      */
      var obj = {authors: "", title: "", type: "", school: "", address: "", month: "", year: "", note: "", entryType: "mastersthesis"};
       
    break;
    case 'misc':
      /*
      Optional fields: author, title, howpublished, month, year, note.
      */
      var obj = {authors: "", title: "", howpublished: "", month: "", year: "", note: "", entryType: "misc"};
      
    break;
    case 'phdthesis':
      /*
      Required fields: author, title, school, year.
      Optional fields: type, address, month, note.
      */
      var obj = {authors: "", title: "", type: "", school: "", address: "", month: "", year: "", note: "", entryType: "phdthesis"};
            
    break;
    case 'techreport':
      /*
      Required fields: author, title, institution, year.
      Optional fields: type, number, address, month, note.
      */
      var obj = {authors: "", title: "", type: "", number: "", institution: "", address: "", month: "", year: "", note: "", entryType: "techreport"};
         
    break;
    case 'inproceedings':
      /*
      Required fields: author, title, booktitle, year.
      Optional fields: editor, volume or number, series, pages, address, month, organization, publisher, note.
      */
      var obj = {authors: "", title: "", booktitle: "", editor: "", volume: "", series: "", pages: "", address: "", month: "", year: "", organization: "", publisher: "", note: "", entryType: "inproceedings"}
      
    break;
    case 'incollection':
      /*
      Required fields: author, title, booktitle, publisher, year.
      Optional fields: editor, volume or number, series, type, chapter, pages, address, edition, month, note.
      */
      var obj = {authors: "", title: "", booktitle: "", publisher: "", editor: "", volume: "", series: "", type: "", chapter: "", pages: "", address: "", month: "", year: "", edition: "", note: "", entryType: "incollection"}
      
    break;
    case 'proceedings':
      /*
      Required fields: title, year.
      Optional fields: editor, volume or number, series, address, publisher, note, month, organization.
      */
      var obj = {editor: "", title: "", volume: "", series: "", address: "", month: "", year: "", organization: "", publisher: "", note: "", entryType: "proceedings"};
      
    break;
  }
  
  for(var key in info){
    if(key == 'authors'){          
      var authors = info[key];
      var finalAuthor = "";
      
      if(authors.length > 1){  //si hay más de un author    
        var ultimoAuthor = authors.length - 1;
        
        for(var i = 0; i < authors.length; i++){
          var stAuthor = "";
          var author = authors[i];
          stAuthor = author.first + " " + author.von + " " + author.last + author.jr;
          
          if(i == ultimoAuthor){                        //entonces es el ultimo author
            finalAuthor = finalAuthor + "and " + stAuthor;
          }else{                                     //entonces NO es el ultimo author
            finalAuthor = finalAuthor + stAuthor + ", ";
          }
        }
      }else{            
        var author = authors[0];
        finalAuthor = author.first + " " + author.von + " " + author.last + author.jr;
      }
      obj[key] = finalAuthor;
    }else if((key == 'clave') || (key == 'entryType') || (key == 'exito')){
      //ignoro
    }else{
      if(key in obj){
        obj[key] = info[key];
      }
    }  
  } 
  
  var nextObj = finishInfo(obj);
  
  var finalObj = addSeparators(nextObj);
  return finalObj;
}

function finishInfo(obj){
  switch(obj.entryType){
 
    case "mastersthesis":
      
      if(obj.type == ""){
        obj.type = "Master´s thesis";
      }
      
    break;
    case "phdthesis":
      
      if(obj.type == ""){
        obj.type = "PhD thesis";
      }
      
    break;
    case "techreport":
      
      if(obj.type == ""){
        if(obj.number == ""){
          obj.type = "Technical Report";
        }else{
          obj.type = "Technical Report " + obj.number;
          delete obj['number'];
        }
      }
      
    break;
    case "proceedings":
      
      if(obj.volume != "" && obj.series != ""){ //si existen los dos: volume x of z
        obj.volume = "volume " + obj.volume + " of " + obj.series;
        delete obj['series'];
      }else if(obj.volume != "" && obj.series == ""){ //si existe volume pero no series: volume x
        obj.volume = "volume " + obj.volume;
      }else if(obj.volume == "" && obj.series != ""){ //si existe series pero no volume: series z
        obj.series = "series " + obj.series;
      }
      
      if(obj.editor != ""){
        obj.editor = obj.editor + ", editor";
      }
      
    break;
    case "inproceedings":
      
      if(obj.volume != "" && obj.series != ""){ //si existen los dos: volume x of z
        obj.volume = "volume " + obj.volume + " of " + obj.series;
        delete obj['series'];
      }else if(obj.volume != "" && obj.series == ""){ //si existe volume pero no series: volume x
        obj.volume = "volume " + obj.volume;
      }else if(obj.volume == "" && obj.series != ""){ //si existe series pero no volume: series z
        obj.series = "series " + obj.series;
      }
      
      if(obj.editor != ""){
        obj.editor = obj.editor + ", editor";
      }
      
      if(obj.pages != ""){ //pages: pages w
          obj.pages = "pages " + obj.pages;
      }
      
    break;
    case "article":
      
      if(obj.volume != "" && obj.number != "" && obj.pages != ""){ //si existen los tres: x(y):z
        obj.volume = obj.volume + "(" + obj.number + "):" + obj.pages;
        delete obj['number'];
        delete obj['pages'];
      }else if(obj.volume != "" && obj.number == "" && obj.pages == ""){ //si solo existe volume: volume x  
        obj.volume = "volume " + obj.volume;
      }else if(obj.volume == "" && obj.number == "" && obj.pages != ""){ //si solo existe pages: Pages z
        obj.pages = "pages " + obj.pages;
      }else if(obj.volume == "" && obj.number != "" && obj.pages == ""){ //si solo existe number: (y)
        obj.number = "(" + obj.number + ")";
      }else{  //si existen al menos dos
        
        if(obj.number != ""){ // number: (y)
          obj.number = "(" + obj.number + ")";
        }
        
        if(obj.pages != ""){ //pages: :z
          obj.pages = ":" + obj.pages;
        }
        
        if(obj.volume != ""){  //si existe volume añado el otro que exista para que no me ponga una coma por medio
          if(obj.pages != ""){ //si pages
            obj.volume = obj.volume + obj.pages;
            delete obj['pages'];
          }else if(obj.number != ""){ //si number
            obj.volume = obj.volume + obj.number;
            delete obj['number'];
          }
        }else{            //si NO existe volume combino los otros dos para que no me ponga una coma por medio
          if(obj.pages != "" && obj.number != ""){ 
            obj.number = obj.number + obj.pages;
            delete obj['pages'];
          }
        }
      }
      
    break;
    case "booklet":
      
      if(obj.type == ""){
        obj.type = "Booklet";
      }
      
    break;
    
    case "manual":
      
      if(obj.type == ""){
        obj.type = "Manual";
      }
      
    break;
    
  }
  return obj;
}

function addSeparators(obj){
  for(var key in obj){
    if(obj[key] == ""){
      delete obj[key];   //elimino aquellas propiedades que no tienen un valor
    }
  }
  
  delete obj["entryType"];
  
  var size = Object.keys(obj).length;
  var cont = 1;
  
  for(key in obj){
    
    if((key == "authors") || (key == "title") || (key == "year")){
      obj[key] = obj[key] + ". "; //autores y titulos separados por un punto
      cont++;
    }else if(cont == size){       
      obj[key] = obj[key] + ".";  //es la ultima propiedad -> añadir el punto final
    }else if(key == "month"){
      obj[key] = obj[key] + " ";  //el mes va seguido del año separado por un espacio
      cont++;
    }else{
      obj[key] = obj[key] + ", "; //el resto separados por una coma
      cont++;
    }
    
    obj[key] = checkTildes(obj[key]);
    obj[key] = checkSimbols(obj[key]);
    
  }
  
  return obj;
}

function checkTildes(st){
  var index = 0;
  
  while(index >= 0){
    //comprobar si existen posible acentos              
    if(st.indexOf("{\\'a}") >= 0){          
      st = st.replace("{\\'a}", "á");
    }else if (st.indexOf("\'{a}") >= 0){
      st = st.replace("\\'{a}", "á");
    }else if (st.indexOf("\'a") >= 0){
      st = st.replace("\\'a", "á");
    }else if (st.indexOf("\\'{\\a}") >= 0){
      st = st.replace("\\'{\\a}", "á");
    }else if (st.indexOf("\`a") >= 0){
      st = st.replace("\\`a", "à");
    }else if(st.indexOf("{\\'e}") >= 0){
      st = st.replace("{\\'e}", "é");
    }else if (st.indexOf("\'{e}") >= 0){
      st = st.replace("\\'{e}", "é");
    }else if (st.indexOf("\'e") >= 0){
      st = st.replace("\\'e", "é");
    }else if (st.indexOf("\\'{\\e}") >= 0){
      st = st.replace("\\'{\\e}", "é");
    }else if (st.indexOf("\`e") >= 0){
      st = st.replace("\\`e", "è");
    }else if (st.indexOf("{\\'i}") >= 0){
      st = st.replace("{\\'i}", "í");
    }else if (st.indexOf("\'{i}") >= 0){
      st = st.replace("\\'{i}", "í");
    }else if (st.indexOf("\'i") >= 0){
      st = st.replace("\\'i", "í");
    }else if (st.indexOf("\\'{\\i}") >= 0){
      st = st.replace("\\'{\\i}", "í");
    }else if (st.indexOf("\`i") >= 0){
      st = st.replace("\\`i", "ì");
    }else if (st.indexOf("{\\'o}") >= 0){
      st = st.replace("{\\'o}", "ó");
    }else if (st.indexOf("\'{o}") >= 0){
      st = st.replace("\\'{o}", "ó");
    }else if (st.indexOf("\'o") >= 0){
      st = st.replace("\\'o", "ó");
    }else if (st.indexOf("\\'{\\o}") >= 0){
      st = st.replace("\\'{\\o}", "ó");
    }else if (st.indexOf("\`o") >= 0){
      st = st.replace("\\`o", "ò");
    }else if (st.indexOf("{\\'u}") >= 0){
      st = st.replace("{\\'u}", "ú");
    }else if (st.indexOf("\'{u}") >= 0){
      st = st.replace("\\'{u}", "ú");
    }else if (st.indexOf("\'u") >= 0){
      st = st.replace("\\'u", "ú");
    }else if (st.indexOf("\\'{\\u}") >= 0){
      st = st.replace("\\'{\\u}", "ú");
    }else if (st.indexOf("\`u") >= 0){
      st = st.replace("\\`u", "ù");
    }else{
      
      index = -1;
      
    }
  }
  
  return st;
}

function checkSimbols(st){  
  
  var regex = /(\\.*?{.*?}|{.*?})/gmi;
  
  var arMatched = st.match(regex);
  if(arMatched !== null){ //Hay coincidencias
    for(var i = 0; i < arMatched.length; i++){
      var s = arMatched[i];
      var newSt = "";
      var startFinded = false;
      var endFinded = false;
      var j = 0;
      while(!startFinded){
        var c1 = s[j];
        if(c1 == "{"){
          startFinded = true;
          j++;
          while(!endFinded){              //ELIMINA LAS LLAVES DEL TIPO: {G}recia o \url{blabla} -> Grecia y blabla
            var c2 = s[j];
            if(c2 == "}"){
              endFinded = true;
            }else{
              newSt = newSt + c2;
              j++;
            }
          }
        }else{
          j++;
        }
      }
      var st = st.replace(s,newSt);      
    }
  }
  
  return st;
}

function getFiles(e) {
  var data = {};
  var idn = e;
  e = e == "root" ? DriveApp.getRootFolder().getId() : e;
  data[e] = {};
  data[e].keyname = DriveApp.getFolderById(e).getName();
  data[e].keyparent = idn == "root"
    ? null : DriveApp.getFolderById(e).getParents().hasNext()
    ? DriveApp.getFolderById(e).getParents().next().getId() : null;
  data[e].files = [];
  var da = idn == "root" ? DriveApp.getRootFolder() : DriveApp.getFolderById(e);
  var folders = da.getFolders();
  var files = da.getFiles();
  while (folders.hasNext()) {
    var folder = folders.next();
    data[e].files.push({name: folder.getName(), id: folder.getId(), mimeType: "folder"});
  }
  while (files.hasNext()) {
    var file = files.next();
    data[e].files.push({name: file.getName(), id: file.getId(), mimeType: file.getMimeType()});
  }
  return data;
}

//========================================================


//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
/**
 * Javascript BibTex Parser v0.1
 * Copyright (c) 2008 Simon Fraser University
 * @author Steve Hannah <shannah at sfu dot ca>
 * 
 *
 * License:
 * 
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * 
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Credits:
 *
 * This library is a port of the PEAR Structures_BibTex parser written
 * in PHP (http://pear.php.net/package/Structures_BibTex).
 *
 * In order to make porting the parser into javascript easier, I have made
 * use of many phpjs functions, which are distributed here under the MIT License:
 *
 * 
 * More info at: http://kevin.vanzonneveld.net/techblog/category/php2js
 * 
 * php.js is copyright 2008 Kevin van Zonneveld.
 * 
 * Portions copyright Ates Goral (http://magnetiq.com), Legaev Andrey,
 * _argos, Jonas Raoni Soares Silva (http://www.jsfromhell.com),
 * Webtoolkit.info (http://www.webtoolkit.info/), Carlos R. L. Rodrigues, Ash
 * Searle (http://hexmen.com/blog/), Tyler Akins (http://rumkin.com), mdsjack
 * (http://www.mdsjack.bo.it), Alexander Ermolaev
 * (http://snippets.dzone.com/user/AlexanderErmolaev), Andrea Giammarchi
 * (http://webreflection.blogspot.com), Bayron Guevara, Cord, David, Karol
 * Kowalski, Leslie Hoare, Lincoln Ramsay, Mick@el, Nick Callen, Peter-Paul
 * Koch (http://www.quirksmode.org/js/beat.html), Philippe Baumann, Steve
 * Clay, booeyOH
 * 
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES 
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Synopsis:
 * ----------
 *
 * This class provides the following functionality:
 *    1. Parse BibTex into a logical data javascript data structure.
 *    2. Output parsed BibTex entries as HTML, RTF, or BibTex.
 *
 *  
 * The following usage instructions have been copyed and adapted from the PHP instructions located
 * at http://pear.php.net/manual/en/package.structures.structures-bibtex.intro.php
 * Introduction
 * --------------
 * Overview
 * ----------
 * This package provides methods to access information stored in a BibTex
 * file. During parsing it is possible to let the data be validated. In
 * addition. the creation of BibTex Strings as well as RTF Strings is also
 * supported. A few examples
 * 
 * Example 1. Loading a BibTex File and printing the parsed array
 * <script src="BibTex.js"></script>
 * <script>
 * bibtexæ=ænewæBibTex();
 * bibtex.content = content; // the bibtex content as a string
 * 
 * bibtex->parse();
 * alert(print_r($bibtex->data,true));
 * </script>
 * 
 * 
 * Options
 * --------
 * Options can be set either in the constructor or with the method
 * setOption(). When setting in the constructor the options are given in an
 * associative array. The options are:
 * 
 *  - stripDelimiter (default: true) Stripping the delimiter surrounding the entries. 
 *  - validate (default: true) Validation while parsing. 
 *  - unwrap (default: false) Unwrapping entries while parsing. 
 *  - wordWrapWidth (default: false) If set to a number higher one
 *      that the entries are wrapped after that amount of characters. 
 *  - wordWrapBreak (default: \n) String used to break the line (attached to the line). 
 *  - wordWrapCut (default: 0) If set to zero the line will we
 *      wrapped at the next possible space, if set to one the line will be
 *      wrapped exactly after the given amount of characters. 
 *  - removeCurlyBraces (default: false) If set to true Curly Braces will be removed. 
 * 
 * Example of setting options in the constructor:
 * 
 * Example 2. Setting options in the constructor
 * bibtexæ=ænewæBibTex({'validate':false,æ'unwrap':true});
 * 
 * 
 * Example of setting options using the method setOption():
 * 
 * Example 62-3. Setting options using setOption
 * bibtexæ=ænewæBibTex();
 * bibtex.setOption('validate',æfalse);
 * bibtex.setOption('unwrap',ætrue);
 * 
 * Stored Data
 * ------------
 * The data is stored in the class variable data. This is a a list where
 * each entry is a hash table representing one bibtex-entry. The keys of
 * the hash table correspond to the keys used in bibtex and the values are
 * the corresponding values. Some of these keys are:
 * 
 *  - cite - The key used in a LaTeX source to do the citing. 
 *  - entryType - The type of the entry, like techreport, book and so on. 
 *  - author - One or more authors of the entry. This entry is also a
 *      list with hash tables representing the authors as entries. The
 *      author has table is explained later. 
 *  - title - Title of the entry. 
 * 
 * Author
 * ------
 * As described before the authors are stored in a list. Every entry
 * representing one author as a has table. The hash table consits of four
 * keys: first, von, last and jr. The keys are explained in the following
 * list:
 * 
 *  - first - The first name of the author. 
 *  - von - Some names have a 'von' part in their name. This is usually a sign of nobleness. 
 *  - last - The last name of the author. 
 *  - jr - Sometimes a author is the son of his father and has the
 *      same name, then the value would be jr. The same is true for the
 *      value sen but vice versa. 
 * 
 * Adding an entry
 * ----------------
 * To add an entry simply create a hash table with the needed keys and
 * values and call the method addEntry().
 * Example 4. Adding an entry
 * bibtexæææææææææææææææææææææææææ=ænewæBibTex();
 * var addarrayæææææææææææææææææææææææ=æ{};
 * addarray['entryType']ææææææææææ=æ'Article';
 * addarray['cite']æææææææææææææææ=æ'art2';
 * addarray['title']ææææææææææææææ=æ'TitelæofætheæArticle';
 * addarray['author'] = [];
 * addarray['author'][0]['first']æ=æ'John';
 * addarray['author'][0]['last']ææ=æ'Doe';
 * addarray['author'][1]['first']æ=æ'Jane';
 * addarray['author'][1]['last']ææ=æ'Doe';
 * bibtex.addEntry(addarray);
 */

// ------------BEGIN PHP FUNCTIONS -------------------------------------------------------------- //

// {{{ array
function array( ) {
    // #!#!#!#!# array::$descr1 does not contain valid 'array' at line 258
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array/
    // +       version: 805.1716
    // +   original by: d3x
    // *     example 1: array('Kevin', 'van', 'Zonneveld');
    // *     returns 1: ['Kevin', 'van', 'Zonneveld'];

    return Array.prototype.slice.call(arguments);
}// }}}

// {{{ array_key_exists
function array_key_exists ( key, search ) {
    // Checks if the given key or index exists in the array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_key_exists/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
    // *     example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'});
    // *     returns 1: true

    // input sanitation
    if( !search || (search.constructor !== Array && search.constructor !== Object) ){
        return false;
    }

    return key in search;
}// }}}// {{{ array_keys
function array_keys( input, search_value, strict ) {
    // Return all the keys of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_keys/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}

    var tmp_arr = new Array(), strict = !!strict, include = true, cnt = 0;

    for ( key in input ){
        include = true;
        if ( search_value != undefined ) {
            if( strict && input[key] !== search_value ){
                include = false;
            } else if( input[key] != search_value ){
                include = false;
            }
        }

        if( include ) {
            tmp_arr[cnt] = key;
            cnt++;
        }
    }

    return tmp_arr;
}// }}}

// {{{ in_array
function in_array(needle, haystack, strict) {
    // Checks if a value exists in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_in_array/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true

    var found = false, key, strict = !!strict;

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }

    return found;
}// }}}

// {{{ sizeof
function sizeof ( mixed_var, mode ) {
    // Alias of count()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sizeof/
    // +       version: 804.1712
    // +   original by: Philip Peterson
    // -    depends on: count
    // *     example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
 
    return count( mixed_var, mode );
}// }}}

// {{{ count
function count( mixed_var, mode ) {
    // Count elements in an array, or properties in an object
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_count/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: _argos
    // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6

    var key, cnt = 0;

    if( mode == 'COUNT_RECURSIVE' ) mode = 1;
    if( mode != 1 ) mode = 0;

    for (key in mixed_var){
        cnt++;
        if( mode==1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object) ){
            cnt += count(mixed_var[key], 1);
        }
    }

    return cnt;
}// }}}

// {{{ explode
function explode( delimiter, string, limit ) {
    // Split a string by string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_explode/
    // +       version: 805.1715
    // +     original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: kenneth
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: d3x
    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: explode(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
    // *     example 2: explode('=', 'a=bc=d', 2);
    // *     returns 2: ['a', 'bc=d']
 
    var emptyArray = { 0: '' };
    
    // third argument is not required
    if ( arguments.length < 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined' )
    {
        return null;
    }
 
    if ( delimiter === ''
        || delimiter === false
        || delimiter === null )
    {
        return false;
    }
 
    if ( typeof delimiter == 'function'
        || typeof delimiter == 'object'
        || typeof string == 'function'
        || typeof string == 'object' )
    {
        return emptyArray;
    }
 
    if ( delimiter === true ) {
        delimiter = '1';
    }
    
    if (!limit) {
        return string.toString().split(delimiter.toString());
    } else {
        // support for limit argument
        var splitted = string.toString().split(delimiter.toString());
        var partA = splitted.splice(0, limit - 1);
        var partB = splitted.join(delimiter.toString());
        partA.push(partB);
        return partA;
    }
}// }}}

// {{{ implode
function implode( glue, pieces ) {
    // Join array elements with a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_implode/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: _argos
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'

    return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
}// }}}

// {{{ join
function join( glue, pieces ) {
    // Alias of implode()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_join/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: implode
    // *     example 1: join(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'

    return implode( glue, pieces );
}// }}}

// {{{ split
function split( delimiter, string ) {
    // Split string into array by regular expression
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_split/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: explode
    // *     example 1: split(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

    return explode( delimiter, string );
}// }}}

// {{{ str_replace
function str_replace(search, replace, subject) {
    // Replace all occurrences of the search string with the replacement string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_replace/
    // +       version: 805.3114
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // -    depends on: is_array
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'    
    
    var f = search, r = replace, s = subject;
    var ra = is_array(r), sa = is_array(s), f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;

    while (j = 0, i--) {
        while (s[i] = s[i].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f){};
    };
     
    return sa ? s : s[0];
}// }}}

// {{{ strlen
function strlen( string ){
    // Get string length
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strlen/
    // +       version: 805.1616
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sakimori
    // *     example 1: strlen('Kevin van Zonneveld');
    // *     returns 1: 19

    return ("" + string).length;
}// }}}

// {{{ strpos
function strpos( haystack, needle, offset){
    // Find position of first occurrence of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strpos/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
    // *     returns 1: 14

    var i = haystack.indexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}// }}}

// {{{ strrpos
function strrpos( haystack, needle, offset){
    // Find position of last occurrence of a char in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrpos/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16

    var i = haystack.lastIndexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}// }}}

// {{{ strtolower
function strtolower( str ) {
    // Make a string lowercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtolower/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strtolower('Kevin van Zonneveld');
    // *     returns 1: 'kevin van zonneveld'

    return str.toLowerCase();
}// }}}

// {{{ strtoupper
function strtoupper( str ) {
    // Make a string uppercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtoupper/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strtoupper('Kevin van Zonneveld');
    // *     returns 1: 'KEVIN VAN ZONNEVELD'

    return str.toUpperCase();
}// }}}

// {{{ substr
function substr( f_string, f_start, f_length ) {
    // Return part of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_substr/
    // +       version: 804.1712
    // +     original by: Martijn Wieringa
    // *         example 1: substr('abcdef', 0, -1);
    // *         returns 1: 'abcde'

    if(f_start < 0) {
        f_start += f_string.length;
    }

    if(f_length == undefined) {
        f_length = f_string.length;
    } else if(f_length < 0){
        f_length += f_string.length;
    } else {
        f_length += f_start;
    }

    if(f_length < f_start) {
        f_length = f_start;
    }

    return f_string.substring(f_start, f_length);
}// }}}

// {{{ trim
function trim( str, charlist ) {
    // Strip whitespace (or other characters) from the beginning and end of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_trim/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: DxGx
    // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
    // *     example 1: trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: trim('Hello World', 'Hdle');
    // *     returns 2: 'o Wor'

    var whitespace;
    
    if(!charlist){
        whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    } else{
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    }
  
  for (var i = 0; i < str.length; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
    str = str.substring(i);
    break;
    }
  }
  for (i = str.length - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
      }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}// }}}


// {{{ wordwrap
function wordwrap( str, int_width, str_break, cut ) {
    // Wraps a string to a given number of characters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_wordwrap/
    // +       version: 804.1715
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Nick Callen
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
    // *     returns 1: 'Kevin |van |Zonnev|eld'
    
    var m = int_width, b = str_break, c = cut;
    var i, j, l, s, r;
    
    if(m < 1) {
        return str;
    }
    for(i = -1, l = (r = str.split("\n")).length; ++i < l; r[i] += s) {
        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")){
            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
        }
    }
    
    return r.join("\n");
}// }}}

// {{{ is_string
function is_string( mixed_var ){
    // Find whether the type of a variable is string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_string/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: is_string('23');
    // *     returns 1: true
    // *     example 2: is_string(23.5);
    // *     returns 2: false

    return (typeof( mixed_var ) == 'string');
}// }}}


// {{{ ord
function ord( string ) {
    // Return ASCII value of character
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ord/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ord('K');
    // *     returns 1: 75

    return string.charCodeAt(0);
}// }}}

// {{{ array_unique
function array_unique( array ) {
    // Removes duplicate values from an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_unique/
    // +       version: 805.211
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      input by: duncan
    // +    bufixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld']);
    // *     returns 1: ['Kevin','van','Zonneveld']

    var p, i, j, tmp_arr = array;
    for(i = tmp_arr.length; i;){
        for(p = --i; p > 0;){
            if(tmp_arr[i] === tmp_arr[--p]){
                for(j = p; --p && tmp_arr[i] === tmp_arr[p];);
                i -= tmp_arr.splice(p + 1, j - p).length;
            }
        }
    }

    return tmp_arr;
}// }}}

// {{{ print_r
function print_r( array, return_val ) {
    // Prints human-readable information about a variable
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_print_r/
    // +       version: 805.2023
    // +   original by: Michael White (http://crestidg.com)
    // +   improved by: Ben Bryan
    // *     example 1: print_r(1, true);
    // *     returns 1: 1

    var output = "", pad_char = " ", pad_val = 4;

    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0) {
            cur_depth++;
        }

        var base_pad = repeat_char(pad_val*cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
        var str = "";

        if (obj instanceof Array || obj instanceof Object) {
            str += "Array\n" + base_pad + "(\n";
            for (var key in obj) {
                if (obj[key] instanceof Array || obj[key] instanceof Object) {
                    str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + "["+key+"] => " + obj[key] + "\n";
                }
            }
            str += base_pad + ")\n";
        } else {
            str = obj.toString();
        }

        return str;
    };

    var repeat_char = function (len, pad_char) {
        var str = "";
        for(var i=0; i < len; i++) { 
            str += pad_char; 
        };
        return str;
    };
    output = formatArray(array, 0, pad_val, pad_char);

    if (return_val !== true) {
        document.write("<pre>" + output + "</pre>");
        return true;
    } else {
        return output;
    }
}// }}}


// {{{ is_array
function is_array( mixed_var ) {
    // Finds whether a variable is an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_array/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   bugfixed by: Cord
    // *     example 1: is_array(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: is_array('Kevin van Zonneveld');
    // *     returns 2: false

    return ( mixed_var instanceof Array );
}// }}}

//------------END PHP FUNCTIONS --------------------------------------------------------------   //

/**
 * BibTex
 *
 * A class which provides common methods to access and
 * create Strings in BibTex format+
 * Example 1: Parsing a BibTex File and returning the number of entries
 * <code>
 * bibtex = new BibTex();
 * bibtex.content = '....';
 *
 * bibtex.parse();
 * print "There are "+bibtex.amount()+" entries";
 * </code>
 * Example 2: Parsing a BibTex File and getting all Titles
 * <code>
 * bibtex = new BibTex();
 * bibtex.content="...";
 * bibtex.parse();
 * for (var i in bibtex.data) {
 *  alert( bibtex.data[i]['title']+"<br />");
 * }
 * </code>
 * Example 3: Adding an entry and printing it in BibTex Format
 * <code>
 * bibtex                         = new BibTex();
 * addarray                       = {}
 * addarray['entryType']          = 'Article';
 * addarray['cite']               = 'art2';
 * addarray['title']              = 'Titel2';
 * addarray['author']       = [];
 * addarray['author'][0]['first'] = 'John';
 * addarray['author'][0]['last']  = 'Doe';
 * addarray['author'][1]['first'] = 'Jane';
 * addarray['author'][1]['last']  = 'Doe';
 * bibtex.addEntry(addarray);
 * alert( nl2br(bibtex.bibTex()));
 * </code>
 *
 * @category   Structures
 * @package    BibTex
 * @author     Steve Hannah <shannah at sfu dot ca>
 * @adapted-from Structures_BibTex by  Elmar Pitschke <elmar+pitschke@gmx+de>
 * @copyright  2008 Simon Fraser University
 * @license    http://www.gnu.org/licenses/lgpl.html
 * @version    Release: 0.1
 * @link       http://webgroup.fas.sfu.ca/projects/JSBibTexParser
 */
function BibTex(options)
{

  if ( typeof options == 'undefined' ) options = {};
    /**
     * Array with the BibTex Data
     *
     * @access public
     * @var array
     */
    this.data;
    /**
     * String with the BibTex content
     *
     * @access public
     * @var string
     */
    this.content;
    /**
     * Array with possible Delimiters for the entries
     *
     * @access private
     * @var array
     */
    this._delimiters;
    /**
     * Array to store warnings
     *
     * @access public
     * @var array
     */
    this.warnings;
    /**
     * Run-time configuration options
     *
     * @access private
     * @var array
     */
    this._options;
    /**
     * RTF Format String
     *
     * @access public
     * @var string
     */
    this.googlestring;
    /**
     * google Format String
     *
     * @access public
     * @var string
     */
    this.rtfstring;
    /**
     * HTML Format String
     *
     * @access public
     * @var string
     */
    this.htmlstring;
    /**
     * Array with the "allowed" entry types
     *
     * @access public
     * @var array
     */
    this.allowedEntryTypes;
    /**
     * Author Format Strings
     *
     * @access public
     * @var string
     */
    this.authorstring;
    
    this._delimiters     = {'"':'"',
                                        '{':'}'};
  this.data            = [];
  this.content         = '';
  //this._stripDelimiter = stripDel;
  //this._validate       = val;
  this.warnings        = [];
  this._options        = {
    'stripDelimiter'    : true,
    'validate'          : true,
    'unwrap'            : false,
    'wordWrapWidth'     : false,
    'wordWrapBreak'     : "\n",
    'wordWrapCut'       : 0,
    'removeCurlyBraces' : false,
    'extractAuthors'    : true
  };
  for (option in options) {
    test = this.setOption(option, options[option]);
    if (this.isError(test)) {
      //Currently nothing is done here, but it could for example raise an warning
    }
  }
  this.rtfstring         = 'AUTHORS, "{\b TITLE}", {\i JOURNAL}, YEAR';
    this.googlestring        = 'AUTHORS, "TITLE", JOURNAL, YEAR';
  this.htmlstring        = 'AUTHORS, "<strong>TITLE</strong>", <em>JOURNAL</em>, YEAR<br />';
  this.allowedEntryTypes = array(
    'article',
    'book',
    'booklet',
    'conference',
    'inbook',
    'incollection',
    'inproceedings',
    'manual',
    'mastersthesis',
    'misc',
    'phdthesis',
    'proceedings',
    'techreport',
    'unpublished'
  );
  this.authorstring = 'VON LAST, JR, FIRST';
    
}


BibTex.prototype = {
     
    /**
     * Constructor
     *
     * @access public
     * @return void
     */
   

    /**
     * Sets run-time configuration options
     *
     * @access public
     * @param string option option name
     * @param mixed  value value for the option
     * @return mixed true on success PEAR_Error on failure
     */
    setOption : function(option, value)
    {
        ret = true;
        if (array_key_exists(option, this._options)) {
            this._options[option] = value;
        } else {
            ret = this.raiseError('Unknown option '+option);
        }
        return ret;
    },

    /**
     * Reads a give BibTex File
     *
     * @access public
     * @param string filename Name of the file
     * @return mixed true on success PEAR_Error on failure
     *
    function loadFile(filename)
    {
        if (file_exists(filename)) {
            if ((this.content = @file_get_contents(filename)) === false) {
                return PEAR::raiseError('Could not open file '+filename);
            } else {
                this._pos    = 0;
                this._oldpos = 0;
                return true;
            }
        } else {
            return PEAR::raiseError('Could not find file '+filename);
        }
    }
  */
    /**
     * Parses what is stored in content and clears the content if the parsing is successfull+
     *
     * @access public
     * @return boolean true on success and PEAR_Error if there was a problem
     */
    parse: function()
    {
      //alert("starting to parse");
        //The amount of opening braces is compared to the amount of closing braces
        //Braces inside comments are ignored
        this.warnings = [];
        this.data     = [];
        var valid          = true;
        var open           = 0;
        var entry          = false;
        var charv           = '';
        var lastchar       = '';
        var buffer         = '';
        for (var i = 0; i < strlen(this.content); i++) {
            charv = substr(this.content, i, 1);
            if ((0 != open) && ('@' == charv)) {
                if (!this._checkAt(buffer)) {
                    this._generateWarning('WARNING_MISSING_END_BRACE', '', buffer);
                    //To correct the data we need to insert a closing brace
                    charv     = '}';
                    i--;
                }
            }
            if ((0 == open) && ('@' == charv)) { //The beginning of an entry
                entry = true;
            } else if (entry && ('{' == charv) && ('\\' != lastchar)) { //Inside an entry and non quoted brace is opening
                open++;
            } else if (entry && ('}' == charv) && ('\\' != lastchar)) { //Inside an entry and non quoted brace is closing
                open--;
                if (open < 0) { //More are closed than opened
                    valid = false;
                }
                if (0 == open) { //End of entry
                    entry     = false;
                    var entrydata = this._parseEntry(buffer);
                    if (!entrydata) {
                        /**
                         * This is not yet used+
                         * We are here if the Entry is either not correct or not supported+
                         * But this should already generate a warning+
                         * Therefore it should not be necessary to do anything here
                         */
                    } else {
                        this.data[this.data.length] = entrydata;
                    }
                    buffer = '';
                }
            }
            if (entry) { //Inside entry
                buffer += charv;
            }
            lastchar = charv;
        }
        //If open is one it may be possible that the last ending brace is missing
        if (1 == open) {
            entrydata = this._parseEntry(buffer);
            if (!entrydata) {
                valid = false;
            } else {
                this.data[this.data.length] = entrydata;
                buffer = '';
                open   = 0;
            }
        }
        //At this point the open should be zero
        if (0 != open) {
            valid = false;
        }
        //Are there Multiple entries with the same cite?
        if (this._options['validate']) {
            cites = array();
            for (var i=0; i< this.data.length; i++ ) {
                cites[cites.length] = this.data[i]['cite'];
            }
            unique = array_unique(cites);
            if (sizeof(cites) != sizeof(unique)) { //Some values have not been unique!
                notuniques = array();
                for (var i = 0; i < sizeof(cites); i++) {
                    if ('' == unique[i]) {
                        notuniques[notuniques.length] = cites[i];
                    }
                }
                this._generateWarning('WARNING_MULTIPLE_ENTRIES', implode(',',notuniques));
            }
        }
        //alert("finished parsing");
        if (valid) {
            this.content = '';
            return true;
        } else {
            return this.raiseError('Unbalanced parenthesis');
        }
    },

    /**
     * Extracting the data of one content
     *
     * The parse function splits the content into its entries+
     * Then every entry is parsed by this function+
     * It parses the entry backwards+
     * First the last '=' is searched and the value extracted from that+
     * A copy is made of the entry if warnings should be generated+ This takes quite
     * some memory but it is needed to get good warnings+ If nor warnings are generated
     * then you don have to worry about memory+
     * Then the last ',' is searched and the field extracted from that+
     * Again the entry is shortened+
     * Finally after all field:value pairs the cite and type is extraced and the
     * authors are splitted+
     * If there is a problem false is returned+
     *
     * @access private
     * @param string entry The entry
     * @return array The representation of the entry or false if there is a problem
     */
    '_parseEntry': function(entry)
    {
        var entrycopy = '';
        if (this._options['validate']) {
            entrycopy = entry; //We need a copy for printing the warnings
        }
        var ret = {};
        if ('@string' ==  strtolower(substr(entry, 0, 7))) {
            //String are not yet supported!
            if (this._options['validate']) {
                this._generateWarning('STRING_ENTRY_NOT_YET_SUPPORTED', '', entry+'}');
            }
        } else if ('@preamble' ==  strtolower(substr(entry, 0, 9))) {
            //Preamble not yet supported!
            if (this._options['validate']) {
                this._generateWarning('PREAMBLE_ENTRY_NOT_YET_SUPPORTED', '', entry+'}');
            }
        } else {
            //Parsing all fields
            while (strrpos(entry,'=') !== false) {
                position = strrpos(entry, '=');
                //Checking that the equal sign is not quoted or is not inside a equation (For example in an abstract)
                proceed  = true;
                if (substr(entry, position-1, 1) == '\\') {
                    proceed = false;
                }
                if (proceed) {
                    proceed = this._checkEqualSign(entry, position);
                }
                while (!proceed) {
                    substring = substr(entry, 0, position);
                    position  = strrpos(substring,'=');
                    proceed   = true;
                    if (substr(entry, position-1, 1) == '\\') {
                        proceed = false;
                    }
                    if (proceed) {
                        proceed = this._checkEqualSign(entry, position);
                    }
                }

                value = trim(substr(entry, position+1));
                entry = substr(entry, 0, position);

                if (',' == substr(value, strlen(value)-1, 1)) {
                    value = substr(value, 0, -1);
                }
                if (this._options['validate']) {
                    this._validateValue(value, entrycopy);
                }
                if (this._options['stripDelimiter']) {
                    value = this._stripDelimiter(value);
                }
                if (this._options['unwrap']) {
                    value = this._unwrap(value);
                }
                if (this._options['removeCurlyBraces']) {
                    value = this._removeCurlyBraces(value);
                }
                position    = strrpos(entry, ',');
                field       = strtolower(trim(substr(entry, position+1)));
                ret[field] = value;
                entry       = substr(entry, 0, position);
            }
            //Parsing cite and entry type
            var arr = split('{', entry);
            ret['cite'] = trim(arr[1]);
            ret['entryType'] = strtolower(trim(arr[0]));
            //alert(array_keys(ret));
            if ('@' == ret['entryType'].substring(0,1)) {
                ret['entryType'] = substr(ret['entryType'], 1);
            }
            if (this._options['validate']) {
                if (!this._checkAllowedEntryType(ret['entryType'])) {
                    this._generateWarning('WARNING_NOT_ALLOWED_ENTRY_TYPE', ret['entryType'], entry+'}');
                }
            }
            //Handling the authors
            if (in_array('author', array_keys(ret)) && this._options['extractAuthors']) {
                ret['author'] = this._extractAuthors(ret['author']);
            }
        }
        return ret;
    },

    /**
     * Checking whether the position of the '=' is correct
     *
     * Sometimes there is a problem if a '=' is used inside an entry (for example abstract)+
     * This method checks if the '=' is outside braces then the '=' is correct and true is returned+
     * If the '=' is inside braces it contains to a equation and therefore false is returned+
     *
     * @access private
     * @param string entry The text of the whole remaining entry
     * @param int the current used place of the '='
     * @return bool true if the '=' is correct, false if it contains to an equation
     */
    '_checkEqualSign': function(entry, position)
    {
        var ret = true;
        //This is getting tricky
        //We check the string backwards until the position and count the closing an opening braces
        //If we reach the position the amount of opening and closing braces should be equal
        var length = strlen(entry);
        var open   = 0;
        for (var i = length-1; i >= position; i--) {
            precedingchar = substr(entry, i-1, 1);
            charv          = substr(entry, i, 1);
            if (('{' == charv) && ('\\' != precedingchar)) {
                open++;
            }
            if (('}' == charv) && ('\\' != precedingchar)) {
                open--;
            }
        }
        if (0 != open) {
            ret = false;
        }
        //There is still the posibility that the entry is delimited by double quotes+
        //Then it is possible that the braces are equal even if the '=' is in an equation+
        if (ret) {
            entrycopy = trim(entry);
            lastchar  = substr(entrycopy,strlen(entrycopy)-1,1);
            if (',' == lastchar) {
                lastchar = substr(entrycopy, strlen(entrycopy)-2, 1);
            }
            if ('"' == lastchar) {
                //The return value is set to false
                //If we find the closing " before the '=' it is set to true again+
                //Remember we begin to search the entry backwards so the " has to show up twice - ending and beginning delimiter
                ret = false;
                found = 0;
                for (var i = length; i >= position; i--) {
                    precedingchar = substr(entry, i-1, 1);
                    charv          = substr(entry, i, 1);
                    if (('"' == charv) && ('\\' != precedingchar)) {
                        found++;
                    }
                    if (2 == found) {
                        ret = true;
                        break;
                    }
                }
            }
        }
        return ret;
    },

    /**
     * Checking if the entry type is allowed
     *
     * @access private
     * @param string entry The entry to check
     * @return bool true if allowed, false otherwise
     */
    '_checkAllowedEntryType': function(entry)
    {
        return in_array(entry, this.allowedEntryTypes);
    },
    
    /**
     * Checking whether an at is outside an entry
     *
     * Sometimes an entry misses an entry brace+ Then the at of the next entry seems to be
     * inside an entry+ This is checked here+ When it is most likely that the at is an opening
     * at of the next entry this method returns true+
     *
     * @access private
     * @param string entry The text of the entry until the at
     * @return bool true if the at is correct, false if the at is likely to begin the next entry+
     */
    '_checkAt': function(entry)
    {
        var ret     = false;
        var opening = array_keys(this._delimiters);
        var closing = array_values(this._delimiters);
        //Getting the value (at is only allowd in values)
        if (strrpos(entry,'=') !== false) {
            position = strrpos(entry, '=');
            proceed  = true;
            if (substr(entry, position-1, 1) == '\\') {
                proceed = false;
            }
            while (!proceed) {
                substring = substr(entry, 0, position);
                position  = strrpos(substring,'=');
                proceed   = true;
                if (substr(entry, position-1, 1) == '\\') {
                    proceed = false;
                }
            }
            value    = trim(substr(entry, position+1));
            open     = 0;
            charv     = '';
            lastchar = '';
            for (var i = 0; i < strlen(value); i++) {
                charv = substr(this.content, i, 1);
                if (in_array(charv, opening) && ('\\' != lastchar)) {
                    open++;
                } else if (in_array(charv, closing) && ('\\' != lastchar)) {
                    open--;
                }
                lastchar = charv;
            }
            //if open is grater zero were are inside an entry
            if (open>0) {
                ret = true;
            }
        }
        return ret;
    },

    /**
     * Stripping Delimiter
     *
     * @access private
     * @param string entry The entry where the Delimiter should be stripped from
     * @return string Stripped entry
     */
    '_stripDelimiter': function(entry)
    {
        var beginningdels = array_keys(this._delimiters);
        var ength        = strlen(entry);
        var firstchar     = substr(entry, 0, 1);
        var lastchar      = substr(entry, -1, 1);
        while (in_array(firstchar, beginningdels)) { //The first character is an opening delimiter
            if (lastchar == this._delimiters[firstchar]) { //Matches to closing Delimiter
                entry = substr(entry, 1, -1);
            } else {
                break;
            }
            firstchar = substr(entry, 0, 1);
            lastchar  = substr(entry, -1, 1);
        }
        return entry;
    },

    /**
     * Unwrapping entry
     *
     * @access private
     * @param string entry The entry to unwrap
     * @return string unwrapped entry
     */
    '_unwrap': function(entry)
    {
        entry = entry.replace(/\s+/, ' ');
        return trim(entry);
    },

    /**
     * Wordwrap an entry
     *
     * @access private
     * @param string entry The entry to wrap
     * @return string wrapped entry
     */
    '_wordwrap': function(entry)
    {
        if ( (''!=entry) && (is_string(entry)) ) {
            entry = wordwrap(entry, this._options['wordWrapWidth'], this._options['wordWrapBreak'], this._options['wordWrapCut']);
        }
        return entry;
    },
  
    /**
     * Extracting the authors
     *
     * @access private
     * @param string entry The entry with the authors
     * @return array the extracted authors
     */
      '_extractAuthors': function(entry) {   
        entry       = this._unwrap(entry);
        
        entry = entry.replace(/\r?\n|\r|\t|\s/g, " ");
        
        var authorarray = array();
        authorarray = split(' and ', entry);
        for (var i = 0; i < sizeof(authorarray); i++) {
                       
            var author = trim(authorarray[i]);
            /*The first version of how an author could be written (First von Last)
             has no commas in it*/
            var first    = '';
            var von      = '';
            var last     = '';
            var jr       = '';
          
            if (strpos(author, ',') === false) {
                var tmparray = array();
                //tmparray = explode(' ', author);
                tmparray = split(' ', author);
                var size     = sizeof(tmparray);
                if (1 == size) { //There is only a last
                    last = tmparray[0];
                } else if (2 == size) { //There is a first and a last
                    first = tmparray[0];
                    last  = tmparray[1];
                } else {
                    var invon  = false;
                    var inlast = false;
                    for (var j=0; j<(size-1); j++) {
                        if (inlast) {
                            last += ' '+tmparray[j];
                        } else if (invon) {
                            casev = this._determineCase(tmparray[j]);
                            if (this.isError(casev)) {
                                // IGNORE?
                            } else if ((0 == casev) || (-1 == casev)) { //Change from von to last
                                //You only change when there is no more lower case there
                                 var islast = true;
                                for (var k=(j+1); k<(size-1); k++) {
                                    futurecase = this._determineCase(tmparray[k]);
                                    if (this.isError(casev)) {
                                        // IGNORE?
                                    } else if (0 == futurecase) {
                                        islast = false;
                                    }
                                }
                                if (islast) {
                                    inlast = true;
                                    if (-1 == casev) { //Caseless belongs to the last
                                        last += ' '+tmparray[j];
                                    } else {
                                        von  += ' '+tmparray[j];
                                    }
                                } else {
                                    von    += ' '+tmparray[j];
                                }
                            } else {
                                von += ' '+tmparray[j];
                            }
                        } else {
                            var casev = this._determineCase(tmparray[j]);
                            if (this.isError(casev)) {
                                // IGNORE?
                            } else if (0 == casev) { //Change from first to von
                                invon = true;
                                von   += ' '+tmparray[j];
                            } else {
                                first += ' '+tmparray[j];
                            }
                        }
                    }
                    //The last entry is always the last!
                    last += ' '+tmparray[size-1];
                }
            } else { //Version 2 and 3
              
                             
                var tmparray     = array();
                tmparray     = explode(',', author);
                //The first entry must contain von and last
                var vonlastarray = array();
                vonlastarray = explode(' ', tmparray[0]);
                var size         = sizeof(vonlastarray);
                if (1==size) { //Only one entry.got to be the last
                    last = vonlastarray[0];
                } else {
                    inlast = false;
                    for (var j=0; j<(size-1); j++) {
                        if (inlast) {
                            last += ' '+vonlastarray[j];
                        } else {
                            if (0 != (this._determineCase(vonlastarray[j]))) { //Change from von to last
                                islast = true;
                                for (var k=(j+1); k<(size-1); k++) {
                                    this._determineCase(vonlastarray[k]);
                                    casev = this._determineCase(vonlastarray[k]);
                                    if (this.isError(casev)) {
                                        // IGNORE?
                                    } else if (0 == casev) {
                                        islast = false;
                                    }
                                }
                                if (islast) {
                                    inlast = true;
                                    last   += ' '+vonlastarray[j];
                                } else {
                                    von    += ' '+vonlastarray[j];
                                }
                            } else {
                                von    += ' '+vonlastarray[j];
                            }
                        }
                    }
                    last += ' '+vonlastarray[size-1];
                }
                //Now we check if it is version three (three entries in the array (two commas)
                if (3==sizeof(tmparray)) {
                    jr = tmparray[1];
                }
                //Everything in the last entry is first
                first = tmparray[sizeof(tmparray)-1];
            }

            authorarray[i] = {'first':trim(first), 'von':trim(von), 'last':trim(last), 'jr':trim(jr)};
        }
        return authorarray;
    },
  
  
  'checkSpecialChars': function(ordv){
    
    var isSpecialChar = false;
    
    if(ordv>=192 && ordv <= 223){
      isSpecialChar = true;
    }
    
    return isSpecialChar;
  },

    /**
     * Case Determination according to the needs of BibTex
     *
     * To parse the Author(s) correctly a determination is needed
     * to get the Case of a word+ There are three possible values:
     * - Upper Case (return value 1)
     * - Lower Case (return value 0)
     * - Caseless   (return value -1)
     *
     * @access private
     * @param string word
     * @return int The Case or PEAR_Error if there was a problem
     */
  
  
    '_determineCase': function(word) {
        var ret         = -1;
        var trimmedword = trim (word);
        /*We need this variable+ Without the next of would not work
         (trim changes the variable automatically to a string!)*/
        if (is_string(word) && (strlen(trimmedword) > 0)) {
            var i         = 0;
            var found     = false;
            var openbrace = 0;
            while (!found && (i <= strlen(word))) {
                var letter = substr(trimmedword, i, 1);
                var ordv    = ord(letter);
                if (ordv == 123) { //Open brace
                    openbrace++;
                }
                if (ordv == 125) { //Closing brace
                    openbrace--;
                }
                if ((ordv>=65) && (ordv<=90) && (0==openbrace)) { //The first character is uppercase
                    ret   = 1;
                    found = true;
                } else if ( (ordv>=97) && (ordv<=122) && (0==openbrace) ) { //The first character is lowercase
                    ret   = 0;
                    found = true;
                } else if(this.checkSpecialChars(ordv) && (0==openbrace)){ //si la 1º letra es mayus con tilde
                    ret   = 1;
                    found = true;
                }else{ //Not yet found
                    i++;
                }
            }
        } else {
            ret = this.raiseError('Could not determine case on word: '+word);
        }
        return ret;
    },
    
    
    'isError': function(obj){
      return ( typeof(obj) == 'Object' && obj.isError == 1 );
    
    },

    /**
     * Validation of a value
     *
     * There may be several problems with the value of a field+
     * These problems exist but do not break the parsing+
     * If a problem is detected a warning is appended to the array warnings+
     *
     * @access private
     * @param string entry The entry aka one line which which should be validated
     * @param string wholeentry The whole BibTex Entry which the one line is part of
     * @return void
     */
    '_validateValue': function(entry, wholeentry)
    {
        //There is no @ allowed if the entry is enclosed by braces
        if ( entry.match(/^{.*@.*}/)) {
            this._generateWarning('WARNING_AT_IN_BRACES', entry, wholeentry);
        }
        //No escaped " allowed if the entry is enclosed by double quotes
        if (entry.match(/^\".*\\".*\"/)) {
            this._generateWarning('WARNING_ESCAPED_DOUBLE_QUOTE_INSIDE_DOUBLE_QUOTES', entry, wholeentry);
        }
        //Amount of Braces is not correct
        var open     = 0;
        var lastchar = '';
        var charv     = '';
        for (var i = 0; i < strlen(entry); i++) {
            charv = substr(entry, i, 1);
            if (('{' == charv) && ('\\' != lastchar)) {
                open++;
            }
            if (('}' == charv) && ('\\' != lastchar)) {
                open--;
            }
            lastchar = charv;
        }
        if (0 != open) {
            this._generateWarning('WARNING_UNBALANCED_AMOUNT_OF_BRACES', entry, wholeentry);
        }
    },

    /**
     * Remove curly braces from entry
     *
     * @access private
     * @param string value The value in which curly braces to be removed
     * @param string Value with removed curly braces
     */
    '_removeCurlyBraces': function(value)
    {
        //First we save the delimiters
        var beginningdels = array_keys(this._delimiters);
        var firstchar     = substr(value, 0, 1);
        var lastchar      = substr(value, -1, 1);
        var begin         = '';
        var end           = '';
        while (in_array(firstchar, beginningdels)) { //The first character is an opening delimiter
            if (lastchar == this._delimiters[firstchar]) { //Matches to closing Delimiter
                begin += firstchar;
                end   += lastchar;
                value  = substr(value, 1, -1);
            } else {
                break;
            }
            firstchar = substr(value, 0, 1);
            lastchar  = substr(value, -1, 1);
        }
        //Now we get rid of the curly braces
        var pattern     = '/([^\\\\])\{(+*?[^\\\\])\}/';
        var replacement = '12';
        value       = value.replace(/([^\\\\])\{(.*?[^\\\\])\}/, replacement);
        //Reattach delimiters
        value       = begin+value+end;
        return value;
    },
    
    /**
     * Generates a warning
     *
     * @access private
     * @param string type The type of the warning
     * @param string entry The line of the entry where the warning occurred
     * @param string wholeentry OPTIONAL The whole entry where the warning occurred
     */
    '_generateWarning': function(type, entry, wholeentry)
    {
      if ( typeof wholeentry == 'undefined' ) wholeentry = '';
        warning['warning']    = type;
        warning['entry']      = entry;
        warning['wholeentry'] = wholeentry;
        this.warnings[this.warnings.length]      = warning;
    },

    /**
     * Cleares all warnings
     *
     * @access public
     */
    'clearWarnings': function()
    {
        this.warnings = array();
    },

    /**
     * Is there a warning?
     *
     * @access public
     * @return true if there is, false otherwise
     */
    'hasWarning': function()
    {
        if (sizeof(this.warnings)>0) return true;
        else return false;
    },

    /**
     * Returns the amount of available BibTex entries
     *
     * @access public
     * @return int The amount of available BibTex entries
     */
    'amount': function()
    {
        return sizeof(this.data);
    },
    /**
     * Returns the author formatted
     *
     * The Author is formatted as setted in the authorstring
     *
     * @access private
     * @param array array Author array
     * @return string the formatted author string
     */
    '_formatAuthor': function(array)
    {
        if (!array_key_exists('von', array)) {
            array['von'] = '';
        } else {
            array['von'] = trim(array['von']);
        }
        if (!array_key_exists('last', array)) {
            array['last'] = '';
        } else {
            array['last'] = trim(array['last']);
        }
        if (!array_key_exists('jr', array)) {
            array['jr'] = '';
        } else {
            array['jr'] = trim(array['jr']);
        }
        if (!array_key_exists('first', array)) {
            array['first'] = '';
        } else {
            array['first'] = trim(array['first']);
        }
        var ret = this.authorstring;
        ret = str_replace("VON", array['von'], ret);
        ret = str_replace("LAST", array['last'], ret);
        ret = str_replace("JR", array['jr'], ret);
        ret = str_replace("FIRST", array['first'], ret);
        return trim(ret);
    },

    /**
     * Converts the stored BibTex entries to a BibTex String
     *
     * In the field list, the author is the last field+
     *
     * @access public
     * @return string The BibTex string
     */
    'bibTex': function()
    {
        var bibtex = '';
        for (var i=0 ; i<this.data.length; i++) {
          var entry = this.data[i];
            //Intro
            bibtex += '@'+strtolower(entry['entryType'])+' { '+entry['cite']+",\n";
            //Other fields except author
            for (key in entry) {
              var val = entry[key];
                if (this._options['wordWrapWidth']>0) {
                    val = this._wordWrap(val);
                }
                if (!in_array(key, array('cite','entryType','author'))) {
                    bibtex += "\t"+key+' = {'+val+"},\n";
                }
            }
            //Author
            if (array_key_exists('author', entry)) {
                if (this._options['extractAuthors']) {
                    tmparray = array(); //In this array the authors are saved and the joind with an and
                    for (j in entry['author']) {
                      var authorentry = entry['author'][j];
                        tmparray[tmparray.length] = this._formatAuthor(authorentry);
                    }
                    author = join(' and ', tmparray);
                } else {
                    author = entry['author'];
                }
            } else {
                author = '';
            }
            bibtex += "\tauthor = {"+author+"}\n";
            bibtex+="}\n\n";
        }
        return bibtex;
    },

    /**
     * Adds a new BibTex entry to the data
     *
     * @access public
     * @param array newentry The new data to add
     * @return void
     */
    'addEntry': function(newentry)
    {
        this.data[this.data.length] = newentry;
    },

    /**
     * Returns statistic
     *
     * This functions returns a hash table+ The keys are the different
     * entry types and the values are the amount of these entries+
     *
     * @access public
     * @return array Hash Table with the data
     */
    'getStatistic': function()
    {
        var ret = array();
        for (var i=0; i<this.data.length; i++) {
          var entry = this.data[i];
            if (array_key_exists(entry['entryType'], ret)) {
                ret[entry['entryType']]++;
            } else {
                ret[entry['entryType']] = 1;
            }
        }
        return ret;
    },
    
    /**
     * Returns the stored data in RTF format
     *
     * This method simply returns a RTF formatted string+ This is done very
     * simple and is not intended for heavy using and fine formatting+ This
     * should be done by BibTex! It is intended to give some kind of quick
     * preview or to send someone a reference list as word/rtf format (even
     * some people in the scientific field still use word)+ If you want to
     * change the default format you have to override the class variable
     * "rtfstring"+ This variable is used and the placeholders simply replaced+
     * Lines with no data cause an warning!
     *
     * @return string the RTF Strings
     */
    'rtf': function()
    {
        var ret = "{\\rtf\n";
        for (var i=0; i<this.data.length; i++) {
          var entry = this.data[i];
            line    = this.rtfstring;
            title   = '';
            journal = '';
            year    = '';
            authors = '';
            if (array_key_exists('title', entry)) {
                title = this._unwrap(entry['title']);
            }
            if (array_key_exists('journal', entry)) {
                journal = this._unwrap(entry['journal']);
            }
            if (array_key_exists('year', entry)) {
                year = this._unwrap(entry['year']);
            }
            if (array_key_exists('author', entry)) {
                if (this._options['extractAuthors']) {
                    tmparray = array(); //In this array the authors are saved and the joind with an and
                    for (var j in entry['author']) {
                      var authorentry = entry['author'][j];
                        tmparray[tmparray.length] = this._formatAuthor(authorentry);
                    }
                    authors = join(', ', tmparray);
                } else {
                    authors = entry['author'];
                }
            }
            if ((''!=title) || (''!=journal) || (''!=year) || (''!=authors)) {
                line = str_replace("TITLE", title, line);
                line = str_replace("JOURNAL", journal, line);
                line = str_replace("YEAR", year, line);
                line = str_replace("AUTHORS", authors, line);
                line += "\n\\par\n";
                ret  += line;
            } else {
                this._generateWarning('WARNING_LINE_WAS_NOT_CONVERTED', '', print_r(entry,1));
            }
        }
        ret += '}';
        return ret;
    },

    /**
     * Returns the stored data in HTML format
     *
     * This method simply returns a HTML formatted string+ This is done very
     * simple and is not intended for heavy using and fine formatting+ This
     * should be done by BibTex! It is intended to give some kind of quick
     * preview+ If you want to change the default format you have to override
     * the class variable "htmlstring"+ This variable is used and the placeholders
     * simply replaced+
     * Lines with no data cause an warning!
     *
     * @return string the HTML Strings
     */
    'html': function(min,max)
    {
      if ( typeof min == 'undefined' ) min = 0;
      if ( typeof max == 'undefined' ) max = this.data.length;
        var ret = "<p>\n";
        for (var i =min; i<max; i++){
          var entry = this.data[i];
            var line    = this.htmlstring;
            var title   = '';
            var journal = '';
            var year    = '';
            var authors = '';
            if (array_key_exists('title', entry)) {
                title = this._unwrap(entry['title']);
            }
            if (array_key_exists('journal', entry)) {
                journal = this._unwrap(entry['journal']);
            }
            if (array_key_exists('year', entry)) {
                year = this._unwrap(entry['year']);
            }
            if (array_key_exists('author', entry)) {
                if (this._options['extractAuthors']) {
                    tmparray = array(); //In this array the authors are saved and the joind with an and
                    for (j in entry['author'] ) {
                      var authorentry = entry['author'][j];
                        tmparray[tmparray.length] = this._formatAuthor(authorentry);
                    }
                    authors = join(', ', tmparray);
                } else {
                    authors = entry['author'];
                }
            }
            
            if ((''!=title) || (''!=journal) || (''!=year) || (''!=authors)) {
                line = str_replace("TITLE", title, line);
                line = str_replace("JOURNAL", journal, line);
                line = str_replace("YEAR", year, line);
                line = str_replace("AUTHORS", authors, line);
                line += "\n";
                ret  += line;
            } else {
                this._generateWarning('WARNING_LINE_WAS_NOT_CONVERTED', '', print_r(entry,1));
            }
        }
        ret += "</p>\n";
        return ret;
    },
  'checkRequieredFields' : function(entry, ret)
   {
     
     var exito = true;  
     
     //Existe alguno de los dos??
     if(entry['entryType'] == "book" /**/|| entry['entryType'] == "inbook"/**/){
       if (array_key_exists('editor', entry) || array_key_exists('author', entry)) {
         if (array_key_exists('author', entry)) { 
           ret.authors = entry['author'];                                                   //BOOK ---> EDITOR O AUTHOR
         }
         if (array_key_exists('editor', entry)) {
           ret.editor = this._unwrap(entry['editor']);
         }
         
       }else{
         exito = false;
       }       
     }else if(entry['entryType'] != "proceedings" && entry['entryType'] != "booklet" && entry['entryType'] != "manual"){
       if (array_key_exists('author', entry)) { 
           ret.authors = entry['author'];                //AUTHOR
       }else{
         exito = false;
       }
     }
     
     
     if (array_key_exists('title', entry)) {
       ret.title = this._unwrap(entry['title']);   // TITLE
     }
     else{
       exito = false;
     }
     
     
     if (entry['entryType'] == "inproceedings") {
       if(array_key_exists('booktitle', entry)){
         ret.booktitle = this._unwrap(entry['booktitle']);    // inproceedings --> booktitle
       }
       else{
         exito = false;
       }
     }
     
     
     if (entry['entryType'] == "mastersthesis" || entry['entryType'] == "phdthesis" ) {
       if(array_key_exists('school', entry)){
         ret.school = this._unwrap(entry['school']);    // mastersthesis o phdthesis --> school
       }
       else{
         exito = false;
       }
     }
     
     
     if (entry['entryType'] == "techreport") {
       if(array_key_exists('institution', entry)){
         ret.institution = this._unwrap(entry['institution']);    // techreport --> institution
       }
       else{
         exito = false;
       }
     }
     /*************************************************************/
     if (entry['entryType'] == "conference") {
       if(array_key_exists('booktitle', entry)){
         ret.booktitle = this._unwrap(entry['booktitle']);    // conference --> booktitle
       }
       else{
         exito = false;
       }
     }
     
     if (entry['entryType'] == "inbook") {
       /**/if(array_key_exists('chapter', entry) || array_key_exists('pages', entry)){
         if(array_key_exists('chapter', entry)){
           ret.chapter = this._unwrap(entry['chapter']);    // inbook --> chapter
         }
         /**/else{
           /**/ret.pages = this._unwrap(entry['pages']);    // inbook --> pages
        /**/ }
         
       /**/}
       else{
         exito = false;
       }
     }
     
     if (entry['entryType'] == "inbook") {
       if(array_key_exists('publisher', entry)){
         ret.publisher = this._unwrap(entry['publisher']);    // inbook --> publisher
       }
       else{
         exito = false;
       }
     }
     
     if (entry['entryType'] == "incollection") {
       if(array_key_exists('booktitle', entry)){
         ret.booktitle = this._unwrap(entry['booktitle']);    // incollection --> booktitle
       }
       else{
         exito = false;
       }
     }
     
     if (entry['entryType'] == "incollection") {
       if(array_key_exists('publisher', entry)){
         ret.publisher = this._unwrap(entry['publisher']);    // incollection --> publisher
       }
       else{
         exito = false;
       }
     }
     
     if (entry['entryType'] == "unpublished") {
       if(array_key_exists('note', entry)){
         ret.note = this._unwrap(entry['note']);    // unpublished --> note
       }
       else{
         exito = false;
       }
     }
     
     /*************************************************************/
     if (entry['entryType'] == "book") {
       if(array_key_exists('publisher', entry)){
         ret.publisher = this._unwrap(entry['publisher']);    // BOOK --> PUBLISHER
       }
       else{
         exito = false;
       }
     }
     
     
     if (entry['entryType'] == "article") {
       if(array_key_exists('journal', entry)){             //ARTICLE --> JOURNAL
         ret.journal = this._unwrap(entry['journal']);
       }
       else{
         exito = false;
       }
     }   
     
     if(entry['entryType'] != "booklet" && entry['entryType'] != "manual" && entry['entryType'] != "unpublished"){
       if (array_key_exists('year', entry)) {
         ret.year = this._unwrap(entry['year']);               //YEAR
       }
       else{
         exito = false;
       }
     }
    
     return exito;
     
    },
  'transformMonth': function(month){
    var newMonth = month;
    switch(month){
      case 'jan':
        newMonth = 'January';
        break;
      case 'feb':
        newMonth = 'February';
        break;
      case 'mar':
        newMonth = 'March';
        break;
      case 'apr':
        newMonth = 'April';
        break;
      case 'may':
        newMonth = 'May';
        break;
      case 'jun':
        newMonth = 'June';
        break;
      case 'jul':
        newMonth = 'July';
        break;
      case 'aug':
        newMonth = 'August';
        break;
      case 'sep':
        newMonth = 'September';
        break;
      case 'oct':
        newMonth = 'October';
        break;
      case 'nov':
        newMonth = 'November';
        break;
      case 'dec':
        newMonth = 'December';
        break;
      default:
        //no hago nada              
    }
    return newMonth;
  },
  
 'checkOptionalFieldsThesis': function(entry, ret){   
   
   //Optional fields: type, address, month, note.
   
   if (array_key_exists('month', entry)) {          
     var month = this._unwrap(entry['month']);
     month = this.transformMonth(month);
     ret.month = month;
   }
   if (array_key_exists('type', entry)) {
     ret.type = this._unwrap(entry['type']);
   } 
   if (array_key_exists('address', entry)) {
     ret.address = this._unwrap(entry['address']);
   }
   if (array_key_exists('note', entry)) {
     ret.note = this._unwrap(entry['note']);
   }
   /*if (array_key_exists('date-added', entry)) {
     ret.date_added = entry['date-added'];
     }                                                           //DESCAMENTAR SI SE QUIEREN AÑADIR
   if (array_key_exists('date-modified', entry)) {
     ret.date_modified = entry['date-modified'];
   }  */
   
   return ret;
  },
  
  'checkOptionalFieldsProceeding': function(entry,ret){
    
    //Optional fields: editor, volume or number, series, address, publisher, note, month, organization.
    
    if (array_key_exists('month', entry)) {           
      var month = this._unwrap(entry['month']);
      month = this.transformMonth(month);
      ret.month = month;
    }      
    if (array_key_exists('editor', entry)) {
      ret.editor = this._unwrap(entry['editor']);
    }
    if (array_key_exists('series', entry)) {
      ret.series = this._unwrap(entry['series']);
    }  
    if (array_key_exists('address', entry)) {
      ret.address = this._unwrap(entry['address']);
    } 
    if (array_key_exists('publisher', entry)) {
      ret.publisher = this._unwrap(entry['publisher']);
    }     
    if (array_key_exists('note', entry)) {
      ret.note = this._unwrap(entry['note']);
    }  
    if (array_key_exists('organization', entry)) {
      ret.organization = this._unwrap(entry['organization']);
    }
    /*if (array_key_exists('volume', entry) && array_key_exists('number', entry)) { //no puede existir los dos a la vez
      ret.exito = false;
    }*/else if(array_key_exists('volume', entry) || array_key_exists('number', entry)){ //si existe alguno de los dos los añado
      if (array_key_exists('volume', entry)) {
        ret.volume = this._unwrap(entry['volume']);
      }
      if (array_key_exists('number', entry)) {
        ret.number = this._unwrap(entry['number']);
      }
    } 
    
    return ret;
  }, 
  
 'google': function(pos){
      var entry = this.data[pos];
      var line    = this.googlestring;
      
      var ret = {};
        
      switch(entry['entryType']){
        case "book":
          
          //Required fields: author or editor, title, publisher, year.
          
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){   // SI NO HAY EXITO (FALTA ALGUN CAMPO OBLIGATORIO MANDAR FALLO
            
            if (array_key_exists('month', entry)) {           
              var month = this._unwrap(entry['month']);
              month = this.transformMonth(month);
              ret.month = month;
            } 
            if(array_key_exists('volume', entry) && array_key_exists('number', entry)){  //no puede existir los dos a la vez
              ret.exito = false;
            }else if(array_key_exists('volume', entry) || array_key_exists('number', entry)){
              if (array_key_exists('volume', entry)) {
                ret.volume = this._unwrap(entry['volume']);
              }
              if (array_key_exists('number', entry)) {
                ret.number = this._unwrap(entry['number']);
              }
            }           
            if (array_key_exists('pages', entry)) {
              ret.pages = this._unwrap(entry['pages']);
            } 
            if (array_key_exists('series', entry)) {
              ret.series = this._unwrap(entry['series']);
            }
            if (array_key_exists('address', entry)) {
              ret.address = this._unwrap(entry['address']);
            }
            if (array_key_exists('edition', entry)) {
              ret.edition = this._unwrap(entry['edition']);
            }            
            if (array_key_exists('note', entry)) {
              ret.note = this._unwrap(entry['note']);
            }             
            /*if (array_key_exists('annote', entry)) {
              ret.annote = this._unwrap(entry['annote']);
            }
            if (array_key_exists('isbn', entry)) {
              ret.isbn = this._unwrap(entry['isbn']);
            } 
            if (array_key_exists('crossrefonly', entry)) {                     
              ret.crossrefonly = this._unwrap(entry['crossrefonly']);
            }
            if (array_key_exists('booktitle', entry)) {                        //DESCAMENTAR SI SE QUIEREN AÑADIR
              ret.booktitle = this._unwrap(entry['booktitle']);
            }
            if (array_key_exists('key', entry)) {
              ret.key = this._unwrap(entry['key']);
            }         
            if (array_key_exists('date_added', entry)) {
              ret.date_added = this._unwrap(entry['date_added']);
            }
            if (array_key_exists('date_modified', entry)) {
              ret.date_modified = this._unwrap(entry['date_modified']);
            }*/
            
          }                 
        break;
        case "article":     
          
          //Required fields: author, title, journal, year.
          //Optional fields: volume, number, pages, month, note.
          
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;          
          
          if(exito){
            
            if (array_key_exists('month', entry)) {          
              var month = this._unwrap(entry['month']);
              month = this.transformMonth(month);
              ret.month = month;
            } 
            if (array_key_exists('volume', entry)) {
              ret.volume = this._unwrap(entry['volume']);
            }
            if (array_key_exists('number', entry)) {
              ret.number = this._unwrap(entry['number']);
            }
            if (array_key_exists('pages', entry)) {
              ret.pages = this._unwrap(entry['pages']);
            }  
            if (array_key_exists('note', entry)) {
              ret.note = this._unwrap(entry['note']);   
            } 
            /*if (array_key_exists('publisher', entry)) {
              ret.publisher = this._unwrap(entry['publisher']);
            }
            if (array_key_exists('numpages', entry)) {
              ret.numpages = this._unwrap(entry['numpages']);
            }
            if (array_key_exists('address', entry)) {
              ret.address = this._unwrap(entry['address']);
            }
            if (array_key_exists('issue_date', entry)) {
              ret.issue_date = this._unwrap(entry['issue_date']);
            }
            if (array_key_exists('url', entry)) {
              ret.url = this._unwrap(entry['url']);
            }
            if (array_key_exists('doi', entry)) {
              ret.doi = this._unwrap(entry['doi']);
            }
            if (array_key_exists('acmid', entry)) {
              ret.acmid = this._unwrap(entry['acmid']);
            }
            if (array_key_exists('issn', entry)) {               //DESCAMENTAR SI SE QUIEREN AÑADIR
              ret.issn = this._unwrap(entry['issn']);
            }
            if (array_key_exists('keywords', entry)) {
              ret.keywords = this._unwrap(entry['keywords']);
            }
            if (array_key_exists('articleno', entry)) {
              ret.articleno = this._unwrap(entry['articleno']);
            }*/
            
          }
        break;
        
        case "booklet":
          //Required fields: title.
          //Optional fields: author, howpublished, address, month, year, note
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
          
          if(exito){
            if (array_key_exists('author', entry)) {
              ret.authors = entry['author'];
            }
            if (array_key_exists('year', entry)) {
              ret.year = this._unwrap(entry['year']);
            }
            if (array_key_exists('month', entry)) {          
                var month = this._unwrap(entry['month']);
                month = this.transformMonth(month);
                ret.month = month;
            }
            if (array_key_exists('note', entry)) {
              ret.note = this._unwrap(entry['note']);   
            } 
            if (array_key_exists('howpublished', entry)) {
              ret.howpublished = this._unwrap(entry['howpublished']);
            }
            if (array_key_exists('address', entry)) {
              ret.address = this._unwrap(entry['address']);
            }
          }
          
        break;
        
        case "inbook":
          //Required fields: author, title, chapter, publisher, year.
          //Optional fields: volume, series, type, address, edition, month, note
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
          
          if(exito){
            if (array_key_exists('volume', entry)) {
              ret.volume = this.unwrap(entry['volume']);
            }
            if (array_key_exists('series', entry)) {
              ret.series = this._unwrap(entry['series']);
            }
            if (array_key_exists('type', entry)) {          
              ret.type = this._unwrap(entry['type']);
            }
            if (array_key_exists('note', entry)) {
              ret.note = this._unwrap(entry['note']);   
            }
            if (array_key_exists('month', entry)) {
              var month = this._unwrap(entry['month']);
              month = this.transformMonth(month);
              ret.month = month;   
            } 
            if (array_key_exists('edition', entry)) {
              ret.edition = this._unwrap(entry['edition']);
            }
            if (array_key_exists('address', entry)) {
              ret.address = this._unwrap(entry['address']);
            }
          }
          
        break;
          
        case "misc":
          
          //Required fields: none.
          //Optional fields: author, title, howpublished, month, year, note.
                    
          if (array_key_exists('author', entry)) {
            ret.authors = entry['author'];
          }
          if (array_key_exists('title', entry)) {
            ret.title = this._unwrap(entry['title']);
          }
          if (array_key_exists('year', entry)) {
            ret.year = this._unwrap(entry['year']);
          }
          if (array_key_exists('month', entry)) {          
              var month = this._unwrap(entry['month']);
              month = this.transformMonth(month);
              ret.month = month;
          }
          if (array_key_exists('note', entry)) {
            ret.note = this._unwrap(entry['note']);   
          } 
          if (array_key_exists('howpublished', entry)) {
            ret.howpublished = this._unwrap(entry['howpublished']);
          }  
          
          /*if (array_key_exists('key', entry)) {
            ret.key = entry['key'];
          }
          if (array_key_exists('date-added', entry)) {             //DESCAMENTAR SI SE QUIEREN AÑADIR
            ret.date_added = entry['date-added'];
          }
          if (array_key_exists('date-modified', entry)) {
            ret.date_modified = entry['date-modified'];
          } */    
          
          //si no existe ningun campo optional es que el documento está vacio --> ERROR
          if(!array_key_exists('author', entry) && !array_key_exists('title', entry) && !array_key_exists('howpublished', entry) && !array_key_exists('year', entry) && !array_key_exists('note', entry) && !array_key_exists('month', entry)){
            ret.exito = false;
          }else{
            ret.exito = true;
          }
                  
        break;
        case "mastersthesis":

          //Required fields: author, title, school, year.
                             
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){
            ret = this.checkOptionalFieldsThesis(entry, ret);
            
            /*if (array_key_exists('publisher', entry)) {
              ret.publisher = this._unwrap(entry['publisher']);                  //DESCAMENTAR SI SE QUIEREN AÑADIR
            }*/
          }
        
        break;
        case "phdthesis":
          
          //Required fields: author, title, school, year.
                    
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){
            ret = this.checkOptionalFieldsThesis(entry, ret);
          }
          
        break;
        case "techreport":
          
          //Required fields: author, title, institution, year.
          //Optional fields: type, number, address, month, note.
                   
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){
            if (array_key_exists('month', entry)) {          
              var month = this._unwrap(entry['month']);
              month = this.transformMonth(month);
              ret.month = month;
            }    
            if (array_key_exists('type', entry)) {
              ret.type = this._unwrap(entry['type']);
            }           
            if (array_key_exists('number', entry)) {
              ret.number = this._unwrap(entry['number']);
            }
            if (array_key_exists('address', entry)) {
              ret.address = this._unwrap(entry['address']);
            }
            if (array_key_exists('note', entry)) {
              ret.note = this._unwrap(entry['note']);
            } 
            /*if (array_key_exists('pages', entry)) {
              ret.pages = this._unwrap(entry['pages']);
            } 
            if (array_key_exists('publisher', entry)) {
              ret.publisher = this._unwrap(entry['publisher']);
            }
            if (array_key_exists('source', entry)) {
              ret.source = this._unwrap(entry['source']);
            }
            if (array_key_exists('institution', entry)) {
              ret.institution = this._unwrap(entry['institution']);
            }
            if (array_key_exists('pdfurl', entry)) {
              ret.pdfurl = this._unwrap(entry['pdfurl']);
            }
            if (array_key_exists('booktitle', entry)) {                     //DESCAMENTAR SI SE QUIEREN AÑADIR
              ret.booktitle = this._unwrap(entry['booktitle']);
            }
            if (array_key_exists('bdsk-url-1', entry)) {
              ret.bdsk_url_1 = this._unwrap(entry['bdsk-url-1']);
            }
            if (array_key_exists('keywords', entry)) {
              ret.keywords = this._unwrap(entry['keywords']);
            }
            if (array_key_exists('url', entry)) {
              ret.url = this._unwrap(entry['url']);
            }
            if (array_key_exists('date-added', entry)) {
              ret.date_added = entry['date-added'];
            }
            if (array_key_exists('date-modified', entry)) {
              ret.date_modified = entry['date-modified'];
            }
                               
            if (array_key_exists('ymas', entry)) {
              ret.ymas = this._unwrap(entry['ymas']);
            }*/
          }
          
        break;
        
        case "incollection":
          
          //Required fields: author, title, booktitle, publisher, year
          
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){            
            ret = this.checkOptionalFieldsProceeding(entry, ret);
            
            if (array_key_exists('type', entry)) {
              ret.type = this._unwrap(entry['type']);
            }
            if (array_key_exists('chapter', entry)) {
              ret.chapter = this._unwrap(entry['chapter']);
            }
            if (array_key_exists('edition', entry)) {
              ret.edition = this._unwrap(entry['edition']);
            }
          }
          
        break;
          
        case "inproceedings":
          
          //Required fields: author, title, booktitle, year
          
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){            
            ret = this.checkOptionalFieldsProceeding(entry, ret);
            
            if (array_key_exists('pages', entry)) {
              ret.pages = this._unwrap(entry['pages']);
            }
          }
          
        break;
        
        case "conference":
          
          //Required fields: author, title, booktitle, year
          
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){            
            ret = this.checkOptionalFieldsProceeding(entry, ret);
            
            if (array_key_exists('pages', entry)) {
              ret.pages = this._unwrap(entry['pages']);
            }
          }
          
        break;
        
        case "proceedings":
          
          //Required fields: title, year.      
          
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){
            ret = this.checkOptionalFieldsProceeding(entry, ret);
          }
          
        break;
        
        case "manual":
          
          //Required fields: title
          
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){            
            
            
            if (array_key_exists('author', entry)) {
              ret.authors = entry['author'];
            }
            if (array_key_exists('organization', entry)) {
              ret.organization = this._unwrap(entry['organization']);
            }
            if (array_key_exists('address', entry)) {
              ret.address = this._unwrap(entry['address']);
            }
            if (array_key_exists('edition', entry)) {
              ret.edition = this._unwrap(entry['edition']);
            }
            if (array_key_exists('month', entry)) {
              var month = this._unwrap(entry['month']);
              month = this.transformMonth(month);
              ret.month = month;
            }
            if (array_key_exists('year', entry)) {
              ret.year = this._unwrap(entry['year']);
            }
            if (array_key_exists('note', entry)) {
              ret.note = this._unwrap(entry['note']);
            }
          }
          
        break;
        
        case "unpublished":
          
          //Required fields: author, title, note.
          
          var exito = this.checkRequieredFields(entry, ret);
          ret.exito = exito;
         
          if(exito){            
            if (array_key_exists('month', entry)) {
              var month = this._unwrap(entry['month']);
              month = this.transformMonth(month);
              ret.month = month;
            }
            if (array_key_exists('year', entry)) {
              ret.year = this._unwrap(entry['year']);
            }
          }
          
        break;
          
      }
      
      ret.entryType = entry['entryType'];      
      ret.clave = entry['cite'];
      
      return ret;
   
   }
};

/*

REFERENCIAS:

Dudas puntuales: StackOverflow

Programación y documentación de las diferentes clases que se pueden usar de Google AppScript: https://developers.google.com/apps-script/reference/document/

FORMATO PARA EL CAMPO AUTHOR: https://www.tug.org/TUGboat/tb27-2/tb87hufflen.pdf

INFORMACION DE LOS CAMPOS DE UN .bib: https://es.wikipedia.org/wiki/BibTeX

PÁGINA ONLINE PARA PROBAR EXPRESIONES REGULARES: https://regex101.com/r/vNZNnz/4

DOCUMENTACIÓN SOBRE BIBTEX: ftp://ftp.ctan.org/tex-archive/info/spanish/guia-bibtex/guia-bibtex.pdf

Como publicar un ADD-ON (complemento): https://developers.google.com/apps-script/add-ons/publish

Campos obligatorios y opcionales según las diferentes entradas de BibTex: https://www.andy-roberts.net/res/writing/latex/bibentries.pdf

*/
