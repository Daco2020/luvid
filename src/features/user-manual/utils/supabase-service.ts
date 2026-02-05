
import { supabase } from "./supabase";
import { UserManualReport } from "../model/report";

const TABLE_NAME = "luvid_user_manuals";

export async function saveUserManual(id: string, userId: string, data: UserManualReport) {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { error } = await supabase
    .from(TABLE_NAME)
    .insert([
      {
        id,
        user_id: userId,
        data,
      },
    ]);

  if (error) {
    console.error("Error saving manual:", error);
    throw error;
  }
}

export async function getUserManual(id: string) {
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    console.error("Error fetching manual:", error);
    throw error;
  }

  return data;
}

/**
 * 사용자의 설명서 존재 여부 확인
 */
export async function checkUserManualExists(userId: string): Promise<boolean> {
  if (!supabase) return false;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id")
    .eq("user_id", userId)
    .limit(1);

  if (error) {
    if (error.code === "42P01") return false; // Table doesn't exist
    console.error("Error checking manual:", error);
    return false;
  }

  return data && data.length > 0;
}

/**
 * 사용자의 가장 최근 설명서 조회
 */
export async function getLatestUserManual(userId: string) {
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
    if (error.code === "42P01") return null; // Table doesn't exist
    console.error("Error fetching latest manual:", error);
    return null;
  }

  return data;
}
