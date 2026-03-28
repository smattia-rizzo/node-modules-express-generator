let express = require('express');
let router = express.Router();
const nozioni = require("../modules/nozioni/nozioni")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/nozioni", async (req, res, next) => {
  let {categoria, concetto, descrizione } = req.query;
  if (categoria == undefined) {
    categoria = "";
  }
  if (concetto == undefined) {
    concetto = "";
  }
  if (descrizione == undefined) {
    descrizione = "";
  }

  let data = await nozioni.getNozioni(categoria, concetto, descrizione);
  console.log(data)
  res.render("nozioni", {title: "La pagina delle Nozioni", nozioni: data, categoria: categoria, concetto: concetto, descrizione: descrizione})
})

module.exports = router;
