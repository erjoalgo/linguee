const responseTransformer = function(
  wordTransformer,
  examplesTransformer,
  config,
  urlBuilder,
  cheerio
) {
  return {
    transform: function(responseBody, query) {
      const $ = cheerio.load(responseBody);

      const $container = $('.exact');

      const getWords = function() {
        const $wordContainers = $container.children('.lemma');
        const words = [];
        $wordContainers.each(function(index, wordContainer) {
          words.push(wordTransformer.getWord($(wordContainer)));
        });

        return words;
      };

      const $examples = $('.example_lines');

      return {
        query: query,
        words: getWords(),
        examples: examplesTransformer.getExamples($examples)
      };
    }
  };
};

module.exports = responseTransformer;
