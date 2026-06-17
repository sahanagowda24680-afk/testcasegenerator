const axios = require('axios');
const cheerio = require('cheerio');

exports.analyzeWebsite = async (url) => {
  try {
    console.log(`🔍 Analyzing: ${url}`);
    
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    const forms = [];
    $('form').each((i, elem) => {
      forms.push({
        id: $(elem).attr('id') || `form_${i}`,
        inputs: $(elem).find('input, textarea').length
      });
    });

    return {
      url,
      title: $('title').text() || 'Untitled',
      description: $('meta[name="description"]').attr('content') || '',
      forms: forms.slice(0, 5),
      buttons: $('button, input[type="submit"]').length,
      inputs: $('input').length
    };
  } catch (error) {
    throw new Error(`Failed to analyze website: ${error.message}`);
  }
};