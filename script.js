const quotes = [
  { text: "천천히 가도 괜찮아요. 멈추지만 않는다면요.", textJa: "ゆっくり進んでも大丈夫。立ち止まりさえしなければ。", author: "공자", authorJa: "孔子" },
  { text: "작은 일에 최선을 다하면 큰일은 저절로 이루어진다.", textJa: "小さなことに最善を尽くせば、大きなことは自然とうまくいく。", author: "데일 카네기", authorJa: "デール・カーネギー" },
  { text: "행복은 습관이다. 그것을 몸에 지니라.", textJa: "幸福は習慣である。それを身につけなさい。", author: "허버드", authorJa: "ハバード" },
  { text: "오늘 할 수 있는 일을 내일로 미루지 마라.", textJa: "今日できることを、明日まで延ばしてはいけない。", author: "벤저민 프랭클린", authorJa: "ベンジャミン・フランクリン" },
  { text: "위대한 일은 작은 일들이 모여 이루어진다.", textJa: "偉大なことは、小さなことの積み重ねによって成し遂げられる。", author: "빈센트 반 고흐", authorJa: "フィンセント・ファン・ゴッホ" },
  { text: "가장 어두운 밤도 끝나고 해는 떠오른다.", textJa: "どんなに暗い夜も、やがて明けて太陽が昇る。", author: "빅토르 위고", authorJa: "ヴィクトル・ユーゴー" },
  { text: "삶은 용기 있는 모험이 아니면 아무것도 아니다.", textJa: "人生は、勇気ある冒険でなければ何ものでもない。", author: "헬렌 켈러", authorJa: "ヘレン・ケラー" },
  { text: "성공은 매일 반복한 작은 노력의 합이다.", textJa: "成功とは、毎日積み重ねた小さな努力の総和である。", author: "로버트 콜리어", authorJa: "ロバート・コリアー" },
  { text: "당신이 할 수 있다고 믿든 할 수 없다고 믿든, 믿는 대로 될 것이다.", textJa: "できると信じても、できないと信じても、信じたとおりになる。", author: "헨리 포드", authorJa: "ヘンリー・フォード" },
  { text: "미래는 오늘 무엇을 하는가에 달려 있다.", textJa: "未来は、今日何をするかにかかっている。", author: "마하트마 간디", authorJa: "マハトマ・ガンディー" },
  { text: "자신을 믿어라. 그러면 무엇이든 해낼 수 있다.", textJa: "自分を信じなさい。そうすれば、何だって成し遂げられる。", author: "괴테", authorJa: "ゲーテ" },
  { text: "좋은 일을 시작하는 데 늦은 때란 없다.", textJa: "良いことを始めるのに、遅すぎることはない。", author: "C. S. 루이스", authorJa: "C・S・ルイス" },
  { text: "별을 향해 쏘아라. 빗나가더라도 달에 맞을 테니.", textJa: "星を目指して矢を放て。外れても月に当たるかもしれない。", author: "레 브라운", authorJa: "レス・ブラウン" },
  { text: "하루하루를 인생의 마지막 날처럼 살아라.", textJa: "毎日を、人生最後の日であるかのように生きなさい。", author: "마르쿠스 아우렐리우스", authorJa: "マルクス・アウレリウス" },
];

const dateElement = document.querySelector("#today-date");
const dateElementJa = document.querySelector("#today-date-ja");
const quoteElement = document.querySelector("#quote-text");
const quoteElementJa = document.querySelector("#quote-text-ja");
const authorElement = document.querySelector("#quote-author");
const authorElementJa = document.querySelector("#quote-author-ja");
const copyButton = document.querySelector("#copy-button");
const copyStatus = document.querySelector("#copy-status");
const copyFallback = document.querySelector("#copy-fallback");

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getQuoteForToday(date) {
  const [year, month, day] = getLocalDateKey(date).split("-").map(Number);
  const dayNumber = Math.floor(
    (Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / 86400000,
  );
  return quotes[dayNumber % quotes.length];
}

const today = new Date();
const quote = getQuoteForToday(today);

dateElement.dateTime = getLocalDateKey(today);
dateElement.textContent = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(today);
dateElementJa.dateTime = getLocalDateKey(today);
dateElementJa.textContent = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(today);
quoteElement.textContent = quote.text;
quoteElementJa.textContent = quote.textJa;
authorElement.textContent = quote.author;
authorElementJa.textContent = quote.authorJa;

async function copyQuote() {
  const text = `“${quote.text}” — ${quote.author}\n「${quote.textJa}」— ${quote.authorJa}`;
  let copied = false;
  copyStatus.textContent = "";

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }

  if (!copied) {
    copyFallback.value = text;
    copyFallback.hidden = false;
    copyFallback.focus();
    copyFallback.select();

    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
  }

  if (copied) {
    copyFallback.hidden = true;
    copyStatus.textContent = "두 언어 문장을 복사했어요. · 二言語の文章をコピーしました。";
  } else {
    copyFallback.focus();
    copyFallback.select();
    copyStatus.textContent = "문장이 선택됐어요. Ctrl+C로 복사해 주세요. · テキストを選択しました。Ctrl+Cでコピーしてください。";
  }
}

copyButton.addEventListener("click", copyQuote);
