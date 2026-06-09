const BASE = import.meta.env.VITE_API_BASE || '/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('admin_token')
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || res.statusText)
  }
  return res.json()
}

export const api = {
  // Auth
  login: (password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),

  // Sections (public GET, admin PUT)
  getSection: (key, lang = 'zh') => request(`/sections/${key}?lang=${lang}`),
  setSection: (key, zh, en) =>
    request(`/sections/${key}`, { method: 'PUT', body: JSON.stringify({ zh, en }) }),

  // Projects (public GET, admin CUD)
  getProjects: (lang = 'zh') => request(`/projects?lang=${lang}`),
  getProject: (id, lang = 'zh') => request(`/projects/${id}?lang=${lang}`),
  createProject: (zh, en) =>
    request('/projects', { method: 'POST', body: JSON.stringify({ zh, en }) }),
  updateProject: (id, zh, en) =>
    request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify({ zh, en }) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  // Resume
  getResume: (lang = 'zh') => request(`/resume?lang=${lang}`),
  setResume: (lang, html) =>
    request('/resume', { method: 'PUT', body: JSON.stringify({ lang, html }) }),
}
