(() => {
  const { anchors, content, markdown, navigation, search, startPanelLottie } =
    window.GuideDocs;

  navigation.renderGlobalNavigation();
  search.bootGuideSearch();
  anchors.bootGuideNavMobileDropdowns();
  anchors.bootGuideNavTree();
  anchors.syncGuideNavOverflow();
  anchors.bootGuideNavDragScroll();
  anchors.bootGuideResponsiveScrollCues();
  anchors.bootGuideAnchorHighlights();
  anchors.bootGuideNavAnchors();
  anchors.bootGuideNavActiveState();
  startPanelLottie.bootStartPanelLotties();
  content.bootVocabularyTabs();
  content.syncCodeBlockLanguages();
  content.bootShikiCodeBlocks(document);
  markdown.bootMarkdownViewer();

  document.addEventListener("guide:themechange", () => {
    content.bootShikiCodeBlocks(document);
  });

  content.bootCopyCodeButtons();
  content.bootNavbarCollapseOnAnchorClick();
})();
