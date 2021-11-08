var got = require('got')
var cheerio = require('cheerio')

module.exports = async (req, res) => {

  const {q} = req.query
  const html = await got(`https://www.timbirichi.com/buscar?q=${q}`).text()
  $ = cheerio.load(html)

  // Armamos los datos de los anuncios
  const ads = $('.anuncio-list').map( (i, el) => ({
    url: $(el).attr('href'),
    title: $(el).find('.anuncio-titulo').text().trim(),
    price: $(el).find('precio').first().text(),
    image: $(el).find('.anuncio-foto').attr('data-src'),
  })).toArray()

  res.json(ads);
};
