"use server";

import { createClient } from "../server";

export async function getCurrentUserProfile() {
  const supabase = await createClient();

  // Pega o usuário atual
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error getting user:", userError);
    return null;
  }

  if (!user) {
    // Nenhum usuário logado
    return null;
  }

  // Busca o perfil do usuário
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return null;
  }

  return profile;
}
