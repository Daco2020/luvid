
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
