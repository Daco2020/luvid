/**
 * Section 3: 가치 항목 아이콘 매핑
 * 64개 모든 가치 항목(긍정 32개 + 부정 32개)에 고유한 lucide-react 아이콘 할당
 */

import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

/**
 * 가치 항목 ID를 lucide-react 아이콘으로 매핑
 * 각 항목은 고유한 아이콘을 가짐
 */
export const VALUE_ASPECT_ICONS: Record<string, LucideIcon> = {
  // 1. 정직성 (Honesty)
  honesty_pos_1: Icons.MessageSquare, // 투명한 소통
  honesty_pos_2: Icons.Heart, // 진실된 감정 표현
  honesty_pos_3: Icons.CheckCircle2, // 실수 인정
  honesty_pos_4: Icons.Handshake, // 약속 이행
  honesty_neg_1: Icons.MessageCircleX, // 습관적 거짓말
  honesty_neg_2: Icons.EyeOff, // 이중생활
  honesty_neg_3: Icons.ShieldAlert, // 변명과 회피
  honesty_neg_4: Icons.XCircle, // 약속 파기

  // 2. 배려심 (Consideration)
  consideration_pos_1: Icons.HeartHandshake, // 먼저 생각하기
  consideration_pos_2: Icons.Gift, // 작은 관심
  consideration_pos_3: Icons.Users, // 희생적 태도
  consideration_pos_4: Icons.Eye, // 세심한 관찰
  consideration_neg_1: Icons.UserX, // 자기중심적
  consideration_neg_2: Icons.EyeOff, // 무관심
  consideration_neg_3: Icons.UserMinus, // 이기적 결정
  consideration_neg_4: Icons.Glasses, // 둔감함

  // 3. 소통능력 (Communication)
  communication_pos_1: Icons.MessageCircle, // 명확한 표현
  communication_pos_2: Icons.Ear, // 경청하는 자세
  communication_pos_3: Icons.MessagesSquare, // 건설적 대화
  communication_pos_4: Icons.Clock, // 적절한 타이밍
  communication_neg_1: Icons.MessageSquareOff, // 말 안 하기
  communication_neg_2: Icons.Volume2, // 말 자르기
  communication_neg_3: Icons.Ban, // 회피형 대화
  communication_neg_4: Icons.Flame, // 감정적 폭발

  // 4. 신뢰성 (Reliability)
  reliability_pos_1: Icons.Shield, // 일관된 행동
  reliability_pos_2: Icons.Award, // 책임감
  reliability_pos_3: Icons.TrendingUp, // 예측 가능성
  reliability_pos_4: Icons.Anchor, // 의지할 수 있음
  reliability_neg_1: Icons.ShieldOff, // 말과 행동 불일치
  reliability_neg_2: Icons.AlertTriangle, // 무책임
  reliability_neg_3: Icons.Shuffle, // 변덕스러움
  reliability_neg_4: Icons.ShieldX, // 믿을 수 없음

  // 5. 존중 (Respect)
  respect_pos_1: Icons.ThumbsUp, // 의견 존중
  respect_pos_2: Icons.Home, // 경계 인정
  respect_pos_3: Icons.Scale, // 평등한 관계
  respect_pos_4: Icons.Crown, // 인격 존중
  respect_neg_1: Icons.ThumbsDown, // 무시하는 태도
  respect_neg_2: Icons.DoorOpen, // 경계 침범
  respect_neg_3: Icons.TrendingDown, // 우월감
  respect_neg_4: Icons.Skull, // 인격 모독

  // 6. 감정 조절 (Emotional Regulation)
  emotional_regulation_pos_1: Icons.Smile, // 안정적 기분
  emotional_regulation_pos_2: Icons.CircleSlash, // 분노 조절
  emotional_regulation_pos_3: Icons.Wind, // 스트레스 관리
  emotional_regulation_pos_4: Icons.Brain, // 냉정한 판단
  emotional_regulation_neg_1: Icons.Frown, // 극심한 기복
  emotional_regulation_neg_2: Icons.Zap, // 폭발적 분노
  emotional_regulation_neg_3: Icons.CloudRain, // 부정적 전이
  emotional_regulation_neg_4: Icons.AlertCircle, // 감정적 결정

  // 7. 독립성 (Independence)
  independence_pos_1: Icons.User, // 자기 주도성
  independence_pos_2: Icons.Wallet, // 경제적 자립
  independence_pos_3: Icons.Coffee, // 개인 시간
  independence_pos_4: Icons.TrendingUp, // 자기 발전
  independence_neg_1: Icons.Link, // 과도한 의존
  independence_neg_2: Icons.DollarSign, // 경제적 의존
  independence_neg_3: Icons.Paperclip, // 집착
  independence_neg_4: Icons.TrendingDown, // 자기 방치

  // 8. 공감능력 (Empathy)
  empathy_pos_1: Icons.HeartPulse, // 감정 이해
  empathy_pos_2: Icons.Sparkles, // 함께 느끼기
  empathy_pos_3: Icons.Heart, // 위로와 지지
  empathy_pos_4: Icons.Repeat, // 입장 바꿔 생각
  empathy_neg_1: Icons.HeartOff, // 감정 무시
  empathy_neg_2: Icons.Snowflake, // 냉담한 반응
  empathy_neg_3: Icons.HeartCrack, // 공감 부족
  empathy_neg_4: Icons.UserCircle, // 자기 관점만

  // 9. 유머감각 (Humor)
  humor_pos_1: Icons.Laugh, // 웃음 선물
  humor_pos_2: Icons.Sun, // 긍정적 분위기
  humor_pos_3: Icons.PartyPopper, // 재치있는 대화
  humor_pos_4: Icons.SmilePlus, // 자기 비하 유머
  humor_neg_1: Icons.Meh, // 유머 없음
  humor_neg_2: Icons.Cloud, // 무거운 분위기
  humor_neg_3: Icons.Minus, // 지루한 대화
  humor_neg_4: Icons.Frown, // 상처주는 농담

  // 10. 성실함 (Diligence)
  diligence_pos_1: Icons.CheckCheck, // 끝까지 완수
  diligence_pos_2: Icons.Footprints, // 꾸준한 노력
  diligence_pos_3: Icons.ListChecks, // 계획 실행
  diligence_pos_4: Icons.Activity, // 자기 관리
  diligence_neg_1: Icons.CircleDashed, // 중도 포기
  diligence_neg_2: Icons.BedDouble, // 게으름
  diligence_neg_3: Icons.FileText, // 계획만 세움
  diligence_neg_4: Icons.UserX, // 자기 방치

  // 11. 긍정성 (Positivity)
  positivity_pos_1: Icons.Sunrise, // 희망적 태도
  positivity_pos_2: Icons.Sparkle, // 감사하는 마음
  positivity_pos_3: Icons.Lightbulb, // 밝은 에너지
  positivity_pos_4: Icons.Target, // 문제 해결 지향
  positivity_neg_1: Icons.CloudDrizzle, // 비관적 태도
  positivity_neg_2: Icons.MessageSquareWarning, // 불평불만
  positivity_neg_3: Icons.CloudFog, // 부정적 에너지
  positivity_neg_4: Icons.Flag, // 포기 지향

  // 12. 열정 (Passion)
  passion_pos_1: Icons.Briefcase, // 일에 대한 열정
  passion_pos_2: Icons.HeartHandshake, // 관계에 진심
  passion_pos_3: Icons.Mountain, // 목표 지향
  passion_pos_4: Icons.Rocket, // 적극적 참여
  passion_neg_1: Icons.Battery, // 무기력
  passion_neg_2: Icons.HeartOff, // 관계에 무심
  passion_neg_3: Icons.MapPin, // 목표 없음
  passion_neg_4: Icons.Pause, // 소극적 태도

  // 13. 계획성 (Planning)
  planning_pos_1: Icons.Calendar, // 미래 준비
  planning_pos_2: Icons.Network, // 체계적 사고
  planning_pos_3: Icons.PiggyBank, // 재정 관리
  planning_pos_4: Icons.Timer, // 시간 관리
  planning_neg_1: Icons.CalendarX, // 무계획
  planning_neg_2: Icons.Dices, // 즉흥적
  planning_neg_3: Icons.CreditCard, // 낭비
  planning_neg_4: Icons.Hourglass, // 시간 낭비

  // 14. 친절함 (Kindness)
  kindness_pos_1: Icons.MessageCircleHeart, // 따뜻한 말
  kindness_pos_2: Icons.Flower, // 작은 배려
  kindness_pos_3: Icons.Users2, // 타인에게 친절
  kindness_pos_4: Icons.HandHeart, // 도움의 손길
  kindness_neg_1: Icons.MessageSquareX, // 차가운 말
  kindness_neg_2: Icons.Minus, // 무관심
  kindness_neg_3: Icons.UserMinus, // 타인에게 무례
  kindness_neg_4: Icons.HandMetal, // 냉정함

  // 15. 책임감 (Responsibility)
  responsibility_pos_1: Icons.ShieldCheck, // 약속 지키기
  responsibility_pos_2: Icons.CheckSquare, // 맡은 일 완수
  responsibility_pos_3: Icons.FileCheck, // 결과에 책임
  responsibility_pos_4: Icons.UserCheck, // 신뢰할 수 있음
  responsibility_neg_1: Icons.ShieldX, // 약속 어김
  responsibility_neg_2: Icons.Square, // 일 미루기
  responsibility_neg_3: Icons.FileX, // 책임 회피
  responsibility_neg_4: Icons.UserX, // 믿을 수 없음

  // 16. 개방성 (Openness)
  openness_pos_1: Icons.Compass, // 새로운 경험
  openness_pos_2: Icons.BookOpen, // 배움에 열린
  openness_pos_3: Icons.Globe, // 다양성 존중
  openness_pos_4: Icons.Lightbulb, // 창의적 사고
  openness_neg_1: Icons.Lock, // 폐쇄적
  openness_neg_2: Icons.BookX, // 배움 거부
  openness_neg_3: Icons.Ban, // 편견
  openness_neg_4: Icons.Box, // 고정관념

  // 17. 인내심 (Patience)
  patience_pos_1: Icons.Hourglass, // 기다릴 수 있음
  patience_pos_2: Icons.Turtle, // 천천히 이해
  patience_pos_3: Icons.Leaf, // 차분한 태도
  patience_pos_4: Icons.TreePine, // 꾸준함
  patience_neg_1: Icons.FastForward, // 성급함
  patience_neg_2: Icons.Rabbit, // 조급함
  patience_neg_3: Icons.Wind, // 짜증
  patience_neg_4: Icons.AlertOctagon, // 참을성 없음

  // 18. 용기 (Courage)
  courage_pos_1: Icons.Sword, // 도전 정신
  courage_pos_2: Icons.ShieldPlus, // 두려움 극복
  courage_pos_3: Icons.Flag, // 신념 지키기
  courage_pos_4: Icons.Zap, // 결단력
  courage_neg_1: Icons.ShieldMinus, // 겁많음
  courage_neg_2: Icons.Ghost, // 회피
  courage_neg_3: Icons.FlagOff, // 포기
  courage_neg_4: Icons.CircleSlash, // 우유부단

  // 19. 겸손함 (Humility)
  humility_pos_1: Icons.UserRound, // 자기 인식
  humility_pos_2: Icons.Ear, // 타인 의견 수용
  humility_pos_3: Icons.Award, // 성취 겸손
  humility_pos_4: Icons.HandHelping, // 배려
  humility_neg_1: Icons.Crown, // 자만심
  humility_neg_2: Icons.VolumeX, // 독선
  humility_neg_3: Icons.Trophy, // 자랑
  humility_neg_4: Icons.UserCog, // 오만함

  // 20. 유연성 (Flexibility)
  flexibility_pos_1: Icons.Waves, // 적응력
  flexibility_pos_2: Icons.RefreshCw, // 변화 수용
  flexibility_pos_3: Icons.Blend, // 타협
  flexibility_pos_4: Icons.Route, // 대안 찾기
  flexibility_neg_1: Icons.Square, // 고집
  flexibility_neg_2: Icons.X, // 변화 거부
  flexibility_neg_3: Icons.Minus, // 타협 거부
  flexibility_neg_4: Icons.Navigation, // 융통성 없음
};

/**
 * 가치 항목 ID로 아이콘 가져오기
 * @param aspectId 가치 항목 ID
 * @returns lucide-react 아이콘 컴포넌트
 */
export function getValueAspectIcon(aspectId: string): LucideIcon {
  const icon = VALUE_ASPECT_ICONS[aspectId];
  if (!icon) {
    console.warn(`Icon not found for aspect ID: ${aspectId}, using default`);
    return Icons.Circle; // 기본 아이콘
  }
  return icon;
}
