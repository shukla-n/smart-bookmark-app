import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yxdfnafuzrbyawbruerv.supabase.co";
const supabaseAnonKey = "sb_publishable_OzH_AamAk6KqlANI-itV8w_eT7B5kRZ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
