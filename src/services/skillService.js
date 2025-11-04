import { supabase } from '../config/supabase.js';

export const skillService = {
  async getAllSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getSkillsByCategory(category) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('category', category)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getSkillById(id) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createSkill(skillData) {
    const { data, error } = await supabase
      .from('skills')
      .insert([skillData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSkill(id, skillData) {
    const { data, error } = await supabase
      .from('skills')
      .update(skillData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSkill(id) {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};
