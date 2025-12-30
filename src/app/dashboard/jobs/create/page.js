'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Plus,
  X,
  FileText,
  Save
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    description: '',
    requiredSkills: [],
    niceToHaveSkills: [],
    education: '',
    salary: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [niceToHaveInput, setNiceToHaveInput] = useState('');
  const [jdFile, setJdFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.requiredSkills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(s => s !== skill)
    });
  };

  const addNiceToHave = () => {
    if (niceToHaveInput.trim() && !formData.niceToHaveSkills.includes(niceToHaveInput.trim())) {
      setFormData({
        ...formData,
        niceToHaveSkills: [...formData.niceToHaveSkills, niceToHaveInput.trim()]
      });
      setNiceToHaveInput('');
    }
  };

  const removeNiceToHave = (skill) => {
    setFormData({
      ...formData,
      niceToHaveSkills: formData.niceToHaveSkills.filter(s => s !== skill)
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setJdFile(file);
      // TODO: Parse JD file and auto-fill form
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job created:', formData);
    // TODO: API call to create job
    router.push('/dashboard/jobs');
  };

  return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Create New Job</h1>
            <p className="text-gray-400">Fill in the details to post a new job opening</p>
          </div>
        </div>

        {/* JD Upload Option */}
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Upload Job Description (Optional)</h3>
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#FF6B35] transition-colors cursor-pointer">
            <input
              type="file"
              id="jd-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
            <label htmlFor="jd-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium mb-1">Upload JD to auto-fill form</p>
              <p className="text-xs text-gray-400">PDF, DOC, DOCX, or TXT (Max 5MB)</p>
              {jdFile && (
                <div className="mt-3 flex items-center justify-center space-x-2 text-[#06A77D]">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{jdFile.name}</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Job Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-semibold mb-6">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Full Stack Developer"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Department *</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Engineering"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote, Bangalore"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Job Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience Required</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 3-5 years"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g. Bachelor's in Computer Science"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Job Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={8}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
            />
          </div>

          {/* Required Skills */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Required Skills *</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a skill (e.g. React, Python)"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#FF6B35]/20 border border-[#FF6B35]/50 rounded-lg"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Nice to Have Skills */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Nice to Have Skills</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={niceToHaveInput}
                onChange={(e) => setNiceToHaveInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNiceToHave())}
                placeholder="Add optional skills"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
              <button
                type="button"
                onClick={addNiceToHave}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.niceToHaveSkills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeNiceToHave(skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Salary Range (Optional)</h3>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. ₹10-15 LPA"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all shadow-lg shadow-[#FF6B35]/20"
            >
              <Save className="w-5 h-5" />
              <span>Create Job</span>
            </button>
          </div>
        </form>
      </div>
  );
}
