import { supabase } from '../config/supabase.js';

export const experienceService = {
  async getAllExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getExperiencesByType(type) {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('type', type)
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getExperienceById(id) {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createExperience(experienceData) {
    const { data, error } = await supabase
      .from('experiences')
      .insert([experienceData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateExperience(id, experienceData) {
    const { data, error } = await supabase
      .from('experiences')
      .update(experienceData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteExperience(id) {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};
