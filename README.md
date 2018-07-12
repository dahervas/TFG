# TFG
My TFG proyect
Hi

=============================================
# VERSION 1.1

METAS ALCANZADAS:

-Añadido soporte para un segundo archivo .bib

-Añadido desplegable para mostrar información de los objetos seleccionados

=============================================

METAS PRÓXIMAS:

-El desplegable para mostrar información de objetos, convertirlo a un menú desplegable o una ventana adecuada que muestre sus campos con valores de ejemplo.

-Añadir una ventana con distintos campos en los que se puede escribir un texto y mediante esos valores realizar un filtrado en la bibliografía (EJ: se escribe en el campo "tipo" la palabra 'journal' y en el año el valor '1997 - 2000' por lo que la bibliografía sólo contendrá aquellos que CUMPLAN las condiciones, es decir ,los que sean de tipo journal escritos entre las fechas 1997 y 2000)

=============================================
# VERSION 1.2

METAS ALCANZADAS

-Añadidos filtros funcionales que modifican la bibliografía final, estos filtros sirven para: tipos de documentos, años e intervalos anuales, autores, series y editoriales. 

=============================================

METAS PRÓXIMAS:

-Mostrar la bibliografía resultante de los filtros sustituyendola en el documento con un *\report*.

-Ventana para mostrar información sobre los campos de los documentos.

-Poder realizar una selección mayor de archivos .bib

=============================================
# VERSION 1.3

METAS ALCANZADAS

-Ahora se sustituye en el documento original la cadena *\report* por un informe con los documentos bibliográficos que hayan superado los filtros (si los hay). Para elegir si se quiere mostrar el reporte o realizar la citación y añadir la bibliografía, hay dos botones identificativos.

-Mediante un botón se muestra una ventana destinada a contener un desplegable en el que seleccionar el tipo de documento y obtener los campos obligatorios para dicho tipo.

=============================================

METAS PRÓXIMAS

-Rellenar la ventana con la información de cada tipo de documento.

-Permitir una selección más variada de documentos .bib mediante un array que contenga los elementos seleccionados.

=============================================
# VERSION 1.4

METAS ALCANZADAS

-Ahora el report se crea con subheaders para cada tipo de entrada y estas se ordenan por año (campo *year*) en orden descendente.

-Se ha añadido un desplegable y un botón a la ventana de información/nueva entrada.

=============================================

METAS PRÓXIMAS

-Rellenar la ventana con la información de cada tipo de documento.

-Posibilitar la escritura de una entrada desde la misma ventana donde se muestra la información de cada documento.

-Permitir una selección más variada de documentos .bib mediante un array que contenga los elementos seleccionados.

=============================================
# VERSION 2.1

METAS ALCANZADAS

-Múltiples ficheros .bib añadidos cuando se seleccionan en el desplegable. Pulsando en su ID se eliminan del array.

=============================================

METAS PRÓXIMAS

-Soporte para añadir entradas al fichero .bib

=============================================
# VERSION 2.2

METAS ALCANZADAS

-Soporte para añadir entradas a un fichero .bib (Se permiten *@book*, *@techreport* y *@article* con los campos obligatorios).

-Resolución de *bugs* de cara al reporte.

=============================================

METAS PRÓXIMAS

-Posibilidad de insertar la entrada *@misc* (se pueden poner más).

-Incluir los campos opcionales.

-Comprobar que existen los campos obligatorios.

-[Estilizar el formulario para añadir entradas]

=============================================
# VERSION 2.3

METAS ALCANZADAS

-Soporte para entradas de tipo *article, book, booklet, conference, inbook, incollection, inproceedings, mastersthesis, misc, phdthesis, proceedings y techreport*.

-Incluídos campos opcionales de las entradas anteriores.

-Incluídas comprobaciones de campos obligatorios e IDs no repetidos.

-Resolución de *bugs* de cara a la inclusión de nuevas entradas y su adición al reporte.

=============================================

METAS PRÓXIMAS

-[Estilizar el formulario para añadir entradas]

-[Posibilidad de incluir un botón para comprobar ,previamente a intentar añadir, si existe el ID introducido.]

=============================================
# VERSION 3 [En progreso]

METAS ALCANZADAS

-Cambiar nombre (Combinación de documentos).

-No mostrar en los ficheros seleccionados IDs, mejor nombres.

-No mostrar el nombre de las carpetas al seleccionarlas en el desplegable(No se meten en el array de ficheros).

-Añadir un icono "X" al lado de los nombres para eliminar de manera más intuitiva.

-Permitir espacios en los rangos de años de los filtros.

-Permitir en los filtros de autores añadir and y or (minúsculas).

-Al generar el reporte, cambiar el nombre por: 'Documento original' + 'Report' o algo así.

-Mostrar ayuda al lado de los filtros.

-[Dividir los mensajes de error de IDs duplicados y de campos obligatorios vacíos].

-Valores que pueden ser largos (title, author, journal) en líneas diferentes.

=============================================

METAS PRÓXIMAS

-Corregir error en el filtro de los autores.

-[Al insertar una entrada, al salir del campo ID comprobar automaticamente si está en el fichero .bib (¿onFocus?)].
