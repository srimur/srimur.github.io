module.exports = {
  layout: "post.njk",
  tags: "notes",
  titleSuffix: "Notebook",
  filed: "notes, reading",
  permalink: (data) => `/notes/${data.page.fileSlug}.html`
};
