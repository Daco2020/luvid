import { supabase } from "@/shared/utils/supabase";
import { CompatibilityResult } from "./compatibility-algorithm";
import { generateCompatibilityId } from "@/shared/utils/id-generator";

const TABLE_NAME = "luvid_compatibility";

/**
 * 궁합 분석 결과 저장
 */
export interface CompatibilityRecord {
  id: string;
  requesterId: string;
  targetId: string;
  data: CompatibilityResult;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 새로운 궁합 분석 결과 생성 및 저장
 */
export async function saveCompatibilityResult(
  requesterId: string,
  targetId: string,
  result: CompatibilityResult
): Promise<string> {
  if (!supabase) throw new Error("Supabase client not initialized");

  const id = generateCompatibilityId();

  const { error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      id,
      requester_id: requesterId,
      target_id: targetId,
      data: result,
    }]);

  if (error) {
    console.error("Error saving compatibility result:", error);
    throw error;
  }

  return id;
}

/**
 * 궁합 분석 결과 조회
 */
export async function getCompatibilityResult(id: string): Promise<CompatibilityRecord | null> {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    if (error.code === "42P01") {
      console.error("Compatibility table does not exist. Please create 'luvid_compatibility' table in Supabase.");
      return null;
    }
    console.error("Error fetching compatibility result:", error);
    throw error;
  }

  if (!data) return null;

  return {
    id: data.id,
    requesterId: data.requester_id,
    targetId: data.target_id,
    data: data.data as CompatibilityResult,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * 사용자가 요청한 궁합 분석 목록 조회
 */
export async function getCompatibilitiesByRequester(requesterId: string): Promise<CompatibilityRecord[]> {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("requester_id", requesterId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching compatibilities:", error);
    throw error;
  }

  return data.map(item => ({
    id: item.id,
    requesterId: item.requester_id,
    targetId: item.target_id,
    data: item.data as CompatibilityResult,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
}
