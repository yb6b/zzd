import { DefaultTheme } from "vitepress";
import { LOGS_GROUP_YEAR } from "../changelog/readLog";

const changelogConfig: any[] = LOGS_GROUP_YEAR.map((v) => ({
  text: v[0].year,
  link: `/changelog/${v[0].year}`,
}));

changelogConfig.unshift({ text: "更新历史", link: "/changelog/" });

export const sidebarOptions: DefaultTheme.Sidebar = {
  "/guide": [
    {
      items: [
        { text: "介绍", link: "/guide/" },
        {
          text: "单字输入",
          link: "/guide/zi/",
          collapsed: false,
          items: [
            { text: "拆分示范", link: "/guide/zi/examples" },
            { text: "拆分小结", link: "/guide/zi/summary" },
            { text: "拆分原理", link: "/guide/zi/principles" },
            { text: "飞键", link: "/guide/zi/feijian" },
            { text: "简码重码", link: "/guide/zi/brief" },
            { text: "反查", link: "/guide/zi/assist" },
          ],
        },
        { text: "词语输入", link: "/guide/words" },
        {
          text: "符号输入",
          link: "/guide/symbols/",
          collapsed: false,
          items: [
            { text: "V 键", link: "/guide/symbols/v" },
            { text: "E 键", link: "/guide/symbols/e" },
          ],
        },
        {
          text: "命令直通车",
          link: "/guide/commands/",
          collapsed: true,
          items: [
            { text: "多多平台", link: "/guide/commands/duoduo" },
            { text: "小小平台", link: "/guide/commands/yong" },
          ],
        },
        { text: "感谢", link: "/guide/contributors" },
      ],
    },
  ],
  "/changelog": [
    {
      items: changelogConfig,
    },
  ],
};
