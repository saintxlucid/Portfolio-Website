import { supabase } from '../config/supabase.js';

export const settingsService = {
  async getAllSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) throw error;
    return data;
  },

  async getSettingByKey(key) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', key)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createSetting(settingData) {
    const { data, error } = await supabase
      .from('site_settings')
      .insert([settingData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSetting(key, value) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async upsertSetting(key, value, description = null) {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert([{ key, value, description }], { onConflict: 'key' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSetting(key) {
    const { error } = await supabase
      .from('site_settings')
      .delete()
      .eq('key', key);

    if (error) throw error;
    return { success: true };
  }
};
