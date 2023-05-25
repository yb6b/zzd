import { DefaultTheme } from 'vitepress';

export const searchOptions: DefaultTheme.LocalSearchOptions = {
    translations: {
        button: {
            buttonAriaLabel: "搜索",
            buttonText: "搜索标题",
        },
        modal: {
            displayDetails: "详细展示",
            resetButtonTitle: "清空",
            noResultsText: "搜索不到，换个关键词",
            backButtonTitle: "返回",
            footer: {
                selectText: "选择",
                navigateText: "浏览",
                navigateDownKeyAriaLabel: "下键",
                navigateUpKeyAriaLabel: "上键",
                closeKeyAriaLabel: "关闭",
                closeText: "取消搜索",
            },
        },
    },
}
