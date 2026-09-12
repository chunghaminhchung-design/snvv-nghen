/* =========================================================
   LỊCH SỬ 12 — app logic
   Không dùng framework, không cần build step: mở thẳng
   index.html hoặc deploy nguyên thư mục lên GitHub Pages.
   ========================================================= */

const HISTORY_KEY = "su12_quiz_history";
const ALL_MODE_SIZE = 30; // số câu khi chọn "luyện tổng hợp"

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
};

let state = {
  mode: null,        // topic id, or "all"
  quiz: [],          // prepared questions for this run
  index: 0,
  answers: [],        // { topic, correct }
  reviewNotes: [],    // items for wrong answers
};

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
  const t = QUIZ_TOPICS.find(t => t.id === id);
  return t ? t.name : id;
}

function questionsForTopic(id) {
  return QUIZ_QUESTIONS.filter(q => q.topic === id);
}

function prepareQuestion(raw) {
  const order = shuffle(raw.options.map((_, i) => i));
  const options = order.map(i => raw.options[i]);
  const correctIndex = order.indexOf(raw.answer);
  return { id: raw.id, topic: raw.topic, text: raw.q, options, correctIndex };
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveHistoryEntry(entry) {
  const hist = loadHistory();
  hist.push(entry);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(hist.slice(-30)));
  } catch (e) { /* localStorage unavailable — ignore */ }
}

function formatDate(iso) {
  const d = new Date(iso);
  const pad = n => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ---------- view switching ---------- */

function showView(name) {
  els.viewHome.hidden = name !== "home";
  els.viewQuiz.hidden = name !== "quiz";
  els.viewResult.hidden = name !== "result";
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ---------- home view ---------- */

function renderHome() {
  els.topicCount.textContent = `${QUIZ_TOPICS.length} chuyên đề · ${QUIZ_QUESTIONS.length} câu hỏi`;

  els.topicGrid.innerHTML = "";
  QUIZ_TOPICS.forEach(t => {
    const count = questionsForTopic(t.id).length;
    const card = document.createElement("button");
    card.className = "dossier-card";
    card.innerHTML = `
      <span class="dossier-card__no">${t.code}</span>
      <span class="dossier-card__title">${t.name}</span>
      <span class="dossier-card__meta">${count} câu hỏi</span>
    `;
    card.addEventListener("click", () => startQuiz(t.id));
    els.topicGrid.appendChild(card);
  });

  const hist = loadHistory();
  if (hist.length) {
    els.historyBlock.hidden = false;
    els.historyList.innerHTML = "";
    hist.slice().reverse().slice(0, 8).forEach(h => {
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

/* ---------- quiz flow ---------- */

function startQuiz(mode) {
  state.mode = mode;
  state.index = 0;
  state.answers = [];
  state.reviewNotes = [];

  const pool = mode === "all" ? QUIZ_QUESTIONS : questionsForTopic(mode);
  const size = mode === "all" ? Math.min(ALL_MODE_SIZE, pool.length) : pool.length;
  state.quiz = shuffle(pool).slice(0, size).map(prepareQuestion);

  showView("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = state.quiz[state.index];
  const total = state.quiz.length;

  els.progressFill.style.width = `${(state.index / total) * 100}%`;
  els.quizPosition.textContent = `Câu ${state.index + 1}/${total}`;
  els.quizTopicLabel.textContent = topicName(q.topic);
  els.questionText.textContent = q.text;

  els.optionsList.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = `<span class="option__bubble">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener("click", () => selectOption(i));
    els.optionsList.appendChild(btn);
  });

  els.btnNext.disabled = true;
  els.btnNext.textContent = state.index === total - 1 ? "Xem kết quả →" : "Câu tiếp theo →";
}

function selectOption(i) {
  const q = state.quiz[state.index];
  const buttons = els.optionsList.querySelectorAll(".option");
  if (buttons[0].disabled) return; // already answered

  const isCorrect = i === q.correctIndex;
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correctIndex) b.classList.add("is-correct");
    if (idx === i) b.classList.add("is-selected");
    if (idx === i && !isCorrect) b.classList.add("is-wrong");
  });

  state.answers.push({ topic: q.topic, correct: isCorrect });
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
  const total = state.answers.length;
  const score = state.answers.filter(a => a.correct).length;

  const byTopic = {};
  state.answers.forEach(a => {
    byTopic[a.topic] = byTopic[a.topic] || { correct: 0, total: 0 };
    byTopic[a.topic].total += 1;
    if (a.correct) byTopic[a.topic].correct += 1;
  });

  const label = state.mode === "all" ? "Luyện tổng hợp" : topicName(state.mode);
  saveHistoryEntry({ date: new Date().toISOString(), label, score, total });

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
    p.textContent = "Không có câu nào sai — làm rất tốt!";
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

/* ---------- wiring ---------- */

els.btnStartAll.addEventListener("click", () => startQuiz("all"));
els.btnNext.addEventListener("click", goNext);
els.btnQuit.addEventListener("click", () => { showView("home"); renderHome(); });
els.btnHome.addEventListener("click", () => { showView("home"); renderHome(); });
els.btnHome2.addEventListener("click", () => { showView("home"); renderHome(); });
els.btnRetry.addEventListener("click", () => startQuiz(state.mode));

renderHome();
showView("home");
