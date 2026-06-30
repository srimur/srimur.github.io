const rssPlugin = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  // static assets copied through untouched
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "src/hello.jpeg": "hello.jpeg" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  // date helpers used by the templates
  eleventyConfig.addFilter("readableDate", (d) =>
    new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(d))
  );
  eleventyConfig.addFilter("shortDate", (d) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", timeZone: "UTC" }).format(new Date(d))
  );

  // newest-first list of notes
  eleventyConfig.addCollection("notes", (api) =>
    api.getFilteredByTag("notes").sort((a, b) => b.date - a.date)
  );

  // notes grouped by year (for the ledger headings)
  eleventyConfig.addCollection("notesByYear", (api) => {
    const posts = api.getFilteredByTag("notes").sort((a, b) => b.date - a.date);
    const groups = [];
    const map = {};
    for (const p of posts) {
      const y = new Date(p.date).getUTCFullYear();
      if (!map[y]) { map[y] = { year: y, items: [] }; groups.push(map[y]); }
      map[y].items.push(p);
    }
    return groups;
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
