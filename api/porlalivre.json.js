var got = require('got')
var cheerio = require('cheerio')

module.exports = async (req, res) => {

  const {q} = req.query
  const html = await got(`https://porlalivre.com/search/?q=${q}`).text()
  $ = cheerio.load(html)

  const urlBase = 'https://porlalivre.com'

  // Armamos los datos de los anuncios
  const ads = $('.classified-wrapper').map( (i, el) => ({
    url: urlBase + $('.classified-link').attr('href'),
    title: $(el).find('.img-thumbnail img').attr('alt'),
    // titledirty: $(el).find('.media-heading').text(),
    price: $(el).find('.media-heading > span').first().text(),
    image:  urlBase + $(el).find('.img-thumbnail img').attr('src')
  })).toArray()

  res.json(ads);
};
