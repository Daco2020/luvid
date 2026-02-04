
import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 Supabase 설정 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 클라이언트 사이드에서 사용하기 때문에, 환경 변수가 없을 경우에 대한 예외 처리는 선택적이지만 권장됩니다.
// 단, 빌드 타임에는 에러가 나지 않도록 주의해야 합니다.

export const supabase = 
  supabaseUrl && supabaseKey 
    ? createClient(supabaseUrl, supabaseKey) 
    : null;
