const axios = require('axios');
const cheerio = require('cheerio');

const source = 'https://www.lankadeepa.lk';

// TODO: handle errors

let id = 1;

let news = {
  විශේෂාංග: [],
  කාලරාමු: [],
  සිරස්තල: [],
  'එසැණ පුවත්': [],
  දේශපාලන: [],
  කෙළිමඬල: [],
  ව්‍යාපාරික: [],
  වෙනත්: [],
  විදේශ: [],
  සෞඛ්‍යය: [],
  සජීවී: [],
  පළාත්: [],
  මැදපෙරදිග: [],
};

async function getNews() {
  try {
    const response = await axios.get(source);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      //   getting featuress
      $('.feature-item').each(function () {
        news['විශේෂාංග'].push({
          id: id++,
          heading: $(this).find('header h3 a').text().trim(),
          content: $(this).find('header p').text().trim(),
          link: $(this).find('a').attr('href'),
        });
      });
      id = 1;

      //   getting timeline
      $('.livecc')
        .next('div a')
        .each(function () {
          news['කාලරාමු'].push({
            id: id++,
            heading: $(this).text().trim(),
            link: $(this).attr('href'),
          });
        });

      $('.timeline li').each(function () {
        news['කාලරාමු'].push({
          id: id++,
          heading: $(this).find('a p').text().replace(/.*ago/, '').trim(),
          link: $(this).find('a').attr('href'),
        });
      });
      id = 1;

      //   getting captions
      if ($('.caption .excerpt').text().trim()) {
        news['සිරස්තල'].push({
          id: id++,
          heading: $('#home .caption .news-title').text().trim(),
          content: $('#home .caption .excerpt').text().trim(),
          link: $('#home .caption .big-news-title').attr('href'),
        });
      }
      id = 1;

      // getting esena
      let esenaTemp = $('.esana-news .esana .excerpt span').text();
      news['එසැණ පුවත්'].push({
        id: id++,
        heading: $('.esana-news .esana h4').text().trim(),
        content: $('.esana-news .esana .excerpt')
          .text()
          .trim()
          .replace(/[\t|\n|]*/g, '')
          .replace(esenaTemp, ''),

        link: $('.esana-news .esana a').attr('href'),
      });
      id = 1;

      // getting politics

      let politicsFilterd = $(
        'div.col-md-11.col-sm-9 > div:nth-child(5) .excerpt'
      )
        .children()
        .remove()
        .end()
        .text()
        .trim();

      news['දේශපාලන'].push({
        id: id++,
        heading: $('div.col-md-11.col-sm-9 > div:nth-child(5) h3').text(),
        content: politicsFilterd,
        link: $('div.col-md-11.col-sm-9 > div:nth-child(5) .excerpt a').attr(
          'href'
        ),
      });
      $('div.col-md-11.col-sm-9 > div:nth-child(5) .mtfive').each(function () {
        news['දේශපාලන'].push({
          id: id++,
          heading: $(this).find('.p-sub-text').text().trim(),
          link: $(this).find('a').attr('href'),
        });
      });
      id = 1;

      // getting sports
      news['කෙළිමඬල'].push({
        id: id++,
        heading: $('.wisden-business .featured-article h4').text().trim(),
        link: $('.wisden-business .featured-article a').attr('href'),
      });
      $('.wisden-business header a .media-body').each(function () {
        news['කෙළිමඬල'].push({
          id: id++,
          heading: $(this).find('.wisden-list-text').text().trim(),
          link: $(this).parent().attr('href'),
        });
      });
      $('.wisden-business .pfiffive h4').each(function () {
        news['කෙළිමඬල'].push({
          id: id++,
          heading: $(this).text().trim(),
          link: $(this).find('a').attr('href'),
        });
      });
      id = 1;

      // getting business
      news['ව්‍යාපාරික'].push({
        id: id++,
        heading: $(
          'div.col-md-11.col-sm-9 > div:nth-child(8) .col-md-11 .sayuren h4 a'
        )
          .text()
          .trim(),
        link: $('div.col-md-11.col-sm-9 > div:nth-child(8) .sayuren h4 a').attr(
          'href'
        ),
      });
      $(
        'div.col-md-11.col-sm-9 > div:nth-child(8) .col-md-11 .header h4 a'
      ).each(function () {
        news['ව්‍යාපාරික'].push({
          id: id++,
          heading: $(this).text().trim(),
          link: $(this).attr('href'),
        });
      });
      $('div.col-md-11.col-sm-9 > div:nth-child(8) .pfiffive .mtfivez a').each(
        function () {
          news['ව්‍යාපාරික'].push({
            id: id++,
            heading: $(this).text().trim(),
            link: $(this).attr('href'),
          });
        }
      );
      id = 1;

      // getting foreign
      news['විදේශ'].push({
        id: id++,
        heading: $(
          'div.col-md-11.col-sm-9 > div:nth-child(9) .col-md-11 .sayuren h4 a'
        )
          .text()
          .trim(),
        link: $('div.col-md-11.col-sm-9 > div:nth-child(9) .sayuren h4 a').attr(
          'href'
        ),
      });
      $(
        'div.col-md-11.col-sm-9 > div:nth-child(9) .col-md-11 .header h4 a'
      ).each(function () {
        news['විදේශ'].push({
          id: id++,
          heading: $(this).text().trim(),
          link: $(this).attr('href'),
        });
      });
      $('div.col-md-11.col-sm-9 > div:nth-child(9) .pfiffive .mtfivez a').each(
        function () {
          news['විදේශ'].push({
            id: id++,
            heading: $(this).text().trim(),
            link: $(this).attr('href'),
          });
        }
      );
      id = 1;

      // getting other
      $('.card .card-block a').each(function () {
        news['වෙනත්'].push({
          id: id++,
          heading: $(this).text().trim(),
          link: $(this).attr('href'),
        });
      });
      $('#breakingnewsads .header h4 a').each(function () {
        news['වෙනත්'].push({
          id: id++,
          heading: $(this).text().trim(),
          link: $(this).attr('href'),
        });
      });
      $('#breakingnewsadss .header h4 a').each(function () {
        news['වෙනත්'].push({
          id: id++,
          heading: $(this).text().trim(),
          link: $(this).attr('href'),
        });
      });
      id = 1;

      // getting health
      news['සෞඛ්‍යය'].push({
        id: id++,
        heading: $('div.col-md-5.pleft .header h3 a').text().trim(),
        link: $('div.col-md-5.pleft .header h3 a').attr('href'),
      });
      $('div.col-md-5.pleft .header a .media-heading').each(function () {
        news['සෞඛ්‍යය'].push({
          id: id++,
          heading: $(this).text().trim(),
          link: $(this).parent().attr('href'),
        });
      });
      id = 1;

      // getting live updates
      if ($('.livecc + div a h1').first().text().trim()) {
        news['සජීවී'].push({
          id: id++,
          heading: $('.livecc + div a h1').first().text().trim(),
          link: $('.livecc + div a').first().attr('href'),
        });
        id = 1;
      }

      // getting provincial
      $('div.provincial aside .single-article .article-content h3').each(
        function () {
          news['පළාත්'].push({
            id: id++,
            heading: $(this).find('a').text().trim(),
            link: $(this).find('a').attr('href'),
          });
        }
      );
      id = 1;

      // getting middle east
      $(
        'body > div.container.main > div:nth-child(18) > div.col-md-18.col-sm-18.slankadeepa.mtfif.hidden-sm.hidden-xs h3'
      ).each(function () {
        if ($(this).find('a').text()) {
          news['මැදපෙරදිග'].push({
            id: id++,
            heading: $(this).find('a').text().trim(),
            link: $(this).find('a').attr('href'),
          });
        }
      });
      id = 1;
    } else {
      console.error('loading error');
    }
  } catch (err) {
    console.error(err);
  }
  return news;
}

module.exports = { getNews };
