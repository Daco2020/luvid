import { supabase } from "../../../shared/utils/supabase";
import { LuvIdProfile } from "../model/types";

const TABLE_NAME = "luvid_profiles";

/**
 * Luv ID 저장
 */
export async function saveLuvId(profile: LuvIdProfile): Promise<void> {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      id: profile.id,
      user_id: profile.userId,
      report_id: profile.reportId,
      data: profile
    }]);

  if (error) {
    console.error("Error saving Luv ID:", error);
    throw error;
  }
}

/**
 * Luv ID 조회 (user_id 기준 - 최신순)
 */
export async function getLuvIdByUserId(userId: string): Promise<LuvIdProfile | null> {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    if (error.code === "42P01") {
      console.error("Luv ID table does not exist. Please create 'luvid_profiles' table in Supabase.");
      return null; // Table doesn't exist yet
    }
    console.error("Error fetching Luv ID:", error);
    throw error;
  }

  return data?.data as LuvIdProfile;
}

/**
 * Luv ID 조회 (ID 기준)
 */
export async function getLuvIdById(id: string): Promise<LuvIdProfile | null> {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    if (error.code === "42P01") {
      console.error("Luv ID table does not exist. Please create 'luvid_profiles' table in Supabase.");
      return null;
    }
    console.error("Error fetching Luv ID:", error);
    throw error;
  }

  return data?.data as LuvIdProfile;
}

/**
 * Luv ID 존재 여부 확인
 */
export async function checkLuvIdExists(userId: string): Promise<boolean> {
  const profile = await getLuvIdByUserId(userId);
  return profile !== null;
}

/**
 * 닉네임 수정
 */
export async function updateLuvIdNickname(id: string, newNickname: string): Promise<void> {
  if (!supabase) throw new Error("Supabase client not initialized");

  // 1. 현재 프로필 데이터 조회
  const currentProfile = await getLuvIdById(id);
  if (!currentProfile) throw new Error("Profile not found");

  // 2. data JSONB 업데이트 준비
  const updatedData = {
    ...currentProfile,
    nickname: newNickname,
    updatedAt: new Date().toISOString()
  };

  // 3. DB 업데이트 (data JSONB + updated_at)
  // nickname 컬럼은 없을 가능성이 높으므로 제외하고 data JSONB만 업데이트합니다.
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ 
      data: updatedData,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating nickname:", JSON.stringify(error, null, 2));
    throw error;
  }
}
