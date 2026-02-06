// 간단한 확률 계산 스크립트
// compatibility-algorithm.ts의 로직을 인라인으로 복사

// 가치관 점수 계산
function calculateValueScore(p1Values, p2Values) {
  let score = 0;
  
  if (p1Values[0] === p2Values[0]) {
    score += 15;
  }
  
  const commonValues = p1Values.filter(v => p2Values.includes(v));
  if (commonValues.length === 3) score += 25;
  else if (commonValues.length === 2) score += 15;
  else if (commonValues.length === 1) score += 5;
  
  return Math.min(40, score);
}

// 갈등 점수 계산
function calculateConflictScore(c1, c2) {
  const makeKey = (a, b) => [a, b].sort().join('_');
  const pairKey = makeKey(c1, c2);
  
  const BEST_MATCHES = [
    makeKey('collaborating', 'collaborating'),
    makeKey('accommodating', 'accommodating'),
    makeKey('collaborating', 'accommodating'),
    makeKey('compromising', 'collaborating'),
  ];
  
  const GOOD_MATCHES = [
    makeKey('competing', 'accommodating'),
    makeKey('compromising', 'compromising'),
    makeKey('compromising', 'accommodating'),
  ];
  
  if (BEST_MATCHES.includes(pairKey)) return 30;
  if (GOOD_MATCHES.includes(pairKey)) return 20;
  if (pairKey === makeKey('competing', 'competing')) return 10;
  if (pairKey === makeKey('avoiding', 'avoiding')) return 10;
  if (pairKey === makeKey('avoiding', 'competing')) return 5;
  
  return 15;
}

// 라이프스타일 점수 계산
function calculateLifestyleScore(p1, p2) {
  let score = 0;
  
  if (p1.recharge === p2.recharge) {
    score += 10;
  } else if (
    (p1.recharge === 'independent' && p2.recharge === 'relational') ||
    (p1.recharge === 'relational' && p2.recharge === 'independent')
  ) {
    score += 5;
  } else {
    score += 7;
  }
  
  if (p1.apology === p2.apology) score += 10;
  else score += 5;
  
  if (p1.comfort === p2.comfort) score += 10;
  else score += 5;
  
  return score;
}

// 등급 계산
function getGrade(totalScore) {
  if (totalScore >= 90) return 'perfect';
  if (totalScore >= 75) return 'great';
  if (totalScore >= 60) return 'good';
  if (totalScore >= 45) return 'growth';
  return 'challenging';
}

// 랜덤 선택 헬퍼
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 메인 분석
function analyzeProbability(sampleSize = 50000) {
  const possibleValues = [
    ["성장", "자유", "안정"],
    ["성장", "자유", "배려"],
    ["성장", "자유", "열정"],
    ["성장", "안정", "배려"],
    ["성장", "안정", "열정"],
    ["성장", "배려", "열정"],
    ["자유", "안정", "배려"],
    ["자유", "안정", "열정"],
    ["자유", "배려", "열정"],
    ["안정", "배려", "열정"],
    ["도전", "성취", "조화"],
    ["도전", "성취", "신뢰"],
    ["배려", "열정", "도전"],
  ];
  
  const conflictStyles = ["competing", "collaborating", "compromising", "avoiding", "accommodating"];
  const rechargeMethods = ["independent", "relational", "balanced"];
  const apologyStyles = ["words", "actions", "time", "gifts", "touch"];
  const comfortJudges = ["solution", "empathy", "presence"];
  
  const gradeCount = {
    perfect: 0,
    great: 0,
    good: 0,
    growth: 0,
    challenging: 0
  };
  
  const scoreDistribution = {};
  let totalScore = 0;
  let minScore = 100;
  let maxScore = 0;
  
  // 시뮬레이션
  for (let i = 0; i < sampleSize; i++) {
    const p1 = {
      values: randomChoice(possibleValues),
      conflict: randomChoice(conflictStyles),
      recharge: randomChoice(rechargeMethods),
      apology: randomChoice(apologyStyles),
      comfort: randomChoice(comfortJudges)
    };
    
    const p2 = {
      values: randomChoice(possibleValues),
      conflict: randomChoice(conflictStyles),
      recharge: randomChoice(rechargeMethods),
      apology: randomChoice(apologyStyles),
      comfort: randomChoice(comfortJudges)
    };
    
    const valueScore = calculateValueScore(p1.values, p2.values);
    const conflictScore = calculateConflictScore(p1.conflict, p2.conflict);
    const lifestyleScore = calculateLifestyleScore(p1, p2);
    const total = valueScore + conflictScore + lifestyleScore;
    const grade = getGrade(total);
    
    gradeCount[grade]++;
    totalScore += total;
    
    const range = Math.floor(total / 5) * 5;
    scoreDistribution[range] = (scoreDistribution[range] || 0) + 1;
    
    if (total < minScore) minScore = total;
    if (total > maxScore) maxScore = total;
  }
  
  // 결과 출력
  console.log("\n" + "=".repeat(70));
  console.log("🎲 호환성 등급 확률 분석 (몬테카를로 시뮬레이션)");
  console.log("=".repeat(70));
  console.log(`샘플 크기: ${sampleSize.toLocaleString()}개 커플 조합\n`);
  
  console.log("📊 등급별 분포\n");
  console.log("┌──────────────┬──────────┬──────────┬────────────────────────────┐");
  console.log("│    등급      │ 점수범위 │   횟수   │         확률 (%)           │");
  console.log("├──────────────┼──────────┼──────────┼────────────────────────────┤");
  
  const grades = [
    { name: "Perfect     ", key: "perfect", range: "90-100", emoji: "💯" },
    { name: "Great       ", key: "great", range: "75-89 ", emoji: "✨" },
    { name: "Good        ", key: "good", range: "60-74 ", emoji: "👍" },
    { name: "Growth      ", key: "growth", range: "45-59 ", emoji: "🌱" },
    { name: "Challenging ", key: "challenging", range: "0-44  ", emoji: "💪" },
  ];
  
  grades.forEach(grade => {
    const count = gradeCount[grade.key];
    const percentage = ((count / sampleSize) * 100).toFixed(2);
    const barLength = Math.floor(parseFloat(percentage) / 2);
    const bar = "█".repeat(barLength);
    console.log(`│ ${grade.emoji} ${grade.name}│ ${grade.range}  │ ${count.toString().padStart(8)} │ ${percentage.padStart(6)}% ${bar.padEnd(22)}│`);
  });
  
  console.log("└──────────────┴──────────┴──────────┴────────────────────────────┘\n");
  
  // 통계
  const avgScore = (totalScore / sampleSize).toFixed(2);
  console.log("📈 통계 정보\n");
  console.log(`   평균 점수: ${avgScore}점`);
  console.log(`   최저 점수: ${minScore}점`);
  console.log(`   최고 점수: ${maxScore}점\n`);
  
  // 점수대별 분포
  console.log("📉 점수대별 상세 분포 (5점 단위)\n");
  const sortedRanges = Object.keys(scoreDistribution).map(Number).sort((a, b) => b - a);
  
  sortedRanges.forEach(range => {
    const count = scoreDistribution[range];
    const percent = ((count / sampleSize) * 100).toFixed(1);
    const barLength = Math.floor(count / (sampleSize / 60));
    const bar = "▓".repeat(barLength);
    console.log(`   ${range.toString().padStart(3)}-${(range + 4).toString().padEnd(3)}점: ${bar.padEnd(30)} ${count.toString().padStart(5)}회 (${percent.padStart(4)}%)`);
  });
  
  console.log("\n" + "=".repeat(70));
  console.log("💡 핵심 인사이트");
  console.log("=".repeat(70) + "\n");
  
  const perfectProb = ((gradeCount.perfect / sampleSize) * 100).toFixed(2);
  const perfectRatio = Math.round(sampleSize / gradeCount.perfect);
  
  console.log(`✨ Perfect 등급 확률: ${perfectProb}% (약 ${perfectRatio}쌍 중 1쌍)`);
  console.log(`🎯 Great 이상 확률: ${(((gradeCount.perfect + gradeCount.great) / sampleSize) * 100).toFixed(2)}%`);
  console.log(`👍 Good 이상 확률: ${(((gradeCount.perfect + gradeCount.great + gradeCount.good) / sampleSize) * 100).toFixed(2)}%`);
  console.log(`💪 Challenging 확률: ${((gradeCount.challenging / sampleSize) * 100).toFixed(2)}%\n`);
  
  console.log("=".repeat(70) + "\n");
}

// 실행
analyzeProbability(100000);
