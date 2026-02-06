-- Luvid Compatibility Table
-- 궁합 분석 결과를 저장하는 테이블

CREATE TABLE luvid_compatibility (
  id TEXT PRIMARY KEY,                -- 유니크 궁합 ID (COMP-XXXXX)
  requester_id TEXT NOT NULL,         -- 요청자 Luv ID
  target_id TEXT NOT NULL,            -- 대상자 Luv ID
  data JSONB NOT NULL,                -- 궁합 결과 데이터 (CompatibilityResult)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_compatibility_requester ON luvid_compatibility(requester_id);
CREATE INDEX idx_compatibility_target ON luvid_compatibility(target_id);
CREATE INDEX idx_compatibility_created ON luvid_compatibility(created_at DESC);

-- RLS 정책 (선택사항)
-- ALTER TABLE luvid_compatibility ENABLE ROW LEVEL SECURITY;

-- 예시: 모든 사용자가 조회 가능
-- CREATE POLICY "Anyone can view compatibility results"
-- ON luvid_compatibility FOR SELECT
-- USING (true);
