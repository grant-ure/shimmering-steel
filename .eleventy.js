module.exports = function (eleventyConfig) {
  // Static assets copied through untouched.
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/js": "js" });
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");

  // All page sections, ordered by their `order` front-matter field.
  eleventyConfig.addCollection("sections", (api) =>
    api
      .getFilteredByTag("section")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );

  return {
    dir: { input: "src", output: "_site", data: "_data" },
  };
};
