const fs = require("fs").promises
const path = require("path")
/**
 * Classe che gestisce le nozioni
 */
class Nozione {
    /**
     * 
     * @param {string} categoria 
     * @param {string} concetto 
     * @param {string} descrizione 
     */
    constructor(categoria, concetto, descrizione) {
        this.categoria = categoria;
        this.concetto = concetto;
        this.descrizione = descrizione;
    }
    /**
     * Ritorna la lista di nozioni dal file json
     * @returns {Nozione[]}
     */

    static async getSampleData(){
        const data = await fs.readFile(path.join(__dirname, "nozioni.json"), "utf-8");
        const parsed = JSON.parse(data);

        let nozioni = [];
        parsed.forEach((nozione) => {
            nozioni.push(new Nozione(nozione.categoria, nozione.concetto, nozione.descrizione))
        });
        

        return nozioni;
    }
}

/**
 * Restituisce le nozioni possibilmente filtrate
 * @param {string} categoria 
 * @param {string} concetto 
 * @param {string} descrizione 
 * @returns {Nozione[]}
 */
async function getNozioni(categoria, concetto, descrizione) {
    const nozioni = await Nozione.getSampleData();
    let filtrato = []
    if (categoria != "" || concetto != "" || descrizione != "") {

        //Filtri con contains
        nozioni.forEach((nozione) => {
            if (nozione.categoria.toLowerCase().includes(categoria.toLowerCase()) &&
            nozione.concetto.toLowerCase().includes(concetto.toLowerCase()) &&
            nozione.descrizione.toLowerCase().includes(descrizione.toLowerCase())) {
                filtrato.push(nozione);
            }
        })
    } else {
        filtrato = nozioni;
    }
    

    return filtrato;
}

module.exports = { getNozioni, Nozione }