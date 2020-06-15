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
});
