// ### VARIABLES ###

// Array de palabras
var palabras = [
                                ["VALUES", "Insercion de datos."], 
				["Definicion", "LDD"], 
				["Manipulacion", "LMD"], 
				["Control", "LCD"], 
				["SentenciasSQL", "LDD-LMD-LCD"], 
				["CREATE", "Añade un nuevo objeto en la base de datos."], 
				["DROP", "Suprime un objeto de la base de datos."], 
				["ALTER", "Modifica la estructura de una tabla existente."], 
				["TRUNCATE", "Permite borrar el contenido completo de la tabla especificada."], 
				["SELECT", "Recupera datos de la base de datos."], 
				["DELETE", "Suprime filas de datos de la base de datos."], 
				["INSERT", "Añade nuevas filas de datos a la base de datos."], 
				["UPDATE", "Modifica datos existentes en la base de datos."], 
				["WHERE", "Condicional"], 
				["GROUPBY", "Permite la agrupación de datos."], 
				["ORDERBY", "Permite la ordenación de datos."], 
				["HAVING", "Condición aplicada a los resultados."], 
				["DISTINCT", "Indica que queremos seleccionar sólo los valores distintos."], 
				["ALL", "Indica que queremos seleccionar todos los valores."], 
				["FROM", "Indica la tabla (o tablas) desde la que queremos recuperar los datos."],
                                ["GRANT", "Concede privilegios de acceso a usuarios."],
                                ["REVOKE", "Suprime privilegios de acceso a usuarios."],
                                ["COMMIT", "Finaliza la transacción actual."],
                                ["ROLLBACK", "Deshace la transacción actual."],
                                ["AS", "Redenominar una columna del resultado en una consulta."],
                                ["COUNT", "Cuenta los valores no nulos."],
                                ["SQL", "Lenguaje de Consulta Estructurado."]
                        ];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");


// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = (Math.random() * 19).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' style='margin: 1px;' class='letra btn btn-success' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra btn btn-success' id='"+letra+"'>Ñ</button>";
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    document.getElementById("msg-final").innerHTML = "¡Ganastes Felicitaciones!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function() { location.reload() };
  }else if( cont == 0 ) {
    document.getElementById("msg-final").innerHTML = "¡Juego Terminado, Intentalo Nuevamente!";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
}

// Iniciar
window.onload = inicio();
