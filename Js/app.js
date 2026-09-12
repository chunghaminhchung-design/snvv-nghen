/* =========================================================
   LỊCH SỬ 12 — app.js
   Menu 3 gạch, điều hướng, quiz, thi thử, chấm điểm
   ========================================================= */

const HISTORY_KEY = "su12_quiz_history";
const ALL_MODE_SIZE = 30;
const EXAM_SIZE = 15;
const EXAM_TIME = 15 * 60;

function safeGetItem(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
function safeSetItem(k,v) { try { localStorage.setItem(k,v); } catch(e) {} }

const els = {
  views: {
    home: document.getElementById("view-home"),
    "luyen-de": document.getElementById("view-luyen-de"),
    "thi-thu": document.getElementById("view-thi-thu"),
    "on-tap": document.getElementById("view-on-tap"),
    quiz: document.getElementById("view-quiz"),
    result: document.getElementById("view-result"),
  },
  menuToggle: document.getElementById("menu-toggle"),
  menuDrawer: document.getElementById("menu-drawer"),
  menuOverlay: document.getElementById("menu-overlay"),
  luyenDeGrid: document.getElementById("luyen-de-grid"),
  thiThuGrid: document.getElementById("thi-thu-grid"),
  onTapGrid: document.getElementById("on-tap-grid"),
  progressFill: document.getElementById("progress-fill"),
  quizPosition: document.getElementById("quiz-position"),
  quizTopicLabel: document.getElementById("quiz-topic-label"),
  quizTimer: document.getElementById("quiz-timer"),
  questionText: document.getElementById("question-text"),
  optionsList: document.getElementById("options-list"),
  btnNext: document.getElementById("btn-next"),
  btnQuit: document.getElementById("btn-quit"),
  reportTopicLabel: document.getElementById("report-topic-label"),
  reportScoreNum: document.getElementById("report-score-num"),
  reportScoreTotal: document.getElementById("report-score-total"),
  reportPercent: document.getElementById("report-percent"),
  reviewList: document.getElementById("review-list"),
  btnRetry: document.getElementById("btn-retry"),
  btnHome2: document.getElementById("btn-home2"),
};

let state = {
  mode: null,
  quiz: [],
  index: 0,
  answers: [],
  reviewNotes: [],
  isExam: false,
  currentTab: "tap1",
};

let timerInterval = null;
let secondsLeft = 0;

/* ---------- MENU ---------- */
function openMenu() {
  els.menuDrawer.classList.add("is-open");
  els.menuOverlay.classList.add("is-open");
  els.menuToggle.classList.add("is-open");
}
function closeMenu() {
  els.menuDrawer.classList.remove("is-open");
  els.menuOverlay.classList.remove("is-open");
  els.menuToggle.classList.remove("is-open");
}
els.menuToggle.addEventListener("click", () => {
  if (els.menuDrawer.classList.contains("is-open")) closeMenu();
  else openMenu();
});
els.menuOverlay.addEventListener("click", closeMenu);

/* ---------- SHOW VIEW ---------- */
function showView(name) {
  Object.keys(els.views).forEach(k => {
    els.views[k].hidden = k !== name;
  });
  // Cập nhật trạng thái active cho nav-item
  document.querySelectorAll(".nav-item").forEach(n => {
    n.classList.toggle("is-active", n.dataset.view === name);
  });
  window.scrollTo({ top: 0, behavior: "auto" });
}

document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const v = btn.dataset.view;
    if (v === "home") showView("home");
    if (v === "luyen-de") { renderLuyenDe(); showView("luyen-de"); }
    if (v === "thi-thu") { renderThiThu(); showView("thi-thu"); }
    if (v === "on-tap") { renderOnTap(); showView("on-tap"); }
    closeMenu();
  });
});

/* ---------- UTILS ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function topicName(id) {
  if (typeof QUIZ_TOPICS === "undefined") return id;
  const t = QUIZ_TOPICS.find(t => t.id === id);
  return t ? t.name : id;
}
function questionsForTopic(id) {
  if (typeof QUIZ_QUESTIONS === "undefined") return [];
  return QUIZ_QUESTIONS.filter(q => q.topic === id);
}
function prepareQuestion(raw) {
  const order = shuffle(raw.options.map((_, i) => i));
  const options = order.map(i => raw.options[i]);
  const correctIndex = order.indexOf(raw.answer);
  return { id: raw.id || "", topic: raw.topic || "", text: raw.q, options, correctIndex };
}
function loadHistory() {
  const raw = safeGetItem(HISTORY_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) || []; } catch (e) { return []; }
}
function saveHistoryEntry(entry) {
  const hist = loadHistory();
  hist.push(entry);
  safeSetItem(HISTORY_KEY, JSON.stringify(hist.slice(-50)));
}

/* ---------- RENDER: LUYỆN ĐỀ ---------- */
function renderLuyenDe() {
  els.luyenDeGrid.innerHTML = "";
  if (typeof LUYEN_DE_EXAMS === "undefined" || !LUYEN_DE_EXAMS.length) {
    els.luyenDeGrid.innerHTML = "<p>Chưa có đề luyện nào.</p>";
    return;
  }
  LUYEN_DE_EXAMS.forEach(exam => {
    const card = document.createElement("div");
    card.className = "topic-card";
    card.innerHTML = `
      <span class="topic-card__no">${exam.year} · ${exam.school}</span>
      <span class="topic-card__title">${exam.title}</span>
      <span class="topic-card__meta">${exam.questions.length} câu · ${exam.duration} phút</span>
      <div class="topic-card__actions">
        <button class="mini-btn mini-btn--practice">Làm bài</button>
      </div>
    `;
    card.querySelector(".mini-btn--practice").addEventListener("click", () => startExamMode(exam));
    els.luyenDeGrid.appendChild(card);
  });
}

/* ---------- RENDER: THI THỬ ---------- */
function renderThiThu() {
  els.thiThuGrid.innerHTML = "";
  if (typeof THI_THU_EXAMS === "undefined" || !THI_THU_EXAMS.length) {
    els.thiThuGrid.innerHTML = "<p>Chưa có đề thi thử nào.</p>";
    return;
  }
  THI_THU_EXAMS.forEach(exam => {
    const card = document.createElement("div");
    card.className = "topic-card";
    card.innerHTML = `
      <span class="topic-card__no">${exam.year} · ${exam.school}</span>
      <span class="topic-card__title">${exam.title}</span>
      <span class="topic-card__meta">${exam.questions.length} câu · ${exam.duration} phút</span>
      <div class="topic-card__actions">
        <button class="mini-btn mini-btn--exam">Thi thử</button>
      </div>
    `;
    card.querySelector(".mini-btn--exam").addEventListener("click", () => startExamMode(exam));
    els.thiThuGrid.appendChild(card);
  });
}

/* ---------- RENDER: ÔN TẬP ---------- */
function renderOnTap() {
  const tab = state.currentTab;
  els.onTapGrid.innerHTML = "";

  const topics = (typeof QUIZ_TOPICS !== "undefined") ? QUIZ_TOPICS.filter(t => {
    if (tab === "tap1") return t.id.startsWith("bai") && parseInt(t.id.replace("bai","")) <= 12;
    return true; // Tập 2 — bạn thêm sau
  }) : [];

  if (!topics.length) {
    els.onTapGrid.innerHTML = "<p>Chưa có bài nào trong mục này.</p>";
    return;
  }

  topics.forEach(t => {
    const count = questionsForTopic(t.id).length;
    if (count === 0) return;
    const card = document.createElement("div");
    card.className = "topic-card";
    card.innerHTML = `
      <span class="topic-card__no">${t.code}</span>
      <span class="topic-card__title">${t.name}</span>
      <span class="topic-card__meta">${count} câu hỏi</span>
      <div class="topic-card__actions">
        <button class="mini-btn mini-btn--practice">📖 Luyện tập</button>
        <button class="mini-btn mini-btn--exam">🎓 Thi thử</button>
      </div>
    `;
    card.querySelector(".mini-btn--practice").addEventListener("click", () => startQuiz(t.id, false));
    card.querySelector(".mini-btn--exam").addEventListener("click", () => startQuiz(t.id, true));
    els.onTapGrid.appendChild(card);
  });
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    state.currentTab = btn.dataset.tap;
    renderOnTap();
  });
});

/* ---------- START QUIZ (ôn tập theo bài) ---------- */
function startQuiz(topicId, isExam) {
  state.mode = isExam ? `exam-${topicId}` : topicId;
  state.index = 0;
  state.answers = [];
  state.reviewNotes = [];
  state.isExam = isExam;

  const pool = questionsForTopic(topicId);
  const size = isExam ? Math.min(EXAM_SIZE, pool.length) : pool.length;
  state.quiz = shuffle(pool).slice(0, size).map(prepareQuestion);

  showView("quiz");
  if (isExam) startCountdown(EXAM_TIME);
  else stopTimer();
  renderQuestion();
}

/* ---------- START EXAM (đề luyện / thi thử) ---------- */
function startExamMode(exam) {
  state.mode = `custom-${exam.id}`;
  state.index = 0;
  state.answers = [];
  state.reviewNotes = [];
  state.isExam = true;
  state.quiz = shuffle(exam.questions).map(prepareQuestion);
  state.customTitle = exam.title;

  showView("quiz");
  startCountdown((exam.duration || 45) * 60);
  renderQuestion();
}

/* ---------- TIMER ---------- */
function startCountdown(seconds) {
  stopTimer();
  secondsLeft = seconds;
  els.quizTimer.hidden = false;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay();
    if (secondsLeft <= 0) {
      stopTimer();
      alert("⏰ Hết giờ! Bài sẽ được nộp tự động.");
      while (state.answers.length < state.quiz.length) {
        const idx = state.answers.length;
        state.answers.push({ index: idx, topic: state.quiz[idx].topic, correct: false, chosen: -1 });
      }
      finishQuiz();
    }
  }, 1000);
}
function updateTimerDisplay() {
  const m = Math.floor(Math.max(0,secondsLeft) / 60).toString().padStart(2, "0");
  const s = (Math.max(0,secondsLeft) % 60).toString().padStart(2, "0");
  els.quizTimer.textContent = `⏱ ${m}:${s}`;
  if (secondsLeft <= 60) els.quizTimer.classList.add("is-warning");
  else els.quizTimer.classList.remove("is-warning");
}
function stopTimer() {
  clearInterval(timerInterval);
  els.quizTimer.hidden = true;
  els.quizTimer.classList.remove("is-warning");
}

/* ---------- RENDER QUESTION ---------- */
function renderQuestion() {
  const q = state.quiz[state.index];
  const total = state.quiz.length;

  els.progressFill.style.width = `${(state.index / total) * 100}%`;
  els.quizPosition.textContent = `Câu ${state.index + 1}/${total}`;
  els.quizTopicLabel.textContent = state.customTitle || topicName(q.topic);
  els.questionText.textContent = q.text;

  els.optionsList.innerHTML = "";
  const letters = ["A","B","C","D"];
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = `<span class="option__bubble">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener("click", () => selectOption(i));
    els.optionsList.appendChild(btn);
  });

  els.btnNext.disabled = true;
  els.btnNext.textContent = state.index === total - 1 ? "Nộp bài →" : "Câu tiếp theo →";
}

/* ---------- SELECT OPTION ---------- */
function selectOption(i) {
  const q = state.quiz[state.index];
  const buttons = els.optionsList.querySelectorAll(".option");

  if (state.isExam) {
    buttons.forEach((b, idx) => b.classList.toggle("is-selected", idx === i));
    const existing = state.answers.find(a => a.index === state.index);
    if (existing) {
      existing.chosen = i;
      existing.correct = i === q.correctIndex;
    } else {
      state.answers.push({ index: state.index, topic: q.topic, chosen: i, correct: i === q.correctIndex });
    }
    els.btnNext.disabled = false;
    return;
  }

  if (buttons[0].disabled) return;
  const isCorrect = i === q.correctIndex;
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correctIndex) b.classList.add("is-correct");
    if (idx === i) b.classList.add("is-selected");
    if (idx === i && !isCorrect) b.classList.add("is-wrong");
  });
  state.answers.push({ index: state.index, topic: q.topic, correct: isCorrect, chosen: i });
  if (!isCorrect) {
    state.reviewNotes.push({
      text: q.text,
      chosen: q.options[i],
      correct: q.options[q.correctIndex],
    });
  }
  els.btnNext.disabled = false;
}

/* ---------- NEXT ---------- */
function goNext() {
  if (state.index < state.quiz.length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

/* ---------- FINISH ---------- */
function finishQuiz() {
  stopTimer();
  const total = state.quiz.length;
  const score = state.answers.filter(a => a.correct).length;

  let label = state.customTitle || (state.mode === "all" ? "Luyện tổng hợp" : topicName(state.mode));
  if (state.isExam && !state.customTitle) {
    const tid = state.mode.replace("exam-", "");
    label = `Thi thử · ${tid === "all" ? "Tổng hợp" : topicName(tid)}`;
  }
  saveHistoryEntry({ date: new Date().toISOString(), label, score, total });

  if (state.isExam && state.reviewNotes.length === 0) {
    state.answers.forEach(a => {
      if (!a.correct) {
        const q = state.quiz[a.index];
        state.reviewNotes.push({
          text: q.text,
          chosen: a.chosen >= 0 ? q.options[a.chosen] : "(không chọn)",
          correct: q.options[q.correctIndex],
        });
      }
    });
  }

  renderResult(score, total, label);
  showView("result");
}

function renderResult(score, total, label) {
  els.reportTopicLabel.textContent = `Biên bản chấm điểm · ${label}`;
  els.reportScoreNum.textContent = score;
  els.reportScoreTotal.textContent = total;
  els.reportPercent.textContent = `${Math.round((score / total) * 100)}% chính xác`;

  els.reviewList.innerHTML = "";
  if (state.reviewNotes.length === 0) {
    const p = document.createElement("p");
    p.textContent = "🎉 Không có câu nào sai — làm rất tốt!";
    els.reviewList.appendChild(p);
  } else {
    state.reviewNotes.forEach(n => {
      const li = document.createElement("li");
      li.className = "review__item";
      li.innerHTML = `
        <p class="review__q">${n.text}</p>
        <p class="review__answer wrong">Bạn chọn: ${n.chosen}</p>
        <p class="review__answer right">Đáp án đúng: ${n.correct}</p>
      `;
      els.reviewList.appendChild(li);
    });
  }
}

/* ---------- WIRING ---------- */
els.btnNext.addEventListener("click", goNext);
els.btnQuit.addEventListener("click", () => {
  if (confirm("Thoát bài làm? Tiến độ sẽ không được lưu.")) {
    stopTimer();
    showView("home");
  }
});
els.btnHome2.addEventListener("click", () => { stopTimer(); showView("home"); });
els.btnRetry.addEventListener("click", () => {
  if (state.customTitle) {
    // Tìm lại exam gốc
    const all = [...(LUYEN_DE_EXAMS || []), ...(THI_THU_EXAMS || [])];
    const exam = all.find(e => `custom-${e.id}` === state.mode);
    if (exam) return startExamMode(exam);
  }
  const isExam = state.isExam;
  const tid = state.mode.replace("exam-", "").replace("custom-", "");
  startQuiz(tid, isExam);
});

/* ---------- KEYBOARD ---------- */
document.addEventListener("keydown", (e) => {
  if (els.views.quiz.hidden) return;
  const map = { "A":0, "B":1, "C":2, "D":3 };
  const k = e.key.toUpperCase();
  if (map[k] !== undefined) {
    const btns = els.optionsList.querySelectorAll(".option");
    if (btns[map[k]]) btns[map[k]].click();
  }
  if (e.key === "Enter" && !els.btnNext.disabled) els.btnNext.click();
});

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  showView("home");
});