const { textarea } = require("saltcorn-markup/tags");
const md = require("markdown-it")();

module.exports = {
  name: "Markdown",
  sql_name: "text",
  fieldviews: {
    showAll: { isEdit: false, run: v => md.render(v) },
    peek: { isEdit: false, run: v => (v.length > 10 ? v.substring(0, 10) : v) },
    edit: {
      isEdit: true,
      run: (nm, v, attrs, cls) =>
        textarea(
          {
            class: ["form-control", cls],
            name: nm,
            id: `input${nm}`,
            rows: 10
          },
          v || ""
        )
    }
  },
  read: v => {
    switch (typeof v) {
      case "string":
        return v;
      default:
        return undefined;
    }
  },
  validate: ({ match }) => x => true
};
