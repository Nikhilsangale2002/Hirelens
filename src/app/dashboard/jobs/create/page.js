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
import { jobsApi } from '@/lib/api';

export default function CreateJob() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

  // Dropdown options
  const jobTitles = [
    'Software Engineer',
    'Senior Software Engineer',
    'Staff Software Engineer',
    'Principal Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Data Scientist',
    'Data Analyst',
    'Machine Learning Engineer',
    'AI Engineer',
    'Product Manager',
    'Senior Product Manager',
    'Product Designer',
    'UI/UX Designer',
    'Graphic Designer',
    'Business Analyst',
    'QA Engineer',
    'Test Automation Engineer',
    'Engineering Manager',
    'Technical Lead',
    'Architect',
    'Solutions Architect',
    'Mobile Developer',
    'Android Developer',
    'iOS Developer',
    'Cloud Engineer',
    'Security Engineer',
    'Database Administrator',
    'System Administrator',
    'Marketing Manager',
    'Sales Manager',
    'HR Manager',
    'Financial Analyst',
    'Operations Manager',
    'Customer Success Manager',
    'Content Writer',
    'Technical Writer',
    'Intern'
  ];

  const departments = [
    'Engineering',
    'Product',
    'Design',
    'Data Science',
    'DevOps',
    'Quality Assurance',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
    'Business Development',
    'Research & Development',
    'IT & Infrastructure',
    'Security',
    'Legal',
    'Administration',
    'Content & Creative'
  ];

  const locations = [
    'Remote',
    'Hybrid',
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Pune',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'Gurgaon',
    'Noida',
    'Chandigarh',
    'Jaipur',
    'Kochi',
    'Indore',
    'Bhopal',
    'Lucknow',
    'Surat',
    'Nagpur',
    'Vadodara',
    'Coimbatore',
    'Visakhapatnam',
    'Remote (India)',
    'Remote (Global)'
  ];

  const experienceLevels = [
    'Fresher (0-1 year)',
    '1-2 years',
    '2-3 years',
    '3-5 years',
    '5-7 years',
    '7-10 years',
    '10+ years',
    '15+ years'
  ];

  const educationLevels = [
    'High School',
    '12th Pass',
    'Diploma',
    'Bachelor\'s Degree',
    'B.Tech/B.E.',
    'BCA',
    'B.Sc',
    'B.Com',
    'BA',
    'Master\'s Degree',
    'M.Tech/M.E.',
    'MCA',
    'M.Sc',
    'MBA',
    'MA',
    'PhD',
    'Any Graduate',
    'Any Post Graduate'
  ];

  const commonSkills = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'React',
    'Angular',
    'Vue.js',
    'Node.js',
    'Django',
    'Flask',
    'Spring Boot',
    'SQL',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'AWS',
    'Azure',
    'GCP',
    'Docker',
    'Kubernetes',
    'Git',
    'CI/CD',
    'REST API',
    'GraphQL',
    'Machine Learning',
    'Data Analysis',
    'Excel',
    'Power BI',
    'Tableau',
    'Figma',
    'Adobe XD',
    'Photoshop',
    'UI/UX Design',
    'Agile',
    'Scrum',
    'Project Management',
    'Communication',
    'Leadership',
    'Problem Solving',
    'Team Collaboration'
  ];

  const salaryRanges = [
    '₹3-5 LPA',
    '₹5-7 LPA',
    '₹7-10 LPA',
    '₹10-15 LPA',
    '₹15-20 LPA',
    '₹20-25 LPA',
    '₹25-30 LPA',
    '₹30-40 LPA',
    '₹40-50 LPA',
    '₹50+ LPA',
    '$50k-$70k',
    '$70k-$90k',
    '$90k-$120k',
    '$120k-$150k',
    '$150k-$200k',
    '$200k+'
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const jobData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        job_type: formData.type,
        experience_required: formData.experience,
        description: formData.description,
        skills_required: formData.requiredSkills,
        education: formData.education,
        salary_range: formData.salary
      };

      await jobsApi.createJob(jobData);
      
      // Redirect to jobs page on success
      router.push('/dashboard/jobs');
    } catch (err) {
      setError(err.message || 'Failed to create job');
      if (process.env.NODE_ENV === 'development') {
        console.error('Create job error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Create New Job</h1>
            <p className="text-xs md:text-sm text-gray-400">Fill in the details to post a new job opening</p>
          </div>
        </div>

        {/* JD Upload Option */}
        <div className="glass-panel rounded-2xl p-4 md:p-6">
          <h3 className="font-semibold mb-4 text-sm md:text-base">Upload Job Description (Optional)</h3>
          <div className="border-2 border-dashed border-white/20 rounded-xl p-6 md:p-8 text-center hover:border-[#FF6B35] transition-colors cursor-pointer">
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
          {/* Error Message */}
          {error && (
            <div className="glass-panel rounded-2xl p-4 bg-red-500/10 border border-red-500/50">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="glass-panel rounded-2xl p-4 md:p-6">
            <h3 className="font-semibold mb-4 md:mb-6 text-sm md:text-base">Basic Information</h3>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">Job Title *</label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
                >
                  <option value="">Select Job Title</option>
                  {jobTitles.map((title, index) => (
                    <option key={index} value={title}>{title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
                >
                  <option value="">Select Location</option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Job Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience Required</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
                >
                  <option value="">Select Experience Level</option>
                  {experienceLevels.map((exp, index) => (
                    <option key={index} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Education</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
                >
                  <option value="">Select Education Level</option>
                  {educationLevels.map((edu, index) => (
                    <option key={index} value={edu}>{edu}</option>
                  ))}
                </select>
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
              <select
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-48 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
              >
                <option value="">Select Skill</option>
                {commonSkills.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Or type skill manually (e.g. React, Python)"
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
              <select
                value={niceToHaveInput}
                onChange={(e) => setNiceToHaveInput(e.target.value)}
                className="w-48 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
              >
                <option value="">Select Skill</option>
                {commonSkills.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
              <input
                type="text"
                value={niceToHaveInput}
                onChange={(e) => setNiceToHaveInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNiceToHave())}
                placeholder="Or type skill manually"
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
            <div className="flex gap-4">
              <select
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black"
              >
                <option value="">Select Range</option>
                {salaryRanges.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </select>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Or type manually (e.g. ₹10-15 LPA)"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
            </div>
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
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all shadow-lg shadow-[#FF6B35]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span>{isLoading ? 'Creating...' : 'Create Job'}</span>
            </button>
          </div>
        </form>
      </div>
  );
}
