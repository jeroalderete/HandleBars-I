import express, { urlencoded } from "express";
import { engine } from "express-handlebars";
import * as path from "path";

import __dirname from "./utils.js";

const app = express();

const PORT = 3000;

app.listen(PORT, (req, res) => {
   console.log(`servidor corriendo en el puerto ${PORT}`);
});

app.use(express.json());

// Es una función que convierte los datos enviados desde un formulario HTML en el cuerpo de la solicitud en un objeto JavaScript.
app.use(urlencoded({ extended: true })); // para recibir datos de formulario y tambien para recibir info mas compleja

//estructura de handlebars

app.engine("handlebars", engine()); // le decimos a nuestro server que vamos a utiilzar handlebars y esta se va a ejecutra con la funcion engine importada arriba
app.set("view engine", "handlebars"); // tenemos que decir que nuestros view engine van a tener como extension de los archivos el formato handlebars
app.set("views", path.resolve(__dirname, "views"));

// app.set('views', './views');

// y por ultimo tenemos que decirle en donde estan esos archivos
// para eso necesitamos traer la variable dirname , ahora no viene de manera nativa asique hay que hacer un par de ejecuciines para conseguirlo
// para eso creamos utils.js dentro de src

// creamos archivos estaticos

// enrutamos para acceder a archivos estaticos
app.use("/", express.static(__dirname + "/public"));

const products = [
   {
      nombre: "edgardo",
      apellido: "guemes",
   },
   { nombre: "pablo", apellido: "gonales" },
   { nombre: "ariel", apellido: "ged" },
   { nombre: "lautaro", apellido: "ed" },
];

app.get("/", (req, res) => {
   res.render("home", {
      title: "Backend / handlebars",
      admin: true, // si sos admin ---- en este caso sos ---> si lo pasamos a falso se visualiza el mensaje de home.hbs
      products: products // le estamos enviando nuestra constante a nuestro render
   }); // esto nos renderiza nuestro archvio de handlebars , utilizamos home
});
