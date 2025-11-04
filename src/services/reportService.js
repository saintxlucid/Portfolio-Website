import { supabase } from '../config/supabase.js';

export const reportService = {
  async createReport(reportData) {
    const { data, error } = await supabase
      .from('reports')
      .insert([reportData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getReportById(id) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getReports(status = 'pending', limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async updateReportStatus(reportId, status, resolutionNotes = null) {
    const { data, error } = await supabase
      .from('reports')
      .update({
        status,
        resolution_notes: resolutionNotes
      })
      .eq('id', reportId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserReports(userId) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('reporter_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getReportedContent(contentId, contentType) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('reported_content_id', contentId)
      .eq('reported_content_type', contentType);

    if (error) throw error;
    return data;
  },

  async reportUser(reporterId, reportedUserId, reason, description) {
    return this.createReport({
      reporter_id: reporterId,
      reported_user_id: reportedUserId,
      reason,
      description,
      status: 'pending'
    });
  },

  async reportContent(reporterId, contentId, contentType, reason, description) {
    return this.createReport({
      reporter_id: reporterId,
      reported_content_id: contentId,
      reported_content_type: contentType,
      reason,
      description,
      status: 'pending'
    });
  },

  async bulkUpdateStatus(reportIds, status) {
    const { error } = await supabase
      .from('reports')
      .update({ status })
      .in('id', reportIds);

    if (error) throw error;
    return { success: true };
  }
};
