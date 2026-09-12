/* =========================================================
   LỊCH SỬ 12 — app logic (phiên bản 12 bài + thi thử)
   ========================================================= */

const HISTORY_KEY = "su12_quiz_history";
const ALL_MODE_SIZE = 30;
const EXAM_SIZE = 20;       // Số câu thi thử mỗi bài
const EXAM_TIME = 20 * 60;  // 20 phút đếm ngược

function safeGetItem(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
function safeSetItem(k,v) { try { localStorage.setItem(k,v); } catch(e) {} }

const els = {
  viewHome: document.getElementById("view-home"),
  viewQuiz: document.getElementById("view-quiz"),
  viewResult: document.getElementById("view-result"),
  topicGrid: document.getElementById("topic-grid"),
  topicCount: document.getElementById("topic-count"),
  historyBlock: document.getElementById("history-block"),
  historyList: document.getElementById("history-list"),
  btnStartAll: document.getElementById("btn-start-all"),
  btnHome: document.getElementById("btn-home"),
  btnHome2: document.getElementById("btn-home2"),
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
  reportBreakdown: document.getElementById("report-breakdown"),
  reviewList: document.getElementById("review-list"),
  btnRetry: document.getElementById("btn-retry"),
  btnRetryExam: document.getElementById("btn-retry-exam"),
};

let state = {
  mode: null,        // "bai1".."bai12" | "all" | "exam-bai1"...
  quiz: [],
  index: 0,
  answers: [],
  reviewNotes: [],
  isExam: false,
};

let timerInterval = null;
let secondsLeft = 0;

/* ---------- utilities ---------- */

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
  return { id: raw.id, topic: raw.topic, text: raw.q, options, correctIndex };
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

function formatDate(iso) {
  const d = new Date(iso);
  const pad = n => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ---------- view switching ---------- */

function showView(name) {
  els.viewHome.hidden = name !== "home";
  els.viewQuiz.hidden = name !== "quiz";
  els.viewResult.hidden = name !== "result";
  window.scrollTo({ top: 0, behavior: "auto" });
}

/* ---------- home view ---------- */

function renderHome() {
  if (typeof QUIZ_TOPICS === "undefined" || typeof QUIZ_QUESTIONS === "undefined") {
    console.error("Chưa load được questions.js!");
    return;
  }

  els.topicCount.textContent = `${QUIZ_TOPICS.length} bài · ${QUIZ_QUESTIONS.length} câu hỏi`;

  els.topicGrid.innerHTML = "";
  QUIZ_TOPICS.forEach(t => {
    const count = questionsForTopic(t.id).length;
    if (count === 0) return;

    const card = document.createElement("div");
    card.className = "dossier-card";
    card.innerHTML = `
      <span class="dossier-card__no">${t.code}</span>
      <span class="dossier-card__title">${t.name}</span>
      <span class="dossier-card__meta">${count} câu hỏi</span>
      <div class="dossier-card__actions">
        <button class="mini-btn mini-btn--practice" data-mode="practice" data-topic="${t.id}">📖 Luyện tập</button>
        <button class="mini-btn mini-btn--exam" data-mode="exam" data-topic="${t.id}">🎓 Thi thử</button>
      </div>
    `;
    els.topicGrid.appendChild(card);
  });

  // Gắn sự kiện cho tất cả nút bên trong
  els.topicGrid.querySelectorAll("button[data-mode]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const topicId = btn.dataset.topic;
      const mode = btn.dataset.mode;
      if (mode === "exam") startExam(topicId);
      else startQuiz(topicId);
    });
  });

  const hist = loadHistory();
  if (hist.length) {
    els.historyBlock.hidden = false;
    els.historyList.innerHTML = "";
    hist.slice().reverse().slice(0, 10).forEach(h => {
      const pct = Math.round((h.score / h.total) * 100);
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${formatDate(h.date)} · ${h.label}</span>
        <span class="history__score ${pct >= 50 ? "is-good" : "is-bad"}">${h.score}/${h.total} (${pct}%)</span>
      `;
      els.historyList.appendChild(li);
    });
  } else {
    els.historyBlock.hidden = true;
  }
}

/* ---------- timer ---------- */

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
      // Tự động nộp: điền các câu chưa làm
      while (state.answers.length < state.quiz.length) {
        const idx = state.answers.length;
        const q = state.quiz[idx];
        state.answers.push({ index: idx, topic: q.topic, correct: false, chosen: -1 });
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

/* ---------- quiz flow ---------- */

function startQuiz(mode) {
  state.mode = mode;
  state.index = 0;
  state.answers = [];
  state.reviewNotes = [];
  state.isExam = false;

  const pool = mode === "all" ? QUIZ_QUESTIONS : questionsForTopic(mode);
  const size = mode === "all" ? Math.min(ALL_MODE_SIZE, pool.length) : pool.length;
  state.quiz = shuffle(pool).slice(0, size).map(prepareQuestion);

  showView("quiz");
  stopTimer();
  renderQuestion();
}

function startExam(topicId) {
  state.mode = `exam-${topicId}`;
  state.index = 0;
  state.answers = [];
  state.reviewNotes = [];
  state.isExam = true;

  const pool = topicId === "all" ? QUIZ_QUESTIONS : questionsForTopic(topicId);
  if (pool.length === 0) { alert("Bài này chưa có câu hỏi!"); return; }
  const size = Math.min(EXAM_SIZE, pool.length);
  state.quiz = shuffle(pool).slice(0, size).map(prepareQuestion);

  showView("quiz");
  startCountdown(EXAM_TIME);
  renderQuestion();
}

function renderQuestion() {
  const q = state.quiz[state.index];
  const total = state.quiz.length;

  els.progressFill.style.width = `${((state.index) / total) * 100}%`;
  els.quizPosition.textContent = `Câu ${state.index + 1}/${total}`;
  els.quizTopicLabel.textContent = topicName(q.topic);
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

function selectOption(i) {
  const q = state.quiz[state.index];
  const buttons = els.optionsList.querySelectorAll(".option");

  if (state.isExam) {
    // Chế độ thi: chỉ đánh dấu đã chọn, KHÔNG hiện đáp án
    buttons.forEach((b, idx) => {
      b.classList.toggle("is-selected", idx === i);
    });
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

  // Chế độ luyện tập: hiện đáp án ngay
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

function goNext() {
  if (state.index < state.quiz.length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  stopTimer();
  const total = state.quiz.length;
  const score = state.answers.filter(a => a.correct).length;

  const byTopic = {};
  state.answers.forEach(a => {
    byTopic[a.topic] = byTopic[a.topic] || { correct: 0, total: 0 };
    byTopic[a.topic].total += 1;
    if (a.correct) byTopic[a.topic].correct += 1;
  });

  // Nhãn hiển thị
  let label;
  if (state.isExam) {
    const tid = state.mode.replace("exam-", "");
    label = `Thi thử · ${tid === "all" ? "Tổng hợp" : topicName(tid)}`;
  } else {
    label = state.mode === "all" ? "Luyện tổng hợp" : topicName(state.mode);
  }

  saveHistoryEntry({ date: new Date().toISOString(), label, score, total });

  // Nếu là thi thử, tạo reviewNotes từ các câu sai
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

  renderResult(score, total, byTopic, label);
  showView("result");
}

/* ---------- result view ---------- */

function renderResult(score, total, byTopic, label) {
  els.reportTopicLabel.textContent = `Biên bản chấm điểm · ${label}`;
  els.reportScoreNum.textContent = score;
  els.reportScoreTotal.textContent = total;
  els.reportPercent.textContent = `${Math.round((score / total) * 100)}% chính xác`;

  els.reportBreakdown.innerHTML = "";
  Object.keys(byTopic).forEach(topicId => {
    const t = byTopic[topicId];
    const pct = Math.round((t.correct / t.total) * 100);
    const row = document.createElement("div");
    row.className = "breakdown-row";
    row.innerHTML = `
      <span class="breakdown-row__label">${topicName(topicId)}</span>
      <span class="breakdown-row__track"><span class="breakdown-row__fill" style="width:${pct}%"></span></span>
      <span class="breakdown-row__num">${t.correct}/${t.total}</span>
    `;
    els.reportBreakdown.appendChild(row);
  });

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

  // Hiện nút "Thi thử lại" nếu đang ở chế độ thi
  if (state.isExam) {
    els.btnRetryExam.hidden = false;
    els.btnRetry.hidden = true;
    els.btnRetryExam.onclick = () => startExam(state.mode.replace("exam-", ""));
  } else {
    els.btnRetryExam.hidden = true;
    els.btnRetry.hidden = false;
    els.btnRetry.onclick = () => startQuiz(state.mode);
  }
}

/* ---------- wiring ---------- */

els.btnStartAll.addEventListener("click", () => startQuiz("all"));
els.btnNext.addEventListener("click", goNext);
els.btnQuit.addEventListener("click", () => {
  if (confirm("Thoát bài làm? Tiến độ sẽ không được lưu.")) {
    stopTimer();
    showView("home");
    renderHome();
  }
});
els.btnHome.addEventListener("click", () => { stopTimer(); showView("home"); renderHome(); });
els.btnHome2.addEventListener("click", () => { stopTimer(); showView("home"); renderHome(); });

// Phím tắt A/B/C/D + Enter
document.addEventListener("keydown", (e) => {
  if (els.viewQuiz.hidden) return;
  const map = { "A":0, "B":1, "C":2, "D":3 };
  const k = e.key.toUpperCase();
  if (map[k] !== undefined) {
    const btns = els.optionsList.querySelectorAll(".option");
    if (btns[map[k]]) btns[map[k]].click();
  }
  if (e.key === "Enter" && !els.btnNext.disabled) els.btnNext.click();
});

// Khởi chạy
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  showView("home");
});