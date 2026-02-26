(function () {
  function setupLandingLogin() {
    var modal = document.getElementById("loginModal");
    var openBtn = document.getElementById("openLoginBtn");
    var closeBtn = document.getElementById("closeLoginBtn");
    var submitBtn = document.getElementById("loginSubmitBtn");
    var landingMain = document.getElementById("landingMain");

    if (!modal || !openBtn || !closeBtn || !submitBtn || !landingMain) {
      return;
    }

    function openModal() {
      modal.classList.remove("hidden");
      landingMain.classList.add("dimmed");
    }

    function closeModal() {
      modal.classList.add("hidden");
      landingMain.classList.remove("dimmed");
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });

    submitBtn.addEventListener("click", function () {
      window.location.href = "dashboard.html";
    });
  }

  function setupDocumentWizard() {
    var wizard = document.getElementById("docWizard");
    var openBtn = document.getElementById("openDocWizard");
    var closeBtn = document.getElementById("closeDocWizard");
    var nextBtn = document.getElementById("wizardNext");
    var backBtn = document.getElementById("wizardBack");
    var saveBtn = document.getElementById("wizardSave");
    var success = document.getElementById("docSuccess");
    var closeSuccessBtn = document.getElementById("closeDocSuccess");
    var steps = document.querySelectorAll(".wizard-step");
    var panels = document.querySelectorAll(".wizard-panel");
    var currentStep = 1;
    var lastStep = 3;

    if (
      !wizard ||
      !openBtn ||
      !closeBtn ||
      !nextBtn ||
      !backBtn ||
      !saveBtn ||
      !success ||
      !closeSuccessBtn
    ) {
      return;
    }

    function renderStep() {
      steps.forEach(function (step) {
        var stepNumber = Number(step.getAttribute("data-step"));
        step.classList.toggle("active", stepNumber <= currentStep);
      });

      panels.forEach(function (panel) {
        var panelStep = Number(panel.getAttribute("data-step"));
        panel.classList.toggle("hidden", panelStep !== currentStep);
      });

      backBtn.classList.toggle("hidden", currentStep === 1);
      nextBtn.classList.toggle("hidden", currentStep === lastStep);
      saveBtn.classList.toggle("hidden", currentStep !== lastStep);
    }

    function openWizard() {
      currentStep = 1;
      renderStep();
      wizard.classList.remove("hidden");
    }

    function closeWizard() {
      wizard.classList.add("hidden");
    }

    openBtn.addEventListener("click", openWizard);
    closeBtn.addEventListener("click", closeWizard);

    wizard.addEventListener("click", function (event) {
      if (event.target === wizard) {
        closeWizard();
      }
    });

    nextBtn.addEventListener("click", function () {
      if (currentStep < lastStep) {
        currentStep += 1;
        renderStep();
      }
    });

    backBtn.addEventListener("click", function () {
      if (currentStep > 1) {
        currentStep -= 1;
        renderStep();
      }
    });

    saveBtn.addEventListener("click", function () {
      closeWizard();
      success.classList.remove("hidden");
    });

    closeSuccessBtn.addEventListener("click", function () {
      success.classList.add("hidden");
    });

    success.addEventListener("click", function (event) {
      if (event.target === success) {
        success.classList.add("hidden");
      }
    });

    renderStep();
  }

  function setupTableFilters() {
    function bindFilter(tabSelector, rowSelector, activeClass) {
      var tabs = document.querySelectorAll(tabSelector);
      var rows = document.querySelectorAll(rowSelector);

      if (tabs.length === 0 || rows.length === 0) {
        return;
      }

      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var filter = tab.getAttribute("data-filter") || "all";

          tabs.forEach(function (item) {
            item.classList.remove(activeClass);
          });
          tab.classList.add(activeClass);

          rows.forEach(function (row) {
            if (filter === "all" || row.getAttribute("data-status") === filter) {
              row.style.display = "";
            } else {
              row.style.display = "none";
            }
          });
        });
      });
    }

    bindFilter(".inbox-tab", ".inbox-row", "active");
    bindFilter(".outbox-tab", ".outbox-row", "active");
    bindFilter(".mydocs-tab", ".mydoc-row", "active");
  }

  function setupReviewApprove() {
    var approveBtn = document.getElementById("approveDocBtn");
    var success = document.getElementById("reviewSuccess");
    var closeBtn = document.getElementById("closeReviewSuccess");

    if (!approveBtn || !success || !closeBtn) {
      return;
    }

    approveBtn.addEventListener("click", function () {
      success.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", function () {
      success.classList.add("hidden");
    });

    success.addEventListener("click", function (event) {
      if (event.target === success) {
        success.classList.add("hidden");
      }
    });
  }

  function setupOutboxRowModal() {
    var modal = document.getElementById("outboxDetailModal");
    var closeBtn = document.getElementById("closeOutboxModal");
    var noLabel = document.getElementById("outboxModalNo");
    var rows = document.querySelectorAll(".outbox-row");

    if (!modal || !closeBtn || rows.length === 0) {
      return;
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    function openModal(docNo) {
      if (noLabel && docNo) {
        noLabel.textContent = docNo;
      }
      modal.classList.remove("hidden");
    }

    rows.forEach(function (row) {
      row.addEventListener("click", function (event) {
        if (event.target.closest("a,button,input,select,textarea")) {
          return;
        }
        openModal(row.getAttribute("data-docno"));
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  function setupInboxRowModal() {
    var modal = document.getElementById("inboxDetailModal");
    var closeBtn = document.getElementById("closeInboxModal");
    var noLabel = document.getElementById("inboxModalNo");
    var newModal = document.getElementById("inboxNewModal");
    var newCloseBtn = document.getElementById("closeInboxNewModal");
    var newCancelBtn = document.getElementById("inboxNewCancelBtn");
    var newTransferBtn = document.getElementById("inboxNewTransferBtn");
    var newNoLabel = document.getElementById("inboxNewModalNo");
    var rows = document.querySelectorAll(".inbox-row");
    var links = document.querySelectorAll(".view-inbox");

    if (!modal || !closeBtn || rows.length === 0) {
      return;
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    function openModal(docNo) {
      if (noLabel && docNo) {
        noLabel.textContent = docNo;
      }
      modal.classList.remove("hidden");
    }

    function closeNewModal() {
      if (newModal) {
        newModal.classList.add("hidden");
      }
    }

    function openNewModal(docNo) {
      if (!newModal) {
        openModal(docNo);
        return;
      }
      if (newNoLabel && docNo) {
        newNoLabel.textContent = docNo;
      }
      newModal.classList.remove("hidden");
    }

    rows.forEach(function (row) {
      row.addEventListener("click", function (event) {
        if (event.target.closest("a,button,input,select,textarea")) {
          return;
        }
        if (row.getAttribute("data-status") === "new") {
          openNewModal(row.getAttribute("data-docno"));
          return;
        }
        openModal(row.getAttribute("data-docno"));
      });
    });

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var row = link.closest(".inbox-row");
        if (row && row.getAttribute("data-status") === "new") {
          openNewModal(link.getAttribute("data-docno"));
          return;
        }
        openModal(link.getAttribute("data-docno"));
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    if (newCloseBtn) {
      newCloseBtn.addEventListener("click", closeNewModal);
    }
    if (newCancelBtn) {
      newCancelBtn.addEventListener("click", closeNewModal);
    }
    if (newTransferBtn) {
      newTransferBtn.addEventListener("click", closeNewModal);
    }
    if (newModal) {
      newModal.addEventListener("click", function (event) {
        if (event.target === newModal) {
          closeNewModal();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
        closeNewModal();
      }
    });
  }

  function setupMydocsRowNavigation() {
    var rows = document.querySelectorAll(".mydoc-row");

    if (rows.length === 0) {
      return;
    }

    rows.forEach(function (row) {
      row.addEventListener("click", function (event) {
        if (event.target.closest("a,button,input,select,textarea,label")) {
          return;
        }
        var href = row.getAttribute("data-href") || "document-assignment.html";
        window.location.href = href;
      });
    });
  }

  function setupAssignmentPage() {
    var reviewerInput = document.getElementById("reviewerSearchInput");
    var reviewerOptions = document.getElementById("reviewerOptions");
    var saveBtn = document.getElementById("assignmentSaveBtn");
    var successModal = document.getElementById("assignmentSuccessModal");
    var closeSuccessBtn = document.getElementById("closeAssignmentSuccess");
    var okSuccessBtn = document.getElementById("okAssignmentSuccess");

    function closeSuccessAndGoList() {
      if (successModal) {
        successModal.classList.add("hidden");
      }
      window.location.href = "document-review.html";
    }

    if (saveBtn && successModal && closeSuccessBtn && okSuccessBtn) {
      saveBtn.addEventListener("click", function () {
        successModal.classList.remove("hidden");
      });

      closeSuccessBtn.addEventListener("click", closeSuccessAndGoList);
      okSuccessBtn.addEventListener("click", closeSuccessAndGoList);

      successModal.addEventListener("click", function (event) {
        if (event.target === successModal) {
          closeSuccessAndGoList();
        }
      });
    }

    if (!reviewerInput || !reviewerOptions) {
      return;
    }

    function closeList() {
      reviewerOptions.classList.add("hidden");
    }

    function openList() {
      reviewerOptions.classList.remove("hidden");
    }

    reviewerInput.addEventListener("focus", function () {
      openList();
    });

    reviewerInput.addEventListener("click", function (event) {
      event.stopPropagation();
      openList();
    });

    reviewerOptions.querySelectorAll(".assignment-option").forEach(function (option) {
      option.addEventListener("click", function () {
        var textNode = option.querySelector("span");
        if (textNode) {
          reviewerInput.value = textNode.textContent;
        }
        reviewerOptions.querySelectorAll(".assignment-option").forEach(function (row) {
          row.classList.remove("selected");
        });
        option.classList.add("selected");
        closeList();
      });
    });

    document.addEventListener("click", function (event) {
      if (
        event.target.closest("#reviewerSearchInput") ||
        event.target.closest("#reviewerOptions")
      ) {
        return;
      }
      closeList();
    });
  }

  function setupApprovedSendPopup() {
    var sendBtn = document.getElementById("approvedSendBtn");
    var modal = document.getElementById("approvedSendSuccessModal");
    var closeBtn = document.getElementById("closeApprovedSendSuccess");
    var okBtn = document.getElementById("okApprovedSendSuccess");

    if (!sendBtn || !modal || !closeBtn || !okBtn) {
      return;
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    sendBtn.addEventListener("click", function () {
      modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", closeModal);
    okBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  function setupCreateDocumentPage() {
    var contentModal = document.getElementById("contentEditorModal");
    var openContentBtn = document.getElementById("openContentEditor");
    var closeContentBtn = document.getElementById("closeContentEditor");
    var transferBtn = document.getElementById("createTransferBtn");

    var docToggle = document.getElementById("docTypeToggle");
    var docMenu = document.getElementById("docTypeMenu");
    var docLabel = document.getElementById("docTypeLabel");

    var pageToggle = document.getElementById("pageTypeToggle");
    var pageMenu = document.getElementById("pageTypeMenu");
    var pageLabel = document.getElementById("pageTypeLabel");

    var replyInput = document.getElementById("replySearchInput");
    var replyMenu = document.getElementById("replySearchMenu");

    var dateToggle = document.getElementById("decisionDateToggle");
    var datePop = document.getElementById("decisionDatePop");
    var dateLabel = document.getElementById("decisionDateLabel");

    function closeAllPops() {
      if (docMenu) {
        docMenu.classList.add("hidden");
      }
      if (pageMenu) {
        pageMenu.classList.add("hidden");
      }
      if (replyMenu) {
        replyMenu.classList.add("hidden");
      }
      if (datePop) {
        datePop.classList.add("hidden");
      }
    }

    if (docToggle && docMenu) {
      docToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        var shouldShow = docMenu.classList.contains("hidden");
        closeAllPops();
        docMenu.classList.toggle("hidden", !shouldShow);
      });

      docMenu.querySelectorAll(".create-dropdown-item").forEach(function (item) {
        item.addEventListener("click", function () {
          var value = item.getAttribute("data-value");
          if (docLabel && value) {
            docLabel.textContent = value;
          }
          docMenu.querySelectorAll(".create-dropdown-item").forEach(function (row) {
            row.classList.remove("selected");
          });
          item.classList.add("selected");
          docMenu.classList.add("hidden");
        });
      });
    }

    if (pageToggle && pageMenu) {
      pageToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        var shouldShow = pageMenu.classList.contains("hidden");
        closeAllPops();
        pageMenu.classList.toggle("hidden", !shouldShow);
      });

      pageMenu.querySelectorAll(".create-dropdown-item").forEach(function (item) {
        item.addEventListener("click", function () {
          var value = item.getAttribute("data-value");
          if (pageLabel && value) {
            pageLabel.textContent = value;
          }
          pageMenu.querySelectorAll(".create-dropdown-item").forEach(function (row) {
            row.classList.remove("selected");
          });
          item.classList.add("selected");
          pageMenu.classList.add("hidden");
        });
      });
    }

    if (replyInput && replyMenu) {
      var replyWrap = replyInput.parentElement;

      replyInput.addEventListener("focus", function () {
        closeAllPops();
        replyMenu.classList.remove("hidden");
      });

      replyInput.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      if (replyWrap) {
        replyWrap.addEventListener("click", function (event) {
          event.stopPropagation();
          closeAllPops();
          replyMenu.classList.remove("hidden");
          replyInput.focus();
        });
      }

      replyMenu.querySelectorAll(".create-dropdown-item").forEach(function (item) {
        item.addEventListener("click", function () {
          var valueNode = item.querySelector("span");
          if (valueNode) {
            replyInput.value = valueNode.textContent;
          }
          replyMenu.querySelectorAll(".create-dropdown-item").forEach(function (row) {
            row.classList.remove("selected");
          });
          item.classList.add("selected");
          replyMenu.classList.add("hidden");
        });
      });
    }

    if (dateToggle && datePop) {
      dateToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        var shouldShow = datePop.classList.contains("hidden");
        closeAllPops();
        datePop.classList.toggle("hidden", !shouldShow);
      });

      datePop.querySelectorAll(".calendar-days button").forEach(function (dayBtn) {
        dayBtn.addEventListener("click", function () {
          var day = dayBtn.textContent;
          if (dateLabel && day) {
            var d = day.padStart(2, "0");
            dateLabel.textContent = "2026.01." + d;
          }
          datePop.classList.add("hidden");
        });
      });
    }

    if (contentModal && openContentBtn && closeContentBtn) {
      function closeEditor() {
        contentModal.classList.add("hidden");
      }

      openContentBtn.addEventListener("click", function () {
        contentModal.classList.remove("hidden");
      });
      closeContentBtn.addEventListener("click", closeEditor);
      contentModal.addEventListener("click", function (event) {
        if (event.target === contentModal) {
          closeEditor();
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeEditor();
        }
      });
    }

    if (transferBtn) {
      transferBtn.addEventListener("click", function () {
        localStorage.setItem("showMydocsSuccess", "1");
        window.location.href = "document-review.html";
      });
    }

    document.addEventListener("click", function (event) {
      if (
        event.target.closest("#docTypeMenu") ||
        event.target.closest("#docTypeToggle") ||
        event.target.closest("#pageTypeMenu") ||
        event.target.closest("#pageTypeToggle") ||
        event.target.closest("#replySearchInput") ||
        event.target.closest(".search-input-wrap") ||
        event.target.closest("#replySearchMenu") ||
        event.target.closest("#decisionDateToggle") ||
        event.target.closest("#decisionDatePop")
      ) {
        return;
      }
      closeAllPops();
    });
  }

  function setupMydocsCreateSuccess() {
    var modal = document.getElementById("mydocsSuccessModal");
    var closeBtn = document.getElementById("closeMydocsSuccess");

    if (!modal || !closeBtn) {
      return;
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    if (localStorage.getItem("showMydocsSuccess") === "1") {
      modal.classList.remove("hidden");
      localStorage.removeItem("showMydocsSuccess");
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  setupLandingLogin();
  setupDocumentWizard();
  setupTableFilters();
  setupReviewApprove();
  setupOutboxRowModal();
  setupInboxRowModal();
  setupMydocsRowNavigation();
  setupAssignmentPage();
  setupApprovedSendPopup();
  setupCreateDocumentPage();
  setupMydocsCreateSuccess();
})();
