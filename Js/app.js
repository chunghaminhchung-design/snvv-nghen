/* =========================================================
   LỊCH SỬ 12 — app.js
   ========================================================= */

const HISTORY_KEY = "su12_quiz_history";
const ALL_MODE_SIZE = 30;
const EXAM_SIZE = 15;
const EXAM_TIME = 15 * 60;

function safeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
function safeSet(k,v) { try { localStorage.setItem(k,v); } catch(e) {} }

/* ---------- DOM ---------- */
const $ = (id) => document.getElementById(id);

const els = {
  views: {
    home: $("view-home"),
    "luyen-de": $("view-luyen-de"),
    "thi-thu": $("view-thi-thu"),
    "on-tap": $("view-on-tap"),
    quiz: $("view-quiz"),
    result: $("view-result"),
  },
  menuBtn: $("menu-btn"),
  drawer: $("drawer"),
  overlay: $("overlay"),
  gridLuyenDe: $("grid-luyen-de"),
  gridThiThu: $("grid-thi-thu"),
  gridOnTap: $("grid-on-tap"),
  progressFill: $("progress-fill"),
  quizPosition: $("quiz-position"),
  quizLabel: $("quiz-label"),
  quizTimer: $("quiz-timer"),
  qText: $("q-text"),
  answers: $("answers"),
  btnNext: $("btn-next"),
  btnQuit: $("btn-quit"),
  resultLabel: $("result-label"),
  resultScore: $("result-score"),
  resultTotal: $("result-total"),
  resultPercent: $("result-percent"),
  reviewList: $("review-list"),
  btnRetry: $("btn-retry"),
  btnHome: $("btn-home"),
};

let state = {
  mode: null,
  quiz: [],
  index: 0,
  answers: [],
  reviewNotes: [],
  isExam: false,
  currentTab: "tap1",
  customExam: null,
};

let timerInterval = null;
let secondsLeft = 0;

/* ---------- MENU ---------- */
function openMenu() {
  els.drawer.classList.add("is-open");
  els.overlay.classList.add("is-open");
}
function closeMenu() {
  els.drawer.classList.remove("is-open");
  els.overlay.classList.remove("is-open");
}
els.menuBtn.addEventListener("click", () => {
  if (els.drawer.classList.contains("is-open")) closeMenu();
  else openMenu();
});
els.overlay.addEventListener("click", closeMenu);

/* ---------- SHOW VIEW ---------- */
function showView(name) {
  Object.keys(els.views).forEach(k => {
    els.views[k].hidden = (k !== name);
  });
  document.querySelectorAll(".menu-item").forEach(m => {
    m.classList.toggle("is-active", m.dataset.view === name);
  });
  window.scrollTo({ top: 0, behavior: "auto" });
}

/* ---------- MENU ITEMS ---------- */
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    const v = item.dataset.view;
    if (v === "home") showView("home");
    if (v === "luyen-de") { renderLuyenDe(); showView("luyen-de"); }
    if (v === "thi-thu") { renderThiThu(); showView("thi-thu"); }
    if (v === "on-tap") { renderOnTap(); showView("on-tap"); }
    closeMenu();
  });
});

/* ---------- FEATURE CARDS (home) ---------- */
document.querySelectorAll("[data-go]").forEach(el => {
  el.addEventListener("click", () => {
    const v = el.dataset.go;
    if (v === "luyen-de") { renderLuyenDe(); showView("luyen-de"); }
    if (v === "thi-thu") { renderThiThu(); showView("thi-thu"); }
    if (v === "on-tap") { renderOnTap(); showView("on-tap"); }
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
  const raw = safeGet(HISTORY_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) || []; } catch(e) { return []; }
}
function saveHistory(entry) {
  const h = loadHistory();
  h.push(entry);
  safeSet(HISTORY_KEY, JSON.stringify(h.slice(-50)));
}

/* ---------- RENDER LUYỆN ĐỀ ---------- */
function renderLuyenDe() {
  const grid = els.gridLuyenDe;
  grid.innerHTML = "";
  if (typeof LUYEN_DE_EXAMS === "undefined" || !LUYEN_DE_EXAMS.length) {
    grid.innerHTML = `<div class="empty">Chưa có đề luyện nào. Hãy thêm vào <code>js/exams.js</code>.</div>`;
    return;
  }
  LUYEN_DE_EXAMS.forEach(exam => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span class="card__badge">${exam.year} · ${exam.school}</span>
      <h3 class="card__title">${exam.title}</h3>
      <p class="card__meta">${exam.questions.length} câu · ${exam.duration} phút</p>
      <div class="card__actions">
        <button class="card-btn card-btn--primary">Làm bài</button>
      </div>
    `;
    card.querySelector(".card-btn--primary").addEventListener("click", () => startCustomExam(exam));
    grid.appendChild(card);
  });
}

/* ---------- RENDER THI THỬ ---------- */
function renderThiThu() {
  const grid = els.gridThiThu;
  grid.innerHTML = "";
  if (typeof THI_THU_EXAMS === "undefined" || !THI_THU_EXAMS.length) {
    grid.innerHTML = `<div class="empty">Chưa có đề thi thử nào. Hãy thêm vào <code>js/exams.js</code>.</div>`;
    return;
  }
  THI_THU_EXAMS.forEach(exam => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span class="card__badge">${exam.year} · ${exam.school}</span>
      <h3 class="card__title">${exam.title}</h3>
      <p class="card__meta">${exam.questions.length} câu · ${exam.duration} phút</p>
      <div class="card__actions">
        <button class="card-btn card-btn--primary">Thi thử</button>
      </div>
    `;
    card.querySelector(".card-btn--primary").addEventListener("click", () => startCustomExam(exam));
    grid.appendChild(card);
  });
}

/* ---------- RENDER ÔN TẬP ---------- */
function renderOnTap() {
  const grid = els.gridOnTap;
  grid.innerHTML = "";
  const tab = state.currentTab;

  if (typeof QUIZ_TOPICS === "undefined" || typeof QUIZ_QUESTIONS === "undefined") {
    grid.innerHTML = `<div class="empty">Chưa load được dữ liệu câu hỏi. Kiểm tra <code>js/questions.js</code>.</div>`;
    return;
  }

  let topics = QUIZ_TOPICS;
  if (tab === "tap1") {
    topics = QUIZ_TOPICS.filter(t => {
      const n = parseInt((t.id || "").replace("bai",""));
      return !isNaN(n) && n >= 1 && n <= 12;
    });
  } else {
    topics = QUIZ_TOPICS.filter(t => {
      const n = parseInt((t.id || "").replace("bai",""));
      return !isNaN(n) && n >= 13;
    });
  }

  if (!topics.length) {
    grid.innerHTML = `<div class="empty">Mục này chưa có bài nào.</div>`;
    return;
  }

  topics.forEach(t => {
    const count = questionsForTopic(t.id).length;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span class="card__badge">${t.code || t.id}</span>
      <h3 class="card__title">${t.name}</h3>
      <p class="card__meta">${count} câu hỏi</p>
      <div class="card__actions">
        <button class="card-btn card-btn--primary" ${count === 0 ? "disabled" : ""}>📖 Luyện tập</button>
        <button class="card-btn card-btn--secondary" ${count === 0 ? "disabled" : ""}>🎓 Thi thử</button>
      </div>
    `;
    if (count > 0) {
      card.querySelector(".card-btn--primary").addEventListener("click", () => startTopicQuiz(t.id, false));
      card.querySelector(".card-btn--secondary").addEventListener("click", () => startTopicQuiz(t.id, true));
    }
    grid.appendChild(card);
  });
}

/* ---------- TABS ---------- */
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    state.currentTab = tab.dataset.tap;
    renderOnTap();
  });
});

/* ---------- START QUIZ (ôn tập) ---------- */
function startTopicQuiz(topicId, isExam) {
  state.mode = isExam ? `exam-${topicId}` : topicId;
  state.index = 0;
  state.answers = [];
  state.reviewNotes = [];
  state.isExam = isExam;
  state.customExam = null;

  const pool = questionsForTopic(topicId);
  const size = isExam ? Math.min(EXAM_SIZE, pool.length) : pool.length;
  state.quiz = shuffle(pool).slice(0, size).map(prepareQuestion);

  showView("quiz");
  if (isExam) startCountdown(EXAM_TIME);
  else stopTimer();
  renderQuestion();
}

/* ---------- START CUSTOM EXAM (luyện đề / thi thử) ---------- */
function startCustomExam(exam) {
  state.mode = `custom-${exam.id}`;
  state.index = 0;
  state.answers = [];
  state.reviewNotes = [];
  state.isExam = true;
  state.customExam = exam;
  state.quiz = shuffle(exam.questions).map(prepareQuestion);

  showView("quiz");
  startCountdown((exam.duration || 45) * 60);
  renderQuestion();
}

/* ---------- TIMER ---------- */
function startCountdown(seconds) {
  stopTimer();
  secondsLeft = seconds;
  els.quizTimer.hidden = false;
  updateTimer();
  timerInterval = setInterval(() => {
    secondsLeft--;
    updateTimer();
    if (secondsLeft <= 0) {
      stopTimer();
      alert("⏰ Hết giờ! Tự động nộp bài.");
      while (state.answers.length < state.quiz.length) {
        const i = state.answers.length;
        state.answers.push({ index: i, topic: state.quiz[i].topic, correct: false, chosen: -1 });
      }
      finishQuiz();
    }
  }, 1000);
}
function updateTimer() {
  const m = Math.floor(Math.max(0, secondsLeft) / 60).toString().padStart(2, "0");
  const s = (Math.max(0, secondsLeft) % 60).toString().padStart(2, "0");
  els.quizTimer.textContent = `⏱ ${m}:${s}`;
  els.quizTimer.classList.toggle("warning", secondsLeft <= 60);
}
function stopTimer() {
  clearInterval(timerInterval);
  els.quizTimer.hidden = true;
  els.quizTimer.classList.remove("warning");
}

/* ---------- RENDER QUESTION ---------- */
function renderQuestion() {
  const q = state.quiz[state.index];
  const total = state.quiz.length;

  els.progressFill.style.width = `${(state.index / total) * 100}%`;
  els.quizPosition.textContent = `Câu ${state.index + 1}/${total}`;
  els.quizLabel.textContent = state.customExam ? state.customExam.title : topicName(q.topic);
  els.qText.textContent = q.text;

  els.answers.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerHTML = `<span class="answer__key">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener("click", () => selectAnswer(i));
    els.answers.appendChild(btn);
  });

  els.btnNext.disabled = true;
  els.btnNext.textContent = state.index === total - 1 ? "Nộp bài →" : "Câu tiếp theo →";
}

/* ---------- SELECT ANSWER ---------- */
function selectAnswer(i) {
  const q = state.quiz[state.index];
  const buttons = els.answers.querySelectorAll(".answer");

  if (state.isExam) {
    buttons.forEach((b, idx) => b.classList.toggle("selected", idx === i));
    const ex = state.answers.find(a => a.index === state.index);
    if (ex) {
      ex.chosen = i;
      ex.correct = i === q.correctIndex;
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
    if (idx === q.correctIndex) b.classList.add("correct");
    if (idx === i) b.classList.add("selected");
    if (idx === i && !isCorrect) b.classList.add("wrong");
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
    state.index++;
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

  let label;
  if (state.customExam) label = state.customExam.title;
  else if (state.isExam) label = `Thi thử · ${topicName(state.mode.replace("exam-",""))}`;
  else if (state.mode === "all") label = "Luyện tổng hợp";
  else label = topicName(state.mode);

  saveHistory({ date: new Date().toISOString(), label, score, total });

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
  els.resultLabel.textContent = label;
  els.resultScore.textContent = score;
  els.resultTotal.textContent = total;
  els.resultPercent.textContent = `${Math.round((score/total)*100)}% chính xác`;

  els.reviewList.innerHTML = "";
  if (!state.reviewNotes.length) {
    const p = document.createElement("p");
    p.textContent = "🎉 Không có câu nào sai — làm rất tốt!";
    els.reviewList.appendChild(p);
  } else {
    state.reviewNotes.forEach(n => {
      const li = document.createElement("li");
      li.className = "review-item";
      li.innerHTML = `
        <p class="review-q">${n.text}</p>
        <p class="review-ans wrong">Bạn chọn: ${n.chosen}</p>
        <p class="review-ans right">Đáp án đúng: ${n.correct}</p>
      `;
      els.reviewList.appendChild(li);
    });
  }
}

/* ---------- WIRING ---------- */
els.btnNext.addEventListener("click", goNext);
els.btnQuit.addEventListener("click", () => {
  if (confirm("Thoát bài làm?")) {
    stopTimer();
    showView("home");
  }
});
els.btnHome.addEventListener("click", () => { stopTimer(); showView("home"); });
els.btnRetry.addEventListener("click", () => {
  if (state.customExam) return startCustomExam(state.customExam);
  const isExam = state.isExam;
  const tid = state.mode.replace("exam-","").replace("custom-","");
  startTopicQuiz(tid, isExam);
});

/* ---------- KEYBOARD ---------- */
document.addEventListener("keydown", (e) => {
  if (els.views.quiz.hidden) return;
  const map = { A: 0, B: 1, C: 2, D: 3 };
  const k = e.key.toUpperCase();
  if (map[k] !== undefined) {
    const btns = els.answers.querySelectorAll(".answer");
    if (btns[map[k]]) btns[map[k]].click();
  }
  if (e.key === "Enter" && !els.btnNext.disabled) els.btnNext.click();
});

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  showView("home");
});