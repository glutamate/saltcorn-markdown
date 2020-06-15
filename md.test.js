const { auto_test_plugin } = require("@saltcorn/data/plugin-testing");
const plugin = require(".");

const mdType = plugin.types[0];
const render = mdType.fieldviews.showAll.run;

describe("markdown plugin", () => {
  it("passes auto test", async () => {
    await auto_test_plugin(plugin);
  });
  it("renders simple stuff", () => {
    expect(render("foobar")).toBe("<p>foobar</p>\n");
  });
  it("renders links as nofollow", () => {
    expect(render("[FaceBook](https://fb.com)")).toBe(
      '<p><a href="https://fb.com" rel="nofollow">FaceBook</a></p>\n'
    );
  });
});
