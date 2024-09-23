const { textarea, text } = require("@saltcorn/markup/tags");
const iterator = require("markdown-it-for-inline");

const md = require("markdown-it")().use(
  iterator,
  "nofollow_links",
  "link_open",
  function (tokens, idx) {
    tokens[idx].attrPush(["rel", "nofollow"]);
  }
);

const markdown = {
  name: "Markdown",
  sql_name: "text",
  fieldviews: {
    showAll: { isEdit: false, run: (v) => md.render(v || "") },
    peek: {
      isEdit: false,
      run: (v) => text(v && v.length > 10 ? v.substring(0, 10) : v || ""),
    },
    edit: {
      isEdit: true,
      run: (nm, v, attrs, cls) =>
        textarea(
          {
            class: ["form-control", cls],
            name: text(nm),
            id: `input${text(nm)}`,
            rows: 10,
          },
          text(v) || ""
        ),
    },
  },
  read: (v) => {
    switch (typeof v) {
      case "string":
        return v;
      default:
        return undefined;
    }
  },
};

module.exports = {
  sc_plugin_api_version: 1,
  types: [markdown],
  functions: { md_to_html: (m) => md.render(m || "") },
  ready_for_mobile: true,
};
