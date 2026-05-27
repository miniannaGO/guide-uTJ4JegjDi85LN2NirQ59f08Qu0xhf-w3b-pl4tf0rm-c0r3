(() => {
  const { anchors, content, markdown, navigation, search } = window.GuideDocs;

  navigation.renderGlobalNavigation();
  search.bootGuideSearch();
  anchors.syncGuideNavOverflow();
  anchors.bootGuideNavDragScroll();
  anchors.bootGuideAnchorHighlights();
  anchors.bootGuideNavAnchors();
  anchors.bootGuideNavActiveState();
  content.enhanceInlineTerms();
  content.syncCodeBlockLanguages();
  content.bootShikiCodeBlocks(document);
  markdown.bootMarkdownViewer();

  document.addEventListener("guide:themechange", () => {
    content.bootShikiCodeBlocks(document);
  });

  content.bootCopyCodeButtons();
  content.bootNavbarCollapseOnAnchorClick();
})();
